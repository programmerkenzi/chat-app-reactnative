/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:26:51
 * @LastEditTime: 2021-07-05 18:41:46
 * @LastEditors: Kenzi
 */

import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import routerReducer from "./router/router.reducer";
import authActionType from "./auth/auth.type";
import wsReducer from "./ws/ws.reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["router", "ws"],
};

const appReducer = combineReducers({
  router: routerReducer,
  ws: wsReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state

  //   if (action.type === authActionType.LOGOUT_SUCCESS) {
  //     state = undefined;
  //   }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
