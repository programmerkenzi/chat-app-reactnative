/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 14:27:25
 * @LastEditTime: 2021-07-06 13:52:53
 * @LastEditors: Kenzi
 */

import i18n from "i18n-js";
import { store } from "../redux/store";

// Set the key-value pairs for the different languages you want to support.

// i18n.translations = {
//   en: en,
//   zh: zh,
// };

export const getLanguage = () => {
  // const defaultLang = await AsyncStorage.getItem("defaultLocale");
  const state = store.getState();
  const choice = state.setting.locale;
  const translations = state.setting.langTranslations;
  i18n.translations = translations;
  i18n.locale = choice;
  // i18n.locale = await defaultLang;
  i18n.fallbacks = true;
};

export const t = (name) => {
  return i18n.t(name);
};

export default i18n;
