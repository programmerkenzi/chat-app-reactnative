/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-14 17:57:36
 * @LastEditTime: 2021-08-10 07:42:12
 * @LastEditors: Kenzi
 */

import axiosChatClient from "./axiosChatClient";

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

export const deleteMessage = (room_id, message_ids) =>
  axiosChatClient({
    url: `delete/${room_id}/messages`,
    method: "delete",
    data: { message_ids },
  });

export const forwardMessages = (room_id, message_ids, file, message) =>
  axiosChatClient({
    url: `/room/${room_id}/forward_messages`,
    method: "post",
    data: { message_ids, file, message },
  });

export const replyMessage = (room_id, message_id, file, message) =>
  axiosChatClient({
    url: `/room/${room_id}/reply_message`,
    method: "post",
    data: { message_id, file, message },
  });

export const pinMessage = (room_id, message_id) =>
  axiosChatClient({
    url: `/room/${room_id}/pin-message/${message_id}`,
    method: "put",
  });
export const unpinMessage = (room_id, message_id) =>
  axiosChatClient({
    url: `/room/${room_id}/unpin-message/${message_id}`,
    method: "put",
  });

//換群組背景
export const updateGroupBackground = (room_id, filename) =>
  axiosChatClient({
    url: `/room/${room_id}/bg`,
    method: "put",
    data: { filename },
  });
