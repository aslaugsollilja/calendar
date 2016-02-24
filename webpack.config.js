var path = require('path');

module.exports = {
	context: __dirname,
	entry: './app.es6',
  output: {
    path: path.resolve('build'), // This is where images AND js will go
    publicPath : 'build/',
    filename: 'bundle.js'
  },
//	plugins: [
//		new webpack.ProvidePlugin({
//			$: "jquery",
//			jQuery: "jquery",
//			"window.jQuery": "jquery"
//		})
//	],
//	devServer: '/build',
	module: {
		loaders: [
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
		]
	},
	devtool:'source-map',
	resolve: {
		// you can now require('file') instead of require('file.es6')
		extensions: ['', '.js', '.json', '.es6']
	}
};