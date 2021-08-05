/*
 * @Description: 用户在线
 * @Author: Lewis
 * @Date: 2021-01-18 17:51:53
 * @LastEditTime: 2021-08-05 11:53:27
 * @LastEditors: Kenzi
 */
import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import ContactItem from "../components/ContactItem";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectChatRoomList,
  selectFriendList,
} from "../../../redux/chat/chat.selector";

import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { useRoute } from "@react-navigation/native";
import { checkIsSameArray } from "../../../library/utils/utils";
import {
  getMyFriendStart,
  initializeChatRoomStart,
} from "../../../redux/chat/chat.actions";
import { toMessagesPage } from "../utils";
import { ContainerWithBgColor } from "../../../styles/layout";
import { selectUserInfo } from "../../../redux/user/user.selector";

const FriendsPage = ({
  userInfo,
  navigation,
  getMyFriendList,
  friendList,
  initChatRoom,
  chatRoomList,
}) => {
  const routeName = useRoute().name;
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getMyFriendList();
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
      if (typeof room === "object") {
        const receiver = room.receivers[0]._id;
        //let users_id = users.map((user) => user._id);
        if (receiver === user_id) {
          isExistRoom = room;
          return false;
        }
      }
    });
    if (isExistRoom) {
      return toMessagesPage(navigation, { room_info: isExistRoom });
    } else {
      const initRoom = await initChatRoom(navigation, [user_id], "private");
    }
  };

  return (
    <ContainerWithBgColor bgColor="#fff">
      <PrimarySearchBar
        data={friendList}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
        type="user"
      />
      <FlatList
        data={searchString.length ? searchResults : friendList}
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
  friendList: selectFriendList,
  userInfo: selectUserInfo,
  chatRoomList: selectChatRoomList,
});

const mapDispatchToProps = (dispatch) => ({
  getMyFriendList: () => dispatch(getMyFriendStart()),
  initChatRoom: (navigation, user_ids, room_type) =>
    dispatch(initializeChatRoomStart(navigation, user_ids, room_type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
