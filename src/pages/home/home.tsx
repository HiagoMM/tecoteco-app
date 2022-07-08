import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import ShowGift from "../../components/showGift/showGift";
import SideImage from "../../components/sideImage/sideImage";
import {
  Container,
  GiftContainer,
  Pictures,
  SideContainer,
  Versus,
  Settings,
  ModalContent,
  LastGiftImg,
} from "./styles";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native";

interface HomeProps {
  user: string;
  url: string;
}
const maxPoint = 5000;

const Home: React.FC<HomeProps> = ({ user, url}) => {
  const socket = useRef(io(url)).current;
  const [modal, setModal] = useState({ open: false, target: "left" });
  const [gifts, setGifts] = useState([]);
  const [lastGift, setLastGift] = useState({ user: "", gift: "" });
  const [left, setLeft] = useState({
    points: 0,
    gifts: [],
  });
  const [right, setRight] = useState({
    points: 0,
    gifts: [],
  });

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", { user }, (res) => {
        setGifts(res);
      });
    });
  }, []);

  useEffect(() => {
    const gift = socket.on("gift", (data) => {
      const rightGift = right.gifts.find((gift) => gift.id === data.giftId);
      const leftGift = left.gifts.find((gift) => gift.id === data.giftId);
      setLastGift({ user: data.profilePictureUrl, gift: data.giftPictureUrl });
      if (rightGift) {
        setRight((prev) => {
          const value = prev.points + rightGift.price * data.gift.repeat_count;
          if (value > maxPoint) {
            setLeft((atual) => ({
              ...atual,
              points: 0,
            }));
          }
          return {
            ...prev,
            points: value > maxPoint ? 0 : value,
          };
        });
      }
      if (leftGift) {
        setLeft((prev) => {
          const value = prev.points + leftGift.price * data.gift.repeat_count;
          if (value > maxPoint) {
            setRight(atual =>({
              ...atual,
              points: 0,
            }));
          }
          return {
            ...prev,
            points: value > maxPoint ? 0 : value,
          };
        });
      }
    });
    return () => {
      gift.removeListener();
    };
  }, [right.gifts, left.gifts]);

  return (
    <Container>
      <Versus />
      {!!lastGift.user && (
        <>
          <LastGiftImg source={{ uri: lastGift.user }} />
          <LastGiftImg
            source={{ uri: lastGift.gift }}
            style={{ bottom: "27.5%", width: 40, height: 40 }}
          />
        </>
      )}
      <Settings
        onPress={() => setModal({ open: true, target: "right" })}
        style={{ right: "4%" }}
      >
        <AntDesign name="API" size={24} color="#fca311" />
      </Settings>
      <Settings
        onPress={() => setModal({ open: true, target: "left" })}
        style={{ left: "4%" }}
      >
        <AntDesign name="API" size={24} color="#fca311" />
      </Settings>
      <Pictures>
        <SideImage maxPoints={maxPoint} points={left.points} />
        <SideImage maxPoints={maxPoint} points={right.points} reversed />
      </Pictures>
      <GiftContainer>
        <SideContainer>
          {left.gifts.map((gift, index) => (
            <TouchableOpacity
              key={gift.id}
              onPress={() => {
                setLeft((prev) => ({
                  ...prev,
                  gifts: prev.gifts.filter((g) => g.id !== gift.id),
                }));
              }}
            >
              <ShowGift {...gift} />
            </TouchableOpacity>
          ))}
        </SideContainer>
        <SideContainer>
          {right.gifts.map((gift, index) => (
            <TouchableOpacity
              key={gift.id}
              onPress={() => {
                setRight((prev) => ({
                  ...prev,
                  gifts: prev.gifts.filter((g) => g.id !== gift.id),
                }));
              }}
            >
              <ShowGift {...gift} />
            </TouchableOpacity>
          ))}
        </SideContainer>
      </GiftContainer>
      <Modal isVisible={modal.open}>
        <ModalContent>
          {gifts
            .sort(function (a, b) {
              return a.price - b.price;
            })
            .map((gift, index) => (
              <TouchableOpacity
                key={gift.id}
                onPress={() => {
                  setModal({ open: false, target: modal.target });
                  if (modal.target === "left") {
                    setLeft({ ...left, gifts: [...left.gifts, gift] });
                  } else {
                    setRight({ ...right, gifts: [...right.gifts, gift] });
                  }
                }}
              >
                <ShowGift {...gift} />
              </TouchableOpacity>
            ))}
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Home;
