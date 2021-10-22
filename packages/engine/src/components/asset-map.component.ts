import { component, string, boolean } from "@javelin/ecs";

export const AssetMap = {
  key: string,
  url: string,
  loaded: boolean,
};

export const AssetMapComponent = component(AssetMap, { loaded: false });
