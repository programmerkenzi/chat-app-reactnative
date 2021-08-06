/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-27 14:08:15
 * @LastEditTime: 2021-07-27 15:45:10
 * @LastEditors: Kenzi
 */

import { createSelector } from "reselect";

const selectRouter = (state) => state.main.router;

export const selectRouterName = createSelector(
  [selectRouter],
  (router) => router.name
);

export const selectPerviousRouterName = createSelector(
  [selectRouter],
  (router) => router.pervious_name
);

export const selectParams = createSelector(
  [selectRouter],
  (router) => router.params
);

export const selectId = createSelector([selectParams], (params) => params.id);
