/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-14 17:54:54
 * @LastEditTime: 2021-07-15 18:53:11
 * @LastEditors: Kenzi
 */

import axios from "axios";
import queryString from "query-string";
import { store } from "./../redux/store";
import { Alert } from "react-native";
import { startLoading } from "../redux/auth/auth.actions";
import { stopLoading } from "./../redux/auth/auth.actions";
import { onUserTokenExpired } from "./../redux/auth/auth.actions";
import { getToken } from "../library/utils/secureStore";

const axiosChatClient = axios.create({
  baseURL: __DEV__
    ? process.env.REACT_APP_API_URL_DEVELOPMENT
    : process.env.REACT_APP_API_URL_PRODUCTION,
  paramsSerializer: (params) => queryString.stringify(params),
  timeout: 5000, // request timeout
});

// request interceptor
axiosChatClient.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const { socketIoClientId } = state.ws;
    const userToken = await getToken();
    if (userToken) {
      config.headers[
        "Authorization"
      ] = `${userToken} socket ${socketIoClientId}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(stopLoading());
    // do something with request error
    Alert.alert("axios发生错误!", `${error}`);
    return Promise.reject(error);
  }
);
// response interceptor
axiosChatClient.interceptors.response.use(
  (response) => {
    console.log("response :>> ", response);
    store.dispatch(stopLoading());

    const res = response.data;
    const url = response.config.url;
    if (!res.success) {
      Alert.alert(response.status, res.data.message);
    }
    return res;
  },
  (error) => {
    store.dispatch(stopLoading());
    Alert.alert("发生错误!", `${error}`);
    return Promise.reject(error);
  }
);

export default axiosChatClient;
