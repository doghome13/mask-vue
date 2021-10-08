module.exports = {
    // publicPath: process.env.NODE_ENV === 'development' ? '' : '/web/',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '^/api/': {
                target: process.env.API_HOST,
                pathRewrite: { '^/api/': '' },
                changeOrigin: true,
                // logLevel: 'debug',
                ws: true
            }
        }
    }
};

console.log('API_HOST', process.env.API_HOST);