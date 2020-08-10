const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const pkg = require('../../package.json');
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
				test: /\.(ttf|eot|svg|png|jpg|gif|mp4|mov|woff(2)?)(\?[a-z0-9]+)?$/,
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
  devtool: false,
	plugins: [
    new webpack.ProvidePlugin({
      "React": "react",
    }),
	  new ExtractTextPlugin({
			filename: "[name].css",
			disable: false,
			allChunks: true
		}),
    new Dotenv(),
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.WatchIgnorePlugin([
      path.resolve(__dirname, '../node_modules/'),
      path.resolve(__dirname, '../build/'),
      path.resolve(__dirname, '../public/'),
    ]),
    new webpack.EvalSourceMapDevToolPlugin({}),
  ],
}