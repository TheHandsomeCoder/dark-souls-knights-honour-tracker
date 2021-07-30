import {ItemType} from './';

export interface DarkSoulsSaveSlot {
  name: string;
  level: number;
  inventory: Item[];
}

interface Item {
  type: ItemType;
  id: number;
  amount: number;
  position: number;
  have: number;
  maxDurablility: number;
  currentDurablility: number;
}

export class DarkSoulsPrepareToDieSaveSlot implements DarkSoulsSaveSlot {
  private _saveSlotBuffer;
  name: string;
  level: number;
  inventory: Item[];

  constructor(buf: ArrayBuffer) {
    this._saveSlotBuffer = buf;
    this.name = this.parseName(buf);
    this.level = this.parseLevel(buf);
    this.inventory = this.parseInventory(buf);
  }
  private parseInventory(buf: ArrayBuffer): Item[] {
    const inventoryBlock = new Uint32Array(buf.slice(0x2e0, 0xe2e0));
    const inventory: Item[] = [];
    for (let i = 0; i < inventoryBlock.length; i += 7) {
      const item = inventoryBlock.slice(i, i + 7);
      inventory.push({
        type: ItemType[new Uint8Array(item.buffer)[3]],
        id: item[1],
        amount: item[2],
        position: item[3],
        have: item[4],
        maxDurablility: item[5],
        currentDurablility: item[6],

        //skipBytes(data, 8);
      });
    }
    return inventory;
  }
  private parseLevel(buf: ArrayBuffer): number {
    return new Uint32Array(buf, 0xe8, 4)[0];
  }

  private parseName(buf: ArrayBuffer): string {
    const name = new TextDecoder("utf-16")
      .decode(new Uint16Array(buf.slice(0x100, 0x11C)))
      .split("\u0000")[0];
    return name;
  }
}
