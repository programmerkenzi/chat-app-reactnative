/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:26:51
 * @LastEditTime: 2021-07-09 15:09:25
 * @LastEditors: Kenzi
 */

import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import routerReducer from "./router/router.reducer";
import wsReducer from "./ws/ws.reducer";
import authReducer from "./auth/auth.reducer";
import settingReducer from "./setting/setting.reducer";
import chatReducer from "./chat/chat.reducer";
import authActionType from "./auth/auth.type";
import networkReducer from "./network/network.reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["router", "ws", "setting", "auth", "chat"],
};

const appReducer = combineReducers({
  router: routerReducer,
  ws: wsReducer,
  auth: authReducer,
  setting: settingReducer,
  chat: chatReducer,
  network: networkReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state

  if (action.type === authActionType.LOGOUT_SUCCESS) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
