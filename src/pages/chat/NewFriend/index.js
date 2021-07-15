/*
 * @Description: 聊天加好友
 * @Author: Lewis
 * @Date: 2021-02-10 15:02:01
 * @LastEditTime: 2021-07-14 13:52:53
 * @LastEditors: Kenzi
 */
import React from "react";
import { View } from "react-native";

import { useState } from "react";
import ContactItem from "../components/ContactItem";
import { ScrollView } from "react-native-gesture-handler";
import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { useRoute } from "@react-navigation/native";
import { searchUserByPublicId } from "../../../chat_api/chat";

const NewFriendPage = ({ navigation }) => {
  const [searchString, setSearchString] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const routeName = useRoute().name;

  return (
    <View>
      <PrimarySearchBar
        data={searchResults}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
        type="server"
        searchByServer={searchUserByPublicId}
      />
      <ScrollView>
        {searchString.length
          ? searchResults.map((item) => (
              <ContactItem props={item} routeName={routeName} key={item._id} />
            ))
          : null}
      </ScrollView>

      <ScrollView></ScrollView>
    </View>
  );
};

export default NewFriendPage;
