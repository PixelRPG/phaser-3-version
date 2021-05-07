import * as esbuild from "esbuild";
import type { ESBuildServeOptions } from "esbuild";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { getConfig } from "./config";
import { Environment } from "./types";

const argv = yargs(hideBin(process.argv))
  .option("dev", {
    alias: "d",
    type: "boolean",
    description: "Development mode",
    default: true,
  })
  .option("serve", {
    alias: "s",
    type: "boolean",
    description: "Start the server",
    default: false,
  })
  .option("port", {
    alias: "p",
    type: "number",
    description: "Port to start the server",
    default: 8080,
  })
  .option("watch", {
    alias: "w",
    type: "boolean",
    description: "Watch files",
    default: false,
  }).argv;

const env: Environment = {
  development: argv.dev,
  production: !argv.dev,
  watch: argv.watch,
  serve: argv.serve,
  port: argv.port,
};

const config = getConfig(env);

if (env.serve) {
  const serveOptions: ESBuildServeOptions = {
    servedir: "dist",
    port: env.port,
  };
  console.info(`Serve on http://localhost:${serveOptions.port}`);
  esbuild.serve(serveOptions, config).catch((error: Error) => {
    console.error(error);
  });
} else {
  esbuild
    .build(config)
    .then(() => {
      console.info(`Build done: ${config.outdir}`);
    })
    .catch((error: Error) => {
      console.error(error);
    });
}
