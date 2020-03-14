const { HotModuleReplacementPlugin } = require('webpack')
const merge = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    historyApiFallback: {
      index: '/',
    },
  },
  plugins: [
    new Dotenv({
      path: './env/dev.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: false, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
    new HotModuleReplacementPlugin(),
  ],
})
