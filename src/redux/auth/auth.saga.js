/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-02-28 15:47:34
 * @LastEditTime: 2021-07-21 13:55:17
 * @LastEditors: Kenzi
 */

import { takeLatest, put, all, fork, select } from "redux-saga/effects";

import {
  loginSuccess,
  logoutFailure,
  onRefreshTokenSuccess,
} from "./auth.actions";
import authActionType from "./auth.type";
import { loginFailure } from "./auth.actions";
import { onLogin, onRefreshToken } from "./../../chat_api/auth";
import { logoutSuccess } from "./auth.actions";
import { onLogout } from "./../../chat_api/auth";
import { onRefreshTokenFailure } from "./auth.actions";
import { refreshTokenWhenTimeout } from "./utils";
import * as Device from "expo-device";

function* login({ payload }) {
  try {
    const { username, password } = payload;
    const device_id = Device.osBuildFingerprint;
    const res = yield onLogin(username, password, device_id);
    if (res) {
      const { accessToken, refreshToken, userInfo } = res;
      yield put(loginSuccess(accessToken, refreshToken, userInfo));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logout() {
  try {
    const res = yield onLogout();
    if (res) {
      yield put(logoutSuccess());
    }
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

function* refreshToken() {
  try {
    const auth = yield (state) => state.secure.auth;
    const { refreshToken } = yield select(auth);
    if (refreshToken) {
      const res = yield onRefreshToken({ refreshToken: refreshToken });
      if (res) {
        yield put(onRefreshTokenSuccess(res.refreshToken, res.accessToken));
      }
    } else {
      yield put(onRefreshTokenFailure("no token"));
    }
  } catch (error) {
    yield put(onRefreshTokenFailure(error));
  }
}

function* onRefreshTokenStart() {
  yield takeLatest(authActionType.REFRESH_TOKEN_START, refreshToken);
}

export default function* authSagas() {
  yield all([
    fork(onLoginStart),
    fork(onLogoutStart),
    // fork(onStartLoading),
    // fork(onStopLoading),
    // fork(onUserTokenExpired),
    fork(onRefreshTokenStart),
  ]);
}
