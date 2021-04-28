import { System } from "@javelin/ecs";
import { WorldGameData } from "../types";

import {
  phaserAssetPreloadEffect,
  phaserAssetMapEffect,
  phaserTilesetEffect,
  phaserMapLayerEffect,
  phaserMapObjectEffect,
  phaserSpriteEffect,
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
  phaserSpriteEffect();
};
