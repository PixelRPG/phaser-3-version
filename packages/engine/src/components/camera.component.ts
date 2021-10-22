import { component, number, boolean, string } from "@javelin/ecs";

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
  }
};

/**
 *
 */
export const CameraComponent = component(Camera, { zoom: 2});
