import React, { useState } from "react";
import { FileDropzone } from "./components/file-dropzone";
import { Container } from "semantic-ui-react";
import { CharacterSelector } from "./components/character-selector/CharacterSelector";
import { parseDSSaveFile } from "./util/ds1-save-parser";
import { DarkSoulsSaveSlot } from "./util/ds1-save-parser/DarkSoulsSaveFile";

export interface Character {
  name: string;
  level: number;
  items: Item[];
}

interface Item {
  type: string;
  id: number;
  amount: number;
}

function App() {
  const [binaryData, setBinaryData] = useState<ArrayBuffer>();
  const [characters, setCharacters] = useState<Array<DarkSoulsSaveSlot>>([]);


  if (binaryData) {
    parseDSSaveFile(binaryData)
      .then((chars) => {
        setCharacters(chars);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <Container>
        {characters.length === 0 ? (
          <FileDropzone onReadFile={setBinaryData} />
        ) : (
          <CharacterSelector characters={characters} />
        )}
      </Container>
    </div>
  );
}

export default App;
