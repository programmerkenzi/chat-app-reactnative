/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-08-02 18:07:46
 * @LastEditTime: 2021-08-04 18:20:23
 * @LastEditors: Kenzi
 */

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { t } from "../../i18n";
import { tw } from "react-native-tailwindcss";
import { Icon } from "react-native-elements";
import { decodeMessage } from "./../../library/utils/crypto";
import { useState } from "react";
import * as Animatable from "react-native-animatable";

const PinMessage = ({ messages, handleClose, publicKey }) => {
  const [boxMinHeight, setBoxMinHeight] = useState(
    messages.length > 1 ? 80 : 60
  );
  const [animation, setAnimation] = useState("fadeInDown");
  const [extendedBox, setExtendedBox] = useState(false);

  const toggleBox = () => {
    setExtendedBox(!extendedBox);
  };

  const renderMessage = (message) => {
    const decodedMessage =
      typeof message === "string" ? message : decodeMessage(message, publicKey);

    return (
      <View
        style={[
          tw.p1,
          tw.bgGray100,
          tw.flexRow,
          tw.justifyBetween,
          tw.pR2,
          tw.mB1,
        ]}
      >
        <View
          style={[
            tw.p1,
            tw.borderL2,
            tw.justifyCenter,
            tw.borderGray500,
            { minHeight: 45, width: "95%" },
          ]}
        >
          <TouchableOpacity>
            <View style={[tw.flexRow, tw.itemsCenter]}>
              <Icon
                name="thumbtack"
                type="font-awesome-5"
                size={15}
                iconStyle={[tw.textBlue600, tw.mX1]}
              />
              <Text style={[tw.textGray600]}>{decodedMessage}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[tw.flexCol, tw.justifyCenter]}>
          <TouchableOpacity onPress={() => handleClose(message)}>
            <Icon
              name="times"
              type="font-awesome-5"
              size={15}
              iconStyle={[tw.textGray600]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return messages ? (
    <Animatable.View
      animation={animation}
      delay={1000}
      easing="ease-in-out"
      style={[
        tw.overflowHidden,
        tw.bgGray200,
        {
          minHeight: boxMinHeight,
          maxHeight: extendedBox ? "50%" : boxMinHeight,
        },
      ]}
    >
      {messages.length > 1 ? (
        <View
          style={[tw.pR2, tw.flexRow, tw.justifyBetween, tw.itemsCenter, tw.p1]}
        >
          <TouchableOpacity>
            <Text style={[tw.textBlack]}>{t("chat.pin")}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleBox()}>
            <Icon
              name={extendedBox ? "chevron-down" : "chevron-up"}
              type="font-awesome-5"
              size={15}
            />
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView>
        {messages.map((message) => renderMessage(message.text))}
      </ScrollView>
    </Animatable.View>
  ) : null;
};

export default PinMessage;

const styles = StyleSheet.create({});
