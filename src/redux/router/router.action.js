/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-25 18:45:12
 * @LastEditTime: 2021-05-26 10:20:40
 * @LastEditors: Kenzi
 */

import routerActionType from "./router.type.";

export const onPageChange = (info) => ({
  type: routerActionType.ON_PAGE_CHANGE,
  payload: info,
});

export const updateCurrentPageInfo = (info) => ({
  type: routerActionType.UPDATE_CURRENT_PAGE_INFO,
  payload: info,
});
