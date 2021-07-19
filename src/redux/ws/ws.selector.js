/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-09 15:57:25
 * @LastEditTime: 2021-07-16 10:36:16
 * @LastEditors: Kenzi
 */
import { createSelector } from "reselect";

const selectWs = (state) => state.main.ws;

export const selectSocketIoId = createSelector(
  [selectWs],
  (ws) => ws.socketIoClientId
);
