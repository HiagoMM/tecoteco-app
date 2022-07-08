import { useState } from "react";
import { enableLayoutAnimations } from "react-native-reanimated";
import Home from "./src/pages/home/home";

import { Container, Input, Button } from "./styles";

function App() {
  enableLayoutAnimations(true);
  const [url, setUrl] = useState("http://192.168.1.100:3000");
  const [username, setUsername] = useState("hugo");
  const [submit, setSubmit] = useState(false);

  return (
    <Container>
      {submit ? (
        <Home user={username} url={url} />
      ) : (
        <>
          <Input value={url} onChangeText={(v) => setUrl(v)} />
          <Input value={username} onChangeText={(v) => setUsername(v)} />
          <Button onPress={() => setSubmit(true)} title="Entrar" />
        </>
      )}
    </Container>
  );
}

export default App;
