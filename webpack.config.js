const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


const isDev = process.env.NODE_ENV === 'development'
const fileName = (ext) => {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`
}


module.exports = {
    entry: {
        eventListeners: './js/classes/eventListeners.js',
        CollisionBlock: './js/classes/CollisionBlock.js',
        collisions: './js/data/collisions.js',
        Player: './js/classes/Player.js',
        index: './index.js',
        utils: './js/utils.js',
        Sprite: './js/classes/Sprite.js',
    },
    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    }
}
