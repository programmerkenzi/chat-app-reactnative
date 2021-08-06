/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-21 14:35:06
 * @LastEditTime: 2021-07-06 11:49:27
 * @LastEditors: Kenzi
 */

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as ImagePicker from "expo-image-picker";
import { store } from "../../redux/store";

//检查照片器权限
export const checkCameraPermission = async () => {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (granted) {
    return true;
  }
  return false;
};
//检查照片器权限
export const handleCheckMediaLibraryPermission = async () => {
  let { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (granted) {
    return true;
  }
  return false;
};

//显示通知权限
export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // console.log("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    // console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

//依权限过滤菜单或功能

/**
 * @param {Array} fnsOrMenu 要用权限过滤的菜单或功能 : [{ pms: pms_name }]
 * @param {Function} setFnsOrMenu 设定过滤后的菜单或功能
 */

export const setHasPermissions = (fnsOrMenu, setFnsOrMenu) => {
  const state = store.getState();
  const auth = state.auth;
  const userInfo = auth.userInfo;
  const permissions = userInfo.permission;

  let hasPms = [];

  fnsOrMenu.forEach((item) => {
    const pms = item.pms;
    if (!pms) {
      hasPms.push(item);
    } else {
      const checkHasPms = permissions.filter((p) => p === pms);
      if (checkHasPms.length) {
        hasPms.push(item);
      }
    }
    setFnsOrMenu(hasPms);
  });
};
