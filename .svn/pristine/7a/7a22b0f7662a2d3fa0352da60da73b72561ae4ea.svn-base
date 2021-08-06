/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:43:02
 * @LastEditTime: 2021-07-19 14:51:56
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
import appActionTypes from "./app.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../../i18n/index";
import { clearAllTimers } from "../auth/utils";
import { registerRefreshTokenWhenTimeoutInBackground } from "../../library/utils/backgroundTask";
import { changeLangSuccess, updateAppState } from "./app.action";

function* changeLang({ payload }) {
  yield (i18n.locale = payload);
  yield AsyncStorage.setItem("defaultLocale", payload);
  yield put(changeLangSuccess(payload));
}

function* onChangeLang() {
  yield takeLatest(appActionTypes.CHANGE_LANG_START, changeLang);
}

function* handleAppStateChange({ payload }) {
  yield put(updateAppState(payload));
}

function* onAppStateChange() {
  yield takeLatest(appActionTypes.ON_APP_STATE_CHANGE, handleAppStateChange);
}

export default function* appSagas() {
  yield all([fork(onChangeLang), fork(onAppStateChange)]);
}
