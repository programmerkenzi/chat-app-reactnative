/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-21 14:34:35
 * @LastEditTime: 2021-07-21 11:54:23
 * @LastEditors: Kenzi
 */

import { fetchMyFriendList } from "../../chat_api/user";
import { createFileUrl } from "../../library/utils/utils";
import { store } from "../store";
import {
  fetchConversationsByRoomId,
  initializeChatRoom,
  fetchChatRoom,
} from "./../../chat_api/chat";

//更新最後訊息
/**
 *
 * @param {Array} chatRoomList redux的chatRoomList
 * @param {String} room_id 要更新的房间id
 * @param {Array} message 最新的讯息
 * @returns
 */

export const updateLastMessage = (chatRoomList, room_id, message) => {
  const room_info = chatRoomList[room_id];
  const new_room_info = { ...room_info, last_message: message };
  return new_room_info;
};

//標記自己房間已讀
/**
 *
 * @param {Array} chatRoomList redux的chatRoomList
 * @param {String} room_id
 * @returns
 */
export const readAll = (chatRoomList, room_id) => {
  const room_info = chatRoomList[room_id];
  const new_room_info = { ...room_info, unread: [] };
  return new_room_info;
};

/**
 *
 * @param {Array} chatRoomList redux的chatRoomList
 * @param {String} room_id
 * @param {Array} message 最新的訊息
 * @returns
 */
//更新最後訊息與未讀訊息
export const updateUnreadAndLastMessage = async (
  chatRoomList,
  room_id,
  message
) => {
  const room_info = chatRoomList[room_id];
  const new_room_info = {
    ...room_info,
    unread: [...room_info.unread, ...message],
    last_message: message,
  };
  return new_room_info;
};

/**
 *
 * @param {*} conversations redux的conversations
 * @param {*} room_id
 * @param {*} read_by_recipients
 * @returns
 */
//標記收件人已讀
export const handelRecipientMarkedRead = (
  conversations,
  room_id,
  read_by_recipients
) => {
  const roomConversations = conversations[room_id];
  const newRoomConversations = [];
  roomConversations.forEach((message) => {
    const readTime = new Date();
    const readByRecipients = message.read_by_recipients;
    const wasRead = readByRecipients.findIndex(
      (user) => user.read_by_user_id === read_by_recipients
    );
    if (wasRead === -1) {
      newRoomConversations.push({
        ...message,
        read_by_recipients: [
          ...readByRecipients,
          { read_at: readTime, read_by_user_id: read_by_recipients },
        ],
      });
    } else {
      newRoomConversations.push({ ...message });
    }
  });

  return newRoomConversations;
};

//獲取聊天記錄
/**
 *
 * @param {String} room_id
 * @param {Number} fetchPage 要fetch第幾頁
 * @param {Array} conversations 原本房间里的聊天记录
 */

export const getConversations = async (room_id, fetchPage, conversations) => {
  const res = await fetchConversationsByRoomId(room_id, fetchPage);
  const { data, meta } = await res.data;
  const currentPage = await meta.page;
  const newConversations = [...conversations, ...data];
  newConversations.page = currentPage;
  newConversations.total = meta.total;
  newConversations.pages = meta.pages;
  return newConversations;
};

/**
 *
 * @param {Number} fetchPage 要fetch第幾頁
 * @param {*} chatRoomList  redux的chatRoomList
 */

export const getChatRooms = async (fetchPage) => {
  const res = await fetchChatRoom(fetchPage);
  const { success, data } = res;
  const newList = {};
  if (!success) return;
  if (!data) return {};
  const list = data.data;
  list.forEach((room) => {
    const room_id = room._id;
    const avatar = room.avatar.length > 0 ? createFileUrl(avatar) : avatar;
    const users = room.users.map((user) => {
      return { ...user, avatar: createFileUrl(user.avatar) };
    });
    newList[room_id] = { ...room, avatar: avatar, users: users };
  });
  const { limit, page, pages, total } = data.meta;
  newList.total = total;
  newList.page = page;
  newList.pages = pages;

  return newList;
};

export const getFriendList = async () => {
  const res = await fetchMyFriendList();
  const data = await res.data;
  const list = [];
  data.forEach((contact) => {
    const avatar = contact.avatar;
    list.push({
      ...contact,
      avatar: avatar.length > 0 ? createFileUrl(avatar) : avatar,
    });
  });

  return list;
};

export const initRoom = async (creator, user_ids, type) => {
  const res = await initializeChatRoom({
    creator,
    user_ids,
    type,
  });

  const room_info = await res.data.room_info[0];
  const avatar = room_info.avatar
    ? createFileUrl(room_info.avatar)
    : room_info.avatar;
  const users = room_info.users.map((user) => {
    return { ...user, avatar: createFileUrl(user.avatar) };
  });
  const new_room_info = {
    ...room_info,
    last_message: [],
    unread: [],
    avatar: avatar,
    users: users,
  };

  return new_room_info;
};
