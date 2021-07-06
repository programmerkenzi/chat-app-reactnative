/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-14 09:25:12
 * @LastEditTime: 2021-07-06 12:39:40
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
import { Textarea } from "native-base";
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

const EditGroupInfoPage = ({ navigation }) => {
  const [groupName, setGroupName] = useState("");
  const [Description, setDescription] = useState("");

  const checkedItem = useRoute().params.item;

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
            placeholder="Group Name"
            onChangeText={(value) => setGroupName(value)}
            errorMessage={errorMessage}
          />
        </View>
        <Text style={styles.text}>Description</Text>
        <Textarea
          rowSpan={2}
          bordered
          style={styles.Textarea}
          onTextInput={(value) => setDescription(value)}
        />
        <Text style={styles.text}>Members</Text>
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
        <Button title="Submit" type="Clear" />
      </View>
    </View>
  );
};

export default EditGroupInfoPage;

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
