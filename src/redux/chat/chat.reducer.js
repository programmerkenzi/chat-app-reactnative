/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:33:48
 * @LastEditTime: 2021-07-28 10:29:55
 * @LastEditors: Kenzi
 */
import chatActionType from "./chat.type";
import authActionType from "./../auth/auth.type";
import wsActionType from "./../ws/ws.type";
import networkActionTypes from "./../network/network.type";

const initialState = {
  chatRoomList: {},
  conversations: {},
  friendList: [],
  error: null,
  websocketClientId: null,
  messageReRendererTrigger: false,
  chatRoomListRendererTrigger: false,
  selectedMessage: [],
  selectedForwardMessage: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatActionType.GET_MY_FRIEND_SUCCESS:
    case chatActionType.UPDATE_FRIEND_LIST:
      return {
        ...state,
        friendList: action.payload,
      };

    case chatActionType.INITIALIZE_CHAT_ROOM_SUCCESS:
      return {
        ...state,
        chatRoomList: {
          ...state.chatRoomList,
          [action.payload.room_id]: action.payload.new_room_info,
        },
      };

    case chatActionType.GET_CHAT_ROOM_SUCCESS:
      return {
        ...state,
        chatRoomList: { ...state.chatRoomList, ...action.payload },
      };
    case chatActionType.UPDATE_CHAT_ROOM_STATE_SUCCESS:
      const { new_room_info } = action.payload;
      return {
        ...state,
        chatRoomList: {
          ...state.chatRoomList,
          [action.payload.room_id]: new_room_info,
        },
      };
    case chatActionType.UPDATE_CONVERSATION:
    case chatActionType.GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.payload.room_id]: action.payload.new_conversation,
        },
      };

    case chatActionType.UPDATE_SELECTED_MESSAGE:
      let newSelectedMessage = [...state.selectedMessage];
      const isExist = newSelectedMessage.findIndex(
        (message_id) => message_id === action.payload
      );
      if (isExist === -1) {
        newSelectedMessage.push(action.payload);
      } else {
        newSelectedMessage.splice(isExist, 1);
      }
      return {
        ...state,
        selectedMessage: newSelectedMessage,
      };

    case chatActionType.SAVE_SELECTED_FORWARD_MESSAGE:
      return {
        ...state,
        selectedForwardMessage: action.payload,
      };

    case chatActionType.REMOVE_SELECTED_FORWARD_MESSAGE:
      let oldSelectedForwardMessage = [...state.selectedForwardMessage];
      const indexOfDeleteMessage = oldSelectedForwardMessage.findIndex(
        (msg) => msg._id === action.payload._id
      );
      oldSelectedForwardMessage.splice(indexOfDeleteMessage, 1);
      return {
        ...state,
        selectedForwardMessage: oldSelectedForwardMessage,
      };

    case chatActionType.CLEAR_SELECTED_FORWARD_MESSAGE:
      return {
        ...state,
        selectedForwardMessage: [],
      };

    case chatActionType.CLEAR_SELECTED_MESSAGE:
      return {
        ...state,
        selectedMessage: [],
      };

    case authActionType.LOGOUT_SUCCESS:
    case authActionType.LOGOUT_FAILURE:
    case authActionType.REFRESH_TOKEN_FAILURE:
    case wsActionType.SOCKET_IO_DISCONNECTED:
    case networkActionTypes.NETWORK_DISCONNECTED:
      return {
        ...state,
        chatRoomList: {},
        conversations: {},
        contactList: [],
        error: null,
        selectedMessage: [],
      };

    case chatActionType.LOGIN_CHAT_SERVER_FAILURE:
    case chatActionType.GET_MY_CONTACT_FAILURE:
    case chatActionType.INITIALIZE_CHAT_ROOM_FAILURE:
    case chatActionType.GET_CHAT_ROOM_FAILURE:
    case chatActionType.UPDATE_CHAT_ROOM_LIST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
