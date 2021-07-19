/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:42:43
 * @LastEditTime: 2021-07-16 18:56:07
 * @LastEditors: Kenzi
 */
import appActionTypes from "./app.type";

export const getLangTypesStart = () => ({
  type: appActionTypes.GET_ALL_LANG_TYPE_START,
});
export const getLangTypesSuccess = (types) => ({
  type: appActionTypes.GET_ALL_LANG_TYPE_SUCCESS,
  payload: types,
});
export const getLangTypesFailure = (error) => ({
  type: appActionTypes.GET_ALL_LANG_TYPE_FAILURE,
  payload: error,
});
export const getLangTranslationsStart = (typeKey) => ({
  type: appActionTypes.GET_LANG_TRANSLATIONS_START,
  payload: typeKey,
});
export const getLangTranslationsSuccess = (translations) => ({
  type: appActionTypes.GET_LANG_TRANSLATIONS_SUCCESS,
  payload: translations,
});
export const getLangTranslationsFailure = (error) => ({
  type: appActionTypes.GET_LANG_TRANSLATIONS_FAILURE,
  payload: error,
});

export const changeLangStart = (key) => ({
  type: appActionTypes.CHANGE_LANG_START,
  payload: key,
});
export const changeLangSuccess = (key) => ({
  type: appActionTypes.CHANGE_LANG_SUCCESS,
  payload: key,
});

export const updateAppState = (state) => ({
  type: appActionTypes.UPDATE_APP_STATE,
  payload: state,
});

export const onAppStateChange = (state) => ({
  type: appActionTypes.ON_APP_STATE_CHANGE,
  payload: state,
});
