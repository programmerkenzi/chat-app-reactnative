/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-12 09:20:53
 * @LastEditTime: 2021-08-06 17:44:16
 * @LastEditors: Kenzi
 */
/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-12 09:20:53
 * @LastEditTime: 2021-03-21 11:00:28
 * @LastEditors: Kenzi
 */

import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ListItem } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { toUserInfoPage } from "./../utils";
import bg from "../../../../assets/bg.jpg";
const GroupInfoPage = ({ navigation }) => {
  const item = useRoute().params.item;
  const inContact = useRoute().params.inContact;

  const handleOnPress = (item) => {
    return toUserInfoPage(item, navigation);
  };

  return (
    <>
      <ImageBackground
        style={styles.bg}
        source={item.avatar ? { uri: item.avatar } : bg}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{item.name}</Text>
        </View>
      </ImageBackground>

      <View style={styles.infoContainer}>
        <ScrollView>
          <ListItem key={item.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>Description</ListItem.Title>
              <ListItem.Subtitle>{item.info}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <ListItem key={item.receivers.length} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.receivers.length} Members</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          {item.receivers.map((user) => (
            <TouchableOpacity onPress={() => handleOnPress(user)}>
              <ListItem
                containerStyle={styles.members}
                key={user.id}
                bottomDivider
              >
                <Avatar
                  rounded
                  title={user.name.toUpperCase().substring(0, 2)}
                  source={{ uri: user.avatar }}
                />
                <ListItem.Content>
                  <ListItem.Title>{user.name}</ListItem.Title>
                  <ListItem.Subtitle>3:30pm</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default GroupInfoPage;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    display: "flex",
    resizeMode: "cover",
    padding: 10,
  },
  headerContainer: {
    height: 50,
    marginTop: "90%",
  },

  header: {
    color: "#fff",
    fontSize: 25,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  members: {},
});
