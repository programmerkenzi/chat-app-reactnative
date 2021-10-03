/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-06 11:55:32
 * @LastEditTime: 2021-08-10 09:30:58
 * @LastEditors: Kenzi
 */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import { logoutStart } from "../../../redux/auth/auth.actions";
import { tw } from "react-native-tailwindcss";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "./../../../redux/user/user.selector";
import { Avatar, Icon } from "react-native-elements";
import { handleUploadMultipleFile } from "./../../../library/utils/resources";
import { createFileUrl } from "./../../../library/utils/utils";
import { green, red } from "../../../styles/color";
import { t } from "../../../i18n";
import { TouchableOpacity } from "react-native";
import { updateUserAvatar } from "../../../chat_api/user";
import * as DocumentPicker from "expo-document-picker";
import {
  updateAvatar,
  updateBackground,
} from "./../../../redux/user/user.action";
import bg from "../../../../assets/bg.jpg";

const SettingPage = ({ logout, userInfo, updateAvatar, updateBackground }) => {
  const { avatar, name, status, public_id, background } = userInfo;

  const [avatarUrl, setAvatarUrl] = useState(
    avatar.length > 0 ? createFileUrl(avatar) : "http://"
  );
  const [imageUri, setImageUri] = useState(avatarUrl);
  const [selectedFile, setSelectedFile] = useState(null);

  //选取头像图片
  const handleEditImage = async () => {
    const file = await DocumentPicker.getDocumentAsync({ type: "image/jpeg" });
    //const file = await handleGetImageLibrary(true);

    if (file.type) {
      const imageUri = file.uri;
      setSelectedFile(file);
      setImageUri(imageUri);
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
  const handleChangeAvatar = async () => {
    const uploadAvatar = await handleUploadMultipleFile([selectedFile]);
    const { success, file } = uploadAvatar;
    if (success) {
      const filename = file[0];
      const res = await updateUserAvatar(filename);
      if (res.success) {
        updateAvatar(filename);
        const newAvatarUrl = createFileUrl(filename);
        setAvatarUrl(newAvatarUrl);
        setImageUri(newAvatarUrl);
      }
    }
  };
  return (
    <ImageBackground style={styles.bg} source={background ? background : bg}>
      <View
        style={[
          tw.flex1,
          tw.flexCol,
          tw.justifyBetween,
          tw.pT20,
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
            <Text style={[tw.selfCenter, tw.textGray600, tw.mT2]}>
              {status}
            </Text>
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
              <TouchableOpacity
                onPress={() => handlePressSettingItem(item.name)}
              >
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
    </ImageBackground>
  );
};
const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutStart()),
  updateAvatar: (filename) => dispatch(updateAvatar(filename)),
  updateBackground: (filename) => dispatch(updateBackground(filename)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    display: "flex",
    resizeMode: "cover",
    padding: 10,
  },
});
