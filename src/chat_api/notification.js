/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-20 12:39:10
 * @LastEditTime: 2021-07-21 11:22:12
 * @LastEditors: Kenzi
 */

import axiosChatClient from "./axiosChatClient";

//获取通知

export const fetchAllNotification = () =>
  axiosChatClient({
    url: `/notification`,
    method: "get",
  });

//发送通知
/**
 *
 * @param {string} type 通知类型 add_friend
 * @param {object} data 相关信息
 * @returns
 */

export const postNotification = (type, data) =>
  axiosChatClient({
    method: "post",
    url: `/notification/${type}`,
    data,
  });

/**
 *
 * @param {string} id 推拨id
 * @returns
 */
export const deleteNotificationById = (id) =>
  axiosChatClient({
    method: "delete",
    url: `/delete/notification/${id}`,
  });
