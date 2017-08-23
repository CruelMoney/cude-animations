const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const options = {
	entry: './index.js',
	
	devtool: process.env.NODE_ENV === "development" ? "source-map" : false,
	
	output: {
		filename: 'lib/cudeAnimations.js',
		// libraryTarget: 'var',
    // // `library` determines the name of the global variable
    // library: 'cudeAnimations'
	},

	context: path.join(__dirname, 'src'),

	resolve: {
		extensions: ['.js', '.jsx']
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['es2015', 'react', 'stage-2'],
					plugins: [
						"es6-promise"
					]
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

if(process.env.NODE_ENV !== "development"){
	options.plugins.push(
		new Visualizer({
			filename: './statistics.html'
		})
	)
}


module.exports = options