/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-07-07 17:24:42
 * @LastEditTime: 2021-07-07 17:32:19
 * @LastEditors: Kenzi
 */

import { NativeBaseProvider, extendTheme } from "native-base";

const theme = extendTheme({
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
  },
});

export default theme;
