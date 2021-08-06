/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-29 12:45:28
 * @LastEditTime: 2021-05-28 11:02:20
 * @LastEditors: Kenzi
 */

import {
  handleGetMediaLibrary,
  handleTakeImage,
} from "../../library/utils/resources";

const messageObj = (date) => {
  return {
    _id: Math.round(Math.random() * 100),
    text: "",
    createdAt: date,
    video: null,
    image: null,
    audio: null,
    user: {
      _id: "u1",
      name: "Vadim",
    },
  };
};

//获取资源
export const handleGetMedia = async (onSend) => {
  let picker = await handleGetMediaLibrary();
  let cancelled = picker.cancelled;
  if (!cancelled) {
    return picker;
  } else {
    return false;
  }
};
export //拍照
const handleTakePicture = async () => {
  let picker = await handleTakeImage();
  let cancelled = picker.cancelled;
  if (!cancelled) {
    return picker;
  } else {
    return false;
  }
};
