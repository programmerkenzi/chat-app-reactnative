/*
 * @Description: 登录操作
 * @Author: Lewis
 * @Date: 2021-01-13 14:55:40
 * @LastEditTime: 2021-08-03 13:59:02
 * @LastEditors: Kenzi
 */
import authActionType from "./auth.type";

export const loginStart = (usernameAndPassword) => ({
  type: authActionType.LOGIN_START,
  payload: usernameAndPassword,
});

export const loginSuccess = (
  accessToken,
  refreshToken,
  userInfo,
  publicKey,
  privateKey,
  privateKeyGroup,
  publicKeyGroup
) => ({
  type: authActionType.LOGIN_SUCCESS,
  payload: {
    accessToken,
    refreshToken,
    userInfo,
    publicKey,
    privateKey,
    privateKeyGroup,
    publicKeyGroup,
  },
});

export const loginFailure = (error) => ({
  type: authActionType.LOGIN_FAILURE,
  payload: error,
});

export const logoutStart = () => ({
  type: authActionType.LOGOUT_START,
});

export const logoutSuccess = () => ({
  type: authActionType.LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: authActionType.LOGOUT_FAILURE,
  payload: error,
});

export const onUserTokenExpired = () => ({
  type: authActionType.USER_TOKEN_EXPIRED,
});

export const gotExpoPushToken = (token) => ({
  type: authActionType.GOT_EXPO_PUSH_TOKEN,
  payload: token,
});

/**
 *
 * @param {object} config 没有成功的axios request config
 * @returns
 */
export const onRefreshTokenStart = () => ({
  type: authActionType.REFRESH_TOKEN_START,
});
export const onRefreshTokenSuccess = (accessToken, refreshToken) => ({
  type: authActionType.REFRESH_TOKEN_SUCCESS,
  payload: { accessToken, refreshToken },
});
export const onRefreshTokenFailure = (error) => ({
  type: authActionType.REFRESH_TOKEN_FAILURE,
  payload: error,
});
