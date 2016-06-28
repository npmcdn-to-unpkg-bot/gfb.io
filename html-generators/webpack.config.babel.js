import path from 'path';
import webpack from 'webpack';

export default {
  watch: true,

  entry: {
    app: './src/app.js',
  },

  output: {
    publicPath: '/',
    sourcePrefix: ' ',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },
};
