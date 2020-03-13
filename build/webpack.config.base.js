const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: resolve(__dirname, "../src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, "../dist")
  },
  resolve: {
    modules: ["node_modules", "modules"],
    extensions: ["*", ".js", ".jsx"],
    alias: {
      "@": resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "../public/index.html"),
      favicon: resolve(__dirname, "../public/favicon.ico")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
