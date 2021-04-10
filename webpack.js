const webpack = require('webpack');
const path = require('path');

let mode = process.argv.includes('--dev') ? 'development' : 'production';

const compiler = webpack([{
	mode: mode,
	target: 'electron-main',
	node: {
		__dirname: false,
		__filename: false
	},
	entry: './src/main/main.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'main.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}]
			}
		]
	}
}, {
	mode: mode,
	target: 'electron-preload',
	node: {
		__dirname: false,
		__filename: false
	},
	entry: './src/main/preload.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'preload.js'
	},
	devtool: 'source-map'
}, {
	mode: mode,
	target: 'electron-renderer',
	node: {
		__dirname: false,
		__filename: false
	},
	entry: './src/renderer/renderer.jsx',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'renderer.js'
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-react']
					}
				}]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}]);


if (process.argv.includes('--watch')){
	console.log('Starting webpack watching...\nPress Ctrl+C to stop\n');

	const watching = compiler.watch({
		aggregateTimeout: 300,
		ignored: /node_modules/
	}, (err, stats) => {
		if (err){
			console.error(err);
		} else {
			console.log(stats.toString({
				stats: 'verbose',
				chunks: false,
				colors: true
			}));
		};

	});

	process.on('SIGINT', function(){
		watching.close(() => {
			console.log('Watching ended');
			process.exit();
		});
	});
} else {
	compiler.run((err, stats) => {
		if (err){
			console.error(err);
		} else {
			console.log(stats.toString({
				stats: 'verbose',
				chunks: false,
				colors: true
			}));
		};
	})
};
