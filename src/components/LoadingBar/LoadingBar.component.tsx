import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import {
  Bar,
  Container,
  HelperContainer,
  TextHelper,
} from "./LoadingBar.styles";

interface LoadingBarProps {
  max?: number;
  current?: number;
  small?: boolean;
  reversed?: boolean;
}

const Layout = Dimensions.get("window");

const LoadingBar: React.FC<LoadingBarProps> = ({
  current = 0,
  max = 0,
  small,
  reversed,
}) => {
  const translateX = useSharedValue(0);
  const [barSize, setBarSize] = useState(Layout.width);
  const barStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    max = max <= 0 ? 1 : max;
    current = current >= max ? max : current;
    const translateXPos = (barSize / max) * (max - current) * -1;

    translateX.value = withSpring(translateXPos * (reversed ? -1 : 1), {
      damping: 100,
    });
  }, [current, max, barSize]);

  return (
    <>
      <Container
        small={small}
        onLayout={(ev) => setBarSize(ev.nativeEvent.layout.width)}
      >
        <Bar style={barStyle} />
      </Container>
      <HelperContainer reversed={reversed}>
        <TextHelper>
          {current} / {max}
        </TextHelper>
      </HelperContainer>
    </>
  );
};

export default LoadingBar;
