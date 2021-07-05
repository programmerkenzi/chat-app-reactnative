/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-27 14:08:15
 * @LastEditTime: 2021-06-03 13:40:01
 * @LastEditors: Kenzi
 */

import { createSelector } from "reselect";

const selectRouter = (state) => state.router;

export const selectRouterName = createSelector(
  [selectRouter],
  (router) => router.name
);
export const selectParams = createSelector(
  [selectRouter],
  (router) => router.params
);

export const selectId = createSelector([selectParams], (params) => params.id);
