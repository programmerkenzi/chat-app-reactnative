/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-01 13:20:25
 * @LastEditTime: 2021-07-07 11:49:02
 * @LastEditors: Kenzi
 */

import React, { lazy, Suspense, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Bubble } from "react-native-gifted-chat";
import { blue, darkGary } from "../../styles/color";
import FileRender from "../fileRender/FileRender";
import { BackgroundImage } from "react-native-elements/dist/config";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectSelectedMessage } from "./../../redux/chat/chat.selector";
import { lightGary } from "./../../styles/color";

const MessageBubble = ({ props, selectedMessage }) => {
  //如果有照片与音档以外的档案

  const [backgroundColor, setBackgroundColor] = useState(blue.thirdly);
  const [leftBackgroundColor, setLeftBackgroundColor] = useState(
    lightGary.primary
  );
  useEffect(() => {
    const isSelected = selectedMessage.findIndex(
      (msg) => msg === props.currentMessage._id
    );
    if (isSelected === -1) {
      setBackgroundColor(blue.thirdly);
      setLeftBackgroundColor(lightGary.primary);
    } else {
      setBackgroundColor(blue.primary);
      setLeftBackgroundColor(blue.primary);
    }
  }, [selectedMessage]);

  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          borderRadius: 15,
          overflow: "hidden",
          backgroundColor: backgroundColor,
        },
        left: {
          borderRadius: 15,
          overflow: "hidden",
          backgroundColor: leftBackgroundColor,
        },
      }}
      containerToPreviousStyle={{
        right: {
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          overflow: "hidden",
        },
        left: {
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          overflow: "hidden",
        },
      }}
      containerToNextStyle={{
        right: {
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          overflow: "hidden",
        },
        left: {
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          overflow: "hidden",
        },
      }}
      containerStyle={{
        right: {
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          overflow: "hidden",
        },
        left: {
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          overflow: "hidden",
        },
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  selectedMessage: selectSelectedMessage,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(MessageBubble);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: darkGary.primary,
  },
});
