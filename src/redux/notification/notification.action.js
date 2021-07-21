/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-20 14:13:35
 * @LastEditTime: 2021-07-20 14:15:35
 * @LastEditors: Kenzi
 */

import notificationActionTypes from "./notification.type";

export const onGetNotificationStart = () => ({
  type: notificationActionTypes.ON_GET_NOTIFICATION_START,
});

export const onGetNotificationSuccess = (notifications) => ({
  type: notificationActionTypes.ON_GET_NOTIFICATION_SUCCESS,
  payload: notifications,
});

export const onGetNotificationFailure = (error) => ({
  type: notificationActionTypes.ON_GET_NOTIFICATION_FAILURE,
  payload: error,
});

export const onUpdateNotification = (new_notification) => ({
  type: notificationActionTypes.UPDATE_NOTIFICATION,
  payload: new_notification,
});

export const onGotNewNotification = (new_notification) => ({
  type: notificationActionTypes.GOT_NEW_NOTIFICATION,
  payload: new_notification,
});
export const onRemovedNotification = (notification_id) => ({
  type: notificationActionTypes.ON_REMOVE_NOTIFICATION,
  payload: notification_id,
});
