export interface Animation {
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
