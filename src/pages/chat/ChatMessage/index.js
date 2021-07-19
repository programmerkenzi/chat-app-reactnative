/*
 * @Description: 聊天 context
 * @Author: Lewis
 * @Date: 2021-01-30 14:35:44
 * @LastEditTime: 2021-07-19 17:40:25
 * @LastEditors: Kenzi
 */
import React, { useState, useCallback } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { FAB, Icon } from "react-native-elements";

import {
  gotNewMessages,
  sendPrivateChat,
  updateChatRoomStateStart,
  onUpdateSelectedMessage,
  onClearSelectedMessage,
} from "../../../redux/chat/chat.actions";
import { createStructuredSelector } from "reselect";
import {
  selectChatRoomList,
  selectMessagesReRenderTrigger,
  selectSelectedMessage,
} from "../../../redux/chat/chat.selector";
import { selectConversations } from "../../../redux/chat/chat.selector";
import { useRoute } from "@react-navigation/native";
import ChatHeader from "./components/ChatHeader";
import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import FunctionsBar from "./../../../components/Chat/FunctionsBar";
import EmojiBoard from "react-native-emoji-board";
import SentButton from "./../../../components/Chat/SentButton";
import MessageBubble from "./../../../components/Chat/MessageBubble";
import { View } from "react-native";
import { markReadByRoomId, postMessage } from "../../../chat_api/chat";
import { getConversationStart } from "./../../../redux/chat/chat.actions";
import { getChatRoomStart } from "./../../../redux/chat/chat.actions";
import { ContainerWithBgColor } from "./../../../styles/layout";
import * as mime from "react-native-mime-types";
import FileContainer from "./../../../components/Chat/FileContainer";
import FilesRender from "./../../../components/Chat/FilesRender";
import { handleUploadMultipleFile } from "./../utils";
import { handleOnSelect } from "../../../library/utils/utils";
import { darkGary, red } from "../../../styles/color";
import * as Animatable from "react-native-animatable";
import { deleteMessage } from "./../../../chat_api/chat";
import { onDeleteConversation } from "./../../../redux/chat/chat.actions";
import { createFileUrl } from "./../../../library/utils/utils";
import { SafeAreaView } from "react-native";
import { selectUserInfo } from "./../../../redux/user/user.selector";

const ChatMessagePage = ({
  userInfo,
  navigation,
  conversations,
  getConversations,
  messageReRenderTrigger,
  updateChatRoomState,
  gotNewMessage,
  selectedMessage,
  updateSelectedMessage,
  clearSelectedMessage,
  onDeleteConversation,
  chatRoomList,
}) => {
  //聊天记录
  const chatRoomArray = Object.values(chatRoomList);
  const roomInfo = useRoute().params.room_info.unread
    ? useRoute().params.room_info
    : chatRoomArray.filter(
        (room) => room._id === useRoute().params.room_info.room_id
      )[0];
  const unread = roomInfo.unread.length;
  const room_id = roomInfo._id;
  const user_id = userInfo._id;

  const [showEmojiBoard, setShowEmojiBoard] = useState(false);

  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [messages, setMessages] = useState([]);

  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState("");

  //讯息array
  const createGiftChatData = () => {
    const room_messages = conversations[room_id];
    let giftedChatMessagesData = [];
    if (room_messages) {
      room_messages.forEach((item) => {
        const {
          _id,
          createdAt,
          message,
          type,
          user,
          read_by_recipients,
          file,
        } = item;
        const postedByUser = user[0]._id;
        const isRead = read_by_recipients.findIndex(
          (user) => user.read_by_user_id !== user_id
        );
        const { name, avatar } = user[0];
        //gift chat用的obj
        let msg = {
          _id: _id,
          text: message,
          createdAt: createdAt,
          file: [],
          user: {
            _id: postedByUser,
            name: name,
            avatar: avatar.length > 0 ? createFileUrl(avatar) : "",
          },
          received: item.received
            ? item.received
            : isRead === -1
            ? false
            : true,
        };
        if (file.length > 0) {
          file.forEach((item) => {
            msg.file.push({
              name: item.name,
              url: createFileUrl(item.filename),
              mime_type: item.mime_type,
            });
          });
        }

        giftedChatMessagesData.push(msg);
      });
    }

    setMessages(giftedChatMessagesData);
  };

  useEffect(() => {
    getConversations(room_id);
  }, []);

  useEffect(() => {
    createGiftChatData();
  }, [conversations]);

  const markRead = async () => {
    const res = await markReadByRoomId(room_id);

    if (res) {
      updateChatRoomState(room_id);
    }
  };

  useEffect(() => {
    //标记已读
    if (unread > 0) {
      markRead();
    }
  }, []);

  useEffect(() => {
    if (selectedMessage.length > 0) {
      clearSelectedMessage();
    }
  }, [room_id]);

  const fetchEarlierData = () => {
    getConversations(room_id);
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onSendMessage = async (theMessage) => {
    let modifiedMessage = theMessage;
    let modifiedFiles = selectedFile;
    let filesUploaded = null;

    //已經成功上傳的檔案路徑
    if (selectedFile.length > 0) {
      modifiedFiles.forEach((file) => {
        const mime_type = mime.lookup(file.uri);
        file.mime_type = mime_type;
        file.url = file.uri;
      });
      modifiedMessage[0].file = modifiedFiles;
      const res = await handleUploadMultipleFile(selectedFile);
      console.log("res :>> ", res);
      if (res.success) {
        setSelectedFile([]);
        filesUploaded = res.file;
      }
    }

    modifiedMessage[0].pending = true;

    onSend(modifiedMessage);

    const { success, data } = await postMessage(
      room_id,
      filesUploaded,
      theMessage[0].text
    );
    if (success) {
      gotNewMessage({ data: data });
    }
  };

  //編輯訊息

  const onLongPress = (props, context) => {
    updateSelectedMessage(context._id);
  };

  //刪除訊息

  const handleDeleteMessage = async () => {
    const { success } = await deleteMessage(room_id, selectedMessage);

    if (success) {
      onDeleteConversation(room_id, selectedMessage);
    }
  };
  return (
    <ContainerWithBgColor
      bgColor="#ffffff"
      pd="none"
      style={{ position: "relative" }}
    >
      <ChatHeader roomInfo={roomInfo} currentUserId={user_id} />
      <PrimarySearchBar
        data={messages}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
        type="message"
      />
      <GiftedChat
        messages={searchString.length ? searchResults : messages}
        text={currentMessage}
        onInputTextChanged={(messages) => setCurrentMessage(messages)}
        onSend={(messages) => onSendMessage(messages)}
        renderCustomView={(props) =>
          props.currentMessage.file ? (
            <FilesRender files={props.currentMessage.file} />
          ) : null
        }
        showAvatarForEveryMessage={false}
        renderActions={(props) => (
          <FunctionsBar
            props={props}
            handleOnSendRecord={(fileInfo) =>
              handleOnSelect(
                true,
                fileInfo,
                selectedFile,
                setSelectedFile,
                "name",
                "该档案已经选择",
                false,
                "select"
              )
            }
            handleSelectFile={(fileInfo) =>
              handleOnSelect(
                true,
                fileInfo,
                selectedFile,
                setSelectedFile,
                "name",
                "该档案已经选择",
                false,
                "select"
              )
            }
            setShowEmojiBoard={setShowEmojiBoard}
            showEmojiBoard={showEmojiBoard}
          />
        )}
        renderSend={(props) => SentButton(props, selectedFile, onSendMessage)}
        user={{
          _id: user_id,
        }}
        renderBubble={(props) => <MessageBubble props={props} />}
        renderUsernameOnMessage={false}
        infiniteScroll={true}
        scrollToBottom={selectedMessage.length > 0 ? false : true}
        onLongPress={(props, context) => onLongPress(props, context)}
        onLoadEarlier={fetchEarlierData}
        isLoadingEarlier={false}
        renderLoadEarlier={() => <View></View>}
        loadEarlier={true}
        renderChatFooter={() => (
          <>
            <EmojiBoard
              containerStyle={{ width: "100%" }}
              showBoard={showEmojiBoard}
              onClick={(messages) => {
                setCurrentMessage(`${currentMessage}${messages.code}`);
              }}
              onRemove={() => setShowEmojiBoard(!showEmojiBoard)}
            />
            <FileContainer
              show={selectedFile.length > 0 ? true : false}
              selectedFile={selectedFile}
              handleRemoveSelectedFile={(fileInfo) =>
                handleOnSelect(
                  true,
                  fileInfo,
                  selectedFile,
                  setSelectedFile,
                  "name",
                  "该档案已经选择",
                  false,
                  "remove"
                )
              }
            />
          </>
        )}
      />
      {/* 刪除訊息按鈕 */}
      {selectedMessage.length > 0 ? (
        <Animatable.View
          animation="zoomIn"
          style={[styles.floatBtnContainer, { bottom: 70 }]}
        >
          <FAB
            title=""
            color={red.primary}
            icon={<Icon name="trash-alt" type="font-awesome-5" size={20} />}
            containerStyle={styles.fab}
            size="large"
            onPress={() => handleDeleteMessage()}
          />
          <FAB
            title=""
            color={darkGary.primary}
            icon={<Icon name="times" type="font-awesome-5" size={12} />}
            size="small"
            containerStyle={styles.fab}
            onPress={() => clearSelectedMessage()}
          />
        </Animatable.View>
      ) : null}
    </ContainerWithBgColor>
  );
};

const mapDispatchToProp = (dispatch) => ({
  sendPrivateChat: (messageInfo) => dispatch(sendPrivateChat(messageInfo)),
  getConversations: (room_id) => dispatch(getConversationStart(room_id)),
  getChatRoom: (room_id) => dispatch(getChatRoomStart(room_id)),
  updateChatRoomState: (room_id) =>
    dispatch(updateChatRoomStateStart(room_id, null, "mark_read")),
  gotNewMessage: (message) => dispatch(gotNewMessages(message)),
  updateSelectedMessage: (message_id) =>
    dispatch(onUpdateSelectedMessage(message_id)),
  clearSelectedMessage: () => dispatch(onClearSelectedMessage()),
  onDeleteConversation: (room_id, message_ids) =>
    dispatch(onDeleteConversation(room_id, message_ids, true)),
});

const mapStateToProp = createStructuredSelector({
  userInfo: selectUserInfo,
  conversations: selectConversations,
  messageReRenderTrigger: selectMessagesReRenderTrigger,
  selectedMessage: selectSelectedMessage,
  chatRoomList: selectChatRoomList,
});

export default connect(mapStateToProp, mapDispatchToProp)(ChatMessagePage);

const styles = StyleSheet.create({
  uploadImage: {
    marginBottom: 8,
    marginLeft: 10,
  },
  uploadItem: {
    flexDirection: "row",
  },
  emojiPicker: {
    height: 200,
    overflow: "hidden",
    width: 200,
  },

  floatBtnContainer: {
    position: "absolute",
    right: 10,
  },
  fab: {
    marginBottom: 10,
  },
});
