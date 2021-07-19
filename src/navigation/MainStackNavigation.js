/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-06 11:09:28
 * @LastEditTime: 2021-07-16 18:43:57
 * @LastEditors: Kenzi
 */

/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-09 18:25:52
 * @LastEditTime: 2021-06-30 17:36:52
 * @LastEditors: Kenzi
 */

import React, { useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserToken } from "./../redux/auth/auth.selector";
import { getUserInfoStart } from "../redux/auth/auth.actions";
import { updateCurrentPageInfo } from "../redux/router/router.action";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import ChatTabNavigation from "./chat/ChatTabNavigation";
import LoginPage from "./../pages/user/login/index";
import { updateNetworkConnectionStatus } from "./../redux/network/network.action";
import { selectAppState, selectLocale } from "../redux/app/app.selector";
import { AppState } from "react-native";
import { onAppStateChange } from "../redux/app/app.action";
const Stack = createStackNavigator();

const MainStackNavigation = ({
  userToken,
  updateCurrentPageInfo,
  locale,
  updateNetworkConnectionStatus,
  appState,
  appStateChange,
}) => {
  //检查网路连接

  useEffect(() => {
    const netWorkListener = NetInfo.addEventListener((state) => {
      const isInternetReachable = state.isInternetReachable;
      updateNetworkConnectionStatus(isInternetReachable);
    });
    return () => {
      netWorkListener();
    };
  }, []);

  //路由追踪
  const navigationRef = useRef();
  const routeNameRef = useRef();
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        return navigationRef.current?.navigate(data.page, data.params);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  //app状态追踪
  const currentAppState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      currentAppState.current.match(/inactive|background/) &&
      nextAppState === "active"
    )
      currentAppState.current = nextAppState;
    appStateChange(nextAppState);
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      //追踪路由变化
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        const currentRouteParams =
          navigationRef.current.getCurrentRoute().params;
        if (previousRouteName !== currentRouteName) {
          updateCurrentPageInfo(
            previousRouteName,
            currentRouteName,
            currentRouteParams
          );
        }

        // 存取目前路由
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator>
        {!userToken ? (
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Chat"
            component={ChatTabNavigation}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(getUserInfoStart()),
  updateCurrentPageInfo: (previous_name, name, params) =>
    dispatch(updateCurrentPageInfo({ previous_name, name, params })),
  updateNetworkConnectionStatus: (status) =>
    dispatch(updateNetworkConnectionStatus(status)),
  appStateChange: (status) => dispatch(onAppStateChange(status)),
});

const mapStateToProps = createStructuredSelector({
  userToken: selectUserToken,
  locale: selectLocale,
  appState: selectAppState,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainStackNavigation);
