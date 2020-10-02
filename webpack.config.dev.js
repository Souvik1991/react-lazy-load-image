const webpack = require('webpack');
const config = {
    context: __dirname,
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    devtool: 'source-map',
    module: {
        rules: [{ 
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
    },
    output: {
        library: 'LazyLoadImage',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: "development",
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: "development",
        }),
    ]
};

module.exports = config;