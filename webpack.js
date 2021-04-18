const webpack = require('webpack');
const path = require('path');

let mode = process.argv.includes('--dev') ? 'development' : 'production';

const common = {
	mode: mode,
	node: {
		__dirname: false,
		__filename: false
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
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
			},
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
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};

const compiler = webpack([{
	...common,
	target: 'electron-main',
	entry: './src/main/main.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'main.js'
	}
}, {
	...common,
	target: 'electron-preload',
	entry: './src/main/preload.js',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'preload.js'
	}
}, {
	...common,
	target: 'electron-renderer',
	entry: './src/renderer/index.jsx',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'index.js'
	}
}, {
	...common,
	target: 'electron-renderer',
	entry: './src/renderer/pad-editor.jsx',
	output: {
		path: path.resolve(__dirname, 'app'),
		filename: 'pad-editor.js'
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
