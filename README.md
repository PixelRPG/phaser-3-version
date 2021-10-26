# PixelPRG

[Phaser](https://phaser.io/) + [Typescript](https://www.typescriptlang.org/) + [Esbuild](https://esbuild.github.io/) + [Javelin (ECS)](https://github.com/3mcd/javelin)

## Build

Required engine:  
node: >=16  
npm: >=7  

```sh
git clone https://github.com/PixelRPG/PixelRPG.git
cd PixelRPG
git submodule update --init --recursive
npm install
# Build each package in this workspace
npm run build
# Start the example game
npm run start
```

## Tools

* [Free texture packer](https://github.com/odrick/free-tex-packer)