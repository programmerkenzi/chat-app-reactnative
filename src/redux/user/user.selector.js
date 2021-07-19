/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-16 10:40:25
 * @LastEditTime: 2021-07-16 11:33:12
 * @LastEditors: Kenzi
 */
import { createSelector } from "reselect";

const selectUser = (state) => state.main.user;

export const selectUserInfo = createSelector(
  [selectUser],
  (user) => user.userInfo
);
