/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-21 14:59:28
 * @LastEditTime: 2021-07-15 18:56:10
 * @LastEditors: Kenzi
 */

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { t } from "../../i18n";
import axios from "axios";
import { store } from "../../redux/store";
import { getToken } from "./secureStore";

//樹狀數據搜索
export const searchTree = (element, matchingName) => {
  if (element.name.includes(matchingName)) {
    return element;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingName);
    }
    return result;
  }
  return null;
};

//獲取用戶ip
export const getClientIp = async () => {
  try {
    const res = await axios.get("https://api.ipify.org?format=json");
    const ip = res.data;
    return ip;
  } catch (error) {
    console.error(error);
  }
};

//fetchData
export const fetchData = async (fetchApi, params) => {
  const res = await fetchApi(params);
  const data = await res.data;
  const tableData = data.data;
  return tableData;
};

//检查网路连接
export const checkConnected = () => {
  return NetInfo.fetch().then((state) => {
    return state.isConnected;
  });
};
//设计tab显示
export const setTabBarVisible = (route, name) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName && routeName !== name) {
    return false;
  }
  return true;
};

//推拨通知
export const schedulePushNotification = async (
  title,
  subtitle,
  body,
  page,
  params
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      subtitle: subtitle,
      body: body,
      data: { page: page, params: params },
    },
    trigger: { seconds: 1 },
  });
};

//state
export const onChangeObjState = (e, setState) => {
  const { name, value } = e.target;
  setState((prevState) => ({ ...prevState, [name]: value }));
};

export const onUpdateObjState = (name, value, setState) => {
  setState((prevState) => ({ ...prevState, [name]: value }));
};

export const checkIsSameArray = (array1, array2) => {
  const checkAllIncludes = array2.every((item) => array1.includes(item));
  const checkIsSameLength = array2.length === array1.length;

  if (checkAllIncludes && checkIsSameLength) return true;
  return false;
};

//選取項目

/**
 *
 * @param {Boolean} multiple 是否為多選
 * @param {Object} item 選取的項目
 * @param {Array} selected 已經選取的項目
 * @param {Function} setSelected 設定已經選取的項目
 * @param {String} key 用什麼key來比對項目
 * @param {String} messageWhenSelectSameItem 選取同樣項目時的訊息,不显示为""
 * @param {Boolean} removeWhenSelectSameItem 選取相同項目時刪除該項目
 * @param {String} type select or remove
 */

export const handleOnSelect = (
  multiple,
  item,
  selected,
  setSelected,
  key,
  messageWhenSelectSameItem,
  removeWhenSelectSameItem,
  type = "select"
) => {
  let newSelected = [...selected];

  const isExist = newSelected.findIndex(
    (element) => element[key] === item[key]
  );

  if (
    isExist !== -1 &&
    messageWhenSelectSameItem.length > 0 &&
    type !== "remove"
  ) {
    Alert.alert("", messageWhenSelectSameItem);
  }

  if (multiple) {
    if (isExist !== -1) {
      if (removeWhenSelectSameItem || type === "remove") {
        newSelected.splice(isExist, 1);
      }
    } else {
      newSelected.push(item);
    }
    setSelected(newSelected);
  } else {
    if (isExist !== -1) {
      setSelected([]);
    } else {
      setSelected([item]);
    }
  }
};

export const createFileUrl = async (filename) => {
  const token = await getToken();

  const baseUrl = __DEV__
    ? process.env.REACT_APP_API_URL_DEVELOPMENT
    : process.env.REACT_APP_API_URL_PRODUCTION;

  const fileBasePath = "/fs/download/";
  const filePath = `${baseUrl}${fileBasePath}${filename}/${
    token.split(" ")[1]
  }`;
  console.log("filePath :>> ", filePath);

  return filePath;
};
