/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-06 11:55:32
 * @LastEditTime: 2021-07-08 15:28:33
 * @LastEditors: Kenzi
 */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { connect } from "react-redux";
import { logoutStart } from "../../../redux/auth/auth.actions";
import { Box } from "native-base";

const SettingPage = ({ logout }) => {
  return (
    <Box marginTop={200}>
      <Button onPress={() => logout()}>logout</Button>
    </Box>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);

const styles = StyleSheet.create({});
