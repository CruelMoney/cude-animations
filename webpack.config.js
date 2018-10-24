const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const Visualizer = require("webpack-visualizer-plugin");

const options = {
	entry: "./index.js",

	devtool: process.env.NODE_ENV === "development" ? "source-map" : false,

	context: path.join(__dirname, "src"),

	resolve: {
		extensions: [".js", ".jsx"]
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["es2015", "react", "stage-2"]
				}
			}
		]
	},
	plugins: [
		new UglifyJSPlugin({
			compress: true,
			sourceMap: process.env.NODE_ENV === "development"
		})
	]
};

if (process.env.NODE_ENV !== "development") {
	options.plugins.push(
		new Visualizer({
			filename: "./statistics.html"
		})
	);
}

const varOptions = {
	...options,
	output: {
		filename: "dist/cudeAnimations.min.js",
		libraryTarget: "var"
	}
};
const varPolyOptions = {
	...options,
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["es2015", "react", "stage-2"],
					plugins: ["es6-promise"]
				}
			}
		]
	},
	output: {
		filename: "dist/cudeAnimations.withpoly.min.js",
		libraryTarget: "var"
	}
};
const commonjsOptions = {
	...options,
	output: {
		filename: "dist/cudeAnimations.es.js",
		libraryTarget: "commonjs"
	}
};

module.exports = [varOptions, commonjsOptions];
