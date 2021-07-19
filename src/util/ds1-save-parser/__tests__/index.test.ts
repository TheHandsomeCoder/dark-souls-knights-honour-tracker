import { parseSaveFile } from "../";
import {
  DARK_SOULS_PREPARE_TO_DIE_FIXTURE,
  DARK_SOULS_REMASTERED_FIXTURE,
} from "./fixtures";

describe("Dark Souls Prepare To Die Save File Parser", () => {
  it("should not throw an error if the file doesn't start with BND4", () => {
    expect(parseSaveFile(DARK_SOULS_PREPARE_TO_DIE_FIXTURE)).toBeTruthy();
  });
});

describe("Dark Souls Remastered Save File Parser", () => {
  it("should not throw an error if the file doesn't start with BND4", () => {
    expect(parseSaveFile(DARK_SOULS_REMASTERED_FIXTURE)).toBeTruthy();
  });
});
