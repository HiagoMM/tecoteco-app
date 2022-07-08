import styled, { css } from "styled-components/native";
import Animated from "react-native-reanimated";

export const Container = styled.View<{ small: boolean }>`
  width: 100%;
  height: ${(props) => (props.small ? "17px" : "30px")};
  border-radius: 10px;
  background-color: rgba(227, 227, 227, 0.8);
  margin: 5px 0px;
  overflow: hidden;
  flex-direction: column;
`;

export const Bar = styled(Animated.View)`
  border-radius: 10px;
  height: 100%;
  width: 100%;
  background-color: #fca311 ;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

export const TextHelper = styled.Text`
  font-size: 15px;
  color: #fff;
`;

export const HelperContainer = styled.View<{ reversed: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0px 3px;
  ${(props) =>
    props.reversed &&
    css`
      flex-direction: row-reverse;
    `};
`;
