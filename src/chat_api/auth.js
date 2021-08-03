/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-07 18:32:28
 * @LastEditTime: 2021-08-03 15:25:45
 * @LastEditors: Kenzi
 */

import axiosChatClient from "./axiosChatClient";

/**
 *
 * @param {String} username
 * @param {String} password
 * @param {String} drive_id
 * @returns
 */
export const onLogin = (username, password, drive_id) =>
  axiosChatClient({
    method: "post",
    url: "/login",
    data: { username, password, drive_id },
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

export const onRefreshToken = (data) =>
  axiosChatClient({
    method: "post",
    url: "/refresh-token",
    data,
  });
