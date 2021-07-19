/*
 * @Description: 聊天列表
 * @Author: Lewis
 * @Date: 2021-01-18 17:51:24
 * @LastEditTime: 2021-07-16 16:18:29
 * @LastEditors: Kenzi
 */
import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
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
import { toMessagesPage } from "../utils";
import * as mime from "react-native-mime-types";
import { selectUserToken } from "./../../../redux/auth/auth.selector";
import { selectUserInfo } from "./../../../redux/user/user.selector";
selectUserInfo;
const ChatHistoryPage = ({
  navigation,
  chatRoomList,
  getChatRoom,
  userInfo,
  renderTrigger,
  getUserInfo,
  userToken,
}) => {
  //搜尋
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [groupChatData, setGroupChatData] = useState([]);
  const [listItemData, setListItemData] = useState([]);
  //所有對話列表
  const [chatId, setChatId] = useState(null);

  // useEffect(() => {
  //   if (userToken) {
  //     getChatRoom();
  //   }
  // }, [userToken]);

  const creatListItemData = () => {
    let chatRoomArray = Object.values(chatRoomList);
    //刪除meta data

    let data = [];
    chatRoomArray.forEach((props) => {
      if (typeof props === "object") {
        const users = props.users;
        const currentUserId = userInfo._id;
        const avatar =
          props.avatar ||
          users.filter((u) => u._id !== currentUserId)[0].avatar;
        const name =
          props.name || users.filter((u) => u._id !== currentUserId)[0].name; //群組 || 私人
        const hasLastMessage = props.last_message;

        const lastMessageInfo = hasLastMessage
          ? hasLastMessage.length > 0
            ? hasLastMessage[0]
            : {
                type: "null",
                createdAt: props.createdAt,
                message: "",
                file: [],
              }
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
            const mime_type = item.mime_type
              ? item.mime_type
              : mime.lookup(item);
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
        const localeTime = dateTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        //未读讯息数量
        const unread = props.unread.length;

        data.push({
          _id: props._id,
          avatar: avatar.length > 0 ? avatar : "http://",
          name: name,
          lastMessage: lastTextMessage,
          dateTime: dateTime,
          date: localeDate,
          time: localeTime,
          unread: unread,
        });
      }
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
    const room_info = chatRoomList[current_room_id];
    return toMessagesPage(navigation, room_info);
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
        currentUserId={userInfo ? userInfo._id : ""}
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
              <ListItem props={item} />
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
  userToken: selectUserToken,
});

const mapDispatchToProps = (dispatch) => ({
  getChatRoom: () => dispatch(getChatRoomStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistoryPage);
