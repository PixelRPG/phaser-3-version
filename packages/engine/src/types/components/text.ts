import { Entity } from "../entry";

export interface Text {
  text: string;
  style?: Phaser.Types.GameObjects.Text.TextStyle;
  playerEntity?: Entity;
}
