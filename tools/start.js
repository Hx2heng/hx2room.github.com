import run from './run';
import clean from './clean';
import copy from './copy';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackMiddleware from 'webpack-middleware'; //https://github.com/kriasoft/webpack-middleware
import webpackHotMiddleware from 'webpack-hot-middleware';
import bowserSync from 'browser-sync';
import runServer from './runServer';

process.argv.push('--watch');
const [config] = webpackConfig;

let start = async ()=>{
	await run(clean);
	await run(copy);
	await new Promise(resolve=>{
		const bundler = webpack(webpackConfig);//生成webpack实例
		//生成webpack开发中间件 Launch Webpack compiler in watch mode
		const wpMiddleware = webpackMiddleware(bundler, {
		  publicPath: config.output.publicPath,
		  stats: config.stats,
		});
		//生成webpack热加载实例
		const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);
		//webpack完成事件
		let handleBundleComplete = async ()=>{
			handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();
			//开启服务器
			const sever =  await runServer();
			//创建browser-sync 
			const bs = browserSync.create();
			//初始化browser-sync
			bs.init({
				...(config.debug ? {} : { notify: false, ui: false }),
				proxy:{
					target: server.host,//代理服务器地址(服务器运行地址)
					middleware: [wpMiddleware, hotMiddleware],//中间件
				}
			},resolve)
		};
		bundler.plugin('done', stats => handleBundleComplete(stats));
	})
	
}


export default start;