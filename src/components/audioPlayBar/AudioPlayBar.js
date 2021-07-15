/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-16 18:18:14
 * @LastEditTime: 2021-07-14 16:35:10
 * @LastEditors: Kenzi
 */

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Icon } from "react-native-elements";

const AudioPlayBar = ({ id, audio }) => {
  const [uri, setUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [sound, setSound] = useState(null);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: uri });
    setSound(sound);

    setIsPlaying(!isPlaying);

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
      //撥放完更新撥放狀態為false
      sound.setOnPlaybackStatusUpdate((status) =>
        setIsPlaying(status.isPlaying)
      );
    }
  }
  const loadAudio = async () => {
    if (audio) {
      setTimeout(() => {
        setUri(audio);
        setLoading(false);
      }, 500);
    }
    return;
  };

  useEffect(() => {
    setUri(audio);
  }, [id]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return loading ? (
    <View style={styles.playButtonContainer}>
      <ActivityIndicator color="#42C2F3" size="large" />
    </View>
  ) : (
    <View style={styles.playButtonContainer}>
      <TouchableOpacity onPress={() => playSound()}>
        {isPlaying ? (
          <Icon
            name="pause-circle"
            color="rgba(0,0,0,0.8)"
            size={50}
            style={styles.icon}
            type="font-awesome-5"
          />
        ) : (
          <Icon
            name="play-circle"
            color="rgba(0,0,0,0.8)"
            size={50}
            style={styles.icon}
            type="font-awesome-5"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AudioPlayBar;

const styles = StyleSheet.create({
  playButtonContainer: {
    width: 77.5,
    height: 50,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 40,
    alignSelf: "center",
    color: "#fff",
  },
});
