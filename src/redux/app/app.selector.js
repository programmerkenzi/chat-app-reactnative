/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:43:11
 * @LastEditTime: 2021-07-16 14:42:51
 * @LastEditors: Kenzi
 */

import { createSelector } from "reselect";

const selectApp = (state) => state.main.app;

export const selectLangTypes = createSelector(
  [selectApp],
  (app) => app.langTypes
);

export const selectLangTranslations = createSelector(
  [selectApp],
  (app) => app.langTranslations
);

export const selectAppState = createSelector(
  [selectApp],
  (app) => app.appState
);

export const selectLocale = createSelector([selectApp], (app) => app.locale);
