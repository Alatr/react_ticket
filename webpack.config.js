let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
   let isDev = argv.mode === 'development';

   return {
      entry: './src/main.js',
      output: {
         path: path.resolve(__dirname, './dist/'),
         filename: '[name].js',
         publicPath: 'dist/'
      },
      module: {
         rules: [
            {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env'],
                     plugins: [
                        "@babel/plugin-transform-react-jsx",
                        ["@babel/plugin-proposal-decorators", { "legacy": true }],
                        ["@babel/plugin-proposal-class-properties", { "loose": true }]
                     ]
                  }
               }
            },
            {
               test: /\.(png|svg|jpg|gif)$/,
               use: [
                  'file-loader',
               ],
            },
            {
               test: /\.module\.css$/,
               use: [
                  {
                     loader: MiniCssExtractPlugin.loader,
                     options: {
                        hmr: isDev,
                     },
                  },
                  {
                     loader: 'css-loader',
                     options: {
                        importLoaders: 1,
                        modules: {
                           localIdentName: '[local]__[sha1:hash:hex:7]'
                        }
                     }
                  }
               ]
            },
            {
               test: /^((?!\.module).)*css$/,
               use: [
                  {
                     loader: MiniCssExtractPlugin.loader,
                     options: {
                        hmr: isDev,
                     },
                  },
                  'css-loader'
               ]
            }
         ]
      },
      resolve: {
         alias: {
            '~': path.resolve(__dirname, './src')
         }
      },
      plugins: [
         new MiniCssExtractPlugin({
            filename: '[name].css'
         })
      ],
      devServer: {
         historyApiFallback: true,
         proxy: {
            '/reactcourseapi/**': {
               target: 'http://faceprog.ru',
               secure: false,
               changeOrigin: true
            }
         }
      },
      devtool: isDev ? 'cheap-module-eval-source-map' : false,
      optimization: {
         splitChunks: {
            cacheGroups: {
               vendors: {
                  name: `chunk-vendors`,
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  chunks: 'initial'
               },
               common: {
                  name: `chunk-common`,
                  minChunks: 2,
                  priority: -20,
                  chunks: 'initial',
                  reuseExistingChunk: true
               }
            }
         }
      }
   }

   return conf;
};