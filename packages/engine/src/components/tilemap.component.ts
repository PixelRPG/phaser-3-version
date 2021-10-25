import { string, objectOf } from "@javelin/ecs";
import { xhrSettings } from "./schemata/xhr-settings";
import { phaserMap } from "./schemata/phaser-map";

export const Tilemap = {
  key: string,
  url: string,
  xhrSettings: objectOf(xhrSettings),
  phaserMap: objectOf(phaserMap),
};
