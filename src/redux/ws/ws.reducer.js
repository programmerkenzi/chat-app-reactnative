/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:39:32
 * @LastEditTime: 2021-07-05 18:41:10
 * @LastEditors: Kenzi
 */

import wsActionType from "./ws.type";

const initialState = {
  socketIoClientId: null,
};

const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case wsActionType.GOT_WEBSOCKET_CLIENT_ID:
      return {
        ...state,
        socketIoClientId: action.payload,
      };

    case wsActionType.SOCKET_IO_CONNECTED:
      return {
        ...state,
        socketIoClientId: action.payload,
      };
    case wsActionType.SOCKET_IO_DISCONNECTED:
      return {
        ...state,
        socketIoClientId: null,
      };

    default:
      return state;
  }
};

export default wsReducer;
