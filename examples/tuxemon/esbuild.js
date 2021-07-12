const esbuild = require('esbuild');
const { getConfig } = require('@pixelrpg/esbuild');

const config = getConfig({ production: false });

esbuild.build(config).catch((error) => {
  console.error(error);
});
