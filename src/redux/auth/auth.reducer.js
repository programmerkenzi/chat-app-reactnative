/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-01 11:33:03
 * @LastEditTime: 2021-08-07 09:09:31
 * @LastEditors: Kenzi
 */

import authActionType from "./auth.type";

const initState = {
  userToken: null,
  refreshToken: null,
  publicKey: null,
  privateKey: null,
  privateKeyGroup: null,
  publicKeyGroup: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActionType.LOGIN_SUCCESS:
      return {
        ...state,
        userToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        publicKey: action.payload.publicKey,
        privateKey: action.payload.privateKey,
        privateKeyGroup: action.payload.privateKeyGroup,
        publicKeyGroup: action.payload.publicKeyGroup,
      };
    case authActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        userToken: null,
        refreshToken: null,
        publicKey: null,
        privateKey: null,
        privateKeyGroup: null,
        publicKeyGroup: null,
      };

    case authActionType.GET_USER_INFO_SUCCESS:
      return {
        ...state,
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
