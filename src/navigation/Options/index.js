/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-19 12:36:22
 * @LastEditTime: 2021-07-22 16:08:33
 * @LastEditors: Kenzi
 */

import React from "react";
import { t } from "../../i18n";
import { View } from "react-native";
import ChatMenuButton from "./Buttons/ChatMenu";
import ChatGroupEditMenu from "./Buttons/ChatGroupEditMenu";
import AddGroupChat from "./Buttons/AddGroupChat";
import AddFriend from "./Buttons/AddFriend";
import AvatarButton from "./Buttons/Avatar";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { HeaderBackButton } from "@react-navigation/stack";
import { tw } from "react-native-tailwindcss";
import CallButton from "./Buttons/Call";

export const GeneralHeaderOptions = (title) => {
  return {
    title: t(title).toUpperCase(),
    headerStyle: {
      backgroundColor: "#405DE6",
    },
    headerTitleAlign: "center",
    headerTintColor: "#fff",
    headerTitleStyle: {
      alignSelf: "center",
      fontWeight: "bold",
    },
  };
};

export const HeaderOptionsWithRightButton = (title, rightButton) => {
  return {
    title: t(title).toUpperCase(),

    headerStyle: {
      backgroundColor: "#405DE6",
    },
    headerTintColor: "#fff",
    headerTitleAlign: "center",
    headerTitleStyle: {
      alignSelf: "center",
      fontWeight: "bold",
    },
    headerRight: () => (
      <View style={{ paddingRight: 10 }}>
        {rightButton === "chat" ? (
          <AddGroupChat />
        ) : rightButton === "addNewFriend" ? (
          <AddFriend />
        ) : null}
      </View>
    ),
  };
};

export const TransparentHeaderOptions = () => {
  return {
    headerTransparent: true,
    title: false,
    headerTintColor: "#fff",
  };
};

export const TransparentHeaderOptionsWithRightButton = (headerRight) => {
  return {
    headerTransparent: true,
    title: false,
    headerTintColor: "#fff",
    headerRight: () => (
      <View style={{ paddingRight: 5 }}>
        {headerRight === "chatGroup" ? <ChatGroupEditMenu /> : null}
      </View>
    ),
  };
};

export const HeaderOptionsWithRightAndLeftButton = (
  title,
  leftButton,
  rightButton
) => {
  return {
    headerStyle: {
      backgroundColor: "#405DE6",
    },
    title: null,

    headerTintColor: "#fff",
    headerTitleAlign: "center",
    headerTitleStyle: {
      alignSelf: "center",
      fontWeight: "bold",
    },

    headerLeft: () => (
      <View style={[tw.flex, tw.flexRow]}>
        {leftButton === "avatar" ? <AvatarButton /> : null}
      </View>
    ),

    headerRight: () => (
      <View style={{ paddingRight: 5 }}>
        {rightButton === "chat" ? (
          <AddGroupChat />
        ) : rightButton === "addNewFriend" ? (
          <AddFriend />
        ) : rightButton === "call" ? (
          <CallButton />
        ) : null}
      </View>
    ),
  };
};
