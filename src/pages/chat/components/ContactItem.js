/*
 * @Description: 聊天记录
 * @Author: Lewis
 * @Date: 2021-01-20 16:32:48
 * @LastEditTime: 2021-07-14 16:54:43
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, View, Image } from "react-native";
// import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { ListItem, Avatar, CheckBox, Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native";
import { toGroupInfoPage, toMessagesPage } from "../utils";
import { toUserInfoPage } from "../utils";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useToast } from "native-base";
import { createFileUrl } from "./../../../library/utils/utils";

// const avatar_url= 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',

const ContactItem = ({ props, routeName, onPressChevron, toChatRoom }) => {
  const info = props.status;

  const navigation = useNavigation();

  const onPressAvatar = () => {
    // if (routeName === "Groups") {
    //   return toGroupInfoPage(props, navigation);
    // } else {
    //   return toUserInfoPage(props, navigation);
    // }
    toUserInfoPage(props, navigation, toChatRoom);
  };
  const toast = useToast();

  const onPressAdd = () => {
    toast.show({
      title: "测试",
      description: "发送交友请求",
      duration: 2000,
      isClosable: true,
      placement: "top",
      status: "success",
    });
  };

  return (
    <ListItem bottomDivider>
      <TouchableOpacity onPress={() => onPressAvatar()}>
        <Avatar
          rounded
          size="medium"
          title={props.name.toUpperCase().substring(0, 2)}
          source={{
            uri:
              props.avatar.length > 0 ? createFileUrl(props.avatar) : "http://",
          }}
        />
      </TouchableOpacity>
      <ListItem.Content>
        <ListItem.Title>{props.name}</ListItem.Title>
        <ListItem.Subtitle>
          {info.length > 25 ? info.substring(0, 25) + "..." : info}
        </ListItem.Subtitle>
      </ListItem.Content>

      {routeName === "AddNewFriend" ? (
        <TouchableOpacity onPress={() => onPressAdd()}>
          <Icon
            name="person-add"
            style={{ color: "#c0c0c0", fontSize: 15 }}
          ></Icon>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onPressChevron(props._id)}>
          <ListItem.Chevron />
        </TouchableOpacity>
      )}
    </ListItem>
  );
};

export default ContactItem;

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
