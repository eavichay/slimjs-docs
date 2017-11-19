const merge = require('webpack-merge')
const common = require('./webpack.common.config')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ]
})
