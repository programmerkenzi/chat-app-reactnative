/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:42:43
 * @LastEditTime: 2021-04-26 13:15:12
 * @LastEditors: Kenzi
 */
import settingActionTypes from "./setting.type";

export const getLangTypesStart = () => ({
  type: settingActionTypes.GET_ALL_LANG_TYPE_START,
});
export const getLangTypesSuccess = (types) => ({
  type: settingActionTypes.GET_ALL_LANG_TYPE_SUCCESS,
  payload: types,
});
export const getLangTypesFailure = (error) => ({
  type: settingActionTypes.GET_ALL_LANG_TYPE_FAILURE,
  payload: error,
});
export const getLangTranslationsStart = (typeKey) => ({
  type: settingActionTypes.GET_LANG_TRANSLATIONS_START,
  payload: typeKey,
});
export const getLangTranslationsSuccess = (translations) => ({
  type: settingActionTypes.GET_LANG_TRANSLATIONS_SUCCESS,
  payload: translations,
});
export const getLangTranslationsFailure = (error) => ({
  type: settingActionTypes.GET_LANG_TRANSLATIONS_FAILURE,
  payload: error,
});

export const changeLangStart = (key) => ({
  type: settingActionTypes.CHANGE_LANG_START,
  payload: key,
});
export const changeLangSuccess = (key) => ({
  type: settingActionTypes.CHANGE_LANG_SUCCESS,
  payload: key,
});
