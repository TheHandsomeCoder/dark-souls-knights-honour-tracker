import { parseSaveFile } from "../";
import fs from "fs";
import path from "path";

describe("Dark Souls Save File Parser", () => {
  it("should not throw an error if the file doesn't start with BND4", () => {
    const darkSoulsPrepareToDieFile = new Uint8Array(
      fs.readFileSync(path.join(__dirname, "../../../../sample_data/DSPTD_DRAKS0005.sl2"))
    ).buffer;
    const darkSoulsRemasteredFile = new Uint8Array(
      fs.readFileSync(
        path.join(__dirname, "../../../../sample_data/DSR_DRAKS0005.sl2")
      )
    ).buffer;
    expect(parseSaveFile(darkSoulsPrepareToDieFile)).toBeTruthy();
    expect(parseSaveFile(darkSoulsRemasteredFile)).toBeTruthy();
  });
});
