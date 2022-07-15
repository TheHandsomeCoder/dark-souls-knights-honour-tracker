import React, { useState } from "react";
import { FileDropzone } from "./components/file-dropzone";
import { Container, Segment, Dimmer, Loader } from "semantic-ui-react";
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

const ParseFileLoader = () => (
  <div>
    <Segment>
      <Dimmer active>
        <Loader indeterminate>Preparing Files</Loader>
      </Dimmer>
    </Segment>
  </div>
);

function renderBody(
  loading: boolean,
  characters: DarkSoulsSaveSlot[],
  parseFile: any
) {
  if (loading) {
    return <ParseFileLoader />;
  } else if (characters.length !== 0) {
    return <CharacterSelector characters={characters} />;
  } else {
    return <FileDropzone onReadFile={parseFile} />;
  }
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Array<DarkSoulsSaveSlot>>([]);

  const parseFile = React.useCallback((binaryData: ArrayBuffer) => {
    setLoading(true);
    parseDSSaveFile(binaryData)
      .then((c) => setCharacters(c))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <Container>{renderBody(loading, characters, parseFile)}</Container>
    </div>
  );
}

export default App;
