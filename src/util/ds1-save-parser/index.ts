import { AES_CBC_Decrypter } from "../aes-tools";
import { DarkSoulsRemasteredSaveSlot } from "./DarkSoulsRemasteredSaveSlot";
import { DarkSoulsPrepareToDieSaveSlot } from "./DarkSoulsPrepareToDieSaveSlot";

const REMASTERED_SAVE_SLOT_SIZE = 0x060030;
const REMASTERED_BASE_SLOT_OFFSET = 0x02c0;
const REMASTERED_USER_DATA_SIZE = 0x060020;
const REMASTERED_USER_DATA_FILE_CNT = 11;
const REMASTERED_USER_DATA_FILE_NAME_LEN = 13;
const AES_BLOCKLENGTH = 16;

const PREPARE_TO_DIE_BASE_SLOT_OFFSET = 0x02c0;
const PREPARE_TO_DIE_USER_DATA_SIZE = 0x060020;
const PREPARE_TO_DIE_USER_DATA_FILE_CNT = 11;
const PREPARE_TO_DIE_USER_DATA_FILE_NAME_LEN = 13;

export const parseDSSaveFile = async (buffer: ArrayBuffer) => {
  if (!isBND4File(buffer)) {
    throw new Error(
      "File isn't a Dark Souls or Dark Souls Remastered Save file"
    );
  }
  if (isPrepareToDieSaveFile(buffer)) {
    return extractDSPTDSaveSlots(buffer);
  } else if (isDSRemastered(buffer)) {
    return decryptAndExtractDSRSaveSlots(buffer);
  }
};

export enum DSFileTypes {
  PREPARE_TO_DIE,
  REMASTERED,
  UNKNOWN,
}

const REMASTERED_SAVE_FILE_SIZE = 0x4204d0;

const BND4 = "BND4";
const isBND4File = (buffer: ArrayBuffer) => {
  const decoder = new TextDecoder();
  const firstFourBytes = buffer.slice(0, 4);
  const decodedFirstFourBytes = decoder.decode(firstFourBytes);
  return decodedFirstFourBytes === BND4;
};

const DSPTDVersion = "00000001";
export const isPrepareToDieSaveFile = (buffer: ArrayBuffer) => {
  const rawVersion = new Uint8Array(buffer.slice(0x18, 0x20));
  const decoder = new TextDecoder();
  const version = decoder.decode(rawVersion);
  return version === DSPTDVersion;
};

export const isDSRemastered = (buffer: ArrayBuffer) => {
  return buffer.byteLength === REMASTERED_SAVE_FILE_SIZE;
};

const RAW_KEY = new Uint8Array([
  0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76,
  0x54, 0x32, 0x10,
]);

const extractDSPTDSaveSlots = (buffer: ArrayBuffer) => {
  const slots = extractPTDSaveSlots(buffer);
  return slots.map((i) => new DarkSoulsPrepareToDieSaveSlot(i));
};

const decryptAndExtractDSRSaveSlots = async (buffer: ArrayBuffer) => {
  const decrypt = AES_CBC_Decrypter(RAW_KEY, 16);
  const slots = extractRemasteredSaveSlots(buffer);
  const saveSlots = await Promise.all(slots.map((i) => decrypt(i)));
  return saveSlots.map((i) => new DarkSoulsRemasteredSaveSlot(i));
};

const extractRemasteredSaveSlots = (buffer: ArrayBuffer) => {
  return Array(REMASTERED_USER_DATA_FILE_CNT)
    .fill("")
    .map((_, i) => {
      let startLocation =
        REMASTERED_BASE_SLOT_OFFSET + i * REMASTERED_SAVE_SLOT_SIZE;
      return buffer.slice(
        startLocation,
        startLocation + REMASTERED_SAVE_SLOT_SIZE
      );
    });
};
const extractPTDSaveSlots = (buffer: ArrayBuffer) => {
  return Array(REMASTERED_USER_DATA_FILE_CNT)
    .fill("")
    .map((_, i) => {
      let startLocation =
        REMASTERED_BASE_SLOT_OFFSET + i * PREPARE_TO_DIE_USER_DATA_SIZE;
      return buffer.slice(
        startLocation,
        startLocation + PREPARE_TO_DIE_USER_DATA_SIZE
      );
    });
};
