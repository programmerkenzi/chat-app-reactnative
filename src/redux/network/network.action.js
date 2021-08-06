/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-08 18:32:03
 * @LastEditTime: 2021-07-08 18:37:17
 * @LastEditors: Kenzi
 */

import networkActionTypes from "./network.type";

export const networkConnected = () => ({
  type: networkActionTypes.NETWORK_CONNECTED,
});
export const networkDisconnected = () => ({
  type: networkActionTypes.NETWORK_DISCONNECTED,
});
export const updateNetworkConnectionStatus = (status) => ({
  type: networkActionTypes.UPDATE_NETWORK_CONNECTION_STATUS,
  payload: status,
});
