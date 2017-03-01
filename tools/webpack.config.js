import path from 'path';
import webpack from 'webpack';
import extend from 'extend';


const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');


const config = {
	context: path.resolve(__dirname, '../src'), //resolve(参照路径，相对参照路径的路径)入口文件母地址

	output: {
		path: path.resolve(__dirname, '../build/public/assets'),
		publicPath: '/assets/',
		sourcePrefix: '  ',
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.(png|jpg)$/,
			loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
		}]
	},
	resolve: {
    	root: path.resolve(__dirname, '../src'),
	},
	stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },
}

//客户端webpack
const clientConfig = extend(true,{},config,{
	entry:{
		test:'./test.js'
	},
	output:{
		filename:'[name].js?[chunkhash]'
	},
	plugins:[
		new webpack.optimize.OccurrenceOrderPlugin(true),
	]
});


const testConfig={
	entry:{
		test:path.resolve(__dirname, '../src/test.js')
	},
	output:{
		path: path.resolve(__dirname, '../build'),
		filename :'[name].js'
	}
}
export default [clientConfig]