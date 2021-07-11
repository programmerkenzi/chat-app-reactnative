/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-07 10:06:07
 * @LastEditTime: 2021-07-08 14:52:05
 * @LastEditors: Kenzi
 */

import React, { useState, useEffect } from "react";
import { FormControl, Input, Stack, Button, Box } from "native-base";
import { View } from "react-native";
import { tw } from "react-native-tailwindcss";
import { t } from "../../../i18n";
import { Icon } from "react-native-elements";
import { onUpdateObjState } from "../../../library/utils/utils";
import { connect } from "react-redux";
import { loginStart } from "./../../../redux/auth/auth.actions";
import { Alert } from "react-native";
import { selectLocale } from "./../../../redux/setting/setting.selector";
import { createStructuredSelector } from "reselect";

const LoginPage = ({ login, locale }) => {
  const [noUsername, setNoUsername] = useState(false);
  const [noPassword, setNoPassword] = useState(false);
  const [data, setData] = useState({
    username: null,
    password: null,
  });

  const [lang, setLang] = useState("");

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  const handleOnLogin = () => {
    if (data.username && data.password) {
      if (data.password.length > 0 && data.username.length > 0) {
        login(data);
      }
    } else {
      Alert.alert("请填写帐号与密码");
    }
  };

  const watchInput = () => {
    if (data.username === "") {
      setNoUsername(true);
    } else {
      setNoUsername(false);
    }
    if (data.password === "") {
      setNoPassword(true);
    } else {
      setNoPassword(false);
    }
  };

  useEffect(() => {
    watchInput();
  }, [data]);

  return (
    <View style={[tw.flex1, tw.flexCol, tw.justifyBetween]} key={lang}>
      <View style={[tw.flex1, tw.flexCol, tw.justifyCenter]}>
        <Icon
          name="comment-dots"
          color="#3b82f6"
          size={175}
          type="font-awesome-5"
        />
      </View>
      <View style={[tw.flex1, tw.flexCol, tw.justifyCenter]}>
        <Stack mx={5} space={8}>
          <FormControl isRequired isInvalid={noUsername}>
            <Input
              p={2}
              placeholder={t("cmn.username")}
              value={data.username}
              onChangeText={(text) =>
                onUpdateObjState("username", text, setData)
              }
            />
            <FormControl.ErrorMessage>
              {t("cmn.input") + t("cmn.username")}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={noPassword}>
            <Input
              p={2}
              placeholder={t("cmn.password")}
              value={data.password}
              type="password"
              onChangeText={(text) =>
                onUpdateObjState("password", text, setData)
              }
            />
            <FormControl.ErrorMessage>
              {t("cmn.input") + t("cmn.password")}
            </FormControl.ErrorMessage>
          </FormControl>

          <Box marginTop={5}>
            <Button onPress={() => handleOnLogin()}>{t("cmn.login")}</Button>
          </Box>
        </Stack>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginStart(data)),
});
const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
