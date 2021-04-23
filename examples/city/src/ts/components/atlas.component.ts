import { createComponentType, string } from "@javelin/ecs";
import { COMPONENT_TYPE } from "../constants";

export const AtlasComponent = createComponentType({
  type: COMPONENT_TYPE.atlas,
  schema: {
    key: string,
    url: string,
    xhrSettings: string,
  },
});
