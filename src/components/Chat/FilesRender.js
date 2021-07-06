/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-29 14:02:09
 * @LastEditTime: 2021-07-06 12:48:47
 * @LastEditors: Kenzi
 */
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import FileRender from "./../fileRender/FileRender";
import { lightGary } from "./../../styles/color";
import ImageContainer from "./ImageContainer";
import AudioPlayBar from "../audioPlayBar/AudioPlayBar";
import VideoContainer from "./VideoContainer";
const FilesRender = ({ files }) => {
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const screenWidth = Dimensions.get("screen").width;

  useEffect(() => {
    const withVideos = files.filter((file) => file.mime_type.includes("video"));
    setVideos(withVideos);
    const withImages = files.filter((file) => file.mime_type.includes("image"));
    const imageUrls = withImages.map((image) => image.url);
    setImages(imageUrls);
  }, []);

  const itemRender = (file) => {
    const mime_type = file.mime_type;
    return mime_type.includes("video") || mime_type.includes("image") ? null : (
      <View
        style={[
          styles.item,
          {
            width: screenWidth / 3 - 26,
          },
        ]}
      >
        {mime_type.includes("audio") ? (
          <AudioPlayBar audio={file.url} id={file.name} />
        ) : (
          <FileRender file={file} />
        )}
      </View>
    );
  };

  return (
    <View>
      <FlatList
        listKey={(item, index) => `_key${index.toString()}`}
        data={files}
        numColumns={3}
        horizontal={false}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => "key" + item.url}
        renderItem={({ item }) => itemRender(item)}
      />
      <FlatList
        listKey={(item, index) => `_key${index.toString()}`}
        data={videos}
        horizontal={false}
        keyExtractor={(item) => item.url + "key"}
        renderItem={({ item }) => <VideoContainer url={item.url} />}
      />
      <ImageContainer imgs={images} />
    </View>
  );
};

export default FilesRender;

const styles = StyleSheet.create({
  container: {
    width: "100%",

    marginBottom: 35,
    padding: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    height: 100,
    borderColor: lightGary.primary,
  },
  list: {},
});
