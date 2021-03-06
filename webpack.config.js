require('dotenv').config();
const debug = process.env.ENVIRONMENT !== "PRODUCTION";
const webpack = require('webpack');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const cleandir = require('clean-dir');

module.exports = {
  context: __dirname,
  entry: "./src/client/scripts.js",
  output: {
    path: __dirname + "/src/client/",
    filename: "scripts.min.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      ScrollReveal: "ScrollReveal"
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader!resolve-url-loader" },
      {
        test: /\.jpg$/, 
        loader: "file-loader" 
      },
      { test: require.resolve('jquery'), loader: 'expose-loader?jQuery!expose-loader?$' },
      {
        test: /\.woff(2)?(¿v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: 'styles/fonts/[name].[ext]',
            publicPath: function(url) {
            return url.replace(/styles/, '..')
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)(¿v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: 'styles/fonts/[name].[ext]',
            publicPath: function(url) {
            return url.replace(/styles/, '..')
          }
        }
      }
    ]
  }
};
