/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-16 10:40:18
 * @LastEditTime: 2021-07-16 13:30:59
 * @LastEditors: Kenzi
 */

import { onFetchUserInfo } from "../../chat_api/auth";
import { getUserInfoSuccess, getUserInfoFailure } from "./user.action";
import userActionTypes from "./user.type";

function* getUserInfo() {
  try {
    const res = yield onFetchUserInfo();
    const data = yield res.data;
    const { avatar } = yield data;
    const userInfo = {
      ...data,
      avatar: avatar.length > 0 ? createFileUrl(avatar) : "http://",
    };
    yield put(getUserInfoSuccess(userInfo));
  } catch (error) {
    yield put(getUserInfoFailure(error));
  }
}
function* onGetUserInfo() {
  yield takeLatest(userActionTypes.GET_USER_INFO_START, getUserInfo);
}
