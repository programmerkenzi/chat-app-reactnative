/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:17:21
 * @LastEditTime: 2021-07-19 14:30:03
 * @LastEditors: Kenzi
 */
import React, { useEffect } from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { MenuProvider } from "react-native-popup-menu";
import MainStackNavigation from "./src/navigation/MainStackNavigation";
import CustomSpinner from "./src/components/spinner/Spinner";
import { getLanguage } from "./src/i18n/index";
import Notification from "./src/components/notification/Notification";
import { NativeBaseProvider } from "native-base";
import theme from "./src/theme/pirmary";
import * as TaskManager from "expo-task-manager";
import {
  BACKGROUND_FETCH_TASK,
  refreshTokenBackground,
} from "./src/library/utils/backgroundTask";
import {
  clearAllTimers,
  refreshTokenInBackground,
} from "./src/redux/auth/utils";
const App = () => {
  useEffect(() => {
    //背景任务注册
    // TaskManager.defineTask(
    //   BACKGROUND_FETCH_TASK.REFRESH_TOKEN_WHEN_TIMEOUT,
    //   async () => {
    //     const now = Date.now();
    //     console.log(
    //       `Got background fetch call at date: ${new Date(now).toISOString()}`
    //     );

    //     // Be sure to return the successful result type!
    //     //clearAllTimers();
    //     return refreshTokenInBackground();
    //   }
    // );
    //语言初始设定
    getLanguage();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <MenuProvider>
          <MainStackNavigation />
          <Notification />
          <CustomSpinner />
        </MenuProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
