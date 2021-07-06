/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:26:59
 * @LastEditTime: 2021-07-06 13:50:44
 * @LastEditors: Kenzi
 */
import { all, call, fork } from "redux-saga/effects";
import chatSagas from "./chat/chat.saga";
import settingSagas from "./setting/setting.saga";
import wsSagas from "./ws/ws.saga";

export default function* rootSaga() {
  yield all([fork(wsSagas), fork(chatSagas)]);
}
