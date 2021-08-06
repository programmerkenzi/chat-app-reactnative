/*
 * @Description:
 * @Author: Lewis
 * @Date: 2021-01-09 18:03:29
 * @LastEditTime: 2021-05-20 14:26:17
 * @LastEditors: Kenzi
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      "transform-inline-environment-variables",
    ],
  };
};
