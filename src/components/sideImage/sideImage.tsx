import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Container, LoadingContainer } from "./styles";
import LoadingBar from "../LoadingBar/LoadingBar.component";
import Animated from "react-native-reanimated";

interface SideImageProps {
  maxPoints: number;
  points: number;
  reversed?: boolean;
}

const SideImage: React.FC<SideImageProps> = ({
  maxPoints,
  points,
  reversed,
}) => {
  const [image, setImage] = useState("https://i.stack.imgur.com/l60Hf.png");

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (result.cancelled !== true) {
      setImage(result.uri);
    }
  };

  return (
    <Container onPress={handleSelectImage}>
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      <LoadingContainer>
        <LoadingBar max={maxPoints} current={points} reversed={reversed} />
      </LoadingContainer>
    </Container>
  );
};

export default SideImage;
