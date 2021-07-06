/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-01 11:33:03
 * @LastEditTime: 2021-05-21 15:22:09
 * @LastEditors: Kenzi
 */

import authActionType from "./auth.type";

const initState = {
  isLoading: false,
  userInfo: {
    _id: "8dfce2e4f4f3417ab7a69f662400f77f",
    status: "Hello there, how are you",
    username: "u1",
    avatar: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
    name: "Vadim",
  },
  username: null,
  password: null,
  userToken: null,
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
        userToken: action.payload.userToken,
        username: action.payload.username,
        password: action.payload.password,
        isLoginFailure: false,
        failureLoginMessage: null,
      };
    case authActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        userToken: null,
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
        userInfo: action.payload,
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
    case authActionType.LOGOUT_FAILURE:
    case authActionType.GET_USER_INFO_FAILURE:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
