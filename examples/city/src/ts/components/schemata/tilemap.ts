import { string } from "@javelin/ecs";
import { createObjectType } from "./create-object-type";
import { createNullableObjectType } from "./create-nullable-object-type";

export const tilemap = {
  key: string,
  url: string,
  xhrSettings: createObjectType<Phaser.Types.Loader.XHRSettingsObject>(),
  phaserMap: createNullableObjectType<Phaser.Tilemaps.Tilemap>(),
};
