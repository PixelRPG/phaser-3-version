import { component, boolean, string, number } from "@javelin/ecs";

export const Text = {
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
}

/**
 * The text (box)
 */
export const TextComponent = component(Text);
