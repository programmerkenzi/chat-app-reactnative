/*
 * @Description: 聊天列表屏幕
 * @Author: Lewis
 * @Date: 2021-01-19 10:32:35
 * @LastEditTime: 2021-07-22 16:06:11
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import ChatHistoryPage from "../../pages/chat/ChatHistory/index";
import ChatMessagePage from "../../pages/chat/ChatMessage/index";
import NewFriendPage from "../../pages/chat/NewFriend/index";
import SelectMembersPage from "../../pages/chat/SelectMembers/index";
import EditGroupInfoPage from "../../pages/chat/EditGroupInfo/index";
import UserInfoPage from "./../../pages/chat/UserInfo/index";
import GroupInfoPage from "./../../pages/chat/GroupInfo/index";
import {
  HeaderOptionsWithRightButton,
  TransparentHeaderOptions,
  GeneralHeaderOptions,
  TransparentHeaderOptionsWithRightButton,
  HeaderOptionsWithRightAndLeftButton,
} from "../Options";

const ChatListStack = createStackNavigator();

const ChatStackNavigation = () => {
  return (
    <ChatListStack.Navigator>
      <ChatListStack.Screen
        name="Chats"
        component={ChatHistoryPage}
        options={HeaderOptionsWithRightButton("chat.chat", "chat")}
      />
      <ChatListStack.Screen
        name="Messages"
        component={ChatMessagePage}
        options={HeaderOptionsWithRightAndLeftButton(false, "avatar", "call")}
      />

      <ChatListStack.Screen
        name="AddNewFriend"
        component={NewFriendPage}
        options={GeneralHeaderOptions("chat.af")}
      />
      <ChatListStack.Screen
        name="SelectMembers"
        component={SelectMembersPage}
        options={GeneralHeaderOptions("chat.sm")}
      />
      <ChatListStack.Screen
        name="EditGroupInfo"
        component={EditGroupInfoPage}
        options={GeneralHeaderOptions("chat.info_g")}
      />
      <ChatListStack.Screen
        name="ChatUserInfo"
        component={UserInfoPage}
        options={TransparentHeaderOptions()}
      />
      <ChatListStack.Screen
        name="GroupInfo"
        component={GroupInfoPage}
        options={TransparentHeaderOptionsWithRightButton("chatGroup")}
      />
    </ChatListStack.Navigator>
  );
};
export default ChatStackNavigation;

const styles = StyleSheet.create({});
