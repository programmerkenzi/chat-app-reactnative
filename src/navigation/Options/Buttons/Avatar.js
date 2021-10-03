/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-22 14:38:50
 * @LastEditTime: 2021-08-06 17:14:45
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "../../../redux/user/user.selector";
import { toUserInfoPage } from "./../../../pages/chat/utils";
import { HeaderBackButton } from "@react-navigation/stack";
import { tw } from "react-native-tailwindcss";
import { selectChatRoomList } from "../../../redux/chat/chat.selector";
import { toGroupInfoPage } from "./../../../pages/chat/utils";
const AvatarButton = ({ userInfo, roomList }) => {
  const navigation = useNavigation();
  const chatRoomArray = Object.values(roomList);
  const roomInfo = useRoute().params.room_info.unread
    ? useRoute().params.room_info
    : chatRoomArray.filter(
        (room) => room._id === useRoute().params.room_info.room_id
      )[0];

  const receiver = roomInfo.receivers[0];
  console.log("roomInfo :>> ", roomInfo);
  const avatar =
    roomInfo?.type === "private" ? receiver.avatar : roomInfo.avatar; // 私人||群组
  const avatarUrl = avatar ? avatar : "http://";
  const name = roomInfo.type === "private" ? receiver.name : roomInfo.name; //群組 || 私人

  const handleOnPress = () => {
    //判斷聊天內容是否為group
    if (roomInfo.type === "group") {
      return toGroupInfoPage(roomInfo, navigation);
    }

    return toUserInfoPage(receiver, navigation);
  };

  return roomInfo ? (
    <TouchableOpacity onPress={() => handleOnPress()}>
      <View style={styles.avatarButton}>
        <HeaderBackButton
          tintColor="#fff"
          onPress={() => navigation.goBack()}
        />

        <Avatar
          containerStyle={styles.avatar}
          title={name.toUpperCase().substring(0, 2)}
          rounded
          size="small"
          source={{ uri: avatarUrl }}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
  roomList: selectChatRoomList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(AvatarButton);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#405de6",
    paddingBottom: 10,
    paddingRight: 10,
    width: "100%",
    height: 110,
    top: 0,
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  avatar: { marginRight: 8 },
  avatarButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
  },
  callButton: {
    fontSize: 25,
  },
});
