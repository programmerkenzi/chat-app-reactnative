/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-28 18:08:13
 * @LastEditTime: 2021-06-30 11:27:02
 * @LastEditors: Kenzi
 */
/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-28 17:10:31
 * @LastEditTime: 2021-04-28 18:07:08
 * @LastEditors: Kenzi
 */
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import FunctionsBar from "./FunctionsBar";
import { GiftedChat } from "react-native-gifted-chat";
import SentButton from "./SentButton";
import EmojiBoard from "react-native-emoji-board";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserId } from "../../redux/auth/auth.selector";
import AudioPlayBar from "../audioPlayBar/AudioPlayBar";
import VideoContainer from "./VideoContainer";
import { handleUploadResource } from "../../library/utils/resources";
import ImageContainer from "./ImageContainer";
import MessageBubble from "./MessageBubble";
import { t } from "../../i18n";
import FileRender from "./../fileRender/FileRender";

const CustomGiftChat = ({
  userId,
  messages = [],
  onSendMessage,
  fetchEarlierData,
  showFooter = true,
}) => {
  //尚未发送的讯息
  const [currentMessage, setCurrentMessage] = useState("");
  //表情符号键盘
  const [showEmojiBoard, setShowEmojiBoard] = useState(false);
  //發送消息或资源
  const onSend = async (type, file, message) => {
    if (type === "file") {
      const resourceId = await handleUploadResource(file);
      return onSendMessage("file", resourceId);
    } else {
      return onSendMessage("text", message);
    }
  };

  return (
    <GiftedChat
      messages={messages}
      text={currentMessage}
      onInputTextChanged={(messages) => setCurrentMessage(messages)}
      onSend={(messages) => onSend("text", null, messages)}
      renderCustomView={(props) =>
        props.currentMessage.file ? (
          <FileRender file={props.currentMessage.file} />
        ) : null
      }
      renderAvatarOnTop={true}
      renderActions={(props) =>
        showFooter ? (
          <FunctionsBar
            props={props}
            handleOnSend={(fileUri) => onSend("file", fileUri, null)}
            setShowEmojiBoard={setShowEmojiBoard}
            showEmojiBoard={showEmojiBoard}
          />
        ) : null
      }
      renderMessageVideo={(props) => (
        <VideoContainer url={props.currentMessage.video} />
      )}
      renderMessageAudio={(props) => (
        <AudioPlayBar
          id={props.currentMessage._id}
          audio={props.currentMessage.audio}
        />
      )}
      renderSend={showFooter ? SentButton : null}
      user={{
        _id: userId,
      }}
      renderBubble={MessageBubble}
      renderMessageImage={(props) => (
        <ImageContainer imgs={props.currentMessage.image} />
      )}
      renderUsernameOnMessage={true}
      infiniteScroll={true}
      scrollToBottom={true}
      onLoadEarlier={fetchEarlierData}
      isLoadingEarlier={false}
      renderLoadEarlier={() => <View></View>}
      loadEarlier={true}
      placeholder={showFooter ? t("chat.type") : t("issues.type")}
      renderChatFooter={() => (
        <EmojiBoard
          containerStyle={{ width: "100%" }}
          showBoard={showEmojiBoard}
          onClick={(messages) =>
            // handleOnSend({ content: messages.code, type: "text" })
            {
              setCurrentMessage(`${currentMessage}${messages.code}`);
            }
          }
          onRemove={() => setShowEmojiBoard(!showEmojiBoard)}
        />
      )}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(CustomGiftChat);

const styles = StyleSheet.create({});
