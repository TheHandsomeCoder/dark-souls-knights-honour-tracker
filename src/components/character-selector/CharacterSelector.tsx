import React, { useState, SyntheticEvent } from "react";
import { Container, Segment, Dropdown, Header, Icon } from "semantic-ui-react";
import { Character } from "../../App";
import { KnightsHonorList } from "../knights-honor-list/KnightsHonorList";
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

  const [selectedCharacter, setSelectedCharacter] = useState<Character>(
    props.characters[0]
  );
  const selectedCharacterOnChange = (event: SyntheticEvent, data: any) => {
    const newSelectedCharacter = props.characters.find(c => c.name === data.value);
    setSelectedCharacter(newSelectedCharacter as Character);
  };
  if (!selectedCharacter) {
    return (
      <Segment>
        <Header as="h2" icon textAlign="center" color="grey">
          <Icon name="warning" circular />
          <Header.Content>
            Something went very wrong if you're seeing this
          </Header.Content>
        </Header>
      </Segment>
    );
  }
  return (
    <>
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
      <KnightsHonorList character={selectedCharacter} />
    </>
  );
}

export default CharacterSelector;
