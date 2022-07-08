import React from "react";
import { Image } from "react-native";
import { Container,Name } from "./styles";

interface GiftProps {
  id: string;
  image: string;
  name: string;
  price: string;
}

const ShowGift: React.FC<GiftProps> = ({ image, price, name }) => {
  return (
    <Container>
      <Image
        source={{ uri: image }}
        style={{ width: 50, height: 50 }}
        resizeMode="contain"
      />
      <Name>{price}</Name>
    </Container>
  );
};

export default ShowGift;
