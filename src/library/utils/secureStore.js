/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-15 17:58:34
 * @LastEditTime: 2021-07-15 18:32:35
 * @LastEditors: Kenzi
 */
import * as SecureStore from "expo-secure-store";

export const saveToken = async (value) => {
  await SecureStore.setItemAsync("userToken", value);
};

export const getToken = async () => {
  let result = await SecureStore.getItemAsync("userToken");
  if (result) return result;
  return false;
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync("userToken");
};
