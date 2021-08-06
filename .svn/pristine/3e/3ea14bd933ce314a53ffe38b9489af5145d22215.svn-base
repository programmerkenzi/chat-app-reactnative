/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-26 17:07:38
 * @LastEditTime: 2021-08-04 15:20:37
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { tw } from "react-native-tailwindcss";
import { Icon } from "react-native-elements";
import { t } from "../../i18n";
import * as Animatable from "react-native-animatable";
import { lightGary } from "./../../styles/color";

const MessageFunctionBar = ({
  handleDeleteMessage,
  handleForwardMessages,
  handleReplyMessage,
  handlePinMessage,
  handleClose,
  numSelected,
}) => {
  return (
    <View style={[tw.flexCol, { backgroundColor: lightGary.primary }]}>
      <View style={[tw.flexRow, tw.justifyBetween, tw.p2]}>
        <Text style={[tw.textGray600]}>{`已选择 ${numSelected}`}</Text>
        <TouchableOpacity onPress={() => handleClose()}>
          <View style={[tw.flexCol]}>
            <Icon
              name="times"
              type="font-awesome-5"
              size={15}
              iconStyle={[tw.textGray600, tw.mB1]}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Animatable.View style={[tw.flexRow, tw.justifyEvenly]}>
        {numSelected === 1 ? (
          <>
            <TouchableOpacity onPress={() => handleReplyMessage()}>
              <View style={[tw.flexCol, tw.p3]}>
                <Icon
                  name="reply"
                  type="font-awesome-5"
                  size={20}
                  iconStyle={[tw.textGray800, tw.mB1]}
                />
                <Text style={[tw.textGray800]}>{t("chat.reply")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePinMessage()}>
              <View style={[tw.flexCol, tw.p3]}>
                <Icon
                  name="thumbtack"
                  type="font-awesome-5"
                  size={20}
                  iconStyle={[tw.textGray800, tw.mB1]}
                />
                <Text style={[tw.textGray800]}>{t("chat.pin_f")}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[tw.flexCol, tw.p3]}>
                <Icon
                  name="edit"
                  type="font-awesome-5"
                  size={20}
                  iconStyle={[tw.textGray800, tw.mB1]}
                />
                <Text style={[tw.textGray800]}>{t("cmn.edit")}</Text>
              </View>
            </TouchableOpacity>
          </>
        ) : null}
        <TouchableOpacity onPress={() => handleDeleteMessage()}>
          <View style={[tw.flexCol, tw.p3]}>
            <Icon
              name="trash-alt"
              type="font-awesome-5"
              size={20}
              iconStyle={[tw.textGray800, tw.mB1]}
            />
            <Text style={[tw.textGray800]}>{t("cmn.del")}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleForwardMessages()}>
          <View style={[tw.flexCol, tw.p3]}>
            <Icon
              name="share"
              type="font-awesome-5"
              size={20}
              iconStyle={[tw.textGray800, tw.mB1]}
            />
            <Text style={[tw.textGray800]}>{t("chat.forward")}</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default MessageFunctionBar;

const styles = StyleSheet.create({});
