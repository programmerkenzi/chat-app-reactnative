/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-26 17:07:38
 * @LastEditTime: 2021-07-26 18:12:35
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { tw } from "react-native-tailwindcss";
import { Icon } from "react-native-elements";
import { t } from "../../i18n";
import * as Animatable from "react-native-animatable";

const MessageFunctionBar = ({
  handleDeleteMessage,
  handleForwardMessages,
  handleReplyMessage,
}) => {
  return (
    <Animatable.View style={[tw.bgGray100, tw.flexRow, tw.justifyEvenly]}>
      <TouchableOpacity onPress={() => handleReplyMessage()}>
        <View style={[tw.flexCol, tw.p3]}>
          <Icon
            name="reply"
            type="font-awesome-5"
            size={30}
            iconStyle={[tw.textGray800, tw.mB1]}
          />
          <Text style={[tw.textGray800]}>{t("chat.reply")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteMessage()}>
        <View style={[tw.flexCol, tw.p3]}>
          <Icon
            name="trash-alt"
            type="font-awesome-5"
            size={30}
            iconStyle={[tw.textGray800, tw.mB1]}
          />
          <Text style={[tw.textGray800]}>{t("cmn.del")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={[tw.flexCol, tw.p3]}>
          <Icon
            name="edit"
            type="font-awesome-5"
            size={30}
            iconStyle={[tw.textGray800, tw.mB1]}
          />
          <Text style={[tw.textGray800]}>{t("cmn.edit")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleForwardMessages()}>
        <View style={[tw.flexCol, tw.p3]}>
          <Icon
            name="share"
            type="font-awesome-5"
            size={30}
            iconStyle={[tw.textGray800, tw.mB1]}
          />
          <Text style={[tw.textGray800]}>{t("chat.forward")}</Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default MessageFunctionBar;

const styles = StyleSheet.create({});
