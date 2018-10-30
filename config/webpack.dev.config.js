const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PORT = 8888
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigDev = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        new HtmlWebpackPlugin({
            template: resolve('../src/index.html'),
        }),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: resolve('../dist'),
        compress: true,
        historyApiFallback: false,
        port: PORT,
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev)
