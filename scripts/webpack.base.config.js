const path = required('path');
const webpack = required('webpack');
// 把指定的文本从bundle中提取出来，形成独立的文件；这里是用在css文件中
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// happyPack 一个使webpack可以在同一时间处理多任务
// 详情点击 https://juejin.im/post/5ad9b0ecf265da0b7155d521
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve(relatedPath) {
    path.join(__dirname, relatedPath)
}

const webpackBaseConfig = {
    entry: {
        client: resolve('../app/client.js')
    },
    output: {
        path: resolve('../dist'),
        fileanme: '[name].[hash:4].js',
        chunkFilename: 'chunks/[name].[hash:4].js'
    },
    resolve: {
        extension: ['.js', '.json'],
        alias: {
            '@app': path.join(__dirname, '../app'),
            '@actions': path.join(__dirname, '../app/redux/actions'),
            '@reducers': path.join(__dirname, '../app/redux/reducers'),
            '@apis': path.join(__dirname, '../app/apis'),
            '@components': path.join(__dirname, '../app/components'),
            '@configs': path.join(__dirname, '../app/configs'),
            '@config': path.join(__dirname, '../app/configs/config.js'),
            '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
            '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
            '@images': path.join(__dirname, '../app/images'),
            '@middleware': path.join(__dirname, '../app/middleware'),
            '@pages': path.join(__dirname, '../app/pages'),
            '@styles': path.join(__dirname, '../app/styles'),
            '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
        }
    },
    resolveModule: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                include: [resolve('../app')],
                // 把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happyPack/loader?id=happyBabel'
            },
            {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                include: [
                    resolve('../app/styles'),
                    resolve('../app/components'),
                    resolve('../node_modules/antd'),
                    resolve('../node_modules/draft-js'),
                ],
                // fallback: 'style-loader'因为resolveModule.moduleExtensions:[-loader]使使用loader的时候可以省略-loader
                loader: ExtractTextPlugin.extract({ fallback: 'style', use: 'happyPack/loader?id=happyStyle' })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /node_modules/,
                include: [resolve('../app/images')],
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:4].[ext]'
                }
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'url',
                options: {
                    limit: 8192,
                    name: 'font/[name].[hash:4].[ext]'
                }
            },
        ]
    },
    plugins: [
        new HappyPack({
            id: 'happyBabel',
            loaders: [{
                loader: 'babel?cacheDirectory=true',
            }],
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new HappyPack({
            id: 'happyStyle',
            loaders: ['css-loader?sourceMap=true', 'less-loader?sourceMap=true'],
            threadPool: happyThreadPool,
            verbose: true,
        }),
        new ExtractTextPlugin('style.[hash:4].css'),
        // CommonsChunkPlugin创建一个文件，文件里是多个entry-chunk的公共模块。就是提取公共代码到一个文件
        // https://segmentfault.com/a/1190000006808865
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', 
            filename: 'common.[hash:4].js', // 输出文件名
            // 大于minChunks的
            minChunks: function (module, count) {
                console.log(module.resource)
                return module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(resolve('../node_modules')) === 0
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'async-common',
            minChunks: 3,
        }),
    ]
}