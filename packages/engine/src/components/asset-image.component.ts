import { component, string, boolean, objectOf } from "@javelin/ecs";
import { xhrSettings } from "./schemata/xhr-settings";

export const AssetImage = {
  key: string,
  url: string,
  name: string,
  xhrSettings: objectOf(xhrSettings),
  imageLoaded: boolean,
};

export const AssetImageComponent = component(AssetImage, { imageLoaded: false });
