const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const prodConfig = require('./webpack.production.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const moment = require('moment');

const config = {

	entry: './src/index.js',

	// Tell Webpack where to put the output file
	output: {
		filename: 'bundle.js',
    	chunkFilename: `[name].${moment(new Date()).format("MMDD")}.js`,
		path: path.resolve(__dirname, '../public', 'build'),
    	publicPath: '/build/'
	}
}

module.exports = (env, argv) => {
  return argv.env==='local' ? merge(baseConfig, config) : merge(prodConfig, config)
}