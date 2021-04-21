const ribaWebpackConfig = require("@ribajs/webpack-config");
const webpackConfig = ribaWebpackConfig({
  template: "local",
  copyAssets: {
    enable: true,
    images: false,
    scss: false,
    iconset: false,
    foldername: "dist",
    patterns: [
      {
        from: "**/*.(png|tmx|json)",
        to: "assets",
        toType: "dir",
        context: "./src/assets",
      },
    ],
  },
  //   rules: [
  //     {
  //       test: /\.(png|tmx|json)$/i,
  //       use: [
  //         {
  //           loader: require.resolve("file-loader"),
  //           options: {},
  //         },
  //       ],
  //     },
  //   ],
});
module.exports = webpackConfig;
