/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:17:21
 * @LastEditTime: 2021-07-07 17:27:04
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
import { NativeBaseProvider, Text, Box, extendTheme } from "native-base";
import theme from "./src/theme/pirmary";
const App = () => {
  useEffect(() => {
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
