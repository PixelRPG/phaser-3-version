import { ComponentProps } from "@javelin/ecs";

export interface AssetTileset extends ComponentProps {
  /** The key used for asset preloading */
  key: string;
  /** The asset url */
  url: string;
}
