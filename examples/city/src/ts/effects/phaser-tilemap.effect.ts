import { createEffect, query, EffectOptions, World } from "@javelin/ecs";
import {
  AssetTilemapComponent,
  PositionComponent,
  PlayerComponent,
  TilemapLayerComponent,
} from "../components";
import { WorldGameData, PhaserSceneMethod, TilemapLayer } from "../types";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserTilemapEffectState {
  tilesets: Map<number, Phaser.Tilemaps.Tileset[]>;
  tilemaps: Map<number, Phaser.Tilemaps.Tilemap>;
  layers: Map<number, Phaser.Tilemaps.TilemapLayer>;
}

export const phaserTilesetEffect = createEffect<
  PhaserTilemapEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserTilemapEffectState = {
    tilesets: new Map<number, Phaser.Tilemaps.Tileset[]>(),
    tilemaps: new Map<number, Phaser.Tilemaps.Tilemap>(),
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
    phaserTilemap: Phaser.Tilemaps.Tilemap,
    phaserTileset: Phaser.Tilemaps.Tileset,
    data: TilemapLayer
  ) => {
    const layerComponent = world.component(TilemapLayerComponent, data);
    const layerEntry = world.spawn(layerComponent);

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const phaserLayer = phaserTilemap.createLayer(
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

    state.layers.set(layerEntry, phaserLayer);
  };

  const create = () => {
    const scene = world.state.currentTickData.scenes[0];
    const tilemapQuery = query(AssetTilemapComponent);

    for (const [entities, [tilemapComponents]] of tilemapQuery) {
      for (let i = 0; i < entities.length; i++) {
        console.debug("processTilemaps i", i);
        const tilemapEntry = entities[i];
        const tilemapComponent = tilemapComponents[i];
        console.debug("tilemapComponent", tilemapComponent);
        const currTilemap = scene.make.tilemap({
          key: tilemapComponent.tilemap.key,
        });

        const currTilesets: Phaser.Tilemaps.Tileset[] = [];

        for (const tileset of tilemapComponent.tilesets) {
          const currTileset = currTilemap.addTilesetImage(
            tileset.name,
            tileset.key
          );

          currTilesets.push(currTileset);

          spawnLayer(world, currTilemap, currTileset, {
            name: "Below Player",
            x: 0,
            y: 0,
            depth: -10,
          });

          spawnLayer(world, currTilemap, currTileset, {
            name: "World",
            x: 0,
            y: 0,
            depth: 0,
            collides: true,
          });

          spawnLayer(world, currTilemap, currTileset, {
            name: "Above Player",
            x: 0,
            y: 0,
            depth: 10,
          });

          // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
          // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
          const currSpawnPoint = currTilemap.findObject(
            "Objects",
            (obj) => obj.name === "Spawn Point"
          );

          attachPlayerSpawnPoint(world, currSpawnPoint);
        }

        state.tilemaps.set(tilemapComponent._tid, currTilemap);
        state.tilesets.set(tilemapComponent._tid, currTilesets);

        tilemapComponent.loaded = true;
      }
    }

    return state;
  };

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      return create();
    }
    return state;
  };
}, effectOptions);
