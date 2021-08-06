/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-21 16:06:47
 * @LastEditTime: 2021-07-21 16:13:25
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { toAddNewFriendPage } from "./../../../pages/chat/utils";

const AddFriend = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => toAddNewFriendPage(navigation)}>
        <Icon color="white" name="adduser" type="ant-design" />
      </TouchableOpacity>
    </View>
  );
};

export default AddFriend;

const styles = StyleSheet.create({});
