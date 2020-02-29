const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD settings gonna be here
  mode: 'production',
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
                loader: 'postcss-loader',
                options: { sourceMap: true, config: { path: `./postcss.config.js` } }
            },  {
                loader: 'sass-loader',
                options: { sourceMap: true }
            }
        ]
      }
    ]
  },
  plugins: [
    /*new MiniCssExtractPlugin({       
        filename: `${PATHS.assets}stylesheet/main.css`,
    }),
    new CopyWebpackPlugin([
        { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
        { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` }
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
});

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);

  
})