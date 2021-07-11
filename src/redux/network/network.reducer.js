/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-08 18:26:40
 * @LastEditTime: 2021-07-08 18:26:41
 * @LastEditors: Kenzi
 */
import networkActionTypes from "./network.type";

const initialState = {
  networkReachability: true,
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case networkActionTypes.NETWORK_CONNECTED:
      return { ...state, networkReachability: true };

    case networkActionTypes.NETWORK_DISCONNECTED:
      return { ...state, networkReachability: false };
    default:
      return state;
  }
};

export default networkReducer;
