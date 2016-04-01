var webpack = require('webpack');

var config = {
	entry: "./app/boot/app",
	output: {
		path: __dirname,
		filename: "dist/bundle.js"
	},
	resolve: {
		extensions: ['', '.ts', '.js', '.html', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ttf', '.woff', '.eot']
	},
	plugins: [
    	new webpack.DefinePlugin({
      		TESTING: (process.env.NODE_ENV == "test"),
    	})
	],
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
		        test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/, 
		        loader: "url?limit=100000",
		        exclude: /node_modules/
		      },
		      {
		      	test: /\.less/,
		      	loader: 'raw!less',
		      	exclude: /node_modules/
		      },
		      {
		      	test: /\.svg/,
		      	loader: 'raw',
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