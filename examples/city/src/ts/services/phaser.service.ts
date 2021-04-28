import { Component } from "@javelin/ecs";
import { AssetMap, Tileset, MapLayer, Sprite } from "../types";

export class PhaserService {
  protected static instance: PhaserService;

  protected _tilesets = new Map<number, Phaser.Tilemaps.Tileset>();
  protected _maps = new Map<number, Phaser.Tilemaps.Tilemap>();
  protected _layers = new Map<number, Phaser.Tilemaps.TilemapLayer>();
  protected _sprites = new Map<
    number,
    Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  >();

  protected constructor() {
    /** protected */
  }

  public static getInstance() {
    if (PhaserService.instance) {
      return PhaserService.instance;
    }
    PhaserService.instance = new PhaserService();
    return PhaserService.instance;
  }

  public createMapLayer(
    mapLayerEntry: number,
    mapLayerComponent: Component<MapLayer>
  ) {
    const map = this.getMap(mapLayerComponent.assetMapEntry);
    const tileset = this.getTileset(mapLayerComponent.tilesetEntry);

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const phaserLayer = map.createLayer(
      mapLayerComponent.name,
      tileset,
      mapLayerComponent.x,
      mapLayerComponent.y
    );

    phaserLayer.setCollisionByProperty({
      collides: mapLayerComponent.collides,
    });

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    phaserLayer.setDepth(mapLayerComponent.depth);

    this._layers.set(mapLayerEntry, phaserLayer);
    return phaserLayer;
  }

  public getLayer(layerEntry: number) {
    return this._layers.get(layerEntry);
  }

  public getAllLayers() {
    return this._layers;
  }

  public createTileset(
    tilesetEntry: number,
    tilesetComponent: Component<Tileset>
  ) {
    const map = this.getMap(tilesetComponent.assetMapEntry);
    const tileset = map.addTilesetImage(
      tilesetComponent.name,
      tilesetComponent.key
    );
    console.debug("createTileset", tileset, tilesetEntry);
    this._tilesets.set(tilesetEntry, tileset);
    return tileset;
  }

  public tryGetTileset(tilesetEntry: number) {
    return this._tilesets.get(tilesetEntry);
  }

  public getTileset(tilesetEntry: number) {
    const tileset = this.tryGetTileset(tilesetEntry);
    if (!tileset) {
      throw new Error(`No tileset for tilesetEntry ${tilesetEntry} found!`);
    }
    return tileset;
  }

  public getAllTilesets() {
    return this._tilesets;
  }

  public createMap(
    scene: Phaser.Scene,
    assetMapEntry: number,
    assetMapComponent: Component<AssetMap>
  ) {
    const map = scene.make.tilemap({
      key: assetMapComponent.key,
    });
    this._maps.set(assetMapEntry, map);
    return map;
  }

  public tryGetMap(assetMapEntry: number) {
    return this._maps.get(assetMapEntry);
  }

  public getMap(assetMapEntry: number) {
    const map = this.tryGetMap(assetMapEntry);
    if (!map) {
      throw new Error(`No map for assetMapEntry ${assetMapEntry} found!`);
    }
    return map;
  }

  public getAllMaps() {
    return this._maps;
  }

  public createSprite(
    physics: Phaser.Physics.Arcade.ArcadePhysics,
    spriteEntry: number,
    spriteComponent: Component<Sprite>
  ) {
    const sprite = physics.add.sprite(
      0,
      0,
      spriteComponent.key,
      spriteComponent.frame
    );

    if (spriteComponent.scale) {
      sprite.setScale(spriteComponent.scale.x, spriteComponent.scale.y);
    }

    if (spriteComponent.size) {
      sprite.setSize(spriteComponent.size.width, spriteComponent.size.height);
    }

    if (spriteComponent.offset) {
      sprite.setOffset(spriteComponent.offset.x, spriteComponent.offset.y);
    }
    this._sprites.set(spriteEntry, sprite);
    return sprite;
  }

  public tryGetSprite(spriteEntry: number) {
    return this._sprites.get(spriteEntry);
  }

  public getSprite(spriteEntry: number) {
    const sprite = this.tryGetSprite(spriteEntry);
    if (!sprite) {
      throw new Error(`No sprite for spriteEntry ${spriteEntry} found!`);
    }
    return sprite;
  }

  public getAllSprites() {
    return this._sprites;
  }
}
