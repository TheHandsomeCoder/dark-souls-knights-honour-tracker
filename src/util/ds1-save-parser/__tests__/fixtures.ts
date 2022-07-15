import fs from "fs";
import path from "path";
export const DARK_SOULS_PREPARE_TO_DIE_FIXTURE = new Uint8Array(
  fs.readFileSync(
    path.join(__dirname, "../../../../sample_data/DSPTD_DRAKS0005.sl2")
  )
).buffer;

export const DARK_SOULS_REMASTERED_FIXTURE = new Uint8Array(
  fs.readFileSync(
    path.join(__dirname, "../../../../sample_data/DSR_DRAKS0005.sl2")
  )
).buffer;

