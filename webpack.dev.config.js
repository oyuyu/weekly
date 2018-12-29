const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"), // 本地服务器所加载的页面所在的目录
    publicPath: "/",
    historyApiFallback: true, // 不跳转
    inline: true, // 实时刷新
    hot: true,  // 热加载
    host: 'local.weekly-dev.hsmob.com',  // 主机地址
    port: 8003,  // 端口号
    compress: true,  // 开发服务器是否启动gzip等压缩
    disableHostCheck: true,
    proxy: {
        "/api": {
          target: 'http://weekly-dev.hsmob.com',
          changeOrigin: true,
          secure: false,
        }
    },
  },
  plugins: [
    // 添加了这两个 plugins 后报错：
    // Uncaught RangeError: Maximum call stack size exceeded
    // new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
    // new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
  ],
});
