import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";
import { Environment } from "./types";

export const getConfig = (env: Environment) => {
  env.development = env.development || !env.production;
  env.production = env.production || !env.development;
  return {
    plugins: [pnpPlugin()],
    entryPoints: ["src/main.ts"],
    bundle: true,
    minify: env.production,
    outdir: "dist/assets/scripts",
    // outfile: "dist/assets/scripts/main.js",
    sourcemap: env.development,
    watch: env.watch,
    define: {
      global: "window",
    },
  };
};
