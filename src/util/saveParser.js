// Copied from https://github.com/gabtoubl/gabtoubl.github.io/blob/master/ds1_save/saveParser.js
// Updated to fix lint errors

let g_idx = 0;
const read = (data, nbBytes) => {
  if (g_idx > data.length) return "";
  const str = data.substr(g_idx, nbBytes);
  g_idx += nbBytes;
  return str;
};

const skipBytes = (data, nbBytes) => {
  g_idx += nbBytes;
};

const readIntLe = (data, nbBytes) => {
  var nb = 0;
  for (var i = 0, mult = 1; i < nbBytes; ++i, mult *= 256)
    nb += data.charCodeAt(i + g_idx) * mult;
  g_idx += nbBytes;
  return nb;
};

export const parseSaveFile = (data) => {
  // var fileFormat = read(data, 4);
  // skipBytes(data, 20);
  // var version = read(data, 8);
  // if (fileFormat !== "BND4" || version !== "00000001") {
  //   console.warn("This probably isn't a Dark Souls' save file");
  //   g_idx = 0;
  //   return [];
  // }
  // skipBytes(data, 32);
  // const offsets = [];
  // for (var i = 0; i < 10; ++i) {
  //   skipBytes(data, 16);
  //   offsets.push(readIntLe(data, 4));
  //   skipBytes(data, 12);
  // }
  return getPlayersSave(data, [0]);
};

const getPlayersSave = (data, offsets) => {
  const players = [];
  for (var offset of offsets) {
    var player = { name: "" };
    g_idx = offset + 240;
    player.level = readIntLe(data, 4);
    skipBytes(data, 20);
    for (var i = 0; i < 28; ++i) {
      var c = read(data, 1);
      skipBytes(data, 1);
      if (c.charCodeAt(0) === 0) break;
      player.name += c;
    }
    g_idx = offset + 724; //2d4
    if (player.level > 0) {
      skipBytes(data, 16);
      player.items = [];
      while (g_idx < offset + 0xe2c4) {
        let item = {};
        item.type = readIntLe(data, 4);
        item.id = readIntLe(data, 4);
        item.amount = readIntLe(data, 4);
        skipBytes(data, 4);
        let have = readIntLe(data, 4);
        skipBytes(data, 8);
        //if (have) {
          if (item.type === 0 && item.id !== 900000) {
            item.id = Math.floor(item.id / 1000) * 1000;
            if (item.id < 2000000 || item.id >= 9000000) {
              item.type = "weapon";
              if (
                item.id === 312000 ||
                item.id === 315000 ||
                item.id === 857000 ||
                item.id === 1053000 ||
                item.id === 1331000 ||
                item.id === 9013000
              )
                item.id -= 1000;
              else if (item.id === 1054000) item.id = 1051000;
              else if (item.id >= 1411000 && item.id <= 1414000)
                item.id = 1411000;
              else if (item.id >= 1507000 && item.id <= 1510000)
                item.id = 1507000;
            } else item.type = "ammunition";
          } else if (
            item.type === 0x10000000 &&
            item.id !== 900000 &&
            item.id !== 901000 &&
            item.id !== 902000 &&
            item.id !== 903000
          ) {
            item.type = "armor";
            item.id = Math.floor(item.id / 1000) * 1000;
          } else if (item.type === 0x20000000) item.type = "ring";
          else if (item.type === 0x40000000) {
            if (item.id >= 200 && item.id <= 215) item.id = 200;
            if (item.id >= 393 && item.id <= 396) item.id = 393;
            if (item.id < 800 && item.id !== 384) item.type = "item";
            else if (item.id >= 1000 && item.id < 2000) item.type = "material";
            else if (item.id < 3000 || item.id === 384) item.type = "key_item";
            else if (item.id < 6000) item.type = "magic";
          } else item.type = "";
          if (item.type !== "") {
            let x = player.items.findIndex(elem => elem.id === item.id && elem.type === item.type);
            if (x !== -1)
              player.items[x].amount += item.amount;
            else
              player.items.push(item);
          }
       // }
      }
      players.push(player);
    }
  }
  g_idx = 0;
  return players;
};
