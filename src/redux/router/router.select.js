/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-27 14:08:15
 * @LastEditTime: 2021-07-16 10:28:42
 * @LastEditors: Kenzi
 */

import { createSelector } from "reselect";

const selectRouter = (state) => state.main.router;

export const selectRouterName = createSelector(
  [selectRouter],
  (router) => router.name
);
export const selectParams = createSelector(
  [selectRouter],
  (router) => router.params
);

export const selectId = createSelector([selectParams], (params) => params.id);
