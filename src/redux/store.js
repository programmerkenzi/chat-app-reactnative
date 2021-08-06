/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-05 18:27:04
 * @LastEditTime: 2021-07-05 18:27:04
 * @LastEditors: Kenzi
 */

import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (__DEV__) {
  middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export const persister = persistStore(store);
