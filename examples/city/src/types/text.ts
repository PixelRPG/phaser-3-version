import { ComponentProps } from "@javelin/ecs";
import { Entry } from "./entry";

export interface Text extends ComponentProps {
  text: string;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
  playerEntry?: Entry;
}
