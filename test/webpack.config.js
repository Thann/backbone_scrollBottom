'use strict';

const webpack = require('webpack');

module.exports = function(env) {
	const config = {
		context: __dirname,
		mode: 'development',
		entry: {
			app: './app.js',
		},
		output: {
			path: __dirname,
			libraryTarget: 'var',
			library: 'App',
			filename: '[name].bundle.js',
		},
		plugins: [
		],
		module: {
			rules: [
				{ test:  /\.s?css$/,
					use: [
						{ loader: 'style-loader' },
						{ loader: 'css-loader', options: {sourceMap: true} },
						{ loader: 'sass-loader' },
					],
				},
				{ // ES6 support.
					test:  /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						//options: { presets: ['es2015'] },
					},
				},
				{ // eslint
					test: /\.js$/,
					use: ['eslint-loader'],
					exclude: /node_modules/,
					enforce: 'pre',
				},
			],
		},
		devtool: 'source-map',
		performance: {
			maxAssetSize: 200 * 10000,
			maxEntrypointSize: 200 * 10000,
		},
		optimization: {
			minimize: true,
		},
	};

	return config;
};
