/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:33:46
 * @LastEditTime: 2021-07-21 15:41:27
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
  onAddFriend,
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
import { onSocketIoReConnect } from "./ws.action";
import { onGotNewNotification } from "../notification/notification.action";

function initSocketIo(user_id) {
  return eventChannel((emitter) => {
    const baseUrl = __DEV__
      ? process.env.REACT_APP_API_URL_DEVELOPMENT
      : process.env.REACT_APP_API_URL_PRODUCTION;

    const socket = io(baseUrl);
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

    socket.on("add_friend_request", (data) => {
      emitter(onGotNewNotification(data.data));
    });

    socket.on("add_friend", (data) => {
      emitter(onAddFriend(data.data));
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
  const user = yield (state) => state.main.user;
  const { userInfo } = yield select(user);
  const channel = yield call(() => initSocketIo(userInfo._id));
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

//断线后重新连线时
function* updateNetworkConnectionStatus({ payload }) {
  if (payload) {
    const auth = yield (state) => state.secure.auth;
    const { userToken } = yield select(auth);
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

function* handleConnectWs() {
  const auth = yield (state) => state.secure.auth;
  const { userToken } = yield select(auth);
  if (userToken) {
    yield fork(() => handleWebSocket(userToken));
  }
}

function* onHandleConnectWs() {
  yield takeLatest(
    [authActionType.LOGIN_SUCCESS, wsActionType.SOCKET_IO_DISCONNECTED],
    handleConnectWs
  );
}

export default function* wsSagas() {
  yield all([fork(onUpdateNetworkStatus), fork(onHandleConnectWs)]);
}
