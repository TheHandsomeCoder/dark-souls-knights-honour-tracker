import React from "react";
import { Container, Segment, Header, Table, List } from "semantic-ui-react";
import { knightsHonorData } from "../../constants/knights-honour-data";
import { itemMap } from "../../constants/full-item-list";
import "./KnightsHonorList.css";
import { DarkSoulsSaveSlot } from "../../util/ds1-save-parser/DarkSoulsSaveFile";

interface KnightsHonorListProps {
  character: DarkSoulsSaveSlot;
}

export function KnightsHonorList(props: KnightsHonorListProps) {
  const itemSet = new Set(
    props.character.inventory.map((i) => `${i.type}-${i.id}`)
  );
  const sections = Object.entries(knightsHonorData);
  return (
    <Container className="knights-honor-list">
      <Segment>
        {sections.map(([k, v]) => {
          return (
            <>
              <Header as="h2">{k}</Header>
              <ItemTable itemIds={v} characterItems={itemSet} />
            </>
          );
        })}
      </Segment>
    </Container>
  );
}

interface ItemTableProps {
  itemIds: string[];
  characterItems: Set<string>;
}
function ItemTable(props: ItemTableProps) {
  const filteredItems = props.itemIds.filter(
    (i) => !props.characterItems.has(i)
  );
  return (
    <Table>
      {filteredItems.map((i) => {
        const item = itemMap.get(i);
        return (
          <Table.Row key={i}>
            <Table.Cell>{item!.name}</Table.Cell>
            <Table.Cell>
              <List as="ul">
                {Object.entries(item!.locations).map(([k, v]) => {
                  return v.map((z: any) => (
                    <List.Item as="li">
                      {`${z.type} ${k} ${z.where}`}
                    </List.Item>
                  ));
                })}
              </List>
            </Table.Cell>
          </Table.Row>
        );
      })}
    </Table>
  );
}
