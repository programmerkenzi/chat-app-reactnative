/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:43:11
 * @LastEditTime: 2021-04-14 14:59:10
 * @LastEditors: Kenzi
 */

import { createSelector } from "reselect";

const selectSetting = (state) => state.setting;

export const selectLangTypes = createSelector(
  [selectSetting],
  (setting) => setting.langTypes
);

export const selectLangTranslations = createSelector(
  [selectSetting],
  (setting) => setting.langTranslations
);

export const selectLocale = createSelector(
  [selectSetting],
  (setting) => setting.locale
);
