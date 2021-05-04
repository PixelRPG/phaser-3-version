import { Component } from "@javelin/ecs";
import {
  AssetMap,
  Tileset,
  MapLayer,
  Sprite,
  Animation,
  Camera,
  Text,
} from "../types";

export class PhaserService {
  protected static instance: PhaserService;

  protected _tilesets = new Map<number, Phaser.Tilemaps.Tileset>();
  protected _maps = new Map<number, Phaser.Tilemaps.Tilemap>();
  protected _layers = new Map<number, Phaser.Tilemaps.TilemapLayer>();
  protected _sprites = new Map<
    number,
    Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  >();
  protected _animations = new Map<number, Phaser.Animations.Animation>();
  protected _cameras = new Map<number, Phaser.Cameras.Scene2D.Camera>();
  protected _texts = new Map<number, Phaser.GameObjects.Text>();

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

  tryGetGameObject(entry: number): Phaser.GameObjects.GameObject | undefined {
    const sprite = this.tryGetSprite(entry);
    if (sprite) {
      return sprite;
    }

    const text = this.tryGetText(entry);
    if (text) {
      return text;
    }

    const layer = this.tryGetLayer(entry);
    if (layer) {
      return layer;
    }
  }

  getGameObject(entry: number): Phaser.GameObjects.GameObject {
    const gameObject = this.tryGetGameObject(entry);
    if (!gameObject) {
      throw new Error(`No GameObject for entry ${entry} found!`);
    }
    return gameObject;
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

    this._layers.set(mapLayerEntry, phaserLayer);
    return phaserLayer;
  }

  public tryGetLayer(layerEntry: number) {
    return this._layers.get(layerEntry);
  }

  public getLayer(layerEntry: number) {
    const layer = this.tryGetLayer(layerEntry);
    if (!layer) {
      throw new Error(`No Layer for entry ${layerEntry} found!`);
    }
    return layer;
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

  public createAnimation(
    animationManager: Phaser.Animations.AnimationManager,
    animationEntry: number,
    animationComponent: Component<Animation>
  ) {
    const animation = animationManager.create({
      key: animationComponent.key,
      frames: animationManager.generateFrameNames(
        animationComponent.frames.atlasKey,
        {
          prefix: animationComponent.frames.prefix,
          start: animationComponent.frames.start,
          end: animationComponent.frames.end,
          zeroPad: animationComponent.frames.zeroPad,
        }
      ),
      frameRate: animationComponent.frameRate,
      repeat: animationComponent.repeat,
    });

    if (!animation) {
      throw new Error(`Can't create ${animationComponent.key} animation!`);
    }

    this._animations.set(animationEntry, animation);
    return animation;
  }

  public tryGetAnimation(animationEntry: number) {
    return this._animations.get(animationEntry);
  }

  public getAnimation(animationEntry: number) {
    const animation = this.tryGetAnimation(animationEntry);
    if (!animation) {
      throw new Error(
        `No animation for animationEntry ${animationEntry} found!`
      );
    }
    return animation;
  }

  public getAllAnimations() {
    return this._animations;
  }

  public createCamera(
    cameraManager: Phaser.Cameras.Scene2D.CameraManager,
    cameraEntry: number,
    cameraComponent: Component<Camera>
  ) {
    let camera: Phaser.Cameras.Scene2D.Camera;
    
    // Workaround
    if (cameraComponent.isMain) {
      camera = cameraManager.main;

      if (typeof cameraComponent.x === 'number' && typeof cameraComponent.y === 'number' && typeof cameraComponent.width === 'number' && typeof cameraComponent.height === 'number')
      camera.setBounds(cameraComponent.x, cameraComponent.y, cameraComponent.width, cameraComponent.height);

      if (cameraComponent.name) {
        camera.setName(cameraComponent.name);
      }
    } else {
      camera = cameraManager.add(
        cameraComponent.x,
        cameraComponent.y,
        cameraComponent.width,
        cameraComponent.height,
        cameraComponent.isMain,
        cameraComponent.name
      );
    }

    if (cameraComponent.followEntry) {
      const phaserGameObject = this.getGameObject(cameraComponent.followEntry);
      camera.startFollow(phaserGameObject);
    }

    if (!camera) {
      throw new Error(`Can't add ${cameraEntry} camera!`);
    }

    this._cameras.set(cameraEntry, camera);
    return camera;
  }

  public tryGetCamera(cameraEntry: number) {
    return this._cameras.get(cameraEntry);
  }

  public getCamera(cameraEntry: number) {
    const camera = this.tryGetCamera(cameraEntry);
    if (!camera) {
      throw new Error(`No camera for cameraEntry ${cameraEntry} found!`);
    }
    return camera;
  }

  public getAllCameras() {
    return this._cameras;
  }

  public createText(
    scene: Phaser.Scene,
    textEntry: number,
    textComponent: Component<Text>
  ) {
    const text = scene.add.text(0, 0, textComponent.text, textComponent.style);

    if (!text) {
      throw new Error(`Can't add ${textEntry} text!`);
    }

    this._texts.set(textEntry, text);
    return text;
  }

  public tryGetText(textEntry: number) {
    return this._texts.get(textEntry);
  }

  public getText(textEntry: number) {
    const text = this.tryGetText(textEntry);
    if (!text) {
      throw new Error(`No text for entry ${textEntry} found!`);
    }
    return text;
  }

  public getAllTexts() {
    return this._texts;
  }
}
