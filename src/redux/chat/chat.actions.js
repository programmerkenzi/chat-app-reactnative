/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:33:41
 * @LastEditTime: 2021-07-06 16:43:54
 * @LastEditors: Kenzi
 */

import chatActionType from "./chat.type";

export const gotNewMessages = (message) => ({
  type: chatActionType.GOT_NEW_MESSAGE,
  payload: message,
});

export const updateConversation = (message) => ({
  type: chatActionType.UPDATE_CONVERSATION,
  payload: message,
});

export const getMyContactStart = () => ({
  type: chatActionType.GET_MY_CONTACT_START,
});
export const getMyContactSuccess = (users) => ({
  type: chatActionType.GET_MY_CONTACT_SUCCESS,
  payload: users,
});
export const getMyContactFailure = (error) => ({
  type: chatActionType.GET_MY_CONTACT_FAILURE,
  payload: error,
});

export const getConversationStart = (room_id) => ({
  type: chatActionType.GET_CONVERSATION_START,
  payload: room_id,
});
export const getConversationSuccess = (conversation) => ({
  type: chatActionType.GET_CONVERSATION_SUCCESS,
  payload: conversation,
});
export const getConversationFailure = (error) => ({
  type: chatActionType.GET_CONVERSATION_FAILURE,
  payload: error,
});

/**
 *
 * @param {String} room_id 更新state的房間id
 * @param {Array} last_message 最新的訊息
 * @param {String} type 更新類型-mark_read || new_message_read || new_message_unread
 * @returns
 */

export const updateChatRoomStateStart = (room_id, last_message, type) => ({
  type: chatActionType.UPDATE_CHAT_ROOM_STATE_START,
  payload: { room_id, last_message, type },
});

/**
 *
 * @param {Array} newChatRoomList 更新後的房間列表
 * @returns
 */
export const updateChatRoomStateSuccess = (newChatRoomList) => ({
  type: chatActionType.UPDATE_CHAT_ROOM_STATE_SUCCESS,
  payload: newChatRoomList,
});
export const updateChatRoomStateFailure = (error) => ({
  type: chatActionType.UPDATE_CHAT_ROOM_STATE_FAILURE,
  payload: error,
});

/**
 *@param {Array} user_ids  房间里的用户ids
 * @param {String} type 房间类型: group 或 private
 */

export const initializeChatRoomStart = (navigation, user_ids, type) => ({
  type: chatActionType.INITIALIZE_CHAT_ROOM_START,
  payload: { navigation: navigation, user_ids: user_ids, type },
});

/**
 *
 * @param {Boolean} is_new  the room is new or not
 * @param {Array} conversation new conversation list
 * @param {Array} chatRoomList new chat room list
 * @returns
 */
export const initializeChatRoomSuccess = (is_new, chatRoomList) => ({
  type: chatActionType.INITIALIZE_CHAT_ROOM_SUCCESS,
  payload: {
    is_new: is_new,
    chatRoomList: chatRoomList,
  },
});
export const initializeChatRoomFailure = (error) => ({
  type: chatActionType.INITIALIZE_CHAT_ROOM_FAILURE,
  payload: error,
});

export const getChatRoomStart = () => ({
  type: chatActionType.GET_CHAT_ROOM_START,
});

/**
 * @param {String} room_list 房间列表
 */
export const getChatRoomSuccess = (room_list) => ({
  type: chatActionType.GET_CHAT_ROOM_SUCCESS,
  payload: room_list,
});
export const getChatRoomFailure = (error) => ({
  type: chatActionType.GET_CHAT_ROOM_FAILURE,
  payload: error,
});

export const messageRenderTrigger = () => ({
  type: chatActionType.MESSAGES_RE_RENDER_TRIGGER,
});
export const onRecipientMarkRead = (room_id) => ({
  type: chatActionType.RECIPIENT_MARK_READ,
  payload: room_id,
});

export const onUpdateSelectedMessage = (message_id) => ({
  type: chatActionType.UPDATE_SELECTED_MESSAGE,
  payload: message_id,
});
export const onClearSelectedMessage = () => ({
  type: chatActionType.CLEAR_SELECTED_MESSAGE,
});

/**
 *
 * @param {String} room_id 房間id
 * @param {Array} message_ids 已經刪除的訊息id
 * @returns
 */
export const onDeleteConversation = (
  room_id,
  message_ids,
  clearSelected = false
) => ({
  type: chatActionType.DELETE_CONVERSATION,
  payload: {
    room_id: room_id,
    message_ids: message_ids,
    clearSelected: clearSelected,
  },
});
