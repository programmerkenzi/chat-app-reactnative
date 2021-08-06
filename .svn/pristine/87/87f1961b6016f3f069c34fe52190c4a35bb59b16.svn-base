/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-21 15:47:53
 * @LastEditTime: 2021-07-21 16:05:29
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { tw } from "react-native-tailwindcss";
import { useNavigation, useRoute } from "@react-navigation/native";
import { toSelectMembersPage } from "../../../pages/chat/utils";
import { TouchableOpacity } from "react-native";

const AddGroupChat = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => toSelectMembersPage(navigation)}>
        <Icon color="white" name="addusergroup" type="ant-design" />
      </TouchableOpacity>
    </View>
  );
};

export default AddGroupChat;

const styles = StyleSheet.create({});
