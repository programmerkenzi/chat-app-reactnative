/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-01 13:18:31
 * @LastEditTime: 2021-06-17 16:10:46
 * @LastEditors: Kenzi
 */
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectIsLoading } from "../../redux/auth/auth.selector";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { selectRouterName } from "./../../redux/router/router.select";

const CustomSpinner = ({ isLoading, routerName }) => {
  return isLoading && routerName !== "IssuesChat" ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#405de6" style={styles.spinner} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.6)",
  },
  spinner: {},
});

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
  routerName: selectRouterName,
});

export default connect(mapStateToProps)(CustomSpinner);
