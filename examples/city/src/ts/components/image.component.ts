import { createComponentType, string } from "@javelin/ecs";
import { COMPONENT_TYPE } from "../constants";

export const ImageComponent = createComponentType({
  type: COMPONENT_TYPE.image,
  schema: {
    key: string,
    url: string,
    xhrSettings: string,
  },
});
