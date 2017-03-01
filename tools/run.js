
/**
 * 时间格式转化
 * @param  {[String]} time [时间字符串]
 * @return {[String]}      [格式化的时间字符串]
 */
function format(time) {
  return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}
/**
 * 运行文件函数
 * @param  {Function} fn      [运行的文件名，这个文件需要返回可执行函数]
 * @param  {[Object]}   options [运行配置，传入第一个参数的对应可执行函数]
 * @return {[type]}           [description]
 */
function run(fn, options) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  console.log(
    `[${format(start)}] Starting '${task.name}${options ? ` (${options})` : ''}'...`,
  );
  return task(options).then(resolution => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log(
      `[${format(end)}] Finished '${task.name}${options ? ` (${options})` : ''}' after ${time} ms`,
    );
    return resolution;
  });
}

if (require.main === module && process.argv.length > 2) {
  delete require.cache[__filename]; 
  const module = require(`./${process.argv[2]}.js`).default; //获取命令行第三个参数对应的文件 的 默认返回
  run(module).catch(err => { console.error(err.stack); process.exit(1); });
}

export default run;