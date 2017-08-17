const path = require('path');
module.exports = {
	entry: './index.js',

	output: {
		filename: 'lib/[name].js'
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
					presets: ['es2015', 'react', 'stage-2']
				}
			}
		]
	}
};
