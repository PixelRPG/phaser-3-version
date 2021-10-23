import { string, number, objectOf } from "@javelin/ecs";

export const phaserMap = {
  // TODO scene: Phaser.Scene,

  /**
   * The base width of a tile in pixels. Note that individual layers may have a different tile
   * width.
   */
  tileWidth: number,

  /**
   * The base height of a tile in pixels. Note that individual layers may have a different
   * tile height.
   */
  tileHeight: number,

  /**
   * The width of the map (in tiles).
   */
  width: number,

  /**
   * The height of the map (in tiles).
   */
  height: number,

  /**
   * The orientation of the map data (as specified in Tiled), usually 'orthogonal'.
   */
  orientation: string,

  /**
   * The render (draw) order of the map data (as specified in Tiled), usually 'right-down'.
   *
   * The draw orders are:
   *
   * right-down
   * left-down
   * right-up
   * left-up
   *
   * This can be changed via the `setRenderOrder` method.
   */
  renderOrder: string,

  /**
   * The format of the map data.
   */
  format: number,

  /**
   * The version of the map data (as specified in Tiled, usually 1).
   */
  version: number,

  /**
   * Map specific properties as specified in Tiled.
   */
  properties: objectOf(string),

  /**
   * The width of the map in pixels based on width * tileWidth.
   */
  widthInPixels: number,

  /**
   * The height of the map in pixels based on height * tileHeight.
   */
  heightInPixels: number,

  /**
   * A collection of Images, as parsed from Tiled map data.
   */
  // TODO imageCollections: Phaser.Tilemaps.ImageCollection[],

  /**
   * An array of Tiled Image Layers.
   */
  // TODO images: any[],

  /**
   * An array of Tilemap layer data.
   */
  // TODO layers: Phaser.Tilemaps.LayerData[],

  /**
   * An array of Tilesets used in the map.
   */
  // TODO tilesets: Phaser.Tilemaps.Tileset[],

  /**
   * An array of ObjectLayer instances parsed from Tiled object layers.
   */
  // TODO objects: Phaser.Tilemaps.ObjectLayer[],

  /**
   * The index of the currently selected LayerData object.
   */
  currentLayerIndex: number,

  /**
   * The length of the horizontal sides of the hexagon.
   * Only used for hexagonal orientation Tilemaps.
   */
  hexSideLength: number,
};
