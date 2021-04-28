import {
  createEffect,
  query,
  EffectOptions,
  World,
  onAttach,
} from "@javelin/ecs";
import {
  AssetMapComponent,
  PositionComponent,
  PlayerComponent,
  MapLayerComponent,
} from "../components";
import { WorldGameData, PhaserSceneMethod, MapLayer } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

type PhaserAssetMapEffectState = {
  /* TODO */
};

/**
 * Phaser Map Effect
 * Extracts informations from map asset file and creates components from this data
 */
export const phaserAssetMapEffect = createEffect<
  PhaserAssetMapEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserAssetMapEffectState = {
    tilesets: new Map<number, Phaser.Tilemaps.Tileset[]>(),
    maps: new Map<number, Phaser.Tilemaps.Tilemap>(),
    layers: new Map<number, Phaser.Tilemaps.TilemapLayer>(),
  };

  const attachPlayerSpawnPoint = (
    world: World<any>,
    spawnPoint: Phaser.Types.Tilemaps.TiledObject
  ) => {
    const playerQuery = query(PlayerComponent);

    // Create a sprite with physics enabled via the physics system. The image used for the sprite has
    // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
    if (typeof spawnPoint.x !== "number" || typeof spawnPoint.y !== "number") {
      throw new Error("spawnPoint must have coordinates!");
    }

    for (const [entities] of playerQuery) {
      for (let i = 0; i < entities.length; i++) {
        console.debug("i", i);
        const playerEntry = entities[i];

        const playerPositionComponent = world.component(
          PositionComponent,
          spawnPoint.x,
          spawnPoint.y
        );
        world.attach(playerEntry, playerPositionComponent);
      }
    }
  };

  const spawnLayer = (
    world: World<any>,
    phaserMap: Phaser.Tilemaps.Tilemap,
    phaserTileset: Phaser.Tilemaps.Tileset,
    data: MapLayer
  ) => {
    const layerComponent = world.component(MapLayerComponent, data);
    const layerEntry = world.spawn(layerComponent);

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const phaserLayer = phaserMap.createLayer(
      layerComponent.name,
      phaserTileset,
      layerComponent.x,
      layerComponent.y
    );

    phaserLayer.setCollisionByProperty({
      collides: layerComponent.collides,
    });

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    phaserLayer.setDepth(layerComponent.depth);
  };

  let preloaded = false;
  const phaserService = PhaserService.getInstance();

  const afterPreload = () => {
    for (const [entities, [assetMaps]] of query(AssetMapComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const scene = world.state.currentTickData.scenes[0];
        console.debug("onAttach AssetMapComponent", entities[i], assetMaps[i]);
        const map = phaserService.createMap(scene, entities[i], assetMaps[i]);

        // for (const tileset of assetMapComponent.tilesets) {
        //   const currTileset = currMap.addTilesetImage(
        //     tileset.name,
        //     tileset.key
        //   );

        //   currTilesets.push(currTileset);

        //   spawnLayer(world, currMap, currTileset, {
        //     name: "Below Player",
        //     x: 0,
        //     y: 0,
        //     depth: -10,
        //   });

        //   spawnLayer(world, currMap, currTileset, {
        //     name: "World",
        //     x: 0,
        //     y: 0,
        //     depth: 0,
        //     collides: true,
        //   });

        //   spawnLayer(world, currMap, currTileset, {
        //     name: "Above Player",
        //     x: 0,
        //     y: 0,
        //     depth: 10,
        //   });

        //   // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
        //   // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
        //   const currSpawnPoint = currMap.findObject(
        //     "Objects",
        //     (obj) => obj.name === "Spawn Point"
        //   );

        //   attachPlayerSpawnPoint(world, currSpawnPoint);
        // }
      }
    }
  };

  return () => {
    if (
      world.state.currentTickData.step === PhaserSceneMethod.update &&
      !preloaded
    ) {
      afterPreload();
      preloaded = true;
    }

    return state;
  };
}, effectOptions);
