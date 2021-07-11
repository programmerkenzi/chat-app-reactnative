/*
 * @Description:
 * @Author: Lewis
 * @Date: 2021-02-10 15:02:13
 * @LastEditTime: 2021-03-21 14:40:10
 * @LastEditors: Kenzi
 */
import React, { useState } from "react";
import { View } from "react-native-animatable";
import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { FlatList } from "react-native";
import ContactCheckBox from "../components/ContactCheckBox";
import CheckedItemBox from "../components/CheckedItemBox";
import { StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/core";

const SelectMembersPage = ({ navigation }) => {
  const myUserId = "u2";

  //上個頁面名稱
  const fromRouteName = useRoute().params.routeName;

  //搜尋
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //聯絡人名單
  const [contactListData, setContactListData] = useState([]);
  const [checkedItem, setCheckedItem] = useState(
    fromRouteName === "GroupInfo" ? useRoute().params.item.users : []
  ); //來自group info || add new group

  //re render trigger of check Item Box
  const [onChangeId, setOnChangeId] = useState(0);

  //增加或刪除到已經選定的列表
  const updateCheckedItemList = (item) => {
    let checked = checkedItem;
    const itemIndex = checkedItem.findIndex((e) => e.id === item.id);

    if (itemIndex === -1) {
      checked.push(item);
    } else {
      checked.splice(itemIndex, 1);
    }
    setCheckedItem(checked);
  };

  //勾選成員
  const onPressCheck = (item) => {
    updateCheckedItemList(item);
    setOnChangeId(onChangeId + 1);
  };

  //新增群組
  const onPressNext = () => {
    return navigation.navigate("EditGroupInfo", { item: checkedItem });
  };

  //編輯群組成員
  const onSubmitEditMembers = () => {
    return navigation.goBack();
  };

  return (
    <View style={style.container}>
      <PrimarySearchBar
        data={contactListData}
        searchString={searchString}
        setSearchString={setSearchString}
        setSearchResults={setSearchResults}
      />
      <FlatList
        data={searchString.length ? searchResults : contactListData}
        renderItem={({ item, index }) => (
          <ContactCheckBox
            item={item}
            index={index}
            onPressCheck={onPressCheck}
            checkedItem={checkedItem}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <CheckedItemBox
        checkedItem={checkedItem}
        reRenderTrigger={onChangeId}
        fromRouteName={fromRouteName}
        onPressNext={onPressNext}
        onSubmitEditMembers={onSubmitEditMembers}
      />
    </View>
  );
};
export default SelectMembersPage;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  avatar: {
    width: "100%",
    display: "flex",
  },
});