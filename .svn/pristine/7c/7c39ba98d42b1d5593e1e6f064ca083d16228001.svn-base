/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-03-30 14:15:41
 * @LastEditTime: 2021-04-20 19:06:34
 * @LastEditors: Kenzi
 */

import React from "react";
import { Button } from "react-native-elements";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { t } from "../../i18n";

const SecondarySearchBar = ({
  setQueryString,
  queryString,
  setSearchResults,
  data,
  handleSearch,
  handleOnFilter = null,
  mb,
  searchName = "title",
}) => {
  const handleFilter = () => {
    //沒有設定filter方法時
    if (!handleOnFilter) {
      const results = data.filter((item) =>
        item[searchName].toLowerCase().includes(queryString.toLowerCase())
      );
      setSearchResults(results);
    } else {
      handleOnFilter();
    }
  };
  const handleClear = () => {
    setQueryString(null);
    setSearchResults(null);
  };

  return (
    <View style={[styles.container, { marginBottom: mb }]}>
      <TextInput
        placeholder={t("cmn.input")}
        style={styles.input}
        value={queryString}
        onChangeText={(value) => setQueryString(value)}
      />
      <Button
        icon={{
          name: "close",
          size: 10,
          color: "#808080",
        }}
        containerStyle={styles.cancelBtnContainer}
        buttonStyle={styles.cancelButton}
        onPress={() => handleClear()}
      />
      <Button
        icon={{
          name: "search",
          size: 25,
          color: "#fff",
        }}
        containerStyle={styles.btnContainer}
        buttonStyle={styles.button}
        onPress={() => (data.length ? handleFilter() : handleSearch())}
      />
    </View>
  );
};

export default SecondarySearchBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 30,
    borderRadius: 5,
    overflow: "hidden",
  },

  input: {
    flex: 8,
    height: "100%",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 0,
  },
  btnContainer: {
    flex: 3,
    justifyContent: "center",
    borderRadius: 0,
  },
  button: {
    color: "#808080",
  },

  cancelBtnContainer: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 0,
    height: "100%",
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100%",
    padding: 0,
    paddingRight: "25%",
  },
});
