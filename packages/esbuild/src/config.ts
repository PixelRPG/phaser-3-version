import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";
import { Environment, AssetsConfig, Config } from "./types";
import type { ESBuildServeOptions, ESBuildBuildOptions } from "esbuild";

export const getConfig = (env: Environment): Config => {
  env.development = env.development || !env.production;
  env.production = env.production || !env.development;

  const root = process.cwd();

  const esbuild: ESBuildBuildOptions = {
    plugins: [pnpPlugin()],
    entryPoints: ["src/main.ts"],
    bundle: true,
    minify: env.production,
    outdir: "dist/assets/scripts",
    // outfile: "dist/assets/scripts/main.js",
    platform: "browser",
    sourcemap: env.development,
    watch: env.watch || false,
    define: {
      global: "window",
    },
  };

  const serve: ESBuildServeOptions = {
    servedir: "dist",
    port: env.port,
  };

  const assets: AssetsConfig = {
    tilemaps: {
      indir: "./src/assets/tilemaps/",
      outdir: "./dist/assets/tilemaps/",
    },
    tilesets: {
      indir: "./src/assets/tilesets/",
      outdir: "./dist/assets/tilesets/",
    },
  };

  return {
    root,
    esbuild,
    serve,
    assets,
  };
};
