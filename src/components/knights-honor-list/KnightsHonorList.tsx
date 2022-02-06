import React from "react";
import { Container, Segment, Header, Table, List } from "semantic-ui-react";
import { knightsHonorData } from "../../constants/knights-honour-data";
import { itemList } from "../../constants/new-full-item-list";
import "./KnightsHonorList.css";
import { DarkSoulsSaveSlot } from "../../util/ds1-save-parser/DarkSoulsSaveFile";

interface KnightsHonorListProps {
  character: DarkSoulsSaveSlot;
}

export function KnightsHonorList(props: KnightsHonorListProps) {
  const itemSet = new Set(
    props.character.inventory.map((i) => i.lookupID)
  );
  const sections = Object.entries(knightsHonorData);
  return (
    <Container className="knights-honor-list">
      <Segment>
        {
        sections.map(([k, v]) => {
          return (
            <div key={k}>
              <Header as="h2">{k}</Header>
              <ItemTable itemIds={v} characterItems={itemSet} />
            </div>
          );
        })
        }
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
      <Table.Body>
        {filteredItems.map((i) => {
          const item = itemList.get(i);
          return (
            <Table.Row key={i}>
              <Table.Cell>{item}</Table.Cell>
              {/* <Table.Cell>
                <List as="ul">
                  {Object.entries(item!.locations).map(([k, v]) => {
                    return v.map((z: any, i: number) => (
                      <List.Item
                        as="li"
                        key={i}
                      >{`${z.type} ${k} ${z.where}`}</List.Item>
                    ));
                  })}
                </List>
              </Table.Cell> */}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
