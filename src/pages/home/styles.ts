import styled from "styled-components/native";
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #edf2f4;
  align-items: center;
`;

export const Pictures = styled.View`
  height: 70%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Versus = styled.Image.attrs(() => ({
  source: require("../../../assets/versus.png"),
  resizeMode: "contain",
}))`
  position: absolute;
  width: 120px;
  height: 120px;
  z-index: 100;
  top: 20%;
`;

export const GiftContainer = styled.View`
  height: 30%;
  margin-top: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const SideContainer = styled.View`
  width: 50%;
  align-items: center;
  justify-content: space-between;
  height: 85%;
`;
export const Settings = styled.TouchableOpacity`
  position: absolute;
  bottom: 3%;
  width: 24px;
  height: 24px;
  z-index: 100;
`;

export const ModalContent = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}))`
  width: 100%;
  background-color: #edf2f4;
  padding: 3%;
  border-radius: 10px;
  max-height: 70%;
`;

export const LastGiftImg = styled.Image.attrs(() => ({
  resizeMode: "contain",
}))`
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 30%;
  border-radius: 50px;
  z-index: 100;
`;
