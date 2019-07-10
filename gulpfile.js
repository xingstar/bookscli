// 使用gulp 编译服务端， 就没有必要使用 es6的
// 上线的配置文件，开发的配置文件
const gulp = require('gulp');
const watch = require('gulp-watch');
const entry = './src/server/**/*.js';
const babel = require('gulp-babel');
const cleanEntry = ["./src/server/config/index.js"];// 是一个数组 需要写全了，到文件后缀
const rollup = require('gulp-rollup'); // 帮我们做tree shaking的
const replace = require('rollup-plugin-replace'); // 替换环境变量

function builddev() {
    // 开发环境
    // watch
    return watch(entry, { ignoreInitial: false }, function() {
        gulp.src(entry)
            .pipe(babel({
                babelrc: false, // 这个就是 不用管外部的babel了
                // plugin that sets some metadata
                plugins: ["@babel/plugin-transform-modules-commonjs"]
            })).pipe(gulp.dest('./dist')); // 这个pipe放到哪里的问题 增量 全量
    })
    
}

function buildprod() {
    // 线上环境
    return gulp.src(entry)
        .pipe(babel({
            babelrc: false,
            ignore: cleanEntry, // 忽略到的文件
            plugins: ["@babel/plugin-transform-modules-commonjs"]
        })).pipe(gulp.dest('./dist')); // 这个pipe放到哪里的问题 增量 全量
}

/**
 * 对 环境 做 流式清洗
 */
function buildconfig() {
    return gulp.src(entry)
        // transform the files here.
        .pipe(rollup({
            output: {
                format: 'cjs' // commonjs的规范
            },


            // any option supported by Rollup can be set here.
            input: cleanEntry, // 这就是tree shaking的文件
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
}

function lint() {

}

let build = gulp.series(builddev); // series对当前的任务进行排队

if (process.env.NODE_ENV == 'production') {
    build = gulp.series(buildprod, buildconfig);
}

if (process.env.NODE_ENV == 'lint') {
    build = gulp.series(lint);
}

gulp.task('default', build);