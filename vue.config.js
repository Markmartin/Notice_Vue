module.exports = {
    // devServer: {
    //     proxy: process.env.NODE_ENV === 'production' ? 'http://47.75.16.97:5000' : 'http://47.75.16.97:5000'
    // },
    configureWebpack: {
        devtool: 'source-map'
    },
    publicPath: '/notice/',
}