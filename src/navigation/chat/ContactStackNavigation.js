/*
 * @Description:
 * @Author: Lewis
 * @Date: 2021-01-19 10:32:56
 * @LastEditTime: 2021-04-19 13:30:11
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import ContactPage from "../../pages/chat/Contact/index";
import { GeneralHeaderOptions } from "./../Options/index";
const ChatOnlineStack = createStackNavigator();

const ContactStackNavigation = () => {
  return (
    <ChatOnlineStack.Navigator>
      <ChatOnlineStack.Screen
        name="Contacts"
        component={ContactPage}
        options={GeneralHeaderOptions("chat.contacts")}
      />
    </ChatOnlineStack.Navigator>
  );
};
export default ContactStackNavigation;

const styles = StyleSheet.create({});
