/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:33:41
 * @LastEditTime: 2021-08-06 16:47:00
 * @LastEditors: Kenzi
 */

import chatActionType from "./chat.type";

export const gotNewMessages = (message) => ({
  type: chatActionType.GOT_NEW_MESSAGE,
  payload: message,
});

/**
 *
 * @param {Array} new_conversation 該房間更新後的對話
 * @param {String} room_id 房間id
 * @returns
 */
export const updateConversation = (new_conversation, room_id) => ({
  type: chatActionType.UPDATE_CONVERSATION,
  payload: { new_conversation, room_id },
});

export const getMyFriendStart = () => ({
  type: chatActionType.GET_MY_FRIEND_START,
});
export const getMyFriendSuccess = (users) => ({
  type: chatActionType.GET_MY_FRIEND_SUCCESS,
  payload: users,
});
export const getMyFriendFailure = (error) => ({
  type: chatActionType.GET_MY_FRIEND_FAILURE,
  payload: error,
});

export const getConversationStart = (room_id) => ({
  type: chatActionType.GET_CONVERSATION_START,
  payload: room_id,
});

/**
 *
 * @param {Array} new_conversation 該房間更新後的對話
 * @param {String} room_id 房間id
 * @returns
 */
export const getConversationSuccess = (new_conversation, room_id) => ({
  type: chatActionType.GET_CONVERSATION_SUCCESS,
  payload: { new_conversation, room_id },
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
 * @param {Object} new_room_info 新的房間信息
 * @param {String} room_id 房間id
 * @returns
 */
export const updateChatRoomStateSuccess = (new_room_info, room_id) => ({
  type: chatActionType.UPDATE_CHAT_ROOM_STATE_SUCCESS,
  payload: { new_room_info, room_id },
});
export const updateChatRoomStateFailure = (error) => ({
  type: chatActionType.UPDATE_CHAT_ROOM_STATE_FAILURE,
  payload: error,
});

/**
 *@param {Array} user_ids  房间里的用户ids
 * @param {String} type 房间类型: group 或 private
 */

export const initializeChatRoomStart = (
  navigation,
  user_ids,
  type,
  groupName,
  description,
  imageUri
) => ({
  type: chatActionType.INITIALIZE_CHAT_ROOM_START,
  payload: {
    navigation: navigation,
    user_ids: user_ids,
    type: type,
    name: groupName,
    description: description,
    avatar: imageUri,
  },
});

/**
 *
 * @param {Array} new_room_info 新房間的資訊
 * @param {String} room_id 房間id
 * @returns
 */
export const initializeChatRoomSuccess = (new_room_info, room_id) => ({
  type: chatActionType.INITIALIZE_CHAT_ROOM_SUCCESS,
  payload: {
    new_room_info,
    room_id,
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

export const onUpdateSelectedMessage = (message) => ({
  type: chatActionType.UPDATE_SELECTED_MESSAGE,
  payload: message,
});
export const onClearSelectedMessage = () => ({
  type: chatActionType.CLEAR_SELECTED_MESSAGE,
});

export const onSaveSelectedForwardMessage = (messages) => ({
  type: chatActionType.SAVE_SELECTED_FORWARD_MESSAGE,
  payload: messages,
});
export const onRemoveSelectedForwardMessage = (message) => ({
  type: chatActionType.REMOVE_SELECTED_FORWARD_MESSAGE,
  payload: message,
});
export const onClearSelectedForwardMessage = () => ({
  type: chatActionType.CLEAR_SELECTED_FORWARD_MESSAGE,
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

export const onPushNotification = (room_info) => ({
  type: chatActionType.PUSH_NOTIFICATION,
  payload: room_info,
});

export const onAddFriend = (friend_info) => ({
  type: chatActionType.ADD_FRIEND,
  payload: friend_info,
});

export const onUpdateFriendList = (new_friend_list) => ({
  type: chatActionType.UPDATE_FRIEND_LIST,
  payload: new_friend_list,
});

export const onPinnedMessage = (chat_room_id, message_id) => ({
  type: chatActionType.PINNED_MESSAGE,
  payload: {
    type: "pinned",
    chat_room_id: chat_room_id,
    message_id: message_id,
  },
});
export const onUnpinnedMessage = (chat_room_id, message_id) => ({
  type: chatActionType.UNPINNED_MESSAGE,
  payload: {
    type: "unpinned",
    chat_room_id: chat_room_id,
    message_id: message_id,
  },
});
