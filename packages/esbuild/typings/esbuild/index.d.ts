declare module "esbuild" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ESBuildBuildOptions {}
  export interface ESBuildServeOptions {
    servedir: string;
    port?: number;
  }

  export interface Server {
    stop: () => void;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Builder {}

  export const serve: (
    serveOptions: ESBuildServeOptions,
    options: ESBuildBuildOptions
  ) => Promise<Server>;

  export const build: (options: ESBuildBuildOptions) => Promise<Builder>;
}
