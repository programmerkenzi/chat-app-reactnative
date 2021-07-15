/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-08 15:40:44
 * @LastEditTime: 2021-07-14 12:51:41
 * @LastEditors: Kenzi
 */
/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-08 15:40:44
 * @LastEditTime: 2021-03-10 12:22:14
 * @LastEditors: Kenzi
 */

import React from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Avatar, ListItem } from "react-native-elements";
import bg from "../../../../assets/bg.jpg";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Toast } from "native-base";
import { createFileUrl } from "./../../../library/utils/utils";
import { connect } from "react-redux";
import { selectUserInfo } from "./../../../redux/auth/auth.selector";
import { checkIsSameArray } from "./../../../library/utils/utils";
import { toMessagesPage } from "../utils";
import { initializeChatRoomStart } from "../../../redux/chat/chat.actions";
import { selectChatRoomList } from "../../../redux/chat/chat.selector";
import { createStructuredSelector } from "reselect";

const UserInfoPage = ({ navigation, userInfo, initChatRoom, chatRoomList }) => {
  const item = useRoute().params.item;
  const inContact = useRoute().params.inContact;
  const toChatRoom = async () => {
    const chatRoomArray = Object.values(chatRoomList);
    const roomUserIds = [userInfo._id, item._id];
    let isExistRoom = null;
    //确认该房间使否已经在列表
    chatRoomArray.some((room) => {
      if (typeof room === "object") {
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
      const initRoom = await initChatRoom(navigation, [item._id], "private");
    }
  };

  const onPressChat = () => {
    if (item.unread) {
      return navigation.navigate("Messages", { userId: item._id, item: item });
    } else {
      return toChatRoom();
    }
  };

  const onPressCall = () => {
    return alert("Call");
    // return navigation.navigate("Messages", { userId: item.id, item: item });
  };

  const onPressAdd = () => {
    Toast.show({
      position: "top",
      text: "Friend request sent",
      duration: 5000,
      buttonText: "Okay",
      style: { width: "80%", marginTop: 50, alignSelf: "center" },
    });

    return navigation.goBack(null);
  };

  return (
    <View style={style.cardContainer}>
      <ImageBackground
        style={inContact ? style.imageBg : style.imageBg_full}
        source={bg}
      >
        <View style={style.avatarContainer}>
          <Avatar
            rounded
            size="xlarge"
            title={item.name.toUpperCase().substring(0, 2)}
            source={{
              uri: item.avatar.length ? createFileUrl(item.avatar) : "http://",
            }}
            containerStyle={{
              marginTop: "35%",
              borderWidth: 2,
              borderColor: "#000000",
            }}
            title={item.name.toUpperCase().substring(0, 2)}
          />
          <Text style={style.title}>{item.name}</Text>
          <Text style={style.jobTitleText}>CEO</Text>
        </View>
        <View style={style.iconButtonRow}>
          {inContact ? null : (
            <TouchableOpacity onPress={() => onPressAdd()}>
              <Icon style={style.iconButton} name="person-add-outline" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => onPressChat()}>
            <Icon style={style.iconButton} name="chatbubble-ellipses-outline" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressCall()}>
            <Icon style={style.iconButton} name="call" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {inContact ? (
        <ScrollView style={style.info}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Info</ListItem.Title>
              <ListItem.Subtitle>{item.info || item.status}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

          <ListItem bottomDivider>
            <Icon name="phone-portrait-sharp" style={style.listItemIcon}></Icon>
            <ListItem.Content>
              <ListItem.Title>09123456789</ListItem.Title>
              <ListItem.Subtitle>Work</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="mail-sharp" style={style.listItemIcon}></Icon>
            <ListItem.Content>
              <ListItem.Title>123456@gmail.com</ListItem.Title>
              <ListItem.Subtitle>Work</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          <ListItem bottomDivider>
            <Icon name="calendar-sharp" style={style.listItemIcon}></Icon>
            <ListItem.Content>
              <ListItem.Title>09:00 - 18:00</ListItem.Title>
              <ListItem.Subtitle>Working</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </ScrollView>
      ) : null}
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  imageBg: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-evenly",
    resizeMode: "cover",
    alignItems: "center",
  },
  imageBg_full: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    resizeMode: "cover",
    alignItems: "center",
  },

  avatarContainer: {
    position: "absolute",
    top: "5%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },

  icon: {
    marginTop: 5,
    marginRight: 5,
    color: "#fff",
    fontSize: 20,
  },

  jobTitleText: {
    color: "#fff",
    fontSize: 15,
    marginTop: 5,
  },

  info: {
    flex: 1,
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    height: 50,
  },
  listItemIcon: {
    color: "#4267B2",
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 30,
  },
  listItemText: {
    marginTop: "auto",
    marginBottom: "auto",
    fontSize: 25,
  },
  iconButtonRow: {
    position: "absolute",
    bottom: "5%",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconButton: {
    color: "#fff",
    fontSize: 25,
  },
});

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
  chatRoomList: selectChatRoomList,
});

const mapDispatchToProps = (dispatch) => ({
  initChatRoom: (navigation, user_ids, room_type) =>
    dispatch(initializeChatRoomStart(navigation, user_ids, room_type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPage);
