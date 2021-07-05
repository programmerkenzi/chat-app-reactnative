/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:33:46
 * @LastEditTime: 2021-07-05 18:44:14
 * @LastEditors: Kenzi
 */
import { all, fork, take, put, call } from "redux-saga/effects";

function initSocketIo() {
  return eventChannel((emitter) => {
    const baseUrl = __DEV__
      ? process.env.REACT_APP_API_URL_DEVELOPMENT
      : process.env.REACT_APP_API_URL_PRODUCTION;

    const socket = io(baseUrl);
    socket.on("connect", () => {
      const device_id = Device.osBuildFingerprint;
      emitter(onSocketIoConnected(socket.id));
      socket.emit("identity", {
        user_id: "8dfce2e4f4f3417ab7a69f662400f77f",
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
      console.log("socket  delete_message:>> ", data);
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
function* handleSocketIo() {
  const channel = yield call(initSocketIo);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* wsSagas() {
  yield all([fork(handleSocketIo)]);
}
