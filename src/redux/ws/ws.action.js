/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:35:43
 * @LastEditTime: 2021-07-06 11:48:26
 * @LastEditors: Kenzi
 */

import wsActionType from "./ws.type";

/**
 *
 * @param {String} client_id socket io client id from server
 * @returns
 */
export const onSocketIoConnected = (client_id) => ({
  type: wsActionType.SOCKET_IO_CONNECTED,
  payload: client_id,
});

/**
 *
 * @param {String} reason the reason of socket io disconnected
 * @returns
 */
export const onSocketIoDisConnected = (reason) => ({
  type: wsActionType.SOCKET_IO_DISCONNECTED,
  payload: reason,
});

export const onSocketIoReConnect = () => ({
  type: wsActionType.SOCKET_IO_RECONNECT,
});
export const onConnectToSocketIo = () => ({
  type: wsActionType.CONNECT_TO_SOCKET_IO,
});
