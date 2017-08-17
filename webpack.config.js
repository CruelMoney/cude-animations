const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './index.js',

	output: {
		filename: 'lib/cude-animations.js',
		libraryTarget: 'var',
    // `library` determines the name of the global variable
    library: 'cudeAnimations'
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
			compress: true
		})
  ]
};
