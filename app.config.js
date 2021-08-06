/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-05-20 14:20:35
 * @LastEditTime: 2021-06-30 11:47:03
 * @LastEditors: Kenzi
 */
process.env.APP_ENV = "development";
module.exports = () => {
  if (process.env.APP_ENV === "production") {
    return require("./app.production.json");
  } else {
    return require("./app.development.json");
  }
};
