/*
 * @Description: 聊天组屏幕
 * @Author: Lewis
 * @Date: 2021-01-19 10:32:11
 * @LastEditTime: 2021-04-19 13:31:37
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import GroupChatPage from "../../pages/chat/GroupChat/index";
import { GeneralHeaderOptions } from "../Options";

const ChatGroupStack = createStackNavigator();

const GroupStackNavigator = () => {
  return (
    <ChatGroupStack.Navigator>
      <ChatGroupStack.Screen
        name="Groups"
        component={GroupChatPage}
        options={() => GeneralHeaderOptions("chat.groups")}
      />
    </ChatGroupStack.Navigator>
  );
};

export default GroupStackNavigator;

const styles = StyleSheet.create({});
