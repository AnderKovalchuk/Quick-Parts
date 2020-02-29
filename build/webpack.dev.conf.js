const path = require('path')
const webpack =  require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    //contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: { sourceMap: true }
            }, {
                loader: 'sass-loader',
                options: { sourceMap: true }
            }
        ]
      }
    ]
  },
  plugins: [
  /*new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
      filename: 'index.html',
  })*/
  ]
})

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})