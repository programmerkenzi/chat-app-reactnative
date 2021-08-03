/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-14 10:43:18
 * @LastEditTime: 2021-07-16 10:51:35
 * @LastEditors: Kenzi
 */

const appActionTypes = {
  GET_ALL_LANG_TYPE_START: "GET_ALL_LANG_TYPE_START",
  GET_ALL_LANG_TYPE_SUCCESS: "GET_ALL_LANG_TYPE_SUCCESS",
  GET_ALL_LANG_TYPE_FAILURE: "GET_ALL_LANG_TYPE_FAILURE",
  GET_LANG_TRANSLATIONS_START: "GET_LANG_TRANSLATIONS_START",
  GET_LANG_TRANSLATIONS_SUCCESS: "GET_LANG_TRANSLATIONS_SUCCESS",
  GET_LANG_TRANSLATIONS_FAILURE: "GET_LANG_TRANSLATIONS_FAILURE",
  CHANGE_LANG_START: "CHANGE_LANG_START",
  CHANGE_LANG_SUCCESS: "CHANGE_LANG_SUCCESS",
  ON_APP_STATE_CHANGE: "ON_APP_STATE_CHANGE",
  UPDATE_APP_STATE: "UPDATE_APP_STATE",
  START_LOADING: "START_LOADING",
  UPDATE_LOADING_STATUS: "UPDATE_LOADING_STATUS",
  STOP_LOADING: "STOP_LOADING",
};

export default appActionTypes;