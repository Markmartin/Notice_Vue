module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // target: 'https://wallet.iotchain.io',
                target: 'http://127.0.0.1:3000',
                secure: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        devtool: 'source-map'
    },
    baseUrl: './',
    // baseUrl: process.env.NODE_ENV === 'production' ?
    //     './' : './'
}