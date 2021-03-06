/*
 * @Description: 聊天列表
 * @Author: Lewis
 * @Date: 2021-01-18 17:51:24
 * @LastEditTime: 2021-08-10 09:06:54
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
  selectSelectedForwardMessage,
} from "../../../redux/chat/chat.selector";
import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { ContainerWithBgColor } from "./../../../styles/layout";
import {
  getChatRoomStart,
  onClearSelectedForwardMessage,
} from "../../../redux/chat/chat.actions";
import { toMessagesPage } from "../utils";
import * as mime from "react-native-mime-types";
import {
  selectPrivateKey,
  selectUserToken,
} from "./../../../redux/auth/auth.selector";
import { selectUserInfo } from "./../../../redux/user/user.selector";
import { useRoute } from "@react-navigation/native";
import { t } from "../../../i18n";
import { Button } from "react-native-elements/dist/buttons/Button";
import { HeaderOptionsWithRightButton } from "../../../navigation/Options";
import { selectParams } from "./../../../redux/router/router.select";
import {
  decodeMessage,
  decodeGroupMessage,
} from "./../../../library/utils/crypto";

selectUserInfo;
const ChatHistoryPage = ({
  navigation,
  chatRoomList,
  getChatRoom,
  userInfo,
  renderTrigger,
  getUserInfo,
  userToken,
  pendingForwardMessage,
  clearSelectedForwardMessage,
  routerParams,
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
    if (chatRoomArray.length > 0) {
      //刪除meta data
      let data = [];
      chatRoomArray.forEach((props) => {
        if (typeof props === "object") {
          const receivers = props.receivers;
          const avatar = props.background || receivers[0].avatar || "http://";
          const name = props.name || receivers[0].name; //群組 || 私人
          const hasLastMessage = props?.last_message[0];
          const roomType = props.type;
          const receiverPublicKey = receivers[0].public_key;
          const groupKeypair = props.key;

          const lastMessageInfo = hasLastMessage
            ? hasLastMessage
            : {
                type: "null",
                createdAt: props.createdAt,
                message: "",
                file: [],
              };

          let lastTextMessage = "";

          const message = lastMessageInfo.message;
          if (message) {
            //讯息解密;

            const decodedMessage =
              roomType === "private"
                ? decodeMessage(message, receiverPublicKey)
                : decodeGroupMessage(message, groupKeypair);

            lastTextMessage = decodedMessage;
            decodedMessage.length > 20
              ? decodedMessage.substring(0, 20) + "..."
              : decodedMessage;
          }
          if (lastMessageInfo.file?.length > 0) {
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

          //时间显示;
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
    }
  };

  useEffect(() => {
    creatListItemData();
  }, [chatRoomList]);

  const onCancelForwardToUser = async () => {
    await clearSelectedForwardMessage();
    return navigation.navigate("Messages", {
      room_info: routerParams.room_info,
    });
  };

  useEffect(() => {
    if (pendingForwardMessage.length > 0) {
      return navigation.setOptions({
        title: `${t("chat.forward_to")}`,
        headerRight: () => null,
        headerLeft: () => (
          <Button
            type="clear"
            title={t("cmn.cancel")}
            titleStyle={{ color: "white" }}
            onPress={() => onCancelForwardToUser()}
          />
        ),
      });
    } else {
      navigation.setOptions(HeaderOptionsWithRightButton("chat.chat", "chat"));
    }
  }, [pendingForwardMessage.length]);

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
    return toMessagesPage(navigation, {
      room_info: room_info,
    });
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

  useEffect(() => {
    getChatRoom();
  }, []);

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
  pendingForwardMessage: selectSelectedForwardMessage,
  routerParams: selectParams,
});

const mapDispatchToProps = (dispatch) => ({
  getChatRoom: () => dispatch(getChatRoomStart()),
  clearSelectedForwardMessage: () => dispatch(onClearSelectedForwardMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistoryPage);
