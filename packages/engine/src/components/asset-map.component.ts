import { component, string, boolean } from "@javelin/ecs";
import { ComponentType, AssetMap } from "../types";

export const AssetMapComponent = component({
  type: ComponentType.AssetMap,
  schema: {
    key: string,
    url: string,
    loaded: { type: boolean, defaultValue: false },
  },
  initialize(atlas, data: AssetMap) {
    atlas.key = data.key;
    atlas.url = data.url;
    atlas.loaded = false;
  },
});
