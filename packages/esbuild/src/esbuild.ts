import * as esbuild from "esbuild";
import { getConfig } from "./config";

const config = getConfig({ production: false });
esbuild.build(config).catch((error: Error) => {
  console.error(error);
});
