/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:26:59
 * @LastEditTime: 2021-07-09 10:24:32
 * @LastEditors: Kenzi
 */
import { all, call, fork } from "redux-saga/effects";
import appSagas from "./app/app.saga";
import authSagas from "./auth/auth.saga";
import chatSagas from "./chat/chat.saga";
import wsSagas from "./ws/ws.saga";

export default function* rootSaga() {
  yield all([fork(wsSagas), fork(chatSagas), fork(authSagas), fork(appSagas)]);
}
