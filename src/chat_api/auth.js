/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-07 18:32:28
 * @LastEditTime: 2021-07-07 18:33:20
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
