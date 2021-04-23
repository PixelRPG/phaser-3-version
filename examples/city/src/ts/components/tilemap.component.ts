import { createComponentType, string } from "@javelin/ecs";
import { COMPONENT_TYPE } from "../constants";

export const TilemapComponent = createComponentType({
  type: COMPONENT_TYPE.tilemap,
  schema: {
    key: string,
    url: string,
    xhrSettings: string,
  },
});
