import { component, string, boolean } from "@javelin/ecs";
import { createObjectType } from "./schemata";

export const AssetImage = {
  key: string,
  url: string,
  name: string,
  xhrSettings: createObjectType<Phaser.Types.Loader.XHRSettingsObject>(),
  loaded: boolean,
};

export const AssetImageComponent = component(AssetImage, { loaded: false });
