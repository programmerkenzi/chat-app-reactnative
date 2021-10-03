/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-16 10:39:57
 * @LastEditTime: 2021-08-10 08:46:21
 * @LastEditors: Kenzi
 */

import userActionTypes from "./user.type";

export const getUserInfoStart = () => ({
  type: userActionTypes.GET_USER_INFO_START,
});

export const getUserInfoSuccess = (info) => ({
  type: userActionTypes.GET_USER_INFO_SUCCESS,
  payload: info,
});

export const getUserInfoFailure = (error) => ({
  type: userActionTypes.GET_USER_INFO_FAILURE,
  payload: error,
});

export const updateAvatar = (url) => ({
  type: userActionTypes.UPDATE_AVATAR,
  payload: url,
});
export const updateBackground = (url) => ({
  type: userActionTypes.UPDATE_BACKGROUND,
  payload: url,
});
