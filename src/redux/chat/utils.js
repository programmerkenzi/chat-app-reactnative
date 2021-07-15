/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-21 14:34:35
 * @LastEditTime: 2021-07-14 12:43:31
 * @LastEditors: Kenzi
 */

import { createFileUrl } from "../../library/utils/utils";
import { store } from "../store";
import { fetchConversationsByRoomId } from "./../../chat_api/chat";
import { fetchChatRoom } from "./../../chat_api/chat";
import produce from "immer";
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
  console.log("new_room_info :>> ", new_room_info);
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
 * @param {Number} fetchPage 要fetch第幾頁
 * @param {Array} conversations redux的conversations
 * @param {String} room_id
 */

export const getConversations = async (fetchPage, conversations, room_id) => {
  let newConversations = conversations;
  const conversationsSaved = conversations[payload];

  const res = await fetchConversationsByRoomId(room_id, fetchPage);
  const { data, meta } = await res.data;
  const messages = await createGiftChatData(data);

  const { limit, page, pages, total } = await meta;
  newConversations[payload] = [...conversationsSaved, ...messages];
  newConversations[room_id].total = total;
  newConversations[room_id].pages = pages;
  newConversations[room_id].page = page;
  return newConversations;
};

/**
 *
 * @param {Number} fetchPage 要fetch第幾頁
 * @param {*} chatRoomList  redux的chatRoomList
 */

export const getChatRooms = async (fetchPage, chatRoomList) => {
  const res = await fetchChatRoom(fetchPage);
  const { success, data } = res;
  const newList = {};
  if (!success) return;
  if (!data) return {};
  const list = data.data;
  list.forEach((room) => {
    const room_id = room._id;
    newList[room_id] = room;
  });
  const { limit, page, pages, total } = data.meta;
  newList.total = total;
  newList.page = page;
  newList.pages = pages;
  return newList;
};
