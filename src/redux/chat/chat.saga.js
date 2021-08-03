/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:33:57
 * @LastEditTime: 2021-08-02 18:39:17
 * @LastEditors: Kenzi
 */

import {
  all,
  fork,
  take,
  put,
  select,
  takeLatest,
  call,
} from "redux-saga/effects";

import {
  loginChatServerSuccess,
  loginChatServerFailure,
  loginChatServerStart,
  getMyFriendSuccess,
  getMyFriendFailure,
  initializeChatRoomSuccess,
  initializeChatRoomFailure,
  getChatRoomSuccess,
  getConversationSuccess,
  updateChatRoomStateStart,
  updateChatRoomStateFailure,
  updateConversation,
  onClearSelectedMessage,
  onUpdateFriendList,
} from "./chat.actions";
import { takeEvery } from "redux-saga/effects";
import chatActionType from "./chat.type";
import authActionType from "./../auth/auth.type";
import { markReadByRoomId } from "../../chat_api/chat";
import { getChatRoomFailure } from "./chat.actions";
import { toMessagesPage } from "../../pages/chat/utils";
import { getConversationFailure } from "./chat.actions";
import {
  getChatRooms,
  getFriendList,
  handelRecipientMarkedRead,
  initRoom,
  readAll,
  updateLastMessage,
  updateUnreadAndLastMessage,
} from "./utils";
import { updateChatRoomStateSuccess } from "./chat.actions";
import { schedulePushNotification } from "../../library/utils/utils";
import { onPushNotification } from "./chat.actions";
import { getConversations } from "./utils";
import { createFileUrl } from "./../../library/utils/utils";

function* gotNewMessage({ payload }) {
  try {
    const data = yield payload.data;
    const chat_room_id = yield data[0].chat_room_id;
    const posted_by_user = yield data[0].post_by_user[0]._id;
    const chat = yield (state) => state.main.chat;
    const user = yield (state) => state.main.user;
    const { conversations } = yield select(chat);
    const { userInfo } = yield select(user);
    const conversationsSaved = yield conversations[chat_room_id];

    if (conversationsSaved) {
      const newConversations = [...data, ...conversationsSaved];
      yield put(updateConversation(newConversations, chat_room_id));
    } else {
      const newConversations = data;
      yield put(updateConversation(newConversations, chat_room_id));
    }

    //判断是否要标记已读讯息
    const router = yield (state) => state.main.router;
    const { name, params } = yield select(router);
    const currentUser = yield userInfo._id;
    const app = yield (state) => state.main.app;
    const { appState } = yield select(app);
    //在聊天室里

    if (name === "Messages" && appState !== "background") {
      const currentRoom = yield params.room_info._id;
      //在同一个聊天室里
      if (chat_room_id === currentRoom) {
        //不是自己发的讯息
        if (posted_by_user !== currentUser) {
          const res = yield markReadByRoomId(chat_room_id);
          if (res) {
            yield put(
              updateChatRoomStateStart(chat_room_id, data, "new_message_read")
            );
          }
        } else {
          yield put(
            updateChatRoomStateStart(chat_room_id, data, "new_message_read")
          );
        }
      }
      //不再聊天室里
    } else {
      yield put(
        updateChatRoomStateStart(chat_room_id, data, "new_message_unread")
      );
    }
  } catch (e) {
    console.log("e :>> ", e);
  }
}

function* onGotNewMessage() {
  yield takeEvery(chatActionType.GOT_NEW_MESSAGE, gotNewMessage);
}

function* pushNotification({ payload }) {
  const { room_id, last_message, type } = yield payload;
  const date = new Date(last_message[0].createdAt);
  const router = yield (state) => state.main.router;
  const { name, params } = yield select(router);
  const app = yield (state) => state.main.app;
  const { appState } = yield select(app);

  //在聊天室里
  if (appState === "background") {
    yield schedulePushNotification(
      last_message[0].post_by_user[0].name,
      date.toLocaleString(),
      last_message[0].message,
      "Messages",
      { room_info: payload }
    );
  } else if (params.room_info) {
    if (params.room_info._id !== room_id) {
      yield schedulePushNotification(
        last_message[0].post_by_user[0].name,
        date.toLocaleString(),
        last_message[0].message,
        "Messages",
        { room_info: payload }
      );
    }
  } else {
    if (name !== "Chats") {
      yield schedulePushNotification(
        last_message[0].post_by_user[0].name,
        date.toLocaleString(),
        last_message[0].message,
        "Messages",
        { room_info: payload }
      );
    }
  }
}

function* onHandlePushNotification() {
  while (true) {
    const payload = yield take(chatActionType.PUSH_NOTIFICATION);
    yield fork(pushNotification, payload);
  }
}

function* deleteMessage({ payload }) {
  const { room_id, message_ids, clearSelected } = payload;
  try {
    const chat = yield (state) => state.main.chat;

    const { conversations } = yield select(chat);
    let newConversations = conversations;

    if (newConversations[room_id]) {
      let theRoomNewConversations = [...newConversations[room_id]];

      message_ids.forEach((message_id) => {
        const isTheMessage = theRoomNewConversations.findIndex(
          (conversation) => conversation._id === message_id
        );

        if (isTheMessage !== -1) {
          theRoomNewConversations.splice(isTheMessage, 1);
        }
      });

      newConversations[room_id] = theRoomNewConversations;
      const messageLength = newConversations[room_id].length;
      //排序是倒序所以最后讯息都是第0个
      const lastMessage =
        messageLength > 0 ? [newConversations[room_id][0]] : [];

      yield put(
        updateChatRoomStateStart(room_id, lastMessage, "new_message_read")
      );
      yield put(updateConversation(newConversations));
      if (clearSelected) {
        yield put(onClearSelectedMessage());
      }
    }
  } catch (error) {
    throw error;
  }
}

function* onDeleteMessage() {
  yield takeEvery(chatActionType.DELETE_CONVERSATION, deleteMessage);
}

function* updateChatRoomState({ payload }) {
  try {
    const { room_id, last_message, type } = yield payload;
    const chat = yield (state) => state.main.chat;

    const { chatRoomList } = yield select(chat);
    let newChatRoomList = null;
    if (type === "mark_read") {
      newChatRoomList = yield readAll(chatRoomList, room_id);
    } else if (type === "new_message_read") {
      newChatRoomList = yield updateLastMessage(
        chatRoomList,
        room_id,
        last_message
      );
    } else if (type === "new_message_unread") {
      newChatRoomList = yield updateUnreadAndLastMessage(
        chatRoomList,
        room_id,
        last_message
      );
      yield put(onPushNotification(payload));
    }

    yield put(updateChatRoomStateSuccess(newChatRoomList, room_id));
  } catch (error) {
    yield put(updateChatRoomStateFailure(error));
  }
}

function* onUpdateChatRoomState() {
  yield takeEvery(
    chatActionType.UPDATE_CHAT_ROOM_STATE_START,
    updateChatRoomState
  );
}

function* loginChatServer() {
  const auth = yield (state) => state.secure.auth;
  const { userToken } = yield select(auth);
  const ws = yield (state) => state.main.ws;
  const { clientId } = yield select(ws);
  if (userToken && clientId) {
    try {
      const res = yield loginChatServerApi({ client_id: clientId });
      if (res) {
        yield put(loginChatServerSuccess());
      }
    } catch (error) {
      yield put(loginChatServerFailure(error));
    }
  }
}

//联络人
function* getUserFriendList() {
  try {
    const list = yield getFriendList();
    yield put(getMyFriendSuccess(list));
  } catch (error) {
    yield put(getMyFriendFailure(error));
  }
}

function* onGetUserFriendList() {
  yield takeLatest(chatActionType.GET_MY_FRIEND_START, getUserFriendList);
}

//房间初始化
function* initChatRoom({ payload }) {
  const user = (state) => state.main.user;
  const { userInfo } = yield select(user);
  const { navigation, user_ids, type } = payload;
  let room_user_ids = user_ids;
  try {
    // insert current user id
    yield room_user_ids.push(userInfo._id);
    const newRoomInfo = yield initRoom(userInfo._id, room_user_ids, type);
    if (newRoomInfo) {
      yield put(initializeChatRoomSuccess(newRoomInfo, newRoomInfo._id));
    }
    yield toMessagesPage(navigation, { room_info: newRoomInfo });
  } catch (error) {
    yield put(initializeChatRoomFailure(error));
  }
}

function* onInitChatRoom() {
  yield takeLatest(chatActionType.INITIALIZE_CHAT_ROOM_START, initChatRoom);
}

//房间
function* getChatRoom() {
  try {
    const chat = (state) => state.main.chat;
    const { chatRoomList } = yield select(chat);
    const { page, pages, total } = chatRoomList;
    if (pages) {
      if (page < pages) {
        const newChatRoomList = yield getChatRooms(page, chatRoomList);
        yield put(getChatRoomSuccess(newChatRoomList));
      }
    } else {
      const newChatRoomList = yield getChatRooms(0, chatRoomList);
      yield put(getChatRoomSuccess(newChatRoomList));
    }
  } catch (error) {
    yield put(getChatRoomFailure(error));
  }
}

function* onGetChatRoom() {
  while (true) {
    const actionTypes = yield take([
      authActionType.LOGIN_SUCCESS,
      chatActionType.GET_CHAT_ROOM_START,
    ]);
    const action = yield call(getChatRoom);
  }
}

//聊天记录
function* getConversation({ payload }) {
  try {
    const chat = yield (state) => state.main.chat;
    const { conversations } = yield select(chat);
    const conversationsSaved = conversations[payload];
    if (conversationsSaved) {
      const { page, pages, total } = conversationsSaved;
      if (pages) {
        if (page < pages) {
          const newConversations = yield getConversations(
            payload,
            page,
            conversationsSaved
          );
          yield put(getConversationSuccess(newConversations, payload));
        }
      } else {
        const newConversations = yield getConversations(payload, 0, []);
        yield put(getConversationSuccess(newConversations, payload));
      }
    } else {
      const newConversations = yield getConversations(payload, 0, []);
      yield put(getConversationSuccess(newConversations, payload));
    }
  } catch (error) {
    getConversationFailure(error);
  }
}

function* onGetConversation() {
  yield takeLatest(chatActionType.GET_CONVERSATION_START, getConversation);
}

function* recipientMarkRead({ payload }) {
  const { room_id, read_by_user } = payload;
  const chat = yield (state) => state.main.chat;
  const { conversations } = yield select(chat);
  try {
    const newConversations = yield handelRecipientMarkedRead(
      conversations,
      room_id,
      read_by_user
    );

    yield put(updateConversation(newConversations, room_id));
  } catch (error) {
    console.log("error :>> ", error);
  }
}

function* onHandleRecipientMarkRead() {
  yield takeLatest(chatActionType.RECIPIENT_MARK_READ, recipientMarkRead);
}

function* onLoginChatServer() {
  yield put(loginChatServerStart());
  yield fork(loginChatServer);
}

function* onGotWsClientId() {
  while (true) {
    yield take([authActionType.LOGIN_SUCCESS]);
    // const task = yield fork(onLoginChatServer);
  }
}

//好友
function* addFriend({ payload }) {
  const chat = (state) => state.main.chat;
  const { friendList } = yield select(chat);
  const friend_info = payload;
  (friend_info.avatar =
    friend_info.avatar.length > 0
      ? createFileUrl(friend_info.avatar)
      : friend_info.avatar),
    yield put(onUpdateFriendList([...friendList, friend_info]));
}

function* onAddFriend() {
  yield takeLatest(chatActionType.ADD_FRIEND, addFriend);
}

export default function* chatSagas() {
  yield all([
    fork(onGotNewMessage),
    fork(onGetUserFriendList),
    fork(onInitChatRoom),
    fork(onGetChatRoom),
    fork(onGetConversation),
    fork(onUpdateChatRoomState),
    fork(onHandleRecipientMarkRead),
    fork(onDeleteMessage),
    fork(onHandlePushNotification),
    fork(onAddFriend),
  ]);
}
