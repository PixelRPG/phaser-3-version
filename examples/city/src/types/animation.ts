import { ComponentProps } from "@javelin/ecs";

export interface Animation extends ComponentProps {
  key: string;
  frames: {
    atlasKey: string;
    prefix: string;
    start: number;
    end: number;
    zeroPad: number;
  };
  frameRate: number;
  repeat: number;
}
