const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttd|otf)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({ 
      template: './src/tours/tour1.html',
      filename: './tour1.html' 
    }),
    new HtmlWebpackPlugin({ 
      template: './src/tours/tour2.html',
      filename: './tour2.html' 
    }),
    new HtmlWebpackPlugin({ 
      template: './src/tours/tour3.html',
      filename: './tour3.html' 
    }),
    new HtmlWebpackPlugin({ 
      template: './src/tours/tour4.html',
      filename: './tour4.html' 
    }),
    new HtmlWebpackPlugin({ 
      template: './src/tours/tour5.html',
      filename: './tour5.html' 
    }),
    new HtmlWebpackPlugin({ 
      template: './src/tours/tour6.html',
      filename: './tour6.html' 
    }),
    new HtmlWebpackPlugin({ 
      template: './src/tours/tour7.html',
      filename: './tour7.html' 
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [{ from: './public' }],
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ],
};
