const merge = require('webpack-merge')
const common = require('./webpack.common.config')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            output: {
                comments: false
            }
        })
    ]
})
