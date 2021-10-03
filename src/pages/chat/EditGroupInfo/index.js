/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-14 09:25:12
 * @LastEditTime: 2021-08-06 16:45:44
 * @LastEditors: Kenzi
 */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { TextArea, Stack, useToast } from "native-base";
import {
  Button,
  Overlay,
  Input,
  Avatar,
  ListItem,
  TouchableOpacity,
} from "react-native-elements";

import { handleGetImageLibrary } from "../../../library/utils/resources";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AvatarWithNameTag from "../../../components/avatarWithNameTag/AvatarWithNameTag";
import { connect } from "react-redux";
import { initializeChatRoomStart } from "../../../redux/chat/chat.actions";
import { Alert } from "react-native";

const EditGroupInfoPage = ({ navigation, initChatRoom }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const checkedItem = useRoute().params?.item;

  const [imageUri, setImageUri] = useState(null);

  const errorMessage = groupName.length ? null : "Please Enter";

  const handleTakeMedia = async () => {
    const picker = await handleGetImageLibrary();

    if (picker.cancelled === false) {
      const imageUri = picker.uri;
      return setImageUri(imageUri);
    }

    return;
  };
  const toast = useToast();

  const onPressSubmit = () => {
    if (!groupName.length) return Alert.alert("", "pls filed group name");

    const roomUserIds = checkedItem.map((user) => user._id);
    console.log("description :>> ", description);
    return initChatRoom(
      navigation,
      roomUserIds,
      "group",
      groupName,
      description,
      imageUri
    );
  };
  return (
    <View style={styles.container}>
      <View styles={{ flex: 1 }}>
        <View style={styles.header}>
          <Avatar
            onPress={() => handleTakeMedia()}
            icon={{ name: "edit" }}
            source={{
              uri: imageUri ? imageUri : "https://",
            }}
            size="xlarge"
            avatarStyle={{ borderColor: "#c0c0c0", borderWidth: 1 }}
          ></Avatar>
          <Input
            containerStyle={styles.input}
            placeholder="群组名称"
            onChangeText={(value) => setGroupName(value)}
            errorMessage={errorMessage}
          />
        </View>
        <Text style={styles.text}>描述</Text>

        <Stack space={4} w="90%">
          <TextArea
            h={20}
            placeholder="请输入"
            onChangeText={(value) => setDescription(value)}
          />
        </Stack>
        <Text style={styles.text}>会员</Text>
      </View>
      <FlatList
        contentContainerStyle={{ margin: 4, width: "100%", flex: 1 }}
        data={checkedItem}
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={4}
        renderItem={({ item }) => <AvatarWithNameTag item={item} />}
      />
      <View style={styles.ButtonRow}>
        <Button title="确定" type="Clear" onPress={() => onPressSubmit()} />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  initChatRoom: (navigation, user_ids, type, name, description, avatar) =>
    dispatch(
      initializeChatRoomStart(
        navigation,
        user_ids,
        type,
        name,
        description,
        avatar
      )
    ),
});

export default connect(null, mapDispatchToProps)(EditGroupInfoPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    padding: 10,
  },

  header: {
    flexDirection: "row",
  },

  text: {
    marginVertical: 15,
    color: "#000",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#c0c0c0",
    padding: 5,
  },

  ButtonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  input: {
    width: 200,
  },
  checkedContainer: {
    flexDirection: "row",
  },
  Textarea: {
    padding: 5,
  },
});
