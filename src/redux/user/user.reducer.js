/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-16 10:40:05
 * @LastEditTime: 2021-07-16 11:16:33
 * @LastEditors: Kenzi
 */

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
    default:
      return state;
  }
};
export default userReducer;
