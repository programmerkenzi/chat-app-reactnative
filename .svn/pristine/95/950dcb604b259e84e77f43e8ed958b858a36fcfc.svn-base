/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-26 13:47:04
 * @LastEditTime: 2021-08-04 12:34:21
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { t } from "../../i18n";
import { Icon } from "react-native-elements";

import FilesRender from "./FilesRender";
import { decodeMessage } from "./../../library/utils/crypto";

const ReplyMessage = ({ messages, post_by_user, user_id, publicKey }) => {
  const isPostByCurrentUser = post_by_user === user_id;

  const renderMessage = (msg) => {
    const { file, message, post_by_user } = msg;
    const { name } = post_by_user[0];
    const decodedMessage =
      typeof message === "string" ? message : decodeMessage(message, publicKey);
    return (
      <View>
        <View style={[tw.flexRow, tw.mB1]}>
          <Icon
            name="reply"
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
          >{`${t("chat.reply_to")} ${name}`}</Text>
        </View>

        {file.length ? <FilesRender files={file} /> : null}
        <Text
          style={[
            tw.mB1,
            isPostByCurrentUser ? tw.textGray200 : tw.textGray800,
          ]}
        >
          {decodedMessage}
        </Text>
      </View>
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

export default ReplyMessage;

const styles = StyleSheet.create({});
