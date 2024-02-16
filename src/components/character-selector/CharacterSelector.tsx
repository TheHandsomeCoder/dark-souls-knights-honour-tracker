import React, { useState, SyntheticEvent } from "react";
import { Container, Segment, Dropdown, Header, Icon } from "semantic-ui-react";
import { DarkSoulsSaveSlot } from "../../util/ds1-save-parser/DarkSoulsSaveFile";
import { KnightsHonorList } from "../knights-honor-list/KnightsHonorList";
import "./CharacterSelector.css";

interface CharacterSelectorProps {
  characters: DarkSoulsSaveSlot[];
}

export function CharacterSelector(props: CharacterSelectorProps) {
  const characterOptions = props.characters.map((c, i) => ({
    key: i + '-' + c.name,
    text: c.name,
    value: c.name,
  }));

  const [selectedCharacter, setSelectedCharacter] = useState<DarkSoulsSaveSlot>(
    props.characters[0]
  );
  const selectedCharacterOnChange = (event: SyntheticEvent, data: any) => {
    const newSelectedCharacter = props.characters.find(c => c.name === data.value);
    setSelectedCharacter(newSelectedCharacter as DarkSoulsSaveSlot);
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
            value={selectedCharacter.name}
          />
        </Segment>
      </Container>
      <KnightsHonorList character={selectedCharacter} />
    </>
  );
}

export default CharacterSelector;
