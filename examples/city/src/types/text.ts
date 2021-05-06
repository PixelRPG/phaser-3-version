import { ComponentProps } from "@javelin/ecs";
import { Entity } from "./entry";

export interface Text extends ComponentProps {
  text: string;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
  playerEntity?: Entity;
}
