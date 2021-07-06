/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-11 17:53:42
 * @LastEditTime: 2021-06-17 14:08:57
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { toGroupInfoPage } from "./../../utils";
import { toUserInfoPage } from "./../../utils";

const ChatHeader = ({ roomInfo, currentUserId }) => {
  const navigation = useNavigation();
  const users = roomInfo.users;
  const avatar =
    roomInfo.type === "private"
      ? users.filter((u) => u._id !== currentUserId)[0].avatar
      : roomInfo.avatar; // 私人||群组
  const name =
    roomInfo.type === "private"
      ? users.filter((u) => u._id !== currentUserId)[0].name
      : roomInfo.name; //群組 || 私人

  const handleOnPress = () => {
    //判斷聊天內容是否為group
    if (item.name) {
      return toGroupInfoPage(item, navigation);
    }

    //判斷是上個頁面是否為為group
    if (routeName === "Groups") {
      return toGroupInfoPage(item, navigation);
    } else {
      return toUserInfoPage(receiver, navigation);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleOnPress()}>
        <View style={styles.avatarButton}>
          <Avatar
            containerStyle={styles.avatar}
            title={name.toUpperCase().substring(0, 2)}
            rounded
            size="medium"
            source={{ uri: avatar }}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRow}>
        <Icon name="call" style={styles.callButton}></Icon>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "#405de6",
    paddingBottom: 10,
    width: "100%",
    height: 120,
    top: 0,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  avatar: {},
  avatarButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRow: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "flex-end",
    right: 10,
    bottom: 10,
  },
  callButton: {
    fontSize: 25,
  },
});

export default ChatHeader;
