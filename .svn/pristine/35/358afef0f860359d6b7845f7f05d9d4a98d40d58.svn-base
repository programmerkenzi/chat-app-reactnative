/*
 * @Description: 聊天记录
 * @Author: Lewis
 * @Date: 2021-01-20 16:32:48
 * @LastEditTime: 2021-08-03 14:47:22
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet } from "react-native";
// import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { ListItem, Avatar, Icon } from "react-native-elements";
import { TouchableOpacity, View } from "react-native";
import { toUserInfoPage } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import { tw } from "react-native-tailwindcss";
import { postNotification } from "../../../chat_api/notification";

// const avatar_url= 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',

const ContactItem = ({
  props,
  routeName,
  onPressChevron,
  toChatRoom,
  btnType,
  submitAddFriendRequest,
  deleteAddFriendRequest,
}) => {
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

  const sentAddFriendRequest = async () => {
    const res = await postNotification("add_friend", { user_id: props._id });

    if (res.success) {
      toast.show({
        title: "操作",
        description: "已发送交友请求",
        duration: 2000,
        isClosable: true,
        placement: "top",
        status: "success",
      });
    }
  };

  return (
    <ListItem bottomDivider>
      <TouchableOpacity onPress={() => onPressAvatar()}>
        <Avatar
          rounded
          size="medium"
          title={props.name.toUpperCase().substring(0, 2)}
          source={{
            uri: props.avatar ? props.avatar : "http://",
          }}
        />
      </TouchableOpacity>
      <ListItem.Content>
        <ListItem.Title>{props.name}</ListItem.Title>

        <ListItem.Subtitle>
          {info.length > 25 ? info.substring(0, 25) + "..." : info}
        </ListItem.Subtitle>
      </ListItem.Content>

      {btnType === "addNewFriend" ? (
        <TouchableOpacity onPress={() => sentAddFriendRequest()}>
          <Icon
            name="user-plus"
            type="font-awesome-5"
            size={15}
            color="#57534e"
          />
        </TouchableOpacity>
      ) : btnType === "submitFriendRequest" ? (
        <View style={[tw.flexRow]}>
          <TouchableOpacity onPress={() => submitAddFriendRequest(props._id)}>
            <Icon
              name="user-plus"
              type="font-awesome-5"
              size={15}
              color="#a3e635"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteAddFriendRequest(props._id)}>
            <Icon
              name="user-times"
              type="font-awesome-5"
              size={15}
              color="#f87171"
            />
          </TouchableOpacity>
        </View>
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
