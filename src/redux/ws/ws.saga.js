/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:33:46
 * @LastEditTime: 2021-07-09 14:51:15
 * @LastEditors: Kenzi
 */
import {
  all,
  fork,
  take,
  put,
  call,
  takeLatest,
  select,
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { io } from "socket.io-client";
import * as Device from "expo-device";
import { onSocketIoConnected, onSocketIoDisConnected } from "./ws.action";
import authActionType from "./../auth/auth.type";
import {
  gotNewMessages,
  onDeleteConversation,
  onRecipientMarkRead,
} from "../chat/chat.actions";
import wsActionType from "./ws.type";
import networkActionTypes from "./../network/network.type";
import {
  networkConnected,
  networkDisconnected,
} from "../network/network.action";
import { store } from "../store";

function initSocketIo(user_id) {
  return eventChannel((emitter) => {
    const baseUrl = __DEV__
      ? process.env.REACT_APP_API_URL_DEVELOPMENT
      : process.env.REACT_APP_API_URL_PRODUCTION;

    const socket = io(baseUrl);
    console.log("socket user_id :>> ", user_id);
    socket.on("connect", () => {
      const device_id = Device.osBuildFingerprint;
      emitter(onSocketIoConnected(socket.id));
      socket.emit("identity", {
        user_id: user_id,
        device_id: device_id,
      });
    });

    socket.on("new_message", (data) => {
      emitter(gotNewMessages(data));
    });

    socket.on("mark_read", (data) => {
      emitter(onRecipientMarkRead(data.data));
    });

    socket.on("add_friend", (data) => {
      console.log("add_friend :>> ", data);
    });

    socket.on("delete_message", (data) => {
      const { chat_room_id, message_ids } = data.data;
      emitter(onDeleteConversation(chat_room_id, message_ids));
    });

    socket.on("disconnect", (reason) => {
      emitter(onSocketIoDisConnected(reason));
    });

    // unsubscribe function
    return () => {
      console.log("Socket off");
      socket.close();
    };
  });
}
// function* handleSocketIo() {
//   while (true) {
//     const { userToken } = yield take([
//       authActionType.LOGIN_SUCCESS,
//       wsActionType.CONNECT_TO_SOCKET_IO,
//     ]);
//     const channel = yield call(initSocketIo);
//     const action = yield take(channel);
//     yield put(action);
//     const logout = yield take(authActionType.LOGOUT_SUCCESS);
//     yield channel.close();
//   }
// }
// function* handleWebSocket() {
//   const state = yield (state) => state.auth;
//   const { userToken, userInfo } = yield select(state);
//   if (userToken) {
//     const channel = yield call(() => initSocketIo(userInfo._id));
//     const action = yield take(channel);
//     yield put(action);
//   }
// }

function* handleWebSocket() {
  const auth = yield (state) => state.auth;
  const { userInfo } = yield select(auth);
  const channel = yield call(() => initSocketIo(userInfo._id));
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* updateNetworkConnectionStatus({ payload }) {
  if (payload) {
    const auth = yield (state) => state.auth;
    const { userToken } = yield select(auth);
    console.log("updateNetworkConnectionStatus userToken :>> ", userToken);

    if (userToken) {
      yield put(networkConnected());
      yield fork(() => handleWebSocket(userToken));
    }
  } else {
    yield put(networkDisconnected());
  }
}

function* onUpdateNetworkStatus() {
  yield takeLatest(
    networkActionTypes.UPDATE_NETWORK_CONNECTION_STATUS,
    updateNetworkConnectionStatus
  );
}
function* loginSuccess({ payload }) {
  if (payload) {
    const auth = yield (state) => state.auth;
    const { userToken } = yield select(auth);
    if (userToken) {
      yield fork(() => handleWebSocket(userToken));
    }
  }
}

function* onLoginSuccess() {
  yield takeLatest(authActionType.LOGIN_SUCCESS, loginSuccess);
}

export default function* wsSagas() {
  yield all([fork(onUpdateNetworkStatus), fork(onLoginSuccess)]);
}
