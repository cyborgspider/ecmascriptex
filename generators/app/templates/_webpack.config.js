var webpack         = require('webpack');
var path            = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath       = path.resolve(__dirname, './dist/js/');
var common          = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  watch: true,
  devtool:'source-map',
  entry: {
    first:'./scripts/scripts.js',
    second:'./scripts/another-script.js'
  },
  output: {
    path:              buildPath,
    filename:          '[name].bundle.js',
    sourceMapFilename: '[file].map'
  },
  plugins:[common],
  module:{
    loaders:[
      { test: /\.js$/, loader: 'babel-loader', exclude: [nodeModulesPath] }
    ]
  }
};
