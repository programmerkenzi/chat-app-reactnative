/*
 * @Description: 聊天记录
 * @Author: Lewis
 * @Date: 2021-01-20 16:32:48
 * @LastEditTime: 2021-07-16 12:15:33
 * @LastEditors: Kenzi
 */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Badge } from "react-native-elements";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { darkGary, lightGary } from "./../../../../styles/color";
import { Time } from "react-native-gifted-chat";
import { selectUserInfo } from "./../../../../redux/user/user.selector";
selectUserInfo;
const ListItem = ({ props }) => {
  const { avatar, name, lastMessage, date, time, unread } = props;
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <View style={styles.leftChat}>
          <Avatar
            style={styles.avatar}
            source={{ uri: avatar }}
            title={name.toUpperCase().substring(0, 2)}
            resizeMode="contain"
          />
          {unread > 0 ? (
            <Badge
              value={unread}
              status="primary"
              containerStyle={{ position: "absolute", top: -2, right: -4 }}
            />
          ) : null}
        </View>
        <View style={styles.midChat}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.lastMessage}>{lastMessage}</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.timeText}>{date}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
});

export default connect(mapStateToProps)(ListItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  chatContent: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
  },
  midChat: {
    flexGrow: 1,
    marginLeft: 10,
    paddingBottom: 7,
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {},
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  lastMessage: {
    color: darkGary.primary,
  },
  leftChat: {},
  timeText: {
    color: darkGary.primary,
    fontSize: 13,
    marginBottom: 5,
    alignSelf: "center",
  },
  avatar: {
    overflow: "hidden",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});
