import { isDSRemastered, isPrepareToDieSaveFile, parseSaveFile } from "../";
import {
  DARK_SOULS_PREPARE_TO_DIE_FIXTURE,
  DARK_SOULS_REMASTERED_FIXTURE,
} from "./fixtures";

describe("Dark Souls Prepare To Die Save File Parser", () => {
  it("should not throw an error if the file doesn't start with BND4", () => {
    expect(parseSaveFile(DARK_SOULS_PREPARE_TO_DIE_FIXTURE)).toBeTruthy();
  });

  it("should have a version number of 00000001", () => {
    	expect(isPrepareToDieSaveFile(DARK_SOULS_PREPARE_TO_DIE_FIXTURE)).toBe(true);
    	expect(isPrepareToDieSaveFile(DARK_SOULS_REMASTERED_FIXTURE)).toBe(false);
  });
});

describe("Dark Souls Remastered Save File Parser", () => {
  it("should not throw an error if the file doesn't start with BND4", () => {
    expect(parseSaveFile(DARK_SOULS_REMASTERED_FIXTURE)).toBe(true);
  });
  it("should have the file length of a dark souls remastered file", () => {
    expect(isDSRemastered(DARK_SOULS_REMASTERED_FIXTURE)).toBe(true);
  });
});
