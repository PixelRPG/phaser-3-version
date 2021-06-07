import { Component, World, ComponentProps } from "@javelin/ecs";
import {
  AssetMap,
  Tileset,
  MapLayer,
  Sprite,
  Animation,
  Camera,
  Text,
  Entity,
} from "../types";

export class PhaserService {
  protected static instance: PhaserService;

  protected _tilesets = new Map<Entity, Phaser.Tilemaps.Tileset>();
  protected _maps = new Map<Entity, Phaser.Tilemaps.Tilemap>();
  protected _layers = new Map<Entity, Phaser.Tilemaps.TilemapLayer>();
  protected _sprites = new Map<
    Entity,
    Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  >();
  protected _animations = new Map<Entity, Phaser.Animations.Animation>();
  protected _cameras = new Map<Entity, Phaser.Cameras.Scene2D.Camera>();
  protected _texts = new Map<Entity, Phaser.GameObjects.Text>();

  protected constructor() {
    /** protected */
  }

  protected mapToArray<T>(map: Map<Entity, T>) {
    return Array.from(map, ([, value]) => value);
  }

  public static getInstance() {
    if (PhaserService.instance) {
      return PhaserService.instance;
    }
    PhaserService.instance = new PhaserService();
    return PhaserService.instance;
  }

  tryGetGameObject(entity: Entity): Phaser.GameObjects.GameObject | undefined {
    const sprite = this.tryGetSprite(entity);
    if (sprite) {
      return sprite;
    }

    const text = this.tryGetText(entity);
    if (text) {
      return text;
    }

    const layer = this.tryGetLayer(entity);
    if (layer) {
      return layer;
    }
  }

  getGameObject(entity: Entity): Phaser.GameObjects.GameObject {
    const gameObject = this.tryGetGameObject(entity);
    if (!gameObject) {
      throw new Error(`No GameObject for entity ${entity} found!`);
    }
    return gameObject;
  }

  public createLayer(
    mapLayerEntity: Entity,
    mapLayerComponent: Component<MapLayer & ComponentProps>
  ) {
    const map = this.getMap(mapLayerComponent.assetMapEntity);
    const tileset = this.getTileset(mapLayerComponent.tilesetEntity);

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

    this._layers.set(mapLayerEntity, phaserLayer);
    return phaserLayer;
  }

  public tryGetLayer(layerEntity: Entity) {
    return this._layers.get(layerEntity);
  }

  public getLayer(layerEntity: Entity) {
    const layer = this.tryGetLayer(layerEntity);
    if (!layer) {
      throw new Error(`No Layer for entity ${layerEntity} found!`);
    }
    return layer;
  }

  public getAllLayers() {
    return this.mapToArray<Phaser.Tilemaps.TilemapLayer>(this._layers);
  }

  public getLayerByProperty(key: keyof Phaser.Tilemaps.TilemapLayer, value: any) {
    const layers = this.getAllLayers();
    return layers.find(layer => layer[key] === value);
  }

  public createTileset(
    tilesetEntity: Entity,
    tilesetComponent: Component<Tileset & ComponentProps>
  ) {
    const map = this.getMap(tilesetComponent.assetMapEntity);
    const tileset = map.addTilesetImage(
      tilesetComponent.name,
      tilesetComponent.key
    );
    this._tilesets.set(tilesetEntity, tileset);
    return tileset;
  }

  public tryGetTileset(tilesetEntity: Entity) {
    return this._tilesets.get(tilesetEntity);
  }

  public getTileset(tilesetEntity: Entity) {
    const tileset = this.tryGetTileset(tilesetEntity);
    if (!tileset) {
      throw new Error(`No tileset for tilesetEntity ${tilesetEntity} found!`);
    }
    return tileset;
  }

  public getAllTilesets() {
    return this._tilesets;
  }

  public createMap(
    scene: Phaser.Scene,
    assetMapEntity: Entity,
    assetMapComponent: Component<AssetMap & ComponentProps>
  ) {
    const map = scene.make.tilemap({
      key: assetMapComponent.key,
    });
    this._maps.set(assetMapEntity, map);
    return map;
  }

  public tryGetMap(assetMapEntity: Entity) {
    return this._maps.get(assetMapEntity);
  }

  public getMap(assetMapEntity: Entity) {
    const map = this.tryGetMap(assetMapEntity);
    if (!map) {
      throw new Error(`No map for assetMapEntity ${assetMapEntity} found!`);
    }
    return map;
  }

  public getAllMaps() {
    return this.mapToArray<Phaser.Tilemaps.Tilemap>(this._maps);
  }

  public getActiveMap() {
    // TODO
    return this.getAllMaps()[0];
  }

  public createSprite(
    physics: Phaser.Physics.Arcade.ArcadePhysics,
    spriteEntity: Entity,
    spriteComponent: Component<Sprite & ComponentProps>
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
    this._sprites.set(spriteEntity, sprite);
    return sprite;
  }

  public tryGetSprite(spriteEntity: Entity) {
    return this._sprites.get(spriteEntity);
  }

  public getSprite(spriteEntity: Entity) {
    const sprite = this.tryGetSprite(spriteEntity);
    if (!sprite) {
      throw new Error(`No sprite for spriteEntity ${spriteEntity} found!`);
    }
    return sprite;
  }

  public getAllSprites() {
    return this._sprites;
  }

  public createAnimation(
    animationManager: Phaser.Animations.AnimationManager,
    animationEntity: Entity,
    animationComponent: Component<Animation & ComponentProps>
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

    this._animations.set(animationEntity, animation);
    return animation;
  }

  public tryGetAnimation(animationEntity: Entity) {
    return this._animations.get(animationEntity);
  }

  public getAnimation(animationEntity: Entity) {
    const animation = this.tryGetAnimation(animationEntity);
    if (!animation) {
      throw new Error(
        `No animation for animationEntity ${animationEntity} found!`
      );
    }
    return animation;
  }

  public getAllAnimations() {
    return this._animations;
  }

  public createCamera(
    cameraManager: Phaser.Cameras.Scene2D.CameraManager,
    cameraEntity: Entity,
    cameraComponent: Component<Camera & ComponentProps>
  ) {
    let phaserCamera: Phaser.Cameras.Scene2D.Camera;

    if (cameraComponent.isMain) {
      phaserCamera = cameraManager.main;
    } else {
      phaserCamera = cameraManager.add(
        cameraComponent.viewport.x,
        cameraComponent.viewport.y,
        cameraComponent.viewport.width,
        cameraComponent.viewport.height,
        cameraComponent.isMain,
        cameraComponent.name
      );
    }

    if (!phaserCamera) {
      throw new Error(`Can't add ${cameraEntity} camera!`);
    }

    this.updateCamera(cameraEntity, cameraComponent, phaserCamera);

    this._cameras.set(cameraEntity, phaserCamera);

    return phaserCamera;
  }

  public updateCamera(
    cameraEntity: Entity,
    cameraComponent: Component<Camera & ComponentProps>,
    phaserCamera?: Phaser.Cameras.Scene2D.Camera
  ) {
    if (!phaserCamera) {
      phaserCamera = this.getCamera(cameraEntity);
    }

    if (typeof cameraComponent.viewport.width === "number") {
      phaserCamera.setSize(
        cameraComponent.viewport.width,
        cameraComponent.viewport.height
      );
    }

    if (typeof cameraComponent.viewport.x === "number") {
      phaserCamera.setPosition(
        cameraComponent.viewport.x,
        cameraComponent.viewport.y
      );
    }

    if (typeof cameraComponent.name === "string") {
      phaserCamera.setName(cameraComponent.name);
    }

    if (cameraComponent.bounds) {
      phaserCamera.setBounds(
        cameraComponent.bounds.x,
        cameraComponent.bounds.y,
        cameraComponent.bounds.width,
        cameraComponent.bounds.height
      );
    }

    if (cameraComponent.zoom) {
      // Use zoomTo for animated zoom
      phaserCamera.setZoom(cameraComponent.zoom);
    }

    return phaserCamera;
  }

  public tryGetCamera(cameraEntity: Entity) {
    return this._cameras.get(cameraEntity);
  }

  public getCamera(cameraEntity: Entity) {
    const camera = this.tryGetCamera(cameraEntity);
    if (!camera) {
      throw new Error(`No camera for cameraEntity ${cameraEntity} found!`);
    }
    return camera;
  }

  public getAllCameras() {
    return this.mapToArray<Phaser.Cameras.Scene2D.Camera>(this._cameras);
  }

  public createText(
    world: World<any>,
    scene: Phaser.Scene,
    textEntity: Entity,
    textComponent: Component<Text & ComponentProps>
  ) {
    const phaserText = scene.add.text(
      0,
      0,
      textComponent.text,
      textComponent.style
    );

    /**
     * Show text only on camera of player
     * TODO move to camera or text effect?
     */
    if (textComponent.playerEntity) {
      const showCamera = this.getCamera(textComponent.playerEntity);
      if (!showCamera) {
        console.warn("No camera for player found!");
      } else {
        const phaserCameras = this.getAllCameras();
        for (let i = 0; i < phaserCameras.length; i++) {
          const ignoreCamera = phaserCameras[i];
          if (ignoreCamera.id !== showCamera.id) {
            ignoreCamera.ignore(phaserText);
          }
        }
      }
    }

    if (!phaserText) {
      throw new Error(`Can't add ${textEntity} text!`);
    }

    this._texts.set(textEntity, phaserText);
    return phaserText;
  }

  public tryGetText(textEntity: Entity) {
    return this._texts.get(textEntity);
  }

  public getText(textEntity: Entity) {
    const text = this.tryGetText(textEntity);
    if (!text) {
      throw new Error(`No text for entity ${textEntity} found!`);
    }
    return text;
  }

  public getAllTexts() {
    return this._texts;
  }
}
