import { pnpPlugin } from "@yarnpkg/esbuild-plugin-pnp";

export const getConfig = (env: {
  production?: boolean;
  development?: boolean;
}) => {
  env.development = env.development || !env.production;
  env.production = env.production || !env.development;
  return {
    plugins: [pnpPlugin()],
    entryPoints: ["src/ts/main.ts"],
    bundle: true,
    outfile: "dist/assets/scripts/main.js",
    sourcemap: true,
    define: {
      global: "window",
    },
  };
};
