import React, {useState} from "react";
import { FileDropzone } from "./components/file-dropzone";
import { Container } from "semantic-ui-react";
import { CharacterSelector } from './components/character-selector/CharacterSelector';
import { parseSaveFile } from "./util/saveParser";

export interface Character {
  name: string;
  level: number;
  items: Item[];
};

interface Item {
  type: string,
  id: number,
  amount: number
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [binaryData, setBinaryData] = useState<ArrayBuffer>();
  let characters: any = [];

  if(binaryData) {
     characters = parseSaveFile(binaryData);
  }

  return (
    <div className="App">
      <Container>
        { characters.length === 0 
          ? <FileDropzone callback={setBinaryData} />
          : <CharacterSelector characters={characters}/>
        }
      </Container>
    </div>
  );
}

export default App;
