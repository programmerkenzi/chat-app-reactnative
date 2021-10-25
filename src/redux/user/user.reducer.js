/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-16 10:40:05
 * @LastEditTime: 2021-08-10 08:40:34
 * @LastEditors: Kenzi
 */

import userActionTypes from "./user.type";

const initState = {
  userInfo: null,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case authActionType.LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    case userActionTypes.UPDATE_AVATAR:
      return {
        ...state,
        userInfo: { ...state.userInfo, avatar: action.payload },
      };
    case userActionTypes.UPDATE_BACKGROUND:
      return {
        ...state,
        userInfo: { ...state.userInfo, background: action.payload },
      };
    default:
      return state;
  }
};
export default userReducer;
