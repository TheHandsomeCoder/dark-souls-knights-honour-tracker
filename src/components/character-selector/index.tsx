import React, { useState, SyntheticEvent } from "react";
import { Container, Segment, Dropdown } from "semantic-ui-react";
import { Character } from "../../App";
import "./CharacterSelector.css";

interface CharacterSelectorProps {
  characters: Character[];
}

export function CharacterSelector(props: CharacterSelectorProps) {
  const characterOptions = props.characters.map((c) => ({
    key: c.name,
    text: c.name,
    value: c.name,
  }));

  const [selectedCharacter, setSelectedCharacter] = useState<Character>();
  const selectedCharacterOnChange = (event: SyntheticEvent, data: any) => {
    setSelectedCharacter(data.value);
  };
  return (
    <Container text className="character-selector">
      <Segment>
        <Dropdown
          placeholder="Select character"
          fluid
          selection
          options={characterOptions}
          onChange={selectedCharacterOnChange}
        />
      </Segment>
    </Container>
  );
}

export default CharacterSelector;
