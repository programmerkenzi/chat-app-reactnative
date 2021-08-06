/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-27 14:30:12
 * @LastEditTime: 2021-08-02 18:28:34
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { tw } from "react-native-tailwindcss";
import { t } from "../../i18n";
import { lightGary } from "./../../styles/color";

const SelectedMessagesContainer = ({
  messages,
  handleClose,
  type = "reply",
}) => {
  const renderMessage = (message) => {
    const { text, file, user } = message;

    const { name } = user;

    return type === "forwarded" ? (
      <View style={[tw.flexRow, tw.justifyBetween, tw.mB1]}>
        <View style={[tw.flexCol, tw.p1, tw.borderL2, tw.borderGray600]}>
          <View style={[tw.flexRow]}>
            <Icon
              name="share"
              type="font-awesome-5"
              size={10}
              iconStyle={[tw.mR1, tw.mT1, tw.textBlue600]}
            />
            <Text style={[tw.textBlue600, tw.mB1]}>{`${t(
              "chat.forwarded_f"
            )} ${name}`}</Text>
          </View>
          <Text style={[tw.textGray600]}>{text}</Text>
        </View>

        <TouchableOpacity onPress={() => handleClose(message)}>
          <View style={[tw.flexCol, tw.pT5]}>
            <Icon
              name="times"
              type="font-awesome-5"
              size={15}
              iconStyle={[tw.textGray600]}
            />
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View style={[tw.flexRow, tw.justifyBetween, tw.mB1]}>
        <View style={[tw.flexCol, tw.p1, tw.borderL2, tw.borderGray600]}>
          <View style={[tw.flexRow]}>
            <Icon
              name="reply"
              type="font-awesome-5"
              size={10}
              iconStyle={[tw.mR1, tw.mT1, tw.textBlue600]}
            />
            <Text style={[tw.textBlue600, tw.mB1]}>{`${t(
              "chat.reply_to"
            )} ${name}`}</Text>
          </View>
          <Text style={[tw.textGray600]}>{text}</Text>
        </View>

        <TouchableOpacity onPress={() => handleClose(message)}>
          <View style={[tw.flexCol, tw.pT5]}>
            <Icon
              name="times"
              type="font-awesome-5"
              size={15}
              iconStyle={[tw.textGray600]}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        tw.flexCol,
        tw.p2,
        tw.wFull,

        { backgroundColor: lightGary.primary },
      ]}
    >
      {messages.map((message) => renderMessage(message))}
    </View>
  );
};

export default SelectedMessagesContainer;

const styles = StyleSheet.create({});
