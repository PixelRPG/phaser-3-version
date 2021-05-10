import { Size } from "../size";
import { Coordinates2D } from "../coordinates-2d";

export interface Sprite {
  key: string;
  frame?: string;
  // position?: Coordinates2D;
  scale?: Coordinates2D;
  size?: Size;
  offset?: Coordinates2D;
}
