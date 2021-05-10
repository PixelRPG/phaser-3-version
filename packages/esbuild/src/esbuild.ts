import * as esbuild from "esbuild";
import { Config, Environment } from "./types";

export const run = async (env: Environment, config: Config) => {
  if (env.serve) {
    console.info(`Serve on http://localhost:${config.serve.port}`);
    return esbuild.serve(config.serve, config.esbuild);
  } else {
    const result = await esbuild.build(config.esbuild);
    console.info(`Build done: ${config.esbuild.outdir}`);
    return result;
  }
};
