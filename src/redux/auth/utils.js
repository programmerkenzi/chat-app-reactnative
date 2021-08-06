/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-15 16:19:03
 * @LastEditTime: 2021-07-16 18:26:17
 * @LastEditors: Kenzi
 */

import { store } from "./../store";
import { onRefreshTokenStart } from "./auth.actions";

export const refreshTokenWhenTimeout = (expires_in) => {
  //提早15分钟获取
  const setTime = expires_in - 1000 * 60 * 15;
  setTimeout(() => {
    store.dispatch(onRefreshTokenStart());
  }, setTime);
};

export const refreshTokenInBackground = () => {
  store.dispatch(onRefreshTokenStart());
};
export const clearAllTimers = () => {
  let highestTimeoutId = setTimeout(";");
  for (var i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
};
