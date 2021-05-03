import { ComponentProps } from "@javelin/ecs";

export interface AssetMap extends ComponentProps {
  key: string;
  url: string;
  xhrSettings?: Phaser.Types.Loader.XHRSettingsObject;
}
