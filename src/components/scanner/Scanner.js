import React, { useEffect, useState } from "react";

import {
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";
import { onSearchAssetByCode } from "../../pages/asset-management/utilts";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { t } from "../../i18n";

const Scanner = ({ fromRouteName, onSearch }) => {
  const navigation = useNavigation();

  //螢幕大小
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  //掃描區域
  const finderWidth = 280;
  const finderHeight = 230;
  const viewMinX = (width - finderWidth) / 2;
  const viewMinY = (height - finderHeight) / 2;

  //拍照權限
  const [hasPermission, setHasPermission] = useState(null);

  //相機方向
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);

  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = (BarCodeScannerResult) => {
    if (!scanned) {
      //掃瞄範圍
      const { type, data, bounds: { origin } = {} } = BarCodeScannerResult;

      if (BarCodeScannerResult.bounds) {
        const { x, y } = origin;
        if (
          x >= viewMinX &&
          y >= viewMinY &&
          x <= viewMinX + finderWidth / 2 &&
          y <= viewMinY + finderHeight / 2
        ) {
          setScanned(true);
          setTimeout(() => setScanned(false), 1000);
          onSearchAssetByCode(data, navigation, fromRouteName);
        }
      } else {
        setScanned(true);
        setTimeout(() => setScanned(false), 1000);
        onSearchAssetByCode(data, navigation, fromRouteName);
      }
    }
  };

  //相機方向
  const HandleSetCameraSide = () => {
    setType(
      type === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back
    );

    if (hasPermission === null) {
      return <Text>{t("cmn.rcp")}</Text>;
    }

    if (hasPermission === false) {
      return <Text>{t("cmn.ncp")}</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={{ height: height * 1.1, width: width }}
        key={hasPermission}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
            onPress={() => HandleSetCameraSide()}
          ></TouchableOpacity>
        </View>

        <BarcodeMask edgeColor="#405de6" showAnimatedLine />

        {scanned && (
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        )}
      </BarCodeScanner>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
