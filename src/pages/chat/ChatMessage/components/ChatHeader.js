/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-11 17:53:42
 * @LastEditTime: 2021-07-21 17:03:09
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { toUserInfoPage } from "./../../utils";
import { useRoute } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "./../../../../redux/user/user.selector";
const ChatHeader = ({ userInfo }) => {
  const navigation = useNavigation();
  const roomInfo = useRoute().params.room_info;
  const users = roomInfo.users;
  const receiver = users.filter((u) => u._id !== userInfo._id)[0];
  const avatar =
    roomInfo.type === "private" ? receiver.avatar : roomInfo.avatar; // 私人||群组
  const avatarUrl = avatar.length > 0 ? avatar : "http://";
  const name = roomInfo.type === "private" ? receiver.name : roomInfo.name; //群組 || 私人

  const handleOnPress = () => {
    // //判斷聊天內容是否為group
    // if (roomInfo.name) {
    //   return toGroupInfoPage(roomInfo, navigation);
    // }

    // //判斷是上個頁面是否為為group
    // if (routeName === "Groups") {
    //   return toGroupInfoPage(item, navigation);
    // } else {
    //   return toUserInfoPage(receiver, navigation);
    // }
    return toUserInfoPage(receiver, navigation);
  };

  return roomInfo ? (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleOnPress()}>
        <View style={styles.avatarButton}>
          <Avatar
            containerStyle={styles.avatar}
            title={name.toUpperCase().substring(0, 2)}
            rounded
            size="medium"
            source={{ uri: avatarUrl }}
          />
          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRow}>
        <Icon name="call" style={styles.callButton}></Icon>
      </TouchableOpacity>
    </View>
  ) : null;
};
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
    marginLeft: 50,
  },
  buttonRow: {
    flexDirection: "row",
  },
  callButton: {
    fontSize: 25,
  },
});

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(ChatHeader);
