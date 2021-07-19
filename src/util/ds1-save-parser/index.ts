export const parseSaveFile = (buffer: ArrayBuffer) => {
  if (!isBND4File(buffer)) {
    throw new Error(
      "File isn't a Dark Souls or Dark Souls Remastered Save file"
    );
  }
  return true;
};

export enum DSFileTypes {
  PREPARE_TO_DIE,
  REMASTERED,
  UNKNOWN,
}

const REMASTERED_SAVE_FILE_SIZE = 0x4204D0;
// const SAVE_SLOT_SIZE = 0x060030;
// const BASE_SLOT_OFFSET = 0x02C0;
// const USER_DATA_SIZE = 0x060020;
// const USER_DATA_FILE_CNT = 11;
// const USER_DATA_FILE_NAME_LEN = 13;

const BND4 = "BND4";
const isBND4File = (buffer: ArrayBuffer) => {
  const decoder = new TextDecoder();
  const firstFourBytes = new Uint8Array(buffer.slice(0, 4));
  const decodedFirstFourBytes = decoder.decode(firstFourBytes);
  return decodedFirstFourBytes === BND4;
};

export const isPrepareToDieSaveFile = (buffer: ArrayBuffer) => {
    const rawVersion = new Uint8Array(buffer.slice(0x18, 0x20));
    const decoder = new TextDecoder();
    const version = decoder.decode(rawVersion);
    return version === "00000001"
};


export const isDSRemastered = (buffer: ArrayBuffer) => {
    return buffer.byteLength === REMASTERED_SAVE_FILE_SIZE;
}