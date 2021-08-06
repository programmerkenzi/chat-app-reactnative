/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-28 16:15:26
 * @LastEditTime: 2021-07-01 12:39:19
 * @LastEditors: Kenzi
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import ImageLoader from "../ImageLoader/ImageLoader";
import ImageView from "react-native-image-viewing";

//显示图片
const ImageContainer = ({ imgs }) => {
  //给照片预览器使用
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const maxWidth = Dimensions.get("screen").width * 0.6;
  const maxHeight = Dimensions.get("screen").height * 0.3;
  const [showImageViewerIndex, setImageViewerIndex] = useState(0);

  // useEffect(() => {
  //   const imageLength = imgs.length;
  //   if (imageLength === 1) {
  //     setImageWidth(maxWidth);
  //     setImageHeight(maxHeight);
  //   } else if (imageLength === 2) {
  //     setImageWidth(maxWidth / 2);
  //     setImageHeight(maxHeight);
  //   } else if (imageLength >= 3) {
  //     setImageWidth(maxWidth / 2);
  //     setImageHeight(maxHeight / 2);
  //   }
  // }, []);

  //打开图片
  const handleOpenImageViewer = (index) => {
    setImageViewerIndex(index);

    setTimeout(() => {
      setShowImageViewer(true);
    }, 10);
  };

  const createImageViewList = () => {
    const imageArray = [];
    imgs.forEach((img) => {
      imageArray.push({ uri: img });
    });
    setImageUrls(imageArray);
  };

  useEffect(() => {
    createImageViewList();
  }, [imgs]);

  return (
    <>
      <FlatList
        listKey={(item, index) => `_key${index.toString()}`}
        data={imgs}
        numColumns={2}
        initialNumToRender={1}
        extraData={imageUrls}
        keyExtractor={(item, index) => `${item.url} - ${index}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleOpenImageViewer(index)}>
            <ImageLoader url={item} index={index} />
          </TouchableOpacity>
        )}
      />

      <ImageView
        listKey={(item, index) => `_key${index.toString()}`}
        images={imageUrls}
        imageIndex={showImageViewerIndex}
        visible={showImageViewer}
        onRequestClose={() => setShowImageViewer(false)}
      />
    </>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({});
