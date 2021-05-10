import { AssetsConfig } from "./assets-config";
import type { ESBuildServeOptions, ESBuildBuildOptions } from "esbuild";

export interface Config {
  root: string;
  esbuild: ESBuildBuildOptions;
  serve: ESBuildServeOptions;
  assets: AssetsConfig;
}
