/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-02 10:07:25
 * @LastEditTime: 2021-08-04 14:42:55
 * @LastEditors: Kenzi
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";

import { Icon } from "react-native-elements";
import { darkGary, lightGary } from "./../../styles/color";
import { t } from "../../i18n";
import { connect } from "react-redux";
import { selectUserToken } from "./../../redux/auth/auth.selector";
import { createStructuredSelector } from "reselect";

const ImageLoader = ({ url, token }) => {
  const width = Dimensions.get("screen").width / 3;
  const height = width / 1.5;
  const maxWidth = Dimensions.get("screen").width * 0.45;
  const maxHeight = Dimensions.get("screen").height * 0.3;

  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState(false);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  //加载图片
  const onLoad = () => {
    Image.getSize(
      url,

      //加载成功
      (width, height) => {
        if (width && height) {
          if (width >= maxWidth) {
            setImgWidth(maxWidth);
          } else {
            setImgWidth(width);
          }
          if (height >= maxHeight) {
            setImgHeight(maxHeight);
          } else {
            setImgHeight(height);
          }
          setLoading(false);
          Image.resolveAssetSource(url);
        }
      },
      //加载失败
      (error) => {
        // console.log("error :>> ", error);
        setLoading(false);
        setFailure(true);
      }
    );
  };

  useEffect(() => {
    onLoad();
  }, []);

  return loading ? (
    <View
      style={{
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lightGary.primary,
      }}
    >
      <ActivityIndicator color="#42C2F3" size="large" />
    </View>
  ) : failure ? (
    <View
      style={{
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: lightGary.primary,
      }}
    >
      <Icon
        name="exclamation-triangle"
        type="font-awesome-5"
        color={darkGary.secondary}
      />
      <Text style={{ color: darkGary.secondary }}>{t("cmn.image_f")}</Text>
    </View>
  ) : (
    <Image
      source={{ uri: url, headers: { authorization: "token" } }}
      resizeMethod="resize"
      style={{
        height: imgHeight,
        width: imgWidth,
        resizeMode: "contain",
        overflow: "hidden",
      }}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectUserToken,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(ImageLoader);

const styles = StyleSheet.create({});
