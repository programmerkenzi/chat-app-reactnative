/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-20 12:32:31
 * @LastEditTime: 2021-07-20 12:32:31
 * @LastEditors: Kenzi
 */
import axiosChatClient from "./axiosChatClient";

//檔案
export const uploadFile = (file) =>
  axiosChatClient({
    url: "/fs",
    method: "post",
    contentType: "multipart/form-data",
    accept: "application/json",
    data: file,
  });

export const getFile = (filename) =>
  axiosChatClient({
    url: `/fs/${filename}`,
    method: "get",
    responseType: "blob",
  });

export const downloadFile = (filename) =>
  axiosChatClient({
    url: `/fs/download/${filename}`,
    method: "get",
    responseType: "blob",
  });

export const deleteMessage = (room_id, message_ids) =>
  axiosChatClient({
    url: `/delete/${room_id}/messages`,
    method: "delete",
    data: { message_ids: message_ids },
  });
