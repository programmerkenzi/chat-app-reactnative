/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-28 17:53:28
 * @LastEditTime: 2021-07-27 10:01:54
 * @LastEditors: Kenzi
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import * as mime from "react-native-mime-types";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { darkGary, lightGary, red } from "../../styles/color";
import { BackgroundImage } from "react-native-elements/dist/config";

const FileContainer = ({ selectedFile, show, handleRemoveSelectedFile }) => {
  const screenWidth = Dimensions.get("screen").width;

  const fileReader = (file) => {
    const mime_type = mime.lookup(file.uri);
    const findIcon = () => {
      switch (mime_type) {
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          "application/vnd.ms-excel":
          return "file-excel";
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          "application/msword":
          return "file-word";
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
          "application/vnd.ms-powerpoint":
          return "file-powerpoint";
        case "application/pdf":
          return "file-pdf";
        case "application/zip" || "application/x-rar-compressed":
          return "file-archive";

        default:
          return "file";
      }
    };
    const icon_name = mime_type.includes("audio")
      ? "file-audio"
      : mime_type.includes("video")
      ? "file-video"
      : findIcon();

    return (
      <TouchableOpacity
        style={[styles.item, { width: screenWidth / 3 - 15 }]}
        onPress={() => handleRemoveSelectedFile(file)}
      >
        {mime_type.includes("image") ? (
          <BackgroundImage
            source={{ uri: file.uri }}
            resizeMethod="resize"
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
              overflow: "hidden",
            }}
          >
            <Icon
              name="close"
              type="ionicon"
              color={red.primary}
              style={{ marginLeft: screenWidth / 4.5 }}
              size={15}
            />
          </BackgroundImage>
        ) : (
          <>
            <Icon
              name="close"
              type="ionicon"
              color={red.primary}
              style={{ marginLeft: screenWidth / 4.5 }}
              size={15}
            />
            <Icon
              name={icon_name}
              color="black"
              size={35}
              type="font-awesome-5"
            />
            <Text style={styles.text}>
              {file.name.length > 10 ? file.name.substring(0, 10) : file.name}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return show ? (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={3}
        data={selectedFile}
        keyExtractor={(item) => item.uri}
        renderItem={({ item, index }) => fileReader(item)}
      />
    </View>
  ) : null;
};

export default FileContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightGary.primary,
    width: "100%",
    height: 100,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 5,
    height: 90,
    borderColor: lightGary.secondary,
  },
  close: {},

  list: {
    justifyContent: "center",
    alignItems: "baseline",
  },
});
