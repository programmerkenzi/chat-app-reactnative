/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-28 15:11:05
 * @LastEditTime: 2021-07-09 18:51:44
 * @LastEditors: Kenzi
 */

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { Audio } from "expo-av";
import {
  handleGetImageLibrary,
  handleTakePicture,
} from "./../../library/utils/resources";
import { Icon } from "react-native-elements";
import { filePicker } from "./../../library/utils/resources";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

const FunctionsBar = ({
  props,
  showEmojiBoard,
  setShowEmojiBoard,
  handleOnSendRecord,
  handleSelectFile = false,
  handleOnSend,
}) => {
  //錄音功能
  const [recording, setRecording] = useState();
  //开始录音
  const handleStartRecording = async () => {
    try {
      // console.log("Requesting permissions..");

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      // console.log("Starting recording..");
      const recording = new Audio.Recording();
      // console.log("Starting recording..111");
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      // console.log("Starting recording..2222");
      await recording.startAsync();
      setRecording(recording);
      // console.log("Recording started");
    } catch (err) {
      // console.error("Failed to start recording", err);
    }
  };
  //结束录音
  const handleStopRecording = async () => {
    // console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = await recording.getURI();
    const spiltUri = uri.split("/");
    // console.log("Recording stopped and stored at", uri);
    // console.log("uri :>> ", uri);

    let fileInfo = await FileSystem.getInfoAsync(uri);
    fileInfo.name = spiltUri[spiltUri.length - 1];
    if (handleSelectFile) {
      handleSelectFile(fileInfo);
    } else {
      handleOnSend(fileInfo);
    }
  };

  const handlePressBtn = async (type) => {
    let resources = null;
    //拍照
    if (type === "camera") {
      resources = await handleTakePicture();
      const uriSplit = resources.uri.split("/");
      resources.name = uriSplit[uriSplit.length - 1];

      //选取照片
    } else if (type === "folder") {
      let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      console.log("result :>> ", result);
      resources = result;
    }

    //送出档案;
    if (resources) {
      console.log("handleSelectFile :>> ", handleSelectFile);
      if (handleSelectFile) {
        handleSelectFile(resources);
      } else {
        handleOnSend(resources);
      }
    }
  };

  //輸入訊息時隱藏;
  return !props.text ? (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowEmojiBoard(!showEmojiBoard)}>
        <Icon
          style={styles.icon}
          name="laugh"
          size={25}
          color={showEmojiBoard ? "#ffc83d" : "#000"}
          type="font-awesome-5"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePressBtn("camera")}>
        <Icon
          style={styles.icon}
          name="camera"
          size={25}
          color="#000"
          type="font-awesome-5"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePressBtn("folder")}>
        <Icon
          style={styles.icon}
          name="folder-open"
          size={25}
          color="#000"
          type="font-awesome-5"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={recording ? handleStopRecording : handleStartRecording}
      >
        <Icon
          style={styles.icon}
          name="microphone"
          size={25}
          color={recording ? "#ff0000" : "#000"}
          type="font-awesome-5"
        />
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={() => setShowEmojiBoard(!showEmojiBoard)}>
      <Icon
        style={styles.icon}
        name="laugh"
        size={25}
        color={showEmojiBoard ? "#ffc83d" : "#000"}
        type="font-awesome-5"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  icon: {
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default FunctionsBar;
