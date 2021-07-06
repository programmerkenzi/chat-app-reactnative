/*
 * @Description: 聊天组
 * @Author: Lewis
 * @Date: 2021-01-18 17:51:43
 * @LastEditTime: 2021-03-21 11:11:26
 * @LastEditors: Kenzi
 */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import GroupChatRoomList from "../../../data/GroupChatRoomList";
import ContactItem from "../components/ContactItem";
import { useRoute } from "@react-navigation/native";

const GroupChatPage = ({ navigation }) => {
  //搜尋
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const routeName = useRoute().name

  return (
    <View style={styles.container}>
      <PrimarySearchBar
        data={GroupChatRoomList}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
      />
      <FlatList
        data={searchString.length ? searchResults : GroupChatRoomList}
        renderItem={({ item, index }) => (
          <ContactItem props={item} routeName={routeName} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GroupChatPage;
