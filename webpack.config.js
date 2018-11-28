const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WriteFilePlugin   = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './ts/main.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.ts[x]?$/
            },
            {
                loader: 'html-loader',
                test: /\.html$/,
                options: { minimize: true }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.html'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },
    plugins: [
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "./index.html"
        })
    ]
}
