/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:34:19
 * @LastEditTime: 2021-07-21 12:28:57
 * @LastEditors: Kenzi
 */

const chatActionType = {
  LOGIN_CHAT_SERVER_START: "LOGIN_CHAT_SERVER_START",
  LOGIN_CHAT_SERVER_SUCCESS: "LOGIN_CHAT_SERVER_SUCCESS",
  LOGIN_CHAT_SERVER_FAILURE: "LOGIN_CHAT_SERVER_FAILURE",
  GOT_NEW_MESSAGE: "GOT_NEW_MESSAGE",
  GET_MY_FRIEND_START: "GET_MY_FRIEND_START",
  GET_MY_FRIEND_SUCCESS: "GET_MY_FRIEND_SUCCESS",
  GET_MY_FRIEND_FAILURE: "GET_MY_FRIEND_FAILURE",
  GET_CONVERSATION_START: "GET_CONVERSATION_START",
  GET_CONVERSATION_SUCCESS: "GET_CONVERSATION_SUCCESS",
  GET_CONVERSATION_FAILURE: "GET_CONVERSATION_FAILURE",
  INITIALIZE_CHAT_ROOM_START: "INITIALIZE_CHAT_ROOM_START",
  INITIALIZE_CHAT_ROOM_SUCCESS: "INITIALIZE_CHAT_ROOM_SUCCESS",
  INITIALIZE_CHAT_ROOM_FAILURE: "INITIALIZE_CHAT_ROOM_FAILURE",
  GET_CHAT_ROOM_START: "GET_CHAT_ROOM_START",
  GET_CHAT_ROOM_SUCCESS: "GET_CHAT_ROOM_SUCCESS",
  GET_CHAT_ROOM_FAILURE: "GET_CHAT_ROOM_FAILURE",
  SOCKET_IO_CONNECTED: "SOCKET_IO_CONNECTED",
  SOCKET_IO_DISCONNECTED: "SOCKET_IO_DISCONNECTED",
  MESSAGES_RE_RENDER_TRIGGER: "MESSAGES_RE_RENDER_TRIGGER",
  RECIPIENT_MARK_READ: "RECIPIENT_MARK_READ",
  UPDATE_CHAT_ROOM_STATE_START: "UPDATE_CHAT_ROOM_STATE_START",
  UPDATE_CHAT_ROOM_STATE_SUCCESS: "UPDATE_CHAT_ROOM_STATE_SUCCESS",
  UPDATE_CHAT_ROOM_STATE_FAILURE: "UPDATE_CHAT_ROOM_STATE_FAILURE",
  UPDATE_CONVERSATION: "UPDATE_CONVERSATION",
  UPDATE_SELECTED_MESSAGE: "UPDATE_SELECTED_MESSAGE",
  CLEAR_SELECTED_MESSAGE: "CLEAR_SELECTED_MESSAGE",
  DELETE_CONVERSATION: "DELETE_CONVERSATION",
  PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
  ADD_FRIEND: "ADD_FRIEND",
  REMOVE_FRIEND: "REMOVE_FRIEND",
  UPDATE_FRIEND_LIST: "UPDATE_FRIEND_LIST",
};

export default chatActionType;
