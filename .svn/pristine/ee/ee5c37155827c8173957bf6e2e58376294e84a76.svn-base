/*
 * @Description: 聊天组屏幕
 * @Author: Lewis
 * @Date: 2021-01-19 10:32:11
 * @LastEditTime: 2021-07-08 15:24:16
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { TransparentHeaderOptions } from "./../Options/index";
import SettingPage from "../../pages/user/setting/index";
const MyProfileStack = createStackNavigator();

const MyProfileStackNavigator = () => {
  return (
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen
        name="Setting"
        component={SettingPage}
        options={TransparentHeaderOptions()}
      />
    </MyProfileStack.Navigator>
  );
};

export default MyProfileStackNavigator;

const styles = StyleSheet.create({});
