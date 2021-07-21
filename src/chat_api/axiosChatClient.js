/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-06-14 17:54:54
 * @LastEditTime: 2021-07-21 13:56:58
 * @LastEditors: Kenzi
 */

import axios from "axios";
import queryString from "query-string";
import { store } from "./../redux/store";
import { Alert } from "react-native";
import {
  logoutStart,
  onRefreshTokenStart,
  startLoading,
} from "../redux/auth/auth.actions";
import { stopLoading } from "./../redux/auth/auth.actions";
import { onUserTokenExpired } from "./../redux/auth/auth.actions";
import { onRefreshToken } from "./auth";
import { onRefreshTokenSuccess } from "./../redux/auth/auth.actions";
import * as Device from "expo-device";

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
    const { socketIoClientId } = state.main.ws;
    const { userToken } = state.secure.auth;
    const device_id = Device.osBuildFingerprint;

    if (userToken) {
      config.headers[
        "Authorization"
      ] = `${userToken} socket ${socketIoClientId} device ${device_id}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(stopLoading());
    // do something with request error
    Alert.alert("axios发生错误!", `${error}`);
    return;
  }
);
// response interceptor
axiosChatClient.interceptors.response.use(
  (response) => {
    console.log("response :>> ", response);
    store.dispatch(stopLoading());
    const res = response.data;

    return res;
  },
  async function (error) {
    store.dispatch(stopLoading());
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url.includes("/refresh-token")
    ) {
      await store.dispatch(logoutStart());
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // await execution of the store async action before
      // return
      const state = store.getState();
      const { refreshToken } = state.secure.auth;
      const res = await onRefreshToken({ refreshToken: refreshToken });
      if (res.success) {
        await store.dispatch(
          onRefreshTokenSuccess(res.accessToken, res.refreshToken)
        );
        return axiosChatClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosChatClient;
