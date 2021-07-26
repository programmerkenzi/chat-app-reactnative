/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-06 11:55:32
 * @LastEditTime: 2021-07-26 14:44:13
 * @LastEditors: Kenzi
 */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlightBase,
} from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";
import { logoutStart } from "../../../redux/auth/auth.actions";
import { Box } from "native-base";
import { tw } from "react-native-tailwindcss";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "./../../../redux/user/user.selector";
import { Avatar, Icon, ListItem } from "react-native-elements";
import { handleGetImageLibrary } from "./../../../library/utils/resources";
import { createFileUrl } from "./../../../library/utils/utils";
import { darkGary, green, red } from "../../../styles/color";
import { t } from "../../../i18n";
import { lightGary } from "./../../../styles/color";
import { TouchableHighlight } from "react-native";
import { TouchableOpacity } from "react-native";

const SettingPage = ({ logout, userInfo }) => {
  const { avatar, name, status, public_id } = userInfo;

  const avatarUrl = avatar.length > 0 ? createFileUrl(avatar) : "";

  const [imageUri, setImageUri] = useState(avatarUrl);

  //选取头像图片
  const handleEditImage = async () => {
    const picker = await handleGetImageLibrary();
    if (picker.cancelled === false) {
      const imageUri = picker.uri;
      return setImageUri(imageUri);
    }

    return;
  };

  const settingItem = [
    {
      title: t("cmn.lang"),
      name: "lang",
      icon: "globe-europe",
    },

    {
      title: t("cmn.color_m"),
      name: "color",
      icon: "adjust",
    },

    {
      title: t("cmn.logout"),
      name: "logout",
      icon: "sign-out-alt",
    },
  ];

  const handlePressSettingItem = async (name) => {
    if (name === "logout") return await logout();

    return console.log(name);
  };

  //修改头像
  const handleChangeAvatar = async () => {};
  return (
    <View
      style={[
        tw.flex1,
        tw.flexCol,
        tw.justifyBetween,
        tw.pT20,
        tw.bgWhite,
        tw.pX2,
        tw.pB5,
      ]}
    >
      <View style={[tw.flex1, tw.flexCol, tw.itemsCenter, tw.alignCenter]}>
        {/* 会员信息 */}
        <View style={[tw.flex2]}>
          <Avatar
            rounded
            size="xlarge"
            title={name.toUpperCase().substring(0, 2)}
            source={{
              uri: imageUri,
            }}
          />
          {imageUri === avatarUrl ? (
            <Icon
              name="create"
              type="iconicons"
              size={15}
              containerStyle={[tw.selfEnd, { marginTop: -40 }]}
              raised
              onPress={() => handleEditImage()}
            />
          ) : (
            <>
              <Icon
                name="close"
                type="iconicons"
                size={15}
                containerStyle={[tw.selfStart, { marginTop: -40 }]}
                reverse
                color={red.primary}
                onPress={() => setImageUri(avatarUrl)}
              />
              <Icon
                name="check"
                type="iconicons"
                size={15}
                containerStyle={[tw.selfEnd, { marginTop: -40 }]}
                color={green.primary}
                reverse
                onPress={() => handleChangeAvatar()}
              />
            </>
          )}
        </View>
        <View style={[tw.flex1, tw.flexCol, tw.pX10]}>
          <Text style={[tw.selfCenter, tw.mT1, tw.text2xl]}>{name}</Text>
          <Text
            style={[tw.selfCenter, tw.mT1, tw.textGray800]}
          >{`@${public_id}`}</Text>
          <Text style={[tw.selfCenter, tw.textGray600, tw.mT2]}>{status}</Text>
        </View>
      </View>
      {/* 功能设定 */}
      <View
        style={[
          tw.flex2,
          tw.flexCol,
          tw.wPy,
          tw.p5,
          tw.bgGray300,
          tw.roundedLg,
          tw.shadowMd,
        ]}
      >
        <FlatList
          keyExtractor={(item) => {
            item.name;
          }}
          data={settingItem}
          renderItem={({ item, i }) => (
            <TouchableOpacity onPress={() => handlePressSettingItem(item.name)}>
              <View
                style={[
                  tw.flex1,
                  tw.h12,
                  tw.flexRow,
                  tw.textCenter,
                  tw.justifyBetween,
                  tw.borderB,
                  tw.itemsCenter,
                  tw.borderGray400,
                ]}
              >
                <View style={[tw.flexRow]}>
                  <Icon
                    name={item.icon}
                    type="font-awesome-5"
                    color="#515563"
                  />
                  <Text style={[tw.textGray600, tw.selfCenter, tw.mL10]}>
                    {item.title}
                  </Text>
                </View>
                <Icon
                  name="chevron-right"
                  type="font-awesome-5"
                  size={12}
                  color="#515563"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);

const styles = StyleSheet.create({});
