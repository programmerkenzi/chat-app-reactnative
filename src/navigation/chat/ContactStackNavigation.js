/*
 * @Description:
 * @Author: Lewis
 * @Date: 2021-01-19 10:32:56
 * @LastEditTime: 2021-07-21 16:28:44
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  GeneralHeaderOptions,
  HeaderOptionsWithRightButton,
} from "./../Options/index";
import FriendsPage from "./../../pages/chat/Friends/index";
const ChatOnlineStack = createStackNavigator();

const ContactStackNavigation = () => {
  return (
    <ChatOnlineStack.Navigator>
      <ChatOnlineStack.Screen
        name="Friends"
        component={FriendsPage}
        options={HeaderOptionsWithRightButton("chat.friends", "addNewFriend")}
      />
    </ChatOnlineStack.Navigator>
  );
};
export default ContactStackNavigation;

const styles = StyleSheet.create({});
