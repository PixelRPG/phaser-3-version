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
  phaserTextEffect,
  phaserPositionEffect,
  phaserScrollfactorEffect,
  phaserDepthEffect,
  phaserVelocityEffect,
  phaserCollisionEffect,
  phaserDebugEffect,
} from "../effects";

/**
 * Preload game assets
 */
export const phaserSystem: System<WorldGameData> = (/*world*/) => {
  phaserAssetPreloadEffect();
  phaserAssetMapEffect();
  phaserTilesetEffect();
  phaserMapLayerEffect();
  phaserMapObjectEffect();
  phaserAnimationEffect();
  phaserSpriteEffect();
  phaserCameraEffect();
  phaserInputEffect();
  phaserTextEffect();
  phaserVelocityEffect();
  phaserPositionEffect();
  phaserScrollfactorEffect();
  phaserDepthEffect();
  phaserCollisionEffect();
  phaserDebugEffect();
};
