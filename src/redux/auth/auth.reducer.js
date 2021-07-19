/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-01 11:33:03
 * @LastEditTime: 2021-07-19 14:50:44
 * @LastEditors: Kenzi
 */

import authActionType from "./auth.type";

const initState = {
  isLoading: false,
  username: null,
  password: null,
  userToken: null,
  refreshToken: null,
  isLoginFailure: false,
  failureLoginMessage: null,
  expoPushToken: null,
  error: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActionType.LOGIN_SUCCESS:
      return {
        ...state,
        userToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case authActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        userToken: null,
        expoPushToken: null,
        userInfo: null,
        username: null,
        password: null,
      };

    case authActionType.UPDATE_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      };

    case authActionType.GET_USER_INFO_SUCCESS:
    case authActionType.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload[0],
      };

    case authActionType.LOGIN_FAILURE:
      return {
        ...state,
        failureLoginMessage: action.payload,
        isLoginFailure: true,
      };

    case authActionType.GOT_EXPO_PUSH_TOKEN:
      return {
        ...state,
        expoPushToken: action.payload,
      };

    case authActionType.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        userToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case authActionType.LOGOUT_FAILURE:
    case authActionType.REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        userToken: null,
      };
    default:
      return state;
  }
};
export default authReducer;
