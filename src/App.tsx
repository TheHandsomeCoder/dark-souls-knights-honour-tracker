import React, {useState} from "react";
import { FileDropzone } from "./components/file-dropzone";
import { Container } from "semantic-ui-react";
import { CharacterSelector } from './components/character-selector/CharacterSelector';
import { parseDSSaveFile } from "./util/ds1-save-parser";

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
  const [binaryData, setBinaryData] = useState<ArrayBuffer>();

  let characters: any = [];

  if(binaryData) {
     parseDSSaveFile(binaryData).then(names => console.log(names)).catch(err => console.log(err));
  }

  return (
    <div className="App">
      <Container>
        { characters.length === 0 
          ? <FileDropzone onReadFile={setBinaryData} />
          : <CharacterSelector characters={characters}/>
        }
      </Container>
    </div>
  );
}

export default App;
