/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-01 12:32:44
 * @LastEditTime: 2021-08-07 09:11:07
 * @LastEditors: Kenzi
 */
import { createSelector } from "reselect";

const selectAuth = (state) => state.secure.auth;

export const selectUserToken = createSelector(
  [selectAuth],
  (auth) => auth.userToken
);
export const selectPrivateKey = createSelector(
  [selectAuth],
  (auth) => auth.privateKey
);
export const selectPrivateKeyGroup = createSelector(
  [selectAuth],
  (auth) => auth.privateKeyGroup
);

export const selectPublicKeyGroup = createSelector(
  [selectAuth],
  (auth) => auth.publicKeyGroup
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
