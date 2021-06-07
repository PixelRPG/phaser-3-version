import { System } from "@javelin/ecs";
import { WorldSceneData } from "../types";

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
export const phaserSystem: System<WorldSceneData> = (/*world*/) => {
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
