/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-06 11:55:32
 * @LastEditTime: 2021-07-21 18:12:03
 * @LastEditors: Kenzi
 */

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";
import { logoutStart } from "../../../redux/auth/auth.actions";
import { Box } from "native-base";
import { tw } from "react-native-tailwindcss";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "./../../../redux/user/user.selector";
import { Avatar, Icon } from "react-native-elements";
import { handleGetImageLibrary } from "./../../../library/utils/resources";
import { createFileUrl } from "./../../../library/utils/utils";
import { green, red } from "../../../styles/color";

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

  //修改头像
  const handleChangeAvatar = async () => {};
  return (
    <View
      style={[tw.flex1, tw.flexCol, tw.justifyBetween, tw.pT20, tw.bgWhite]}
    >
      <View style={[tw.flex1, tw.flexCol, tw.itemsCenter, tw.alignCenter]}>
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
      <View style={[tw.flex2]}>
        <Button onPress={() => logout()}>logout</Button>
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
