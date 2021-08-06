/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-20 14:15:48
 * @LastEditTime: 2021-07-20 18:43:45
 * @LastEditors: Kenzi
 */

import {
  takeLatest,
  put,
  all,
  fork,
  take,
  takeEvery,
  select,
} from "redux-saga/effects";
import {
  onGetNotificationSuccess,
  onUpdateNotification,
} from "./notification.action";
import { fetchAllNotification } from "./../../chat_api/notification";
import { onGetNotificationFailure } from "./notification.action";
import authActionType from "./../auth/auth.type";
import notificationActionTypes from "./notification.type";
import { schedulePushNotification } from "../../library/utils/utils";

function* getNotification() {
  try {
    const res = yield fetchAllNotification();

    if (res.success) {
      yield put(onGetNotificationSuccess(res.data));
    }
  } catch (error) {
    yield put(onGetNotificationFailure(error));
  }
}

function* onGetNotification() {
  yield takeLatest(
    [
      notificationActionTypes.ON_GET_NOTIFICATION_START,
      authActionType.LOGIN_SUCCESS,
    ],
    getNotification
  );
}

function* gotNewNotification({ payload }) {
  try {
    const { createdAt, post_from_user } = payload;
    const app = yield (state) => state.main.app;
    const { appState } = yield select(app);
    const router = yield (state) => state.main.router;
    const { name, params } = yield select(router);
    const notify = yield (state) => state.main.notify;
    const { notification } = yield select(notify);

    if (appState === "background" || name !== "AddNewFriend") {
      yield schedulePushNotification(
        "新好友邀请",
        createdAt.toLocaleString(),
        post_from_user[0].name,
        "AddNewFriend",
        null
      );
    }

    yield put(onUpdateNotification([...notification, payload]));
  } catch (error) {
    console.log("error :>> ", error);
  }
}

function* onGotNewNotification() {
  yield takeEvery(
    notificationActionTypes.GOT_NEW_NOTIFICATION,
    gotNewNotification
  );
}

function* removeNotificationAction({ payload }) {
  try {
    console.log("payload :>> ", payload);
    const notify = yield (state) => state.main.notify;
    const { notification } = yield select(notify);
    const newNotification = notification.filter(
      (notify) => notify._id !== payload
    );
    yield put(onUpdateNotification([...newNotification]));
  } catch (error) {
    console.log("error :>> ", error);
  }
}

function* onRemovedNotification() {
  yield takeEvery(
    notificationActionTypes.ON_REMOVE_NOTIFICATION,
    removeNotificationAction
  );
}

export default function* notificationSagas() {
  yield all([
    fork(onGetNotification),
    fork(onGotNewNotification),
    fork(onRemovedNotification),
  ]);
}
