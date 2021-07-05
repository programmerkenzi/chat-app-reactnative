/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:26:59
 * @LastEditTime: 2021-07-05 18:42:38
 * @LastEditors: Kenzi
 */
import { all, call, fork } from "redux-saga/effects";
import wsSagas from "./ws/ws.saga";

export default function* rootSaga() {
  yield all([fork(wsSagas)]);
}
