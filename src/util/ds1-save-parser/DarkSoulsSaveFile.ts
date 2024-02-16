import { itemList } from "../../constants/new-full-item-list";
export enum ItemType {
  "WEAPONRY" = 0,
  "ARMOR" = 16,
  "RINGS" = 32,
  "OTHER" = 64,
  "EMPTY_SLOT" = 255,
  "UNKNOWN" = -1,
}

export interface Item {
  lookupId: string;
  type: ItemType;
  id: number;
  amount: number;
  position: number;
  have: number;
  maxDurablility: number;
  currentDurablility: number;
  itemName: string;
  baseItemLookUpID: string
}

export interface DarkSoulsSaveSlot {
  name: string;
  level: number;
  inventory: Item[];
}

export abstract class DarkSoulsSaveSlot implements DarkSoulsSaveSlot {
  protected abstract parseLevel(buf: ArrayBuffer): number;
  protected abstract parseName(buf: ArrayBuffer): string;
  protected parseInventory(
    buf: ArrayBuffer,
    startPos: number,
    endPos: number
  ): Item[] {
    const inventoryBlock = new Uint32Array(buf.slice(startPos, endPos));
    const inventory: Item[] = [];
    for (let i = 0; i < inventoryBlock.length; i += 7) {
      const item = inventoryBlock.slice(i, i + 7);
      const id = item[1]
      const lookupId = `${ItemType[new Uint8Array(item.buffer)[3]]}.${id}`;
      const baseItemLookUpID = `${ItemType[new Uint8Array(item.buffer)[3]]}.${Math.floor(id/1000) * 1000}`;
      inventory.push({
        lookupId: lookupId,
        type: ItemType[
          ItemType[new Uint8Array(item.buffer)[3]] as keyof typeof ItemType
        ],
        id: item[1],
        amount: item[2],
        position: item[3],
        have: item[4],
        maxDurablility: item[5],
        currentDurablility: item[6],
        itemName: itemList.get(lookupId) as string,
        baseItemLookUpID: baseItemLookUpID,
      });
    }
    return inventory.filter(
      (i) => ![ItemType.UNKNOWN, ItemType.EMPTY_SLOT].includes(i.type)
    );
  }
}
