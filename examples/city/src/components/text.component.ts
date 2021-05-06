import { createComponentType, boolean, string, number } from "@javelin/ecs";
import { ComponentType, Text } from "../types";
import { extend } from "@ribajs/utils";

/**
 * The text (box)
 */
export const TextComponent = createComponentType({
  type: ComponentType.Text,
  schema: {
    text: string,
    playerEntity: number,
    style: {
      fontFamily: string,
      fontSize: string,
      fontStyle: string,
      font: string,
      backgroundColor: string,
      color: string,
      stroke: string,
      strokeThickness: number,
      shadow: {
        offsetX: number,
        offsetY: number,
        color: string,
        blur: number,
        stroke: boolean,
        fill: boolean,
      },
      padding: {
        x: number,
        y: number,
        left: number,
        right: number,
        top: number,
        bottom: number,
      },
      align: string,
      maxLines: number,
      fixedWidth: number,
      fixedHeight: number,
      resolution: number,
      rtl: boolean,
      testString: string,
      baselineX: number,
      baselineY: number,
      wordWrap: {
        width: number,
        useAdvancedWrap: boolean,
      },
      metrics: {
        ascent: number,
        descent: number,
        fontSize: number,
      },
    },
  },
  initialize(text, data: Text) {
    extend({ deep: true }, text, data);
  },
});
