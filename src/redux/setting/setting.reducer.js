/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:42:52
 * @LastEditTime: 2021-04-26 13:16:10
 * @LastEditors: Kenzi
 */
import settingActionTypes from "./setting.type";
import zh from "../../i18n/zh";
import en from "../../i18n/en";

const initialState = {
  langTypes: [],
  locale: "zh",
  langTranslations: { zh: zh, en: en },
  error: null,
};

const settingReducer = (state = initialState, action) => {
  switch (action.type) {
    case settingActionTypes.GET_ALL_LANG_TYPE_SUCCESS:
      return {
        ...state,
        langTypes: action.payload,
      };

    case settingActionTypes.GET_LANG_TRANSLATIONS_SUCCESS:
      return {
        ...state,
        langTranslations: action.payload,
      };

    case settingActionTypes.CHANGE_LANG_SUCCESS:
      return {
        ...state,
        locale: action.payload,
      };

    case settingActionTypes.GET_ALL_LANG_TYPE_FAILURE:
    case settingActionTypes.GET_LANG_TRANSLATIONS_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default settingReducer;
