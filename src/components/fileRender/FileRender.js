/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-09 10:54:16
 * @LastEditTime: 2021-07-14 16:51:49
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import {
  downloadAndOpenFile,
  downloadFile,
} from "../../library/utils/resources";
import { Container } from "../../styles/layout";
import { downloadToFolder } from "expo-file-dl";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectExpoPushToken } from "../../redux/auth/auth.selector";
const FileRender = ({ file }) => {
  const { url, name, id, path, mime_type } = file;

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

  const icon_name = findIcon();

  return (
    <TouchableOpacity
      onPress={() => downloadAndOpenFile(url, name, mime_type)}
      style={styles.container}
    >
      <Icon
        name={icon_name}
        color="rgba(0,0,0,0.8)"
        size={35}
        type="font-awesome-5"
      />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};
const mapStateToProps = createStructuredSelector({
  expoPushToken: selectExpoPushToken,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps)(FileRender);

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: { fontSize: 16, color: "black", marginTop: 5 },
});
