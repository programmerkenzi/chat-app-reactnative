/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-02 16:34:11
 * @LastEditTime: 2021-07-27 17:56:17
 * @LastEditors: Kenzi
 */

import { createSelector } from "reselect";

const selectChat = (state) => state.main.chat;

export const selectConversations = createSelector(
  [selectChat],
  (chat) => chat.conversations
);

export const selectFriendList = createSelector(
  [selectChat],
  (chat) => chat.friendList
);

export const selectUserInfo = createSelector(
  [selectChat],
  (chat) => chat.userInfo
);

export const selectChatRoomList = createSelector(
  [selectChat],
  (chat) => chat.chatRoomList
);
export const selectChatUserInfo = createSelector(
  [selectChat],
  (chat) => chat.userInfo
);
export const selectChatUserId = createSelector(
  [selectChatUserInfo],
  (chat) => chat._id
);

export const selectMessagesReRenderTrigger = createSelector(
  [selectChat],
  (chat) => chat.messageReRendererTrigger
);

export const selectChatRoomListRendererTrigger = createSelector(
  [selectChat],
  (chat) => chat.chatRoomListRendererTrigger
);

export const selectSelectedMessage = createSelector(
  [selectChat],
  (chat) => chat.selectedMessage
);

export const selectSelectedForwardMessage = createSelector(
  [selectChat],
  (chat) => chat.selectedForwardMessage
);
