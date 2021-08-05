/*
 * @Description: 聊天 context
 * @Author: Lewis
 * @Date: 2021-01-30 14:35:44
 * @LastEditTime: 2021-08-05 15:39:41
 * @LastEditors: Kenzi
 */
import React, { useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  gotNewMessages,
  sendPrivateChat,
  updateChatRoomStateStart,
  onUpdateSelectedMessage,
  onClearSelectedMessage,
  onSaveSelectedForwardMessage,
} from "../../../redux/chat/chat.actions";
import { createStructuredSelector } from "reselect";
import {
  selectChatRoomList,
  selectMessagesReRenderTrigger,
  selectSelectedForwardMessage,
  selectSelectedMessage,
} from "../../../redux/chat/chat.selector";
import { selectConversations } from "../../../redux/chat/chat.selector";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import FunctionsBar from "./../../../components/Chat/FunctionsBar";
import EmojiBoard from "react-native-emoji-board";
import SentButton from "./../../../components/Chat/SentButton";
import MessageBubble from "./../../../components/Chat/MessageBubble";
import { View } from "react-native";
import {
  markReadByRoomId,
  postMessage,
  replyMessage,
} from "../../../chat_api/chat";
import { getConversationStart } from "./../../../redux/chat/chat.actions";
import { getChatRoomStart } from "./../../../redux/chat/chat.actions";
import { ContainerWithBgColor } from "./../../../styles/layout";
import * as mime from "react-native-mime-types";
import FileContainer from "./../../../components/Chat/FileContainer";
import FilesRender from "./../../../components/Chat/FilesRender";
import { handleUploadMultipleFile } from "./../utils";
import { handleOnSelect } from "../../../library/utils/utils";
import { deleteMessage } from "./../../../chat_api/chat";
import { onDeleteConversation } from "./../../../redux/chat/chat.actions";
import { createFileUrl } from "./../../../library/utils/utils";
import { selectUserInfo } from "./../../../redux/user/user.selector";
import { t } from "../../../i18n";
import ForwardedMessage from "../../../components/Chat/ForwardedMessage";
import ReplyMessage from "./../../../components/Chat/ReplyMessage";
import MessageFunctionBar from "./../../../components/Chat/MessageFunctionBar";
import { forwardMessages } from "./../../../chat_api/chat";
import { tw } from "react-native-tailwindcss";
import SelectedMessagesContainer from "../../../components/Chat/SelectedMessagesContainer";
import {
  onRemoveSelectedForwardMessage,
  onClearSelectedForwardMessage,
} from "./../../../redux/chat/chat.actions";
import PinMessage from "../../../components/Chat/PinMessage";
import { encodeMessage, decodeMessage } from "./../../../library/utils/crypto";
import { selectPrivateKey } from "../../../redux/auth/auth.selector";
import { pinMessage, unpinMessage } from "./../../../chat_api/chat";
import {
  onPinnedMessage,
  onUnpinnedMessage,
} from "./../../../redux/chat/chat.actions";

const ChatMessagePage = ({
  userInfo,
  navigation,
  conversations,
  getConversations,
  updateChatRoomState,
  gotNewMessage,
  selectedMessage,
  updateSelectedMessage,
  clearSelectedMessage,
  onDeleteConversation,
  chatRoomList,
  saveSelectedForwardMessages,
  removeSelectedForwardMessage,
  selectedForwardMessage,
  clearSelectedForwardMessage,
  privateKey,
  pinnedMessage,
  unpinnedMessage,
}) => {
  //聊天记录
  const chatRoomArray = Object.values(chatRoomList);
  const params = useRoute().params;
  const { room_info } = params;

  const roomInfo = room_info.unread
    ? room_info
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
  const [pinMessages, setPinMessages] = useState([]);

  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const [isOnReply, setIsOnReply] = useState(false);

  const [showMessageFunctionBar, setShowMessageFunctionBar] = useState(false);

  //讯息解密
  const receiverPublicKey = roomInfo.receivers[0].public_key;

  //讯息array
  const createGiftChatData = () => {
    const room_messages = conversations[room_id];
    let giftedChatMessagesData = [];
    if (room_messages) {
      room_messages.forEach(async (item) => {
        const {
          _id,
          createdAt,
          message,
          type,
          forwarded_from_messages,
          reply_for_message,
          read_by_recipients,
          post_by_user,
          file,
          pin,
        } = item;
        const postedByUser = post_by_user[0]._id;
        const isRead = read_by_recipients.findIndex(
          (user) => user.read_by_user_id !== user_id
        );
        const { name, avatar } = post_by_user[0];

        //讯息解密
        const decodedMessage = decodeMessage(message, receiverPublicKey);

        //gift chat用的obj
        let msg = {
          _id: _id,
          text: decodedMessage,
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
          forwarded_from: forwarded_from_messages,
          reply_for: reply_for_message,
          isPin: pin,
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
    const pinMessages = giftedChatMessagesData.filter(
      (msg) => msg.isPin === true
    );

    setPinMessages(pinMessages);
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

  //选取訊息

  const onLongPress = (props, context) => {
    updateSelectedMessage(context);
  };

  //刪除訊息

  const handleDeleteMessage = async () => {
    const selectedMessageIds = selectedMessage.map((message) => message._id);

    const { success } = await deleteMessage(room_id, selectedMessageIds);

    if (success) {
      onDeleteConversation(room_id, selectedMessageIds);
    }
  };

  //转发讯息
  const handleForwardMessages = async () => {
    await saveSelectedForwardMessages(selectedMessage);

    return navigation.navigate("Chats", { room_info: roomInfo });
  };

  //回复讯息
  const handleReplyMessage = async () => {
    setShowMessageFunctionBar(false);
    setIsOnReply(true);
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const onSendMessage = async (theMessage) => {
    const messageText = theMessage[0].text;
    const encodedMessage = await encodeMessage(messageText, receiverPublicKey);

    let modifiedMessage = theMessage;
    let modifiedFiles = [...selectedFile];
    let filesUploaded = null;

    //上傳檔案
    if (selectedFile.length > 0) {
      modifiedFiles.forEach((file) => {
        const mime_type = mime.lookup(file.uri);
        file.mime_type = mime_type;
        file.url = file.uri;
      });
      modifiedMessage[0].file = modifiedFiles;
      const res = await handleUploadMultipleFile(selectedFile);
      if (res.success) {
        //储存档案路径
        setSelectedFile([]);
        filesUploaded = res.file;
      }
    }

    //回复讯息
    if (isOnReply) {
      const { file, forwarded_from, text, user, reply_for, _id } =
        selectedMessage[0];
      modifiedMessage[0].reply_for = [
        {
          _id: _id,
          file: file,
          message: text,
          post_by_user: [user],
        },
      ];

      setIsOnReply(false);
    }

    //转发讯息
    if (selectedForwardMessage.length > 0) {
      modifiedMessage[0].forwarded_from = selectedForwardMessage.map((msg) => {
        const { file, forwarded_from, text, user, reply_for, _id } = msg;
        return {
          _id: _id,
          file: file,
          message: text,
          post_by_user: [user],
        };
      });
    }

    //显示正在发送的讯息
    modifiedMessage[0].pending = true;

    onSend(modifiedMessage);

    if (isOnReply) {
      const { success, data } = await replyMessage(
        room_id,
        selectedMessage[0]._id,
        filesUploaded,
        encodedMessage
      );
      if (success) {
        clearSelectedMessage();
        gotNewMessage({ data: data.data });
      }
    } else if (selectedForwardMessage.length > 0) {
      const pendingForwardMessageIds = selectedForwardMessage.map(
        (msg) => msg._id
      );

      const { success, data } = await forwardMessages(
        room_id,
        pendingForwardMessageIds,
        filesUploaded,
        encodedMessage
      );
      if (success) {
        clearSelectedForwardMessage();
        gotNewMessage({ data: data.data });
      }
    } else {
      const { success, data } = await postMessage(
        room_id,
        filesUploaded,
        encodedMessage
      );
      if (success) {
        gotNewMessage({ data: data });
      }
    }
  };

  //訊息至頂

  const handlePinMessage = async () => {
    const { _id } = selectedMessage[0];
    const onPin = await pinMessage(room_id, _id);

    if (onPin.success) {
      setShowMessageFunctionBar(false);
      clearSelectedMessage();
      pinnedMessage(room_id, _id);
    }
  };

  const handleUnpinMessage = async (theMessage) => {
    const { _id } = theMessage;
    const onUnpin = await unpinMessage(room_id, _id);
    if (onUnpin.success) {
      console.log("unpin success :>> ;");
      unpinnedMessage(room_id, _id);
    }
  };

  //开关已选讯息功能列

  useEffect(() => {
    if (
      selectedMessage.length > 0 &&
      !isOnReply &&
      !selectedForwardMessage.length
    ) {
      setShowMessageFunctionBar(true);
    } else if (selectedMessage.length > 1 && !selectedForwardMessage.length) {
      setShowMessageFunctionBar(true);
      setIsOnReply(false);
    } else {
      setShowMessageFunctionBar(false);
      setIsOnReply(false);
    }
  }, [selectedMessage.length]);

  return (
    <ContainerWithBgColor
      bgColor="#ffffff"
      pd="none"
      style={{ position: "relative" }}
    >
      {/* <PrimarySearchBar
        data={messages}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
        type="message"
      /> */}

      {/* 讯息至顶 */}
      {pinMessages.length ? (
        <PinMessage
          messages={pinMessages}
          publicKey={receiverPublicKey}
          handleClose={handleUnpinMessage}
        />
      ) : null}
      <GiftedChat
        messages={searchString.length ? searchResults : messages}
        text={currentMessage}
        onInputTextChanged={(messages) => setCurrentMessage(messages)}
        onSend={(messages) => onSendMessage(messages)}
        renderCustomView={(props) => (
          <>
            {props.currentMessage.reply_for ? (
              <ReplyMessage
                messages={props.currentMessage.reply_for}
                post_by_user={props.currentMessage.user._id}
                user_id={user_id}
                publicKey={receiverPublicKey}
              />
            ) : null}
            {props.currentMessage.forwarded_from ? (
              <ForwardedMessage
                messages={props.currentMessage.forwarded_from}
                post_by_user={props.currentMessage.user._id}
                user_id={user_id}
                publicKey={receiverPublicKey}
              />
            ) : null}

            {props.currentMessage.file ? (
              <FilesRender files={props.currentMessage.file} />
            ) : null}
          </>
        )}
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
        renderSend={(props) => SentButton(props, selectedFile, selectedMessage)}
        user={{
          _id: user_id,
        }}
        renderBubble={(props) => <MessageBubble props={props} />}
        renderUsernameOnMessage={false}
        infiniteScroll={true}
        scrollToBottom={true}
        onLongPress={(props, context) => onLongPress(props, context)}
        onLoadEarlier={fetchEarlierData}
        isLoadingEarlier={false}
        renderLoadEarlier={() => <View></View>}
        loadEarlier={true}
        renderAvatar={() => null}
        showAvatarForEveryMessage={true}
        placeholder={t("chat.type")}
        renderChatFooter={() => (
          <>
            {/* 功能按鈕 */}
            {showMessageFunctionBar ? (
              <MessageFunctionBar
                handleDeleteMessage={handleDeleteMessage}
                handleForwardMessages={handleForwardMessages}
                handleReplyMessage={handleReplyMessage}
                handlePinMessage={handlePinMessage}
                numSelected={selectedMessage.length}
                handleClose={clearSelectedMessage}
              />
            ) : null}
            {isOnReply ? (
              <SelectedMessagesContainer
                messages={selectedMessage}
                handleClose={(message) => updateSelectedMessage(message)}
              />
            ) : null}
            {selectedForwardMessage.length ? (
              <SelectedMessagesContainer
                type="forwarded"
                messages={selectedForwardMessage}
                handleClose={(message) => removeSelectedForwardMessage(message)}
              />
            ) : null}

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

      <EmojiBoard
        containerStyle={[tw.relative, showEmojiBoard ? tw.h100 : tw.h0]}
        showBoard={true}
        onClick={(messages) => {
          setCurrentMessage(`${currentMessage}${messages.code}`);
        }}
        onRemove={() => setShowEmojiBoard(!showEmojiBoard)}
      />
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
  saveSelectedForwardMessages: (messages) =>
    dispatch(onSaveSelectedForwardMessage(messages)),
  removeSelectedForwardMessage: (message) =>
    dispatch(onRemoveSelectedForwardMessage(message)),
  clearSelectedForwardMessage: () => dispatch(onClearSelectedForwardMessage()),
  pinnedMessage: (room_id, message_id) =>
    dispatch(onPinnedMessage(room_id, message_id)),
  unpinnedMessage: (room_id, message_id) =>
    dispatch(onUnpinnedMessage(room_id, message_id)),
});

const mapStateToProp = createStructuredSelector({
  userInfo: selectUserInfo,
  conversations: selectConversations,
  messageReRenderTrigger: selectMessagesReRenderTrigger,
  selectedMessage: selectSelectedMessage,
  chatRoomList: selectChatRoomList,
  selectedForwardMessage: selectSelectedForwardMessage,
  privateKey: selectPrivateKey,
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
