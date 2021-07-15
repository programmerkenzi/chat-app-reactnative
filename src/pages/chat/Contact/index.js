/*
 * @Description: 用户在线
 * @Author: Lewis
 * @Date: 2021-01-18 17:51:53
 * @LastEditTime: 2021-07-14 13:49:58
 * @LastEditors: Kenzi
 */
import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import ContactItem from "../components/ContactItem";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectChatRoomList,
  selectContactList,
} from "../../../redux/chat/chat.selector";

import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { useRoute } from "@react-navigation/native";
import { checkIsSameArray } from "./../../../library/utils/utils";
import {
  getMyContactStart,
  initializeChatRoomStart,
} from "../../../redux/chat/chat.actions";
import { toMessagesPage } from "../utils";
import { ContainerWithBgColor } from "../../../styles/layout";
import { searchUserByPublicId } from "./../../../chat_api/chat";
import { selectUserInfo } from "./../../../redux/auth/auth.selector";
const ContactPage = ({
  userInfo,
  navigation,
  getMyContactList,
  contactList,
  initChatRoom,
  chatRoomList,
}) => {
  const routeName = useRoute().name;
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getMyContactList();
  }, []);

  /**
   *@param {String} user_id 联络人的用户id
   */
  const toChatRoom = async (user_id) => {
    const roomUserIds = [userInfo._id, user_id];
    let isExistRoom = null;
    let chatRoomArray = Object.values(chatRoomList);
    //确认该房间使否已经在列表
    chatRoomArray.some((room) => {
      if (typeof props === "object") {
        const users = room.users;
        let users_id = users.map((user) => user._id);
        if (checkIsSameArray(roomUserIds, users_id)) {
          isExistRoom = room;
          return false;
        }
      }
      return true;
    });
    if (isExistRoom) {
      return toMessagesPage(navigation, isExistRoom);
    } else {
      const initRoom = await initChatRoom(navigation, [user_id], "private");
    }
  };

  return (
    <ContainerWithBgColor bgColor="#fff">
      <PrimarySearchBar
        data={contactList}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
        type="user"
      />
      <FlatList
        data={searchString.length ? searchResults : contactList}
        renderItem={({ item, index }) => (
          <ContactItem
            props={item}
            routeName={routeName}
            onPressChevron={toChatRoom}
            toChatRoom={toChatRoom}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </ContainerWithBgColor>
  );
};

const mapStateToProps = createStructuredSelector({
  contactList: selectContactList,
  userInfo: selectUserInfo,
  chatRoomList: selectChatRoomList,
});

const mapDispatchToProps = (dispatch) => ({
  getMyContactList: () => dispatch(getMyContactStart()),
  initChatRoom: (navigation, user_ids, room_type) =>
    dispatch(initializeChatRoomStart(navigation, user_ids, room_type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
