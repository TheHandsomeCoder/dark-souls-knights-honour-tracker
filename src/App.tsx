import React, {useState} from "react";
import { FileDropzone } from "./components/file-dropzone";
import { Container } from "semantic-ui-react";
import { CharacterSelector } from './components/character-selector/CharacterSelector';

export interface Character {
  name: string;
  level: number;
  Items: Item[];
};

interface Item {
  type: string,
  id: number,
  amount: number
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [characters, setCharacters] = useState<Character[]>([])

  return (
    <div className="App">
      <Container>
        { characters.length === 0 
          ? <FileDropzone callback={setCharacters} />
          : <CharacterSelector characters={characters}/>
        }
      </Container>
    </div>
  );
}

export default App;
