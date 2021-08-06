/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-20 14:19:30
 * @LastEditTime: 2021-07-20 17:15:21
 * @LastEditors: Kenzi
 */
import notificationActionTypes from "./notification.type";

const initialState = {
  notification: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationActionTypes.ON_GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.payload,
      };
    case notificationActionTypes.UPDATE_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
