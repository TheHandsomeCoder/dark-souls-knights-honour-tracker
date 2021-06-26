import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parseSaveFile } from "../util/saveParser";
import { Container, Icon, Header } from "semantic-ui-react";

export function FileDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        const saves = parseSaveFile(binaryStr);
        console.log(saves);
      };
      reader.readAsBinaryString(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <Header as="h2" icon textAlign="center" color='grey'>
          <Icon name="upload" circular />
          <Header.Content>Drag n Drop you save here or click to choose a file </Header.Content>
        </Header>
      </div>
    </Container>
  );
}
