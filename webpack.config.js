const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabelEnginePlugin = require('babel-engine-plugin');
const path = require('path');
const JS_JSX_PATTERN = /\.jsx?$/;

module.exports = {
  entry: {
    index: './src/js/index.js',
    elements_home: './src/js/elements_home.js',
    create_element: './src/js/create_element.js',
    messaging_board: './src/js/messaging_board.js'
  },
  output: {
    path: path.resolve(__dirname),
    filename: "[name].bundle.js"
  },
  /*plugins: [
        new BabelEnginePlugin({
            presets: ['react', 'es2015', 'stage-1']
        })
  ],*/
  module: {
    loaders: [
      {
        test: JS_JSX_PATTERN,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
