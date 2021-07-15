/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-10 18:33:00
 * @LastEditTime: 2021-07-14 17:09:27
 * @LastEditors: Kenzi
 */
/*
 * @Description: 聊天记录
 * @Author: Lewis
 * @Date: 2021-01-20 16:32:48
 * @LastEditTime: 2021-03-10 15:11:40
 * @LastEditors: Kenzi
 */
import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
// import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { ListItem, Avatar, CheckBox } from "react-native-elements";
import { createFileUrl } from "./../../../library/utils/utils";

const ContactCheckBox = ({ item, index, onPressCheck, checkedItem }) => {
  const isCheck = checkedItem.findIndex((user) => user._id === item._id);

  return (
    <ListItem bottomDivider>
      <Avatar
        rounded
        size="medium"
        title={item.name.toUpperCase().substring(0, 2)}
        source={{
          uri: item.avatar.length > 0 ? createFileUrl(item.avatar) : "http://",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.status}</ListItem.Subtitle>
      </ListItem.Content>
      <CheckBox
        onPress={() => {
          onPressCheck(item);
        }}
        checked={isCheck !== -1 ? true : false}
      />
    </ListItem>
  );
};

export default ContactCheckBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contactContent: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 2,
    alignItems: "center",
  },
  contactMid: {
    flexGrow: 1,
    marginLeft: 10,
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  onlineStatus: {
    color: "#C2A2A2",
    fontSize: 12,
  },
  contactLeft: {
    alignItems: "center",
  },
  avatar: {
    borderRadius: 100,
    overflow: "hidden",
    width: 30,
    height: 30,
  },
});
