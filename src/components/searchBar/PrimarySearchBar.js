/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-09 13:05:04
 * @LastEditTime: 2021-07-07 11:59:30
 * @LastEditors: Kenzi
 */

import React from "react";
import { SearchBar } from "react-native-elements";
import { StyleSheet } from "react-native";

const PrimarySearchBar = ({
  searchString,
  setSearchString,
  data,
  setSearchResults,
  type = "user",
  currentUserId,
  searchByServer,
}) => {
  const updateSearch = (text) => {
    setSearchString(text);

    let results = [];
    if (text !== "") {
      //在聊天紀錄裡搜索
      setTimeout(async () => {
        if (type === "room") {
          data.forEach((room) => {
            if (room.type === "private") {
              const users = room.users;
              const receiver = users.filter(
                (user) => user._id !== currentUserId
              )[0];
              if (
                receiver.name
                  .toLowerCase()
                  .trim()
                  .includes(text.trim().toLowerCase())
              ) {
                results.push(room);
              }
            } else {
              if (
                room.name
                  .toLowerCase()
                  .trim()
                  .includes(text.trim().toLowerCase())
              ) {
                results.push(room);
              }
            }
          });
        } else if (type === "message") {
          results = data.filter((m) =>
            m.text.toLowerCase().trim().includes(text.trim().toLowerCase())
          );
        } else if (type === "server") {
          setSearchResults([]);
          const res = await searchByServer(text);
          const data = await res.data;
          results = data;
        } else {
          console.log("data :>> ", data);
          results = data.filter((u) =>
            u.name.toLowerCase().includes(text.trim().toLowerCase())
          );
        }
        setSearchResults(results);
      }, 100);
    }
  };

  const handleOnClear = () => {
    setSearchString("");
    setSearchResults([]);
  };
  return (
    <SearchBar
      placeholder="Type Here..."
      onChangeText={(text) => updateSearch(text)}
      on
      value={searchString}
      onClear={() => handleOnClear()}
      inputStyle={style.inputStyle}
      inputContainerStyle={style.inputContainerStyle}
      containerStyle={style.containerStyle}
    />
  );
};

export default PrimarySearchBar;

const style = StyleSheet.create({
  inputStyle: {
    color: "#000000",
  },

  inputContainerStyle: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    height: 30,
  },

  containerStyle: {
    backgroundColor: "rgba(255,255,255,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
