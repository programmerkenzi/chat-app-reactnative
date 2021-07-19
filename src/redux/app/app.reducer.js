/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:42:52
 * @LastEditTime: 2021-07-16 15:05:12
 * @LastEditors: Kenzi
 */
import appActionTypes from "./app.type";
import zh from "../../i18n/zh";
import en from "../../i18n/en";

const initialState = {
  langTypes: [],
  locale: "zh",
  langTranslations: { zh: zh, en: en },
  error: null,
  appState: "background",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActionTypes.GET_ALL_LANG_TYPE_SUCCESS:
      return {
        ...state,
        langTypes: action.payload,
      };

    case appActionTypes.GET_LANG_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        langTranslations: action.payload,
      };

    case appActionTypes.CHANGE_LANG_SUCCESS:
      return {
        ...state,
        locale: action.payload,
      };

    case appActionTypes.UPDATE_APP_STATE:
      return {
        ...state,
        appState: action.payload,
      };

    case appActionTypes.GET_ALL_LANG_TYPE_FAILURE:
    case appActionTypes.GET_LANG_TRANSLATIONS_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default appReducer;
