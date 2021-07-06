/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-14 17:57:36
 * @LastEditTime: 2021-07-06 16:06:37
 * @LastEditors: Kenzi
 */

import axiosChatClient from "./axiosChatClient";

//获取我的联络人
export const fetchMyContact = () =>
  axiosChatClient({
    url: `users/friends`,
    method: "get",
  });

//初始化聊天室
export const initializeChatRoom = (data) =>
  axiosChatClient({
    method: "post",
    url: "room/initiate",
    data,
  });

//获取用户所有的房间
export const fetchChatRoom = (page) =>
  axiosChatClient({
    url: `/room?page=${page}&limit=20`,
    method: "get",
  });

//发送消息
/**
 *
 * @param {String} room_id current room id
 * @param {String} file  file path if has
 * @param {String} filename file name if has
 * @param {Any} message message content
 * @param {String} user_id current user id
 * @returns
 */
export const postMessage = (room_id, file, message) =>
  axiosChatClient({
    url: `room/${room_id}/message`,
    method: "post",
    data: {
      file: file,
      message: message,
    },
  });

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

//标记已读
/**
 *
 * @param {String} room_id 目前的房间id
 * @returns
 */
export const markReadByRoomId = (room_id) =>
  axiosChatClient({
    url: `room/${room_id}/mark-read`,
    method: "put",
  });

//聊天记录
/**
 *
 * @param {String} room_id 目前的房间id
 * @param {String} page 要获取第几页
 * @param {String} limit 每页资料数量
 * @returns
 */
export const fetchConversationsByRoomId = (room_id, page, limit) =>
  axiosChatClient({
    url: `room/${room_id}/messages?page=${page}&limit=15`,
    method: "get",
  });

//檔案
export const uploadFile = (file) =>
  axiosChatClient({
    url: "/fs",
    method: "post",
    contentType: "multipart/form-data",
    accept: "application/json",
    data: file,
  });

export const getFile = (filename) =>
  axiosChatClient({
    url: `/fs/${filename}`,
    method: "get",
    responseType: "blob",
  });

export const downloadFile = (filename) =>
  axiosChatClient({
    url: `/fs/download/${filename}`,
    method: "get",
    responseType: "blob",
  });

export const deleteMessage = (room_id, message_ids) =>
  axiosChatClient({
    url: `/delete/${room_id}/messages`,
    method: "delete",
    data: { message_ids: message_ids },
  });
