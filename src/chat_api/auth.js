/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-07 18:32:28
 * @LastEditTime: 2021-07-12 11:29:37
 * @LastEditors: Kenzi
 */

import axiosChatClient from "./axiosChatClient";

export const onLogin = (data) =>
  axiosChatClient({
    method: "post",
    url: "/login",
    data,
  });

export const onFetchUserInfo = () =>
  axiosChatClient({
    method: "get",
    url: "/users/my_info",
  });

export const onLogout = () =>
  axiosChatClient({
    method: "post",
    url: "/logout",
  });

export const onRefreshToken = () =>
  axiosChatClient({
    method: "post",
    url: "/refresh-token",
  });
