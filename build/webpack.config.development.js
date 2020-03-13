const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./build",
    noInfo: true,
    open: true,
    port: 9000,
    after: function(app, server) {
      app.listen(3000, function() {
        console.log("Webpack dev server is listening on port 9000");
      });
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
