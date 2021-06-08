# tsconfig

> Shared [TypeScript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) for PixelRPG games

## Install

```bash
npm install --save-dev @pixelrpg/tsconfig
```

## Usage

`tsconfig.json`

```json
{
  "extends": "@pixelrpg/tsconfig",
  "compilerOptions": {
    "outDir": "dist",
    "target": "es2018",
    "lib": [
      "es2018"
    ]
  }
}
```

## License

MIT © [Art+Code Studio](https://artandcode.studio/)
