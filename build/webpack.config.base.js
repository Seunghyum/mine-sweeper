const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, '../dist'),
  },
  resolve: {
    modules: ['node_modules', 'modules'],
    extensions: ['*', '.ts', '.tsx', '.js'],
    alias: {
      '~src': resolve(__dirname, '../src'),
      '~containers': resolve(__dirname, '../src/containers'),
      '~components': resolve(__dirname, '../src/components'),
      '~utils': resolve(__dirname, '../src/utils'),
      '~types': resolve(__dirname, '../src/@types'),
      '~stores': resolve(__dirname, '../src/stores'),
      '~helpers': resolve(__dirname, '../src/helpers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader' },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html'),
      favicon: resolve(__dirname, '../public/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
