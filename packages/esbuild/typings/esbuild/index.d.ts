declare module "esbuild" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ESBuildConfig {}

  export const build: (options: ESBuildConfig) => Promise<void>;
}
