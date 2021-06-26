import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { parseSaveFile } from "../../util/saveParser";
import { Container, Icon, Header, Segment } from "semantic-ui-react";
import "./FileDropzone.css";

interface FileDropzoneProps {
  callback: (data: any) => void;
}

export function FileDropzone(props: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          const characters = parseSaveFile(binaryStr);
          console.log(characters);
          props.callback(characters);
        };
      });
    },
    [props]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container className="file-dropzone">
      <div {...getRootProps()}>
        <Segment>
          <input {...getInputProps()} />
          <Header as="h2" icon textAlign="center" color="grey">
            <Icon name="upload" circular />
            <Header.Content>
              Drop your Dark Souls save here or click to choose a file
            </Header.Content>
          </Header>
        </Segment>
      </div>
    </Container>
  );
}
