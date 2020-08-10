const webpack = require('webpack');
var path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
	// Tell Webpack to run Babel on Every File it run Thorugh
	module: {
		rules: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [ 'react', 
							  'stage-0', 
							  [ 'env', { targets: { browsers: ['last 2 versions'] } }] 
					]
				}
			},
      {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
            allChunks: true
          })
      },
      {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader!sass-loader",
            allChunks: true
          })
      },
      {
				test: /\.(ttf|eot|svg|png|jpg|gif|mp4|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
            publicPath: '/build/'
          }
      },
      {
        test: /\.(xml|json|txt)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: '[name].[ext]',
          publicPath: '/'
        }
      },
		]
	},
	plugins: [
	  new ExtractTextPlugin({
			filename: "[name].css",
			disable: false,
			allChunks: true
		}),
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js/,
      cache: true
    }),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true,
      minimize: false,
      mangle: false,
      compress: {
         screw_ie8: true,
         warnings: false,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
			filename: "[name].css",
			disable: false,
			allChunks: true
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
}