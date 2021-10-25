import { component, string, boolean } from "@javelin/ecs";

export const AssetMap = {
  key: string,
  url: string,
  assetMapLoaded: boolean,
};

export const AssetMapComponent = component(AssetMap, { assetMapLoaded: false });
