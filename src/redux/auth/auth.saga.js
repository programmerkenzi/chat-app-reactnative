/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-02-28 15:47:34
 * @LastEditTime: 2021-07-09 10:23:28
 * @LastEditors: Kenzi
 */

import { takeLatest, put, all, fork, take } from "redux-saga/effects";
import {
  getUserInfoFailure,
  getUserInfoStart,
  loginSuccess,
  logoutFailure,
} from "./auth.actions";
import authActionType from "./auth.type";
import { loginFailure } from "./auth.actions";
import { Alert } from "react-native";
import { onFetchUserInfo, onLogin } from "./../../chat_api/auth";
import { createFileUrl } from "./../../library/utils/utils";
import { getUserInfoSuccess } from "./auth.actions";
import { logoutSuccess } from "./auth.actions";

function* login({ payload }) {
  try {
    const res = yield onLogin(payload);
    const data = res;
    const username = payload.username;
    const password = payload.password;

    if (data.success) {
      console.log("data.authorization :>> ", data.authorization);
      yield put(
        loginSuccess({
          userToken: data.authorization,
          tokenExpiration: data.expires_in,
          userInfo: data.userInfo,
          username: username,
          password: password,
        })
      );
    } else {
      yield put(loginFailure(data.message));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logout() {
  try {
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
  }
}
function* onLogoutStart() {
  yield takeLatest(authActionType.LOGOUT_START, logout);
}

// function* startLoading() {
//   yield put(updateLoadingStatus(true));
// }
// function* stopLoading() {
//   yield put(updateLoadingStatus(false));
// }

function* getUserInfo() {
  try {
    const res = yield onFetchUserInfo();
    const data = yield res.data;
    const { avatar } = yield data;
    const userInfo = {
      ...data,
      avatar: avatar ? createFileUrl(avatar) : null,
    };
    yield put(getUserInfoSuccess(userInfo));
  } catch (error) {
    yield put(getUserInfoFailure(error));
  }
}
function* onGetUserInfo() {
  yield takeLatest(authActionType.GET_USER_INFO_START, getUserInfo);
}

// function* autoReLogin() {
//   const auth = (state) => state.auth;
//   const { username, password } = yield select(auth);
//   if (username && password) {
//     yield put(loginStart({ username, password }));
//   }
// }

function* onLoginStart() {
  yield takeLatest(authActionType.LOGIN_START, login);
}

// function* onStartLoading() {
//   yield takeLatest(authActionType.START_LOADING, startLoading);
// }

// function* onStopLoading() {
//   yield takeLatest(authActionType.STOP_LOADING, stopLoading);
// }

// function* onUserTokenExpired() {
//   yield takeLatest(authActionType.USER_TOKEN_EXPIRED, autoReLogin);
// }

export default function* authSagas() {
  yield all([
    fork(onLoginStart),
    fork(onLogoutStart),
    // fork(onStartLoading),
    // fork(onStopLoading),
    fork(onGetUserInfo),
    // fork(onUserTokenExpired),
  ]);
}
