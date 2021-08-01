/*
 * @Description: 聊天加好友
 * @Author: Lewis
 * @Date: 2021-02-10 15:02:01
 * @LastEditTime: 2021-08-02 10:54:27
 * @LastEditors: Kenzi
 */
import React from "react";
import { View, Text } from "react-native";

import { useState } from "react";
import ContactItem from "../components/ContactItem";
import { ScrollView } from "react-native-gesture-handler";
import PrimarySearchBar from "../../../components/searchBar/PrimarySearchBar";
import { useRoute } from "@react-navigation/native";
import { searchUserByPublicId } from "./../../../chat_api/user";
import { tw } from "react-native-tailwindcss";
import { ContainerWithBgColor } from "./../../../styles/layout";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectNotification } from "./../../../redux/notification/notification.selector";
import { Avatar, Badge } from "react-native-elements";
import { createFileUrl } from "./../../../library/utils/utils";
import { useToast } from "native-base";
import { submitFriendRequestPost } from "./../../../chat_api/user";
import { onRemovedNotification } from "../../../redux/notification/notification.action";
import { deleteNotificationById } from "./../../../chat_api/notification";
import { onAddFriend } from "../../../redux/chat/chat.actions";

const NewFriendPage = ({
  navigation,
  notifications,
  removeNotifications,
  addFriend,
}) => {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const routeName = useRoute().name;

  const toast = useToast();

  const addFriendNotifications = notifications
    .filter((notify) => notify.type === "add_friend")
    .map((notify) => {
      return {
        ...notify,
        post_from_user: {
          ...notify.post_from_user[0],
          avatar: createFileUrl(notify.post_from_user[0].avatar),
        },
      };
    });
  const submitAddFriendRequest = async (id) => {
    const theNotification = addFriendNotifications.filter(
      (post) => post.post_from_user._id === id
    )[0];

    const res = await submitFriendRequestPost(
      theNotification.post_from_user.public_id,
      theNotification._id
    );
    if (res.success) {
      await removeNotifications(theNotification._id);
      await addFriend(res.data.user_info);
      toast.show({
        title: "",
        description: "已加入好友",
        duration: 2000,
        isClosable: true,
        placement: "top",
        status: "success",
      });
    }
  };

  const deleteAddFriendRequest = async (id) => {
    const theNotification = addFriendNotifications.filter(
      (post) => post.post_from_user._id === id
    )[0];

    const res = await deleteNotificationById(theNotification._id);

    if (res.success) {
      await removeNotifications(theNotification._id);

      toast.show({
        title: "",
        description: "已删除交友请求",
        duration: 2000,
        isClosable: true,
        placement: "top",
        status: "error",
      });
    }
  };
  return (
    <ContainerWithBgColor bgColor="#fff">
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
              <ContactItem
                props={item}
                routeName={routeName}
                key={item._id}
                btnType="addNewFriend"
              />
            ))
          : null}

        {!searchString.length && notifications.length > 0 ? (
          <>
            <View
              style={[
                tw.m1,
                tw.borderB,
                tw.borderGray300,
                tw.flex,
                tw.flexRow,
                tw.h8,
              ]}
            >
              <Text style={[tw.textGray900]}>交友邀请</Text>
              <Badge
                value={addFriendNotifications.length}
                status="error"
                containerStyle={[tw.mL1]}
              />
            </View>
            {addFriendNotifications.map((notify) => (
              <View>
                <ContactItem
                  props={notify.post_from_user}
                  routeName={routeName}
                  key={notify._id}
                  btnType="submitFriendRequest"
                  submitAddFriendRequest={submitAddFriendRequest}
                  deleteAddFriendRequest={deleteAddFriendRequest}
                />
              </View>
            ))}
          </>
        ) : null}
      </ScrollView>
    </ContainerWithBgColor>
  );
};

const mapStateToProps = createStructuredSelector({
  notifications: selectNotification,
});
const mapDispatchToProps = (dispatch) => ({
  removeNotifications: (notification_id) =>
    dispatch(onRemovedNotification(notification_id)),
  addFriend: (friend_info) => dispatch(onAddFriend(friend_info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFriendPage);
