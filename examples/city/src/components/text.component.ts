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
    style: {
      /**
       * The font the Text object will render with. This is a Canvas style font string.
       */
      fontFamily: string,
      /**
       * The font size, as a CSS size string.
       */
      fontSize: string,
      /**
       * Any addition font styles, such as 'strong'.
       */
      fontStyle: string,
      /**
       * The font family or font settings to set. Overrides the other font settings.
       */
      font: string,
      /**
       * A solid fill color that is rendered behind the Text object. Given as a CSS string color such as `#ff0`.
       */
      backgroundColor: string,
      /**
       * The color the Text is drawn in. Given as a CSS string color such as `#fff` or `rgb()`.
       */
      color: string,
      /**
       * The color used to stroke the Text if the `strokeThickness` property is greater than zero.
       */
      stroke: string,
      /**
       * The thickness of the stroke around the Text. Set to zero for no stroke.
       */
      strokeThickness: number,
      /**
       * The Text shadow configuration object.
       */
      shadow: {
        /**
         * The horizontal offset of the shadow.
         */
        offsetX: number,
        /**
         * The vertical offset of the shadow.
         */
        offsetY: number,
        /**
         * The color of the shadow, given as a CSS string value.
         */
        color: string,
        /**
         * The amount of blur applied to the shadow. Leave as zero for a hard shadow.
         */
        blur: number,
        /**
         * Apply the shadow to the stroke effect on the Text object?
         */
        stroke: boolean,
        /**
         * Apply the shadow to the fill effect on the Text object?
         */
        fill: boolean,
      },
      /**
       * A Text Padding object.
       */
      padding: {
        /**
         * If set this value is used for both the left and right padding.
         */
        x: number,
        /**
         * If set this value is used for both the top and bottom padding.
         */
        y: number,
        /**
         * The amount of padding added to the left of the Text object.
         */
        left: number,
        /**
         * The amount of padding added to the right of the Text object.
         */
        right: number,
        /**
         * The amount of padding added to the top of the Text object.
         */
        top: number,
        /**
         * The amount of padding added to the bottom of the Text object.
         */
        bottom: number,
      },
      /**
       * The alignment of the Text. This only impacts multi-line text. Either `left`, `right`, `center` or `justify`.
       */
      align: string,
      /**
       * The maximum number of lines to display within the Text object.
       */
      maxLines: number,
      /**
       * Force the Text object to have the exact width specified in this property. Leave as zero for it to change accordingly to content.
       */
      fixedWidth: number,
      /**
       * Force the Text object to have the exact height specified in this property. Leave as zero for it to change accordingly to content.
       */
      fixedHeight: number,
      /**
       * Sets the resolution (DPI setting) of the Text object. Leave at zero for it to use the game resolution.
       */
      resolution: number,
      /**
       * Set to `true` if this Text object should render from right-to-left.
       */
      rtl: boolean,
      /**
       * This is the string used to aid Canvas in calculating the height of the font.
       */
      testString: string,
      /**
       * The amount of horizontal padding added to the width of the text when calculating the font metrics.
       */
      baselineX: number,
      /**
       * The amount of vertical padding added to the height of the text when calculating the font metrics.
       */
      baselineY: number,
      /**
       * The Text Word wrap configuration object.
       */
      wordWrap: {
        /**
         * The width at which text should be considered for word-wrapping.
         */
        width: number,
        /**
         * Use basic or advanced word wrapping?
         */
        useAdvancedWrap: boolean,
      },
      /**
       * A Text Metrics object. Use this to avoid expensive font size calculations in text heavy games.
       */
      metrics: {
        /**
         * The ascent of the font.
         */
        ascent: number,
        /**
         * The descent of the font.
         */
        descent: number,
        /**
         * The size of the font.
         */
        fontSize: number,
      },
    },
  },
  initialize(text, data: Text) {
    extend({ deep: true }, text, data);
  },
});
