var webpack = require('webpack');

var config = {
	entry: "./app/app",
	output: {
		path: __dirname,
		filename: "./dist/bundle.js"
	},
	resolve: {
		extensions: ['', '.ts', '.js', '.html', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ttf', '.woff', '.eot']
	},
	plugins: [],
	module: {
		loaders: [
			{
				test: /\.ts/,
				loaders: ["ts-loader"],
				exclude: /node_modules/
			},
			{
		        test: /\.html$/,
		        loader: 'raw',
		        exclude: /node_modules/
		      },
		      { 
		        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, 
		        loader: "file",
		        exclude: /node_modules/
		      },
		      {
		        test: /\.css/,
		        loader: 'raw',
		        exclude: /node_modules/
		      }
		]
	}
}

// if (process.env.NODE_ENV == "production") {
//   config.plugins.push(new webpack.optimize.UglifyJsPlugin());
//   config.devtool = 'source-map';
// }

module.exports = config;