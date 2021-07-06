/*
 * @Description: 聊天列表
 * @Author: Lewis
 * @Date: 2021-01-18 17:51:24
 * @LastEditTime: 2021-07-07 12:36:51
 * @LastEditors: Kenzi
 */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import ListItem from "./components/ListItem";
import Swipeout from "react-native-swipeout";
import AntDesign from "react-native-vector-icons/AntDesign";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectChatRoomList,
  selectChatRoomListRendererTrigger,
} from "../../../redux/chat/chat.selector";
import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { ContainerWithBgColor } from "./../../../styles/layout";
import { getChatRoomStart } from "../../../redux/chat/chat.actions";
import { selectUserInfo } from "./../../../redux/chat/chat.selector";
import { toMessagesPage } from "../utils";
import * as mime from "react-native-mime-types";

const ChatHistoryPage = ({
  navigation,
  chatRoomList,
  getChatRoom,
  userInfo,
  renderTrigger,
}) => {
  //搜尋
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [groupChatData, setGroupChatData] = useState([]);
  const [listItemData, setListItemData] = useState([]);
  //所有對話列表
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    getChatRoom();
  }, []);

  const creatListItemData = () => {
    let data = [];
    chatRoomList.forEach((props) => {
      console.log("props.last_message :>> ", props.last_message);
      const users = props.users;
      const currentUserId = userInfo._id;
      const avatar =
        props.type === "private"
          ? users.filter((u) => u._id !== currentUserId)[0].avatar
          : props.avatar; // 私人||群组
      const name =
        props.name || users.filter((u) => u._id !== currentUserId)[0].name; //群組 || 私人

      const lastMessageInfo =
        props.last_message.length > 0
          ? props.last_message[0]
          : {
              type: "null",
              createdAt: props.createdAt,
              message: "",
              file: [],
            };

      let lastTextMessage = "";

      if (lastMessageInfo.message.length > 0) {
        lastTextMessage =
          lastMessageInfo.message.length > 20
            ? lastMessageInfo.message.substring(0, 20) + "..."
            : lastMessageInfo.message;
      }
      if (lastMessageInfo.file.length > 0) {
        lastMessageInfo.file.forEach((item) => {
          const mime_type = item.mime_type ? item.mime_type : mime.lookup(item);
          console.log("mime_type :>> ", mime_type);
          if (mime_type) {
            const fileEmoji = mime_type.includes("image")
              ? "🖼️"
              : mime_type.includes("video")
              ? "🎥"
              : mime_type.includes("audio")
              ? "🎙️"
              : "📁";

            lastTextMessage = `${lastTextMessage} ${fileEmoji} `;
          }
        });
      }

      //时间显示
      const dateTime = new Date(lastMessageInfo.createdAt);
      const localeDate = dateTime.toLocaleDateString();
      const localeTime = dateTime.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      //未读讯息数量
      const unread = props.unread.length;

      data.push({
        _id: props._id,
        avatar: avatar,
        name: name,
        lastMessage: lastTextMessage,
        dateTime: dateTime,
        date: localeDate,
        time: localeTime,
        unread: unread,
      });
    });
    //按照日期由新到舊排序
    data.sort((a, b) => b.dateTime - a.dateTime);
    setListItemData(data);
  };

  useEffect(() => {
    creatListItemData();
  }, [chatRoomList]);

  //合併私人對話跟群組對話列表資料並按照最後訊息時間新到舊排序
  const concatChatRoomList = () => {
    const list = chatData.concat(groupChatData);

    const sortList = list.sort(
      (a, b) =>
        new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
    );

    return sortList;
  };

  const handleGetMessages = (item) => {
    const current_room_id = item._id;
    const room_info = chatRoomList.filter(
      (room) => room._id === current_room_id
    );
    return toMessagesPage(navigation, room_info[0]);
  };
  function onSwipeOpen(index) {
    setTimeout(() => {
      setChatId(index + 1);
    }, 0);
  }
  function onSwipeClose(index) {
    if (index === chatId) {
      setTimeout(() => {
        setChatId(null);
      }, 0);
    }
  }
  const handleSetIcon = (icon) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <AntDesign name={icon} size={25} />
      </View>
    );
  };
  const handleDelete = () => {
    Alert.alert(
      "Are you sure to delete?",
      "never recover",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => handleDoDelete(),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
  const handleDoDelete = () => {
    let chatTamp = [...chatData];
    let index = chatTamp.indexOf(chatId);
    if (index > 0) {
      chatTamp.splice(index, 1);
    }

    setChatData(chatTamp);
  };

  var swipeoutBtns = [
    {
      text: "Delete",
      onPress: handleDelete,
      component: handleSetIcon("delete"),
    },
  ];
  return (
    <ContainerWithBgColor bgColor="#fff">
      <PrimarySearchBar
        data={listItemData}
        currentUserId={userInfo._id}
        type="room"
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
      />

      <FlatList
        data={searchString.length ? searchResults : listItemData}
        renderItem={({ item, index }) => (
          <Swipeout
            right={swipeoutBtns}
            onOpen={() => onSwipeOpen(index)}
            close={chatId !== index}
            onClose={() => onSwipeClose(index)}
            rowIndex={index}
            sectionId={0}
            autoClose={true}
            backgroundColor={"#fff"}
          >
            <TouchableOpacity onPress={() => handleGetMessages(item)}>
              <ListItem props={item} userId={userInfo._id} />
            </TouchableOpacity>
          </Swipeout>
        )}
        keyExtractor={(item, index) => item + index}
      />
    </ContainerWithBgColor>
  );
};

const mapStateToProps = createStructuredSelector({
  chatRoomList: selectChatRoomList,
  userInfo: selectUserInfo,
  renderTrigger: selectChatRoomListRendererTrigger,
});

const mapDispatchToProps = (dispatch) => ({
  getChatRoom: () => dispatch(getChatRoomStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistoryPage);
