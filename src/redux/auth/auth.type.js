/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-02-28 15:35:00
 * @LastEditTime: 2021-05-21 15:21:31
 * @LastEditors: Kenzi
 */

export default authActionType = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT_START: "LOGOUT_START",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",
  START_LOADING: "START_LOADING",
  UPDATE_LOADING_STATUS: "UPDATE_LOADING_STATUS",
  STOP_LOADING: "STOP_LOADING",
  GET_CAPTCHA_START: "GET_CAPTCHA_START",
  GET_CAPTCHA_SUCCESS: "GET_CAPTCHA_SUCCESS",
  GET_CAPTCHA_FAILURE: "GET_CAPTCHA_FAILURE",
  GET_USER_INFO_START: "GET_USER_INFO_START",
  GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS",
  GET_USER_INFO_FAILURE: "GET_USER_INFO_FAILURE",
  USER_TOKEN_EXPIRED: "USER_TOKEN_EXPIRED",
  GOT_EXPO_PUSH_TOKEN: "GOT_EXPO_PUSH_TOKEN",
};
