/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-01 12:32:44
 * @LastEditTime: 2021-07-09 15:11:25
 * @LastEditors: Kenzi
 */
import { createSelector } from "reselect";

const selectAuth = (state) => state.secure.auth;

export const selectUserToken = createSelector(
  [selectAuth],
  (auth) => auth.userToken
);

export const selectIsLoading = createSelector(
  [selectAuth],
  (auth) => auth.isLoading
);

export const selectIsLoginFailure = createSelector(
  [selectAuth],
  (auth) => auth.isLoginFailure
);
export const selectFailureLoginMessage = createSelector(
  [selectAuth],
  (auth) => auth.failureLoginMessage
);

export const selectUsername = createSelector(
  [selectAuth],
  (auth) => auth.username
);
export const selectExpoPushToken = createSelector(
  [selectAuth],
  (auth) => auth.expoPushToken
);
