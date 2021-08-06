/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:26:51
 * @LastEditTime: 2021-07-21 14:22:51
 * @LastEditors: Kenzi
 */

import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import routerReducer from "./router/router.reducer";
import wsReducer from "./ws/ws.reducer";
import authReducer from "./auth/auth.reducer";
import appReducer from "./app/app.reducer";
import chatReducer from "./chat/chat.reducer";
import networkReducer from "./network/network.reducer";
import createSecureStore from "redux-persist-expo-securestore";
import userReducer from "./user/user.reducer";
import notificationReducer from "./notification/notification.reducer";

// Secure storage
const secureStorage = createSecureStore();

const mainPersistConfig = {
  key: "main",
  storage: AsyncStorage,
  whitelist: ["router", "ws", "app", "chat", "user", "notify"],
};

const securePersistConfig = {
  key: "secure",
  storage: secureStorage,
  whitelist: ["auth"],
};

const mainReducer = combineReducers({
  router: routerReducer,
  ws: wsReducer,
  app: appReducer,
  chat: chatReducer,
  network: networkReducer,
  user: userReducer,
  notify: notificationReducer,
});

const secureReducer = combineReducers({
  auth: authReducer,
});

const rootReducer = combineReducers({
  main: persistReducer(mainPersistConfig, mainReducer),
  secure: persistReducer(securePersistConfig, secureReducer),
});

// const appReducer = combineReducers({

//   router: routerReducer,
//   ws: wsReducer,
//   auth: authReducer,
//   setting: appReducer,
//   chat: chatReducer,
//   network: networkReducer,
// });

// const rootReducer = (state, action) => {
//   // when a logout action is dispatched it will reset redux state
//   state = undefined;

//   if (
//     action.type === authActionType.LOGOUT_SUCCESS ||
//     action.type === authActionType.LOGOUT_FAILURE ||
//     action.type === authActionType.REFRESH_TOKEN_FAILURE
//   ) {
//     state = undefined;
//   }

//   return appReducer(state, action);
// };

export default rootReducer;
