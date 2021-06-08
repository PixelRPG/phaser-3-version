import { Config, Environment, TileMap, Tileset, TilesetImage } from "./types";
import { promises as fs } from "fs";
import { resolve, relative, dirname } from "path";
import { extrudeTilesetToJimp } from "tile-extruder";
import glob from "fast-glob";
import { TiledMapOrthogonal } from "tiled-types";

export const run = async (env: Environment, config: Config) => {
  const maps = await loadTilemaps(config);
  await extrudeTilesets(maps, config);
};

const loadTilemaps = async (config: Config) => {
  const files = await glob(
    resolve(config.assets.tilemaps.indir, "**/*.json"),
    {}
  );
  const maps: TileMap[] = [];
  if (!files.length) {
    console.warn("No maps found!");
  }
  for (const file of files) {
    const fileData = await fs.readFile(file, "utf8");
    const map: TiledMapOrthogonal = JSON.parse(fileData);
    maps.push({
      data: map,
      path: file,
    });
  }
  return maps;
};

const getTilesets = (maps: TileMap[]) => {
  const tilesets: Tileset[] = [];
  for (const map of maps) {
    for (const tileset of map.data.tilesets) {
      tilesets.push({
        data: tileset,
        path: map.path,
      });
    }
  }
  return tilesets;
};

const getTilesetImages = (tilesets: Tileset[]) => {
  const images: TilesetImage[] = [];
  for (const tileset of tilesets) {
    if (tileset.data.image) {
      images.push({
        relativePath: tileset.data.image,
        absolutePath: resolve(dirname(tileset.path), tileset.data.image),
      });
    }
  }
  return images;
};

const extrudeTilesets = async (maps: TileMap[], config: Config) => {
  for (const map of maps) {
    const tilesets = getTilesets([map]);

    for (const tileset of tilesets) {
      tileset.data = await extrudeTileset(tileset);
      const images = getTilesetImages([tileset]);

      for (const image of images) {
        const size = await extrudeTilesetImage(image, tileset, config);
        tileset.data.imageheight = size.height;
        tileset.data.imagewidth = size.width;
      }
    }

    map.data.tilesets = tilesets.map((tileset) => tileset.data);

    await saveMap(map, config);
  }
};

const saveMap = async (map: TileMap, config: Config) => {
  const tiledRoot = resolve(config.root, config.assets.tilesets.indir);
  const input = map.path;
  const relativeInput = relative(tiledRoot, input);
  const output = resolve(
    config.root,
    config.assets.tilesets.outdir,
    relativeInput
  );
  const outputDir = dirname(output);
  await fs.mkdir(outputDir, { recursive: true });
  console.debug("->", input);
  console.debug("<-", output);
  await fs.writeFile(output, JSON.stringify(map.data));
};

const extrudeTileset = async (_tileset: Tileset) => {
  const tileset = Object.assign({}, _tileset.data);

  tileset.margin = 1;
  tileset.spacing = 2;

  return tileset;
};

const extrudeTilesetImage = async (
  image: TilesetImage,
  tileset: Tileset,
  config: Config
) => {
  const input = image.absolutePath;
  const tiledRoot = resolve(config.root, config.assets.tilesets.indir);
  const relativeInput = relative(tiledRoot, input);
  const output = resolve(
    config.root,
    config.assets.tilesets.outdir,
    relativeInput
  );
  const outputDir = dirname(output);
  await fs.mkdir(outputDir, { recursive: true });
  console.debug("->", input);
  console.debug("<-", output);
  const extruded = await extrudeTilesetToJimp(
    tileset.data.tilewidth,
    tileset.data.tileheight,
    input,
    {}
  );

  await extruded.writeAsync(output);

  return {
    width: extruded.bitmap.width,
    height: extruded.bitmap.height,
  };
};
