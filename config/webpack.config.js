/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  // 入口文件
  entry: './src/index.js',

  // 出口文件
  output: {
    filename: './js/main.[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    // 清理冗余文件
    clean: true,
  },

  // externals: {
  //   vue: 'Vue',
  // },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    },
  },

  // 插件设置
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 设置html模板
      cdn: {
        script: [],
        // 空数组代表不需要引入样式文件
        style: [],
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.[contenthash:8].css',
    }),
    new WebpackBar(),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [{ from: './src/static', to: './static' }],
    }),
  ],

  // 显示最小限度的统计信息
  stats: 'minimal',

  // 设置模式
  mode: process.env.NODE_ENV,

  devServer: {
    // 指定静态文件目录
    static: {
      directory: path.join(__dirname, 'public'),
    },

    // 配置前端请求代理，将匹配到的请求转发到指定地址
    proxy: {
      '^/api': {
        target: 'http://api.cc0820.top:3000',
        pathRewrite: { '/api': '' },
      },
      '^/api1': {
        target: 'http://127.0.0.1:3001',
        pathRewrite: { '/api1': '' },
      },
    },

    // 自动打开浏览器
    open: true,

    // 关闭错误蒙版
    client: {
      overlay: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      // 解析css文件
      {
        test: /\.css$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      // 解析less文件
      {
        test: /\.less$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      // 解析图片资源
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(htm|html)$/,
      //   loader: 'html-withimg-loader',
      // },
      // 解析字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // 解析template文件
      {
        test: /\.template$/i,
        use: {
          loader: path.join(__dirname, '/loaders/template.js'),
        },
      },
      // 解析vue文件
      {
        test: /\.vue$/i,
        loader: 'vue-loader',
      },
    ],
  },
};
