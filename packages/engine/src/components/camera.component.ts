import { component, number, boolean, string } from "@javelin/ecs";
import { FieldExtract } from "@javelin/core";

export const Camera = {
  name: string,
  isMain: boolean,
  viewport: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  zoom: number,
  bounds: {
    x: number,
    y: number,
    width: number,
    height: number,
    centerOn: boolean,
  },
};

/**
 *
 */
export const createCameraComponent = (
  props: Partial<FieldExtract<typeof Camera>>
) => {
  props = { zoom: 2, ...props };
  return component(Camera, props);
};