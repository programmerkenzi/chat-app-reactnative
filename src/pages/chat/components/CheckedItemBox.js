/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-11 12:42:04
 * @LastEditTime: 2021-07-27 15:52:18
 * @LastEditors: Kenzi
 */

import React from "react";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
  SectionList,
} from "react-native";
import { Avatar } from "react-native-elements";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native";
import AvatarWithNameTag from "../../../components/avatarWithNameTag/AvatarWithNameTag";

const CheckedItemBox = ({
  checkedItem,
  reRenderTrigger,
  pressNext,
  onPressNext,
  fromRouteName,
  onSubmitEditMembers,
}) => {
  return checkedItem.length ? (
    <Animatable.View
      animation={pressNext ? "fadeOutDown" : "fadeInUp"}
      easing="ease-in-out"
      style={style.container}
    >
      <FlatList
        contentContainerStyle={{ margin: 4, width: "100%" }}
        data={checkedItem}
        extraData={reRenderTrigger}
        keyExtractor={(item) => item._id}
        horizontal={false}
        numColumns={4}
        renderItem={({ item }) => <AvatarWithNameTag item={item} />}
      />

      <View style={style.buttonRow}>
        {fromRouteName === "GroupInfo" ? (
          <Button
            title="Submit"
            type="Clear"
            onPress={() => onSubmitEditMembers()}
          />
        ) : (
          <Button title="下一步" type="Clear" onPress={() => onPressNext()} />
        )}
      </View>
    </Animatable.View>
  ) : null;
};

export default CheckedItemBox;

const style = StyleSheet.create({
  container: {
    display: "flex",
    overflow: "scroll",
    flexDirection: "column",
    backgroundColor: "#f1f1f1",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    minHeight: 50,
    maxHeight: "30%",
    zIndex: 10,
    width: "100%",
  },

  buttonRow: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-end",
  },
  checkedItemsContainer: {
    width: "100%",
    flexDirection: "row",
  },
});
