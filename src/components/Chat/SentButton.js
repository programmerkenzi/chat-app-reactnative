/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-28 16:28:21
 * @LastEditTime: 2021-07-27 09:46:43
 * @LastEditors: Kenzi
 */

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { blue } from "../../styles/color";
import { Icon } from "react-native-elements";

const SentButton = (sendProps, selectedFile, selectedMessage) => {
  const { text, messageIdGenerator, user, onSend } = sendProps;
  if (
    sendProps.text.trim().length > 0 ||
    selectedFile.length > 0 ||
    selectedMessage.length > 0
  ) {
    return (
      <TouchableOpacity
        onPress={() => {
          onSend(
            { text: text.trim(), user: user, _id: messageIdGenerator() },
            true
          );
        }}
      >
        <Icon
          style={styles.icon}
          name="send"
          color={blue.primary}
          type="ionicons"
          size={25}
        />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => {
        if (onSend) {
          onSend({ text: "👍", user: user, _id: messageIdGenerator() }, true);
        }
      }}
    >
      <Icon
        style={styles.icon}
        name="thumbs-up"
        size={25}
        color={blue.primary}
        type="font-awesome-5"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 8,
    marginLeft: 10,
  },
});

export default SentButton;
