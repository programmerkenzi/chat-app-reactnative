/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-19 12:36:22
 * @LastEditTime: 2021-07-06 12:43:28
 * @LastEditors: Kenzi
 */

import React from "react";
import { t } from "../../i18n";
import { View } from "react-native";
import ChatMenuButton from "./Buttons/ChatMenu";
import ChatGroupEditMenu from "./Buttons/ChatGroupEditMenu";

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
      <View style={{ paddingRight: 5 }}>
        {rightButton === "chat" ? <ChatMenuButton /> : null}
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
