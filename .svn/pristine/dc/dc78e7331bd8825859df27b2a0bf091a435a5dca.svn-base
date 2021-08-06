/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-20 14:35:55
 * @LastEditTime: 2021-07-20 14:37:11
 * @LastEditors: Kenzi
 */

import { createSelector } from "reselect";
const selectNotify = (state) => state.main.notify;

export const selectNotification = createSelector(
  [selectNotify],
  (notify) => notify.notification
);
