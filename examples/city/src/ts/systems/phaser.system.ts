import { System } from "@javelin/ecs";
import { WorldGameData } from "../types";

import {
  phaserAnimationEffect,
  phaserAssetPreloadEffect,
  phaserAssetMapEffect,
  phaserTilesetEffect,
  phaserMapLayerEffect,
  phaserMapObjectEffect,
  phaserSpriteEffect,
  phaserCameraEffect,
  phaserInputEffect,
} from "../effects";

/**
 * Preload game assets
 */
export const phaserSystem: System<WorldGameData> = (world) => {
  phaserAssetPreloadEffect();
  phaserAssetMapEffect();
  phaserTilesetEffect();
  phaserMapLayerEffect();
  phaserMapObjectEffect();
  phaserAnimationEffect();
  phaserSpriteEffect();
  phaserCameraEffect();
  phaserInputEffect();
};
