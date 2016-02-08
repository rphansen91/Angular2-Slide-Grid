var webpack = require('webpack');

var config = {
	entry: "./app/antengoWidget",
	output: {
		path: __dirname,
		filename: "./dist/bundle.js"
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	plugins: [],
	module: {
		loaders: [{
			test: /\.ts/,
			loaders: ["ts-loader"],
			exclude: /node_modules/
		}]
	}
}

// if (process.env.NODE_ENV == "production") {
//   config.plugins.push(new webpack.optimize.UglifyJsPlugin());
//   config.devtool = 'source-map';
// }

module.exports = config;