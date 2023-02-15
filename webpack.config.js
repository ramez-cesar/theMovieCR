const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true,
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    }, 
    resolve: {
        extensions: ['.js'],
        alias: {
            Image: path.resolve(__dirname, 'src/images/')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.woff2$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext]'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, 
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'images/cr_favicon.png'),
                    to: 'assets/images'
                }
            ]
        }),
    ]
}