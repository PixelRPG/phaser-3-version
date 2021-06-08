import { AlignType } from "../align-type";
import { Entity } from "../entry";

export interface AlignPosition {
  type: AlignType;
  toEntry: Entity;
}
