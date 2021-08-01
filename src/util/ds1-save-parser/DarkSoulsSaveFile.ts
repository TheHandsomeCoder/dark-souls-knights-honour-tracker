
export enum ItemType {
  "WEAPON" = 0,
  "ARMOR" = 16,
  "RING" = 32,
  "OTHER" = 64,
  "EMPTY_SLOT" = 255,
  "UNKNOWN" = -1,
}

export interface Item {
  type: ItemType;
  id: number;
  amount: number;
  position: number;
  have: number;
  maxDurablility: number;
  currentDurablility: number;
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
      inventory.push({
        type: ItemType[
          ItemType[new Uint8Array(item.buffer)[3]] as keyof typeof ItemType
        ],
        id: item[1],
        amount: item[2],
        position: item[3],
        have: item[4],
        maxDurablility: item[5],
        currentDurablility: item[6],
      });
    }
    return inventory.filter(
      (i) => ![ItemType.UNKNOWN, ItemType.EMPTY_SLOT].includes(i.type)
    );
  }
}
