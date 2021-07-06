/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:43:02
 * @LastEditTime: 2021-07-06 13:52:42
 * @LastEditors: Kenzi
 */
import { takeLatest, put, all, fork, takeEvery } from "redux-saga/effects";
import settingActionTypes from "./setting.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLangSuccess } from "./setting.action";
import i18n from "./../../i18n/index";

function* changeLang({ payload }) {
  yield (i18n.locale = payload);
  yield AsyncStorage.setItem("defaultLocale", payload);
  yield put(changeLangSuccess(payload));
}

function* onChangeLang() {
  yield takeLatest(settingActionTypes.CHANGE_LANG_START, changeLang);
}

export default function* settingSagas() {
  yield all([fork(onChangeLang)]);
}
