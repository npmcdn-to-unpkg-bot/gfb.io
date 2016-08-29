const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssEasyImport = require('postcss-easy-import');

const distRoot = path.join(__dirname, 'dist');

const extractCSS = new ExtractTextPlugin('styles/[name].css');
const extractHTML = new ExtractTextPlugin('/[name].html');

module.exports = {
  watch: true,
  entry: {
    index: './src/scripts/image-resizer.js',
  },
  output: {
    path: distRoot,
    filename: 'scripts/[name].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        include: /src\/scripts/,
        exclude: /src\/scripts\/lib/,
        loader: 'babel',
      },
      {
        test: /\.(css|scss)$/,
        include: /src\/styles/,
        exclude: /src\/styles\/lib/,
        loader: extractCSS.extract('style', 'css!postcss'),
      },
      {
        test: /\.(html)$/,
        loader: extractHTML.extract('html'),
      },

      // libraries which just copy as is
      {
        test: /src\/scripts\/lib\/.*/,
        loader: 'file?name=/scripts/lib/[name].[ext]',
      },
      {
        test: /src\/styles\/lib\/.*/,
        loader: 'file?name=/styles/lib/[name].[ext]',
      },

    ],
  },
  plugins: [
    extractCSS,
    extractHTML,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.html'],
  },
  htmlloader: {
    // ignoreCustomFragments: [/\{\{.*?}}/],
    root: distRoot,
    // attrs: ['img:src', 'link:href'],
  },
  postcss: (webpack) => ({
    defaults: [
      postcssEasyImport({ extensions: ['.css', '.scss'], addDependencyTo: webpack }),
      postcssNested,
      autoprefixer({ browsers: ['last 2 versions', 'ios_saf >= 7'] }),
    ],
  }),
};

