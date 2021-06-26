import React, { SyntheticEvent, useState } from "react";
import { itemMap } from "./constants/full-item-list";
import { Form, Table } from "semantic-ui-react";

function ItemLookup() {
  const itemsAsOptions = Array.from(itemMap.keys()).map((key) => ({
    key,
    text: itemMap.get(key)!.name,
    value: key,
  }));
  const [knightsHonourList, setKnightsHonourList ] = useState<string[]>([]);
  const itemTypeOnChange = (event: SyntheticEvent, data: any) => {
    setKnightsHonourList(data.value);
  };

  return (
    <div className="App">
      <Form>
        <Form.Select
          label="Item Type"
          search
          selection
          multiple
          onChange={itemTypeOnChange}
          value={knightsHonourList}
          options={itemsAsOptions}
        />
      </Form>
      <Table>
          <Table.Body>
            {
              knightsHonourList.map(i => {
                const item = itemMap.get(i);
                return (
                  <Table.Row>
                  <Table.Cell>{i}</Table.Cell>
                  <Table.Cell>{item?.name}</Table.Cell>
                </Table.Row>
                )
              })
            }
           
          </Table.Body>
      </Table>
    </div>
  );
}

export default ItemLookup;
