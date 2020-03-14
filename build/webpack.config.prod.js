const merge = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const { HotModuleReplacementPlugin } = require('webpack')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    publicPath: '/dist/',
  },
  plugins: [
    new Dotenv({
      path: './env/prod.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
      defaults: false, // load '.env.defaults' as the default values if empty.
    }),
    new HotModuleReplacementPlugin(),
  ],
})
