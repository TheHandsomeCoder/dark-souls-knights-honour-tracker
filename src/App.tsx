import React, {useState} from "react";
import { FileDropzone } from "./components/file-dropzone";
import { Container } from "semantic-ui-react";

interface Character {
  name: string;
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [characters, setCharacters] = useState<Character[]>([])

  return (
    <div className="App">
      <Container text>
        <FileDropzone callback={setCharacters} />
      </Container>
    </div>
  );
}

export default App;
