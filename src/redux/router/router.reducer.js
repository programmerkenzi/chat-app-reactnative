/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-25 18:48:09
 * @LastEditTime: 2021-07-26 18:45:01
 * @LastEditors: Kenzi
 */

import routerActionType from "./router.type.";

const initialState = {
  pervious_name: null,
  name: null,
  params: {},
};

const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case routerActionType.UPDATE_CURRENT_PAGE_INFO:
      return {
        ...state,
        pervious_name: action.payload.previous_name,
        name: action.payload.name,
        params: action.payload.params
          ? action.payload.params
          : initialState.params,
      };

    default:
      return state;
  }
};

export default routerReducer;
