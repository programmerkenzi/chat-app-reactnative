/*
 * @Description: 聊天画面
 * @Author: Lewis
 * @Date: 2021-01-18 17:41:17
 * @LastEditTime: 2021-07-06 11:50:35
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "react-native-vector-icons";
import ChatStackNavigation from "./ChatStackNavigation";
import { setTabBarVisible } from "../../library/utils/utils";
import ContactStackNavigation from "./ContactStackNavigation";
import MyProfileStackNavigator from "./MyProfileStackNavigator";
import { t } from "../../i18n";
const ChatTab = createBottomTabNavigator();

const ChatTabNavigation = () => {
  return (
    <ChatTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === t("chat.chat")) {
            iconName = focused
              ? "ios-chatbubble-sharp"
              : "ios-chatbubble-sharp";
          } else if (route.name === t("chat.groups")) {
            iconName = focused ? "people" : "people";
          } else if (route.name === t("chat.pf")) {
            iconName = focused ? "person" : "person";
          } else if (route.name === t("chat.contacts")) {
            iconName = focused ? "contacts" : "contacts";
            return <AntDesign name={iconName} size={size} color={color} />;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#405DE6",
        inactiveTintColor: "gray",
      }}
    >
      <ChatTab.Screen
        name={t("chat.chat")}
        component={ChatStackNavigation}
        options={({ route }) => ({
          tabBarVisible: setTabBarVisible(route, "Chats"),
        })}
      />
      {/* <ChatTab.Screen name={t("chat.groups")} component={GroupStackNavigator} /> */}
      <ChatTab.Screen
        name={t("chat.contacts")}
        component={ContactStackNavigation}
      />
      <ChatTab.Screen name={t("chat.pf")} component={MyProfileStackNavigator} />
    </ChatTab.Navigator>
  );
};

export default ChatTabNavigation;

const styles = StyleSheet.create({});
