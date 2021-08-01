import { DarkSoulsSaveSlot, Item } from "./DarkSoulsSaveFile";

export class DarkSoulsPrepareToDieSaveSlot extends DarkSoulsSaveSlot {
  name: string;
  level: number;
  inventory: Item[];

  constructor(buf: ArrayBuffer) {
    super();
    this.name = this.parseName(buf);
    this.level = this.parseLevel(buf);
    this.inventory = this.parseInventory(buf, 0x2e0, 0xe2e0);
  }

  protected override parseLevel(buf: ArrayBuffer): number {
    return new Uint32Array(buf, 0xe8, 4)[0];
  }

  protected override parseName(buf: ArrayBuffer): string {
    const name = new TextDecoder("utf-16")
      .decode(new Uint16Array(buf.slice(0x100, 0x11c)))
      .split("\u0000")[0];
    return name;
  }
}
