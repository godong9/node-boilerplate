const webpack = require("webpack");

module.exports = {
  context: __dirname + "/app/public",
	entry: {
		main: "./js/main.js",
	},
	output: {
		path: __dirname + "/dist/public",
		filename: "[name].bundle.js",
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					cacheDirectory: true,
					presets: ["es2015"],
				},
			},
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
      },
		],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
	],
};