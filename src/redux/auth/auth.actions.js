/*
 * @Description: 登录操作
 * @Author: Lewis
 * @Date: 2021-01-13 14:55:40
 * @LastEditTime: 2021-06-10 10:52:37
 * @LastEditors: Kenzi
 */
import authActionType from "./auth.type";

export const loginStart = (usernameAndPassword) => ({
  type: authActionType.LOGIN_START,
  payload: usernameAndPassword,
});

export const loginSuccess = (userInfo) => ({
  type: authActionType.LOGIN_SUCCESS,
  payload: userInfo,
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

export const startLoading = () => ({
  type: authActionType.START_LOADING,
});

export const updateLoadingStatus = (status) => ({
  type: authActionType.UPDATE_LOADING_STATUS,
  payload: status,
});

export const stopLoading = () => ({
  type: authActionType.STOP_LOADING,
});

export const getUserInfoStart = () => ({
  type: authActionType.GET_USER_INFO_START,
});

export const getUserInfoSuccess = (info) => ({
  type: authActionType.GET_USER_INFO_SUCCESS,
  payload: info,
});

export const getUserInfoFailure = (error) => ({
  type: authActionType.GET_USER_INFO_FAILURE,
  payload: error,
});

export const onUserTokenExpired = () => ({
  type: authActionType.USER_TOKEN_EXPIRED,
});

export const gotExpoPushToken = (token) => ({
  type: authActionType.GOT_EXPO_PUSH_TOKEN,
  payload: token,
});

export const onRefreshTokenStart = () => ({
  type: authActionType.REFRESH_TOKEN_START,
});
export const onRefreshTokenSuccess = (new_token, expires_in) => ({
  type: authActionType.REFRESH_TOKEN_SUCCESS,
  payload: { new_token, expires_in },
});
export const onRefreshTokenFailure = (error) => ({
  type: authActionType.REFRESH_TOKEN_FAILURE,
  payload: error,
});
