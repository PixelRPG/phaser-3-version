import { ComponentProps } from "@javelin/ecs";

export interface Text extends ComponentProps {
  text: string;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
}
