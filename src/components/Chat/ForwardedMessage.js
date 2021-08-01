/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-26 13:47:04
 * @LastEditTime: 2021-07-27 10:22:17
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { tw } from "react-native-tailwindcss";
import { t } from "../../i18n";
import FilesRender from "./FilesRender";

const ForwardedMessage = ({ messages, post_by_user, user_id }) => {
  const isPostByCurrentUser = post_by_user === user_id;

  const renderMessage = (msg) => {
    const { file, message, post_by_user } = msg;
    const { name } = post_by_user[0];
    return (
      <>
        <View style={[tw.flexRow, tw.mB1]}>
          <Icon
            name="share"
            type="font-awesome-5"
            size={10}
            iconStyle={[
              tw.mR1,
              tw.mT1,
              isPostByCurrentUser ? tw.textBlue300 : tw.textBlue600,
            ]}
          />
          <Text
            style={[isPostByCurrentUser ? tw.textBlue300 : tw.textBlue600]}
          >{`${t("chat.forwarded_f")} ${name}`}</Text>
        </View>

        {file.length ? <FilesRender files={file} /> : null}
        <Text
          style={[
            tw.mB1,
            isPostByCurrentUser ? tw.textGray200 : tw.textGray800,
          ]}
        >
          {message}
        </Text>
      </>
    );
  };

  return messages.length ? (
    <View
      style={[
        tw.m2,
        tw.p2,
        tw.borderL2,
        isPostByCurrentUser ? tw.borderGray300 : tw.borderGray600,
      ]}
    >
      {messages.map((message) => renderMessage(message))}
    </View>
  ) : null;
};

export default ForwardedMessage;

const styles = StyleSheet.create({});
