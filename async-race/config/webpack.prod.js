const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ESLintPlugin({ extensions: ['tsx', 'ts', 'js'] }),
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
}