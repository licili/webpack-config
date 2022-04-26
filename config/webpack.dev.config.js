const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.comm.config");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    // 如果一些静态资源没有从webpack中加载到，就会从这个contentBase 文件夹中去加载
    // 现在不是使用contentBase了，而是使用static/directory
    static: {
      directory: "./public",
    },
    hot: true,
    // host: "localhost",
    host: "0.0.0.0",
    // port: 8080,
    // open: true,
    // compress: true,
    proxy: {
      // 代理：做映射关系，就是说如果我有请求到 /api这些接口，就会代理到8888端口上
      "/api": {
        target: "http://localhost:8888/",
        pathRewrite: { "^/api": "" },
        secure: true,
        // 有些服务器会对header的origin进行校验的，让devServer帮我们改为target的源
        changeOrigin: true,
      },
    },
  },
});
