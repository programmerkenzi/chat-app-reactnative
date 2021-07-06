/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-21 14:34:35
 * @LastEditTime: 2021-07-07 12:20:13
 * @LastEditors: Kenzi
 */

import { store } from "../store";
import { fetchConversationsByRoomId } from "./../../chat_api/chat";
import { fetchChatRoom } from "./../../chat_api/chat";

//讯息array
export const createGiftChatData = async (data) => {
  let messages = [];

  const state = store.getState();
  const userInfo = state.chat.userInfo;
  await data.forEach((item) => {
    const { _id, createdAt, message, type, user, read_by_recipients, file } =
      item;
    const postedByUser = user[0]._id;
    const currentUser = userInfo._id;
    const isRead = read_by_recipients.findIndex(
      (user) => user.read_by_user_id !== currentUser
    );
    const { name, avatar } = user[0];
    //gift chat用的obj
    let msg = {
      _id: _id,
      text: message,
      createdAt: createdAt,
      file: [],
      user: {
        _id: postedByUser,
        name: name,
        avatar: avatar,
      },
      received: isRead === -1 ? false : true,
    };
    if (file.length > 0) {
      file.forEach((item) => {
        const mime_type = item.mime_type;

        const baseURL = __DEV__
          ? process.env.REACT_APP_API_URL_DEVELOPMENT
          : process.env.REACT_APP_API_URL_PRODUCTION;
        msg.file.push({
          name: item.name,
          url:
            baseURL +
            "/fs/download/" +
            item.filename +
            "/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOGRmY2UyZTRmNGYzNDE3YWI3YTY5ZjY2MjQwMGY3N2YiLCJpYXQiOjE2MjQ0MTc0NTF9.m71cj9brGgfGnIaPnCHNenndYOcGWlH_09DBIUJ7zWo",
          mime_type: mime_type,
        });
      });
    }

    messages.push(msg);
  });

  return messages;
};

//更新最後訊息
/**
 *
 * @param {Array} chatRoomList redux的chatRoomList
 * @param {String} room_id 要更新的房间id
 * @param {Array} message 最新的讯息
 * @returns
 */

export const updateLastMessage = (chatRoomList, room_id, message) => {
  let newList = [...chatRoomList];
  newList.some((room, index) => {
    if (room._id === room_id) {
      newList[index].last_message = message;
      return false;
    }
  });

  return newList;
};

//標記自己房間已讀
/**
 *
 * @param {Array} chatRoomList redux的chatRoomList
 * @param {String} room_id
 * @returns
 */
export const readAll = (chatRoomList, room_id) => {
  let newList = [...chatRoomList];
  newList.some((room, index) => {
    if (room._id === room_id) {
      newList[index].unread = [];
      return false;
    }
  });
  return newList;
};

/**
 *
 * @param {Array} chatRoomList redux的chatRoomList
 * @param {String} room_id
 * @param {Array} message 最新的訊息
 * @returns
 */
//更新最後訊息與未讀訊息
export const updateUnreadAndLastMessage = (chatRoomList, room_id, message) => {
  let newList = [...chatRoomList];
  newList.some((room, index) => {
    if (room._id === room_id) {
      const old_unread = newList[index].unread;
      newList[index].unread = [...old_unread, ...message];
      newList[index].last_message = message;
      return false;
    }
  });
  return newList;
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
  let newConversations = conversations;
  newConversations[room_id].forEach((message) => {
    const wasReceived = message.received;
    if (!wasReceived) {
      message.received = true;
      message._id = message._id + "-read";
    }
  });
  return newConversations;
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
  let newList = [...chatRoomList];
  const res = await fetchChatRoom(fetchPage);
  const { success, data } = res;
  if (!success) return;
  if (!data) return [];
  const list = data.data;
  const { limit, page, pages, total } = data.meta;
  newList = [...newList, ...list];
  newList.total = total;
  newList.page = page;
  newList.pages = pages;
  return newList;
};
