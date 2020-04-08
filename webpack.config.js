const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
  return {
    entry: [
      "core-js/stable",
      "regenerator-runtime/runtime",
      path.resolve(__dirname, "src/web/index.tsx"),
      path.resolve(__dirname, "src/web//sass/index.scss"),
    ],
    devtool: argv.mode === "production" ? false : "inline-source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[contenthash].js",
    },
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src/web/index-template.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[contenthash].css",
      }),
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        {
          test: (path) => path.endsWith(".css"),
          include: /node_modules/,
          loaders: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: (path) => path.endsWith(".scss"),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")],
              },
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /(\.tsx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
            {
              loader: "ts-loader",
            },
          ],
        },
      ],
    },
  };
};
