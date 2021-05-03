import { createComponentType, string, boolean } from "@javelin/ecs";
import { ComponentType } from "../types";
import { createObjectType } from "./schemata";

export const AssetImageComponent = createComponentType({
  type: ComponentType.AssetImage,
  schema: {
    key: string,
    url: string,
    name: string,
    xhrSettings: createObjectType<Phaser.Types.Loader.XHRSettingsObject>(),
    loaded: { type: boolean, defaultValue: false },
  },
  /**
   * @param atlas
   * @param key Asset key, e.g. used on preloading
   * @param url Url to the image file
   * @param xhrSettings
   */
  initialize(
    atlas,
    key,
    url: string,
    name?: string,
    xhrSettings?: Phaser.Types.Loader.XHRSettingsObject
  ) {
    atlas.key = key;
    atlas.url = url;
    if (name) {
      atlas.name = name;
    }
    if (xhrSettings) {
      atlas.xhrSettings = xhrSettings as typeof atlas["xhrSettings"];
    }
  },
});
