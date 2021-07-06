/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-02-28 15:47:34
 * @LastEditTime: 2021-06-18 09:59:19
 * @LastEditors: Kenzi
 */

import { takeLatest, put, all, fork, select } from "redux-saga/effects";
import {
  getUserInfoSuccess,
  loginSuccess,
  logoutFailure,
} from "./auth.actions";
import authActionType from "./auth.type";
import { loginFailure } from "./auth.actions";
import { logoutSuccess } from "./auth.actions";
import { loginApi, logoutApi } from "./../../api/auth";
import { updateLoadingStatus } from "./auth.actions";
import { getUserInfoFailure } from "./auth.actions";
import { fetchUserInfo } from "./../../api/auth";
import { Alert } from "react-native";
import { loginStart } from "./auth.actions";
import { loadResources } from "./../../library/utils/resources";

function* login({ payload }) {
  try {
    const res = yield loginApi(payload);
    const data = res.data;
    const username = payload.username;
    const password = payload.password;

    if (data.isCaptcha) {
      yield put(loginFailure("密码错误"));
      yield Alert.alert("", "密码错误");
    } else {
      yield put(
        loginSuccess({
          userToken: data,
          username: username,
          password: password,
        })
      );
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logout() {
  try {
    const res = yield logoutApi();
    if (res) {
      yield put(logoutSuccess());
    }
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* startLoading() {
  yield put(updateLoadingStatus(true));
}
function* stopLoading() {
  yield put(updateLoadingStatus(false));
}

function* getUserInfo() {
  try {
    const res = yield fetchUserInfo();
    const data = yield res.data;
    const { avatar } = yield data;
    const avatarUri = yield loadResources(avatar);
    const userInfo = {
      ...data,
      avatar: avatar.includes("https://") ? avatar : avatarUri,
    };
    yield put(getUserInfoSuccess(userInfo));
  } catch (error) {
    yield put(getUserInfoFailure(error));
  }
}

function* autoReLogin() {
  const auth = (state) => state.auth;
  const { username, password } = yield select(auth);
  if (username && password) {
    yield put(loginStart({ username, password }));
  }
}

function* onLoginStart() {
  yield takeLatest(authActionType.LOGIN_START, login);
}

function* onLogoutStart() {
  yield takeLatest(authActionType.LOGOUT_START, logout);
}

function* onStartLoading() {
  yield takeLatest(authActionType.START_LOADING, startLoading);
}

function* onStopLoading() {
  yield takeLatest(authActionType.STOP_LOADING, stopLoading);
}

function* onGetUserInfo() {
  yield takeLatest(
    [authActionType.LOGIN_SUCCESS, authActionType.GET_USER_INFO_START],
    getUserInfo
  );
}

function* onUserTokenExpired() {
  yield takeLatest(authActionType.USER_TOKEN_EXPIRED, autoReLogin);
}

export default function* authSagas() {
  yield all([
    fork(onLoginStart),
    fork(onLogoutStart),
    fork(onStartLoading),
    fork(onStopLoading),
    fork(onGetUserInfo),
    fork(onUserTokenExpired),
  ]);
}
