const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}
const PAGES_DIR = `${PATHS.src}/template/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: `catalog/view/theme/QuickParts/assets/js/[name].[hash].js`,
        path: PATHS.dist
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
            vendor: {
                name: 'vendors',
                test: /node_modules/,
                chunks: 'all',
                enforce: true
                }
            } 
        }
    },
    module: {
        rules: [{
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'catalog/view/theme/QuickParts/fonts/'
            }
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.pug$/,
            oneOf: [{
                resourceQuery: /^\?vue/,
                use: ['pug-plain-loader']
            },
            {
                use:{
                    loader: 'pug-loader',
                    options: { pretty: true }
                }
            }]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({       
            filename: `catalog/view/theme/QuickParts/assets/stylesheet/main.css`,
        }),
        new CopyWebpackPlugin([
            { 
                from: `${PATHS.src}/img`, 
                to: `${PATHS.assets}img` 
            },
            { 
                from: `${PATHS.src}/${PATHS.assets}images`, 
                to: `catalog/view/theme/QuickParts/assets/images` 
            },
            { 
                from: `${PATHS.src}/${PATHS.assets}fonts`, 
                to: `catalog/view/theme/QuickParts/assets/fonts/`
            }
        ]),

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        })),
        /*new HtmlWebpackPlugin({
            hash: false,
            template: './src/index.html',
            filename: 'index.html',
        })*/
    ]
};