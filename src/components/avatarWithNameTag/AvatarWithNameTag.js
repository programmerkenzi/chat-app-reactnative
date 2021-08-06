/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-20 10:55:50
 * @LastEditTime: 2021-07-14 17:05:03
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";

const AvatarWithNameTag = ({ item }) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      <Avatar
        rounded
        size={"small"}
        title={item.name.toUpperCase().substring(0, 2)}
        source={{
          uri: item.avatar.length > 0 ? item.avatar : "http://",
        }}
      />
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default AvatarWithNameTag;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    maxWidth: "25%",
    overflow: "hidden",
    backgroundColor: "#fbfbfb",
    borderRadius: 25,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  itemText: {
    marginLeft: 2,
    fontWeight: "bold",
    color: "#1c1c1c",
  },
});
