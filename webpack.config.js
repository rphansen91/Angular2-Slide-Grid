var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var package = require('./package.json')
var version = package.version.replace(/\./g, '_')

var config = {
	entry: {
		polys: "./app/polys",
		app: "./app/main",
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: `v${version}/[name].bundle.js`
	},
	resolve: {
		extensions: ['.ts', '.js', '.html', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ttf', '.woff', '.eot']
	},
	optimization: {
		splitChunks: {
			chunks: 'initial'
		}
	  },
	plugins: [
		// new webpack.optimize.splitChunks({
      	// 	name: ['app', 'polys']
    	// }),
    	new webpack.DefinePlugin({
      		TESTING: (process.env.NODE_ENV == "test"),
    	}),
		new HtmlWebpackPlugin({
            template: './index.html'
        })
	],
	module: {
		rules: [
			{
				test: /\.ts/,
				loaders: ["ts-loader"],
				exclude: /node_modules/
			},
			{
		        test: /\.html$/,
		        loader: 'raw-loader',
		        exclude: /node_modules/
		      },
		      { 
		        test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/, 
		        loader: "url-loader?limit=100000",
		        exclude: /node_modules/
		      },
		      {
		      	test: /\.less/,
		      	loader: 'raw-loader!less-loader',
		      	exclude: /node_modules/
		      },
		      {
		      	test: /\.svg/,
		      	loader: 'raw-loader',
		      	exclude: /node_modules/
		      },
		]
	}
}

// if (process.env.NODE_ENV == "production") {
//   config.plugins.push(new webpack.optimize.UglifyJsPlugin());
//   config.devtool = 'source-map';
// }

module.exports = config;