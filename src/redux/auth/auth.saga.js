/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-02-28 15:47:34
 * @LastEditTime: 2021-07-15 18:39:00
 * @LastEditors: Kenzi
 */

import { takeLatest, put, all, fork, take, select } from "redux-saga/effects";

import {
  getUserInfoFailure,
  getUserInfoStart,
  loginSuccess,
  logoutFailure,
  onRefreshTokenSuccess,
} from "./auth.actions";
import authActionType from "./auth.type";
import { loginFailure } from "./auth.actions";
import { Alert } from "react-native";
import {
  onFetchUserInfo,
  onLogin,
  onRefreshToken,
} from "./../../chat_api/auth";
import { createFileUrl } from "./../../library/utils/utils";
import { getUserInfoSuccess } from "./auth.actions";
import { logoutSuccess } from "./auth.actions";
import { onLogout } from "./../../chat_api/auth";
import { store } from "./../store";
import { refreshTokenWhenTimeout } from "./utils";
import { onRefreshTokenFailure } from "./auth.actions";
import { saveToken } from "./../../library/utils/secureStore";

function* login({ payload }) {
  try {
    const res = yield onLogin(payload);
    const data = res;
    const username = payload.username;
    const password = payload.password;
    const { authorization, expires_in, userInfo } = data;
    if (data.success) {
      yield saveToken(authorization);

      yield put(
        loginSuccess({
          userToken: authorization,
          tokenExpiration: expires_in,
          userInfo: userInfo,
          username: username,
          password: password,
        })
      );

      yield refreshTokenWhenTimeout(expires_in);
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logout() {
  try {
    const res = yield onLogout();
    if (res) {
      yield removeToken();
      yield put(logoutSuccess());
    }
  } catch (error) {
    yield removeToken();
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
      avatar: avatar.length > 0 ? createFileUrl(avatar) : "http://",
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

function* refreshToken() {
  try {
    const auth = yield (state) => state.auth;
    const { userToken, tokenExpiration } = yield select(auth);
    if (userToken) {
      const res = yield onRefreshToken();
      if (res.success) {
        yield put(onRefreshTokenSuccess(res.refreshToken, res.expires_in));
        yield refreshTokenWhenTimeout(tokenExpiration);
      }
    } else {
      yield put(onRefreshTokenFailure("no token"));
      yield removeToken();
    }
  } catch (error) {
    yield put(onRefreshTokenFailure(error));
    yield removeToken();
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
    fork(onGetUserInfo),
    // fork(onUserTokenExpired),
    fork(onRefreshTokenStart),
  ]);
}
