/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-20 12:31:35
 * @LastEditTime: 2021-07-20 18:18:21
 * @LastEditors: Kenzi
 */

import axiosChatClient from "./axiosChatClient";

//搜索用户
/**
 *
 * @param {String} user_public_id
 * @returns
 */
export const searchUserByPublicId = (user_public_id) =>
  axiosChatClient({
    url: `users/public-id/${user_public_id}`,
    method: "get",
  });

//获取我的联络人
export const fetchMyFriendList = () =>
  axiosChatClient({
    url: `users/friends`,
    method: "get",
  });

//加好友
export const submitFriendRequestPost = (public_id, notification_id) =>
  axiosChatClient({
    url: `/users/add-friend/${public_id}`,
    method: "put",
    data: { notification_id: notification_id },
  });
