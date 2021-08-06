/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-16 17:28:14
 * @LastEditTime: 2021-07-16 19:00:31
 * @LastEditors: Kenzi
 */

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

export const BACKGROUND_FETCH_TASK = {
  REFRESH_TOKEN_WHEN_TIMEOUT: "REFRESH_TOKEN_WHEN_TIMEOUT",
};

export const registerRefreshTokenWhenTimeoutInBackground = async () => {
  return await BackgroundFetch.registerTaskAsync(
    BACKGROUND_FETCH_TASK.REFRESH_TOKEN_WHEN_TIMEOUT,
    {
      minimumInterval: 60 * 1, // 1分钟
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    }
  );
};

export const unregisterBackgroundFetchAsync = async () => {
  return BackgroundFetch.unregisterTaskAsync(
    BACKGROUND_FETCH_TASK.REFRESH_TOKEN_WHEN_TIMEOUT
  );
};
