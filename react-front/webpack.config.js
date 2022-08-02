const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/index.tsx'),
        // ws: path.resolve(__dirname,)
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(ico|gif|png|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    },
                ],
                // type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
            {
                test: /\.(eot|ttf|otf)$/,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            manifest: "./public/manifest.json",
            favicon: "./public/favicon.ico",
            template: "./public/index.html",
        }),
    ],
    stats: 'errors-only',

    // devServerでリロード時に白紙になるのを防ぎます
    // indexにリロードされるように返す
    devServer: {
        historyApiFallback: {
            rewrites: [{ from: /^\/*/, to: '/index.html' }],
        },
        hot: true,
        port: 3001
    }
}
