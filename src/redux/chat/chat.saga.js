/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:33:57
 * @LastEditTime: 2021-07-09 18:04:55
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
  getMyContactSuccess,
  getMyContactFailure,
  initializeChatRoomSuccess,
  initializeChatRoomFailure,
  getChatRoomSuccess,
  getConversationSuccess,
  updateChatRoomStateStart,
  updateChatRoomStateFailure,
  updateConversation,
  onClearSelectedMessage,
} from "./chat.actions";
import { takeEvery } from "redux-saga/effects";
import chatActionType from "./chat.type";
import authActionType from "./../auth/auth.type";
import {
  fetchConversationsByRoomId,
  fetchMyContact,
  initializeChatRoom,
  markReadByRoomId,
} from "../../chat_api/chat";
import { getChatRoomFailure } from "./chat.actions";
import { toMessagesPage } from "../../pages/chat/utils";
import { getConversationFailure } from "./chat.actions";
import {
  getChatRooms,
  handelRecipientMarkedRead,
  readAll,
  updateLastMessage,
  updateUnreadAndLastMessage,
} from "./utils";
import { updateChatRoomStateSuccess } from "./chat.actions";
import { schedulePushNotification } from "../../library/utils/utils";

function* gotNewMessage({ payload }) {
  console.log("gotNewMessage payload:>> ", payload);
  const data = payload.data;
  console.log("gotNewMessage data :>> ", data);
  const chat_room_id = yield data[0].chat_room_id;
  const posted_by_user = yield data[0].user[0]._id;
  const chat = yield (state) => state.chat;
  const auth = yield (state) => state.auth;
  const { conversations } = yield select(chat);
  const { userInfo } = yield select(auth);
  let newConversations = yield conversations;
  const conversationsSaved = yield conversations[chat_room_id];

  if (conversationsSaved) {
    yield (newConversations[chat_room_id] = [...data, ...conversationsSaved]);
  } else {
    yield (newConversations[chat_room_id] = data);
  }
  yield put(updateConversation(newConversations));

  //判断是否要标记已读讯息
  const router = yield (state) => state.router;
  const { name, params } = yield select(router);
  0;

  const currentUser = yield userInfo._id;
  //在聊天室里
  if (name === "Messages") {
    const currentRoom = yield params.room_info._id;
    //在同一个聊天室里
    if (chat_room_id === currentRoom) {
      //不是自己发的讯息
      if (posted_by_user !== currentUser) {
        const res = yield markReadByRoomId(chat_room_id);
        const { success } = res;
        if (success) {
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

  //推拨

  if (posted_by_user !== userInfo._id) {
    //先确认目前的router
    console.log(" saga push :>> ");
    console.log("data[0].user[0] :>> ", data[0].user[0]);
    const date = new Date(data[0].createdAt);
    const chat = yield (state) => state.chat;
    const { chatRoomList } = yield select(chat);
    const room_info = chatRoomList.filter((room) => room._id === chat_room_id);
    console.log("room_info :>> ", room_info);
    if (name !== "Messages") {
      yield schedulePushNotification(
        data[0].user[0].name,
        date.toLocaleString(),
        data[0].message,
        "Messages",
        { room_info: room_info[0] }
      );
    }
  }
}

function* onGotNewMessage() {
  yield takeEvery(chatActionType.GOT_NEW_MESSAGE, gotNewMessage);
}

function* deleteMessage({ payload }) {
  const { room_id, message_ids, clearSelected } = payload;
  console.log("payload :>> ", payload);
  try {
    const chat = yield (state) => state.chat;

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
    const { room_id, last_message, type } = payload;
    const chat = yield (state) => state.chat;

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
    }

    yield put(updateChatRoomStateSuccess(newChatRoomList));
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
  const auth = yield (state) => state.auth;
  const { userToken } = yield select(auth);
  const ws = yield (state) => state.ws;
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
function* getUserContactList() {
  try {
    const res = yield fetchMyContact();
    if (res) {
      const data = res.data;
      yield put(getMyContactSuccess(data));
    }
  } catch (error) {
    yield put(getMyContactFailure(error));
  }
}

function* onGetUserContactList() {
  yield takeLatest(chatActionType.GET_MY_CONTACT_START, getUserContactList);
}

//房间初始化
function* initChatRoom({ payload }) {
  const auth = (state) => state.auth;
  const { userInfo } = yield select(auth);
  const { navigation, user_ids, type } = payload;
  let room_user_ids = user_ids;
  try {
    // insert current user id
    yield room_user_ids.push(userInfo._id);
    const res = yield initializeChatRoom({
      creator: userInfo._id,
      user_ids: room_user_ids,
      type: type,
    });
    console.log("room_user_ids :>> ", room_user_ids);
    const { is_new, chat_room_id, room_info } = yield res.data;
    const chat = yield (state) => state.chat;
    const { chatRoomList } = yield select(chat);
    let newChatRoomList = [...chatRoomList];
    if (res.success) {
      if (is_new) {
        console.log("is_new :>> ", is_new);
        let newRoomInfo = room_info[0];
        newRoomInfo.last_message = [];
        newRoomInfo.unread = [];
        newChatRoomList.push(newRoomInfo);
      } else {
        newChatRoomList.push(room_info[0]);
      }
      yield put(initializeChatRoomSuccess(is_new, newChatRoomList));
      yield toMessagesPage(navigation, room_info[0]);
    }
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
    const chat = (state) => state.chat;
    const { chatRoomList } = yield select(chat);
    const { page, pages, total } = chatRoomList;
    let newChatRoomList = null;
    if (pages) {
      if (page < pages) {
        newChatRoomList = yield getChatRooms(page, chatRoomList);
      }
    } else {
      newChatRoomList = yield getChatRooms(0, chatRoomList);
    }
    if (newChatRoomList) {
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
    const chat = yield (state) => state.chat;
    const { conversations } = yield select(chat);
    let newConversations = conversations;
    const conversationsSaved = conversations[payload];

    if (conversationsSaved) {
      const { page, pages, total } = conversationsSaved;
      if (pages) {
        if (page < pages) {
          const res = yield fetchConversationsByRoomId(payload, page);
          const { data, meta } = yield res.data;
          const currentPage = yield meta.page;
          (newConversations[payload] = [...conversationsSaved, ...data]),
            (newConversations[payload].page = currentPage);
          newConversations[payload].total = meta.total;
          newConversations[payload].pages = meta.pages;
          yield put(getConversationSuccess(newConversations));
        }
      } else {
        const res = yield fetchConversationsByRoomId(payload, 0);
        const { data, meta } = yield res.data;
        const { limit, page, pages, total } = yield meta;
        newConversations[payload] = data;
        newConversations[payload].total = total;
        newConversations[payload].pages = pages;
        newConversations[payload].page = page;
        yield put(getConversationSuccess(newConversations));
      }
    } else {
      const res = yield fetchConversationsByRoomId(payload, 0);
      const { data, meta } = yield res.data;
      const { limit, page, pages, total } = yield meta;
      newConversations[payload] = data;
      newConversations[payload].total = total;
      newConversations[payload].pages = pages;
      newConversations[payload].page = page;
      yield put(getConversationSuccess(newConversations));
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
  const chat = yield (state) => state.chat;
  const { conversations } = yield select(chat);
  try {
    const newConversations = yield handelRecipientMarkedRead(
      conversations,
      room_id,
      read_by_user
    );

    yield put(updateConversation(newConversations));
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

export default function* chatSagas() {
  yield all([
    fork(onGotNewMessage),
    fork(onGetUserContactList),
    fork(onInitChatRoom),
    fork(onGetChatRoom),
    fork(onGetConversation),
    fork(onUpdateChatRoomState),
    fork(onHandleRecipientMarkRead),
    fork(onDeleteMessage),
  ]);
}
