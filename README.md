# PixelPRG

[Phaser](https://phaser.io/) + [Typescript](https://www.typescriptlang.org/) + [Esbuild](https://esbuild.github.io/) + [Javelin (ECS)](https://github.com/3mcd/javelin)

https://user-images.githubusercontent.com/1073989/138862209-b352ed23-c560-43a5-a24b-699d3bf2a38b.mp4

## Example

The ECS automatically detects the number of players and initializes the splitscreen accordingly. If you want to try the example with less players you can simply edit the [world.ts](./examples/tuxemon/src/worlds/game.world.ts) and comment out the other players.

Before
```ts
this.spawnPlayer({ name: "Player 1", playerNumber: 1 });
this.spawnPlayer({ name: "Player 2", playerNumber: 2 });
this.spawnPlayer({ name: "Player 3", playerNumber: 3 });
this.spawnPlayer({ name: "Player 4", playerNumber: 4 });
```

After
```ts
this.spawnPlayer({ name: "Player 1", playerNumber: 1 });
this.spawnPlayer({ name: "Player 2", playerNumber: 2 });
```
### Build

Required engine:  
node: >=16  
npm: >=7  

```sh
git clone https://github.com/PixelRPG/phaser-3-version.git
cd phaser-3-version
git submodule update --init --recursive
npm install
# Build each package in this workspace
npm run build
# Start the example game
npm run start
```

## Tools

* [Free Texture Packer](https://github.com/odrick/free-tex-packer)
* [Tile Extruder](https://github.com/sporadic-labs/tile-extruder)
