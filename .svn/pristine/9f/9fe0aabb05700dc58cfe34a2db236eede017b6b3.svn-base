/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-16 10:24:10
 * @LastEditTime: 2021-06-30 18:59:25
 * @LastEditors: Kenzi
 */
import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

const VideoContainer = ({ url }) => {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default VideoContainer;
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  video: {
    width: "90%",
    height: "90%",
  },
});
