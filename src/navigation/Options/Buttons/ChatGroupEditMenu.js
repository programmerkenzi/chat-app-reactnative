/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-19 13:19:46
 * @LastEditTime: 2021-04-19 13:28:38
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign, Feather, Ionicons } from "react-native-vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  toAddNewFriendPage,
  toSelectMembersPage,
} from "./../../../pages/chat/utils";
import { t } from "../../../i18n";

const ChatGroupEditMenu = () => {
  const navigation = useNavigation();
  const item = useRoute().params.item;
  const routeName = useRoute().name;

  return (
    <View style={{ paddingRight: 11, flexDirection: "row" }}>
      <Feather name="edit" style={styles.icon} />
      <Menu>
        <MenuTrigger>
          <Feather name="more-vertical" style={styles.icon} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ width: 130, padding: 5 }}>
          <MenuOption
            style={styles.menuOption}
            onSelect={() => toSelectMembersPage(navigation, item, routeName)}
          >
            <Text style={styles.menuOptionText}>{t("chat.em")}</Text>
          </MenuOption>
          <MenuOption
            style={styles.menuOption}
            onSelect={() => alert(`Not called`)}
          >
            <Text style={styles.menuOptionText}>{t("cmn.settings")}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export const GroupEdit = () => {
  const navigation = useNavigation();
  const item = useRoute().params.item;
  const routeName = useRoute().name;

  return (
    <View style={{ flexDirection: "row" }}>
      <Feather name="edit" style={styles.icon} />
      <Menu>
        <MenuTrigger>
          <Feather name="more-vertical" style={styles.icon} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ width: 130, padding: 5 }}>
          <MenuOption
            style={styles.menuOption}
            onSelect={() => toSelectMembersPage(navigation, item, routeName)}
          >
            <Text style={styles.menuOptionText}>{t("chat.em")}</Text>
          </MenuOption>
          <MenuOption
            style={styles.menuOption}
            onSelect={() => alert(`Not called`)}
          >
            <Text style={styles.menuOptionText}>{t("cmn.settings")}</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default ChatGroupEditMenu;

const styles = StyleSheet.create({
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  menuOptionText: {
    marginLeft: 5,
  },

  icon: {
    fontSize: 25,
    color: "#fff",
  },
});
