/*
 * @Description:
 * @Author: Lewis
 * @Date: 2021-01-27 12:32:02
 * @LastEditTime: 2021-07-09 16:56:19
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Bubble } from "react-native-gifted-chat";
import AudioPlayBar from "../../components/audioPlayBar/AudioPlayBar";
import * as mime from "react-native-mime-types";
import * as FileSystem from "expo-file-system";
import { uploadFile } from "../../chat_api/chat";
import { FlingGestureHandler } from "react-native-gesture-handler";

//显示聊天记录
export function handleRenderBubble(props, fromRoomType) {
  let setColor = "#00EE00";
  if (props.currentMessage.user && props.previousMessage.user) {
    if (props.currentMessage.user._id === props.previousMessage.user._id) {
      return <Bubble {...props} />;
    }
    if (props.position === "right") {
      return <Bubble {...props} />;
    }
  }
  return (
    <View>
      {
        //判斷是否顯示發訊人名字
        fromRoomType === "group" ? (
          <Text
            style={{ color: setColor, fontWeight: "bold", paddingLeft: 10 }}
          >
            {props.currentMessage.user.name}
          </Text>
        ) : null
      }
      <Bubble {...props} />
    </View>
  );
}

//聊天显示录音
export const handleRenderMessageAudio = (props) => {
  const { currentMessage } = props;

  return <AudioPlayBar audioUri={currentMessage.audio} />;
};

//導航
export const toUserInfoPage = (item, navigation) => {
  return navigation.navigate("ChatUserInfo", {
    item: item,
    inContact: true,
  });
};

/**
 *
 * @param {function} navigation
 * @param {Object} room_info current room info
 * @returns
 */
export const toMessagesPage = (navigation, room_info) => {
  return navigation.navigate("Messages", { room_info: room_info });
};
export const toGroupInfoPage = (item, navigation) => {
  return navigation.navigate("GroupInfo", { item: item, inContact: true });
};

export const toSelectMembersPage = (navigation, item, routeName) => {
  return navigation.navigate("SelectMembers", {
    item: item,
    routeName: routeName,
  });
};

export const toAddNewFriendPage = (navigation) => {
  return navigation.navigate("AddNewFriend");
};
const styles = StyleSheet.create({});

//上传资源
export const handleUploadFile = async (file) => {
  //判断资源类型
  console.log("file :>> ", file);
  const modifiedFile = file;
  const mine_type = mime.lookup(modifiedFile.uri);
  modifiedFile.type = mine_type;
  const formData = new FormData();
  formData.append("file", modifiedFile);
  const res = await uploadFile(formData);
  return res;
};

export const handleUploadMultipleFile = async (files) => {
  //判断资源类型
  const formData = new FormData();
  files.forEach((file) => {
    let modifiedFile = { ...file };
    const mine_type = mime.lookup(modifiedFile.uri);
    modifiedFile.type = mine_type;
    formData.append("files", modifiedFile);
  });
  const res = await uploadFile(formData);
  return res;
};
