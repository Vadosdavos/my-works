const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8080,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}