/*
 * @Description:
 * @Author: Kenzi
 * @Date: 2021-04-11 17:21:39
 * @LastEditTime: 2021-06-07 18:30:38
 * @LastEditors: Kenzi
 */

import styled from "styled-components/native";
import { darkGary, lightGary, blue } from "./color";

export const padding = {
  none: "0px",
  xSmall: "5px",
  small: "10px",
  medium: "15px",
  large: "20px",
};

export const Container = styled.View`
  flex: 1;
  padding: ${(props) => {
    switch (props.pd) {
      case "medium":
        return padding.medium;
      case "large":
        return padding.large;
      case "none":
        return padding.none;
      default:
        return padding.small;
    }
  }};
`;

export const ContainerWithBgColor = styled(Container)`
  background-color: ${(props) => {
    switch (props.bgColor) {
      case "dark":
        return darkGary.primary;
      case "light":
        return lightGary.primary;

      case "blue":
        return blue.primary;
      default:
        return props.bgColor;
    }
  }};
  padding: ${(props) => {
    switch (props.pd) {
      case "medium":
        return padding.medium;
      case "large":
        return padding.large;
      case "none":
        return padding.none;
      default:
        return padding.small;
    }
  }};
`;

export const ContainerFlexRow = styled(Container)`
  flex-direction: row;
`;

export const ContainerFlewColumn = styled(Container)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MenuContainer = styled(Container)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${(props) => {
    switch (props.pd) {
      case "small":
        return padding.small;
      case "large":
        return padding.large;
      default:
        return padding.medium;
    }
  }};
`;

export const Row = styled.View`
  flex-direction: row;
  height: 40px;
  width: 100%;
`;
