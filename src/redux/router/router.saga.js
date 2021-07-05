/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-26 11:46:14
 * @LastEditTime: 2021-05-26 11:46:14
 * @LastEditors: Kenzi
 */
/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-26 10:15:29
 * @LastEditTime: 2021-05-26 10:28:13
 * @LastEditors: Kenzi
 */
import {
  takeLatest,
  put,
  all,
  fork,
  takeEvery,
  select,
} from "redux-saga/effects";
import { updateCurrentPageInfo } from "./router.action";
import routerActionType from "./router.type.";

function* pageChange({ payload }) {
  yield put(updateCurrentPageInfo(payload));
}

function* onPageChange() {
  yield takeLatest(routerActionType.ON_PAGE_CHANGE, pageChange);
}

export default function* routerSagas() {
  yield all([fork(onPageChange)]);
}
