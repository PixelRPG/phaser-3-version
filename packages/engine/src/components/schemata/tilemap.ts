import { string, objectOf } from "@javelin/ecs";
import { xhrSettings } from "./xhr-settings";
import { phaserMap } from "./phaser-map";

export const tilemap = {
  key: string,
  url: string,
  xhrSettings: objectOf(xhrSettings),
  phaserMap: objectOf(phaserMap),
};
