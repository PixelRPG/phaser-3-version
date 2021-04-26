const esbuild = require('esbuild');
const { getConfig } = require('@rpg-phaser/esbuild');

const config = getConfig({ production: false });

esbuild.build(config).catch((error) => {
  console.error(error);
});
