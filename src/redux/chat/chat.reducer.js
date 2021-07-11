/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:33:48
 * @LastEditTime: 2021-07-09 14:55:47
 * @LastEditors: Kenzi
 */
import chatActionType from "./chat.type";
import { RecipientMarkedRead } from "./utils";

const initialState = {
  chatRoomList: [],
  conversations: [],
  contactList: [],
  error: null,
  websocketClientId: null,
  messageReRendererTrigger: false,
  chatRoomListRendererTrigger: false,
  selectedMessage: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case chatActionType.GET_MY_CONTACT_SUCCESS:
      return {
        ...state,
        contactList: action.payload,
      };

    case chatActionType.INITIALIZE_CHAT_ROOM_SUCCESS:
      return {
        ...state,
        chatRoomList: action.payload.chatRoomList,
      };

    case chatActionType.GET_CHAT_ROOM_SUCCESS:
    case chatActionType.UPDATE_CHAT_ROOM_STATE_SUCCESS:
      return {
        ...state,
        chatRoomList: action.payload,
        chatRoomListRendererTrigger: !state.chatRoomListRendererTrigger,
      };
    case chatActionType.GET_CONVERSATION_SUCCESS:
    case chatActionType.UPDATE_CONVERSATION:
      return {
        ...state,
        conversations: action.payload,
        messageReRendererTrigger: !state.messageReRendererTrigger,
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

    case chatActionType.CLEAR_SELECTED_MESSAGE:
      return {
        ...state,
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
