/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-19 12:41:59
 * @LastEditTime: 2021-04-19 12:47:34
 * @LastEditors: Kenzi
 */

import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect } from "react-redux";
import { logoutStart } from "../../../redux/auth/auth.actions";

const LogoutButton = ({ logoutStart }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => logoutStart()}>
        <Ionicons color={"#fff"} size={30} name="log-out-outline" />
      </TouchableOpacity>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logoutStart: () => dispatch(logoutStart()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);

const styles = StyleSheet.create({});
