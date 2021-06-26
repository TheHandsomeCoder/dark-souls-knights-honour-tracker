import React from "react";
import { FileDropzone } from "./components/FileDropzone";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <Container text>
        <FileDropzone />
      </Container>
    </div>
  );
}

export default App;
