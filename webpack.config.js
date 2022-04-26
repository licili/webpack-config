const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const path = require("path");

module.exports = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/bundle_[hash:8].js",
    // assetModuleFilename: "[name]_[hash:8][ext]",
  },
  devServer: {
    // 如果一些静态资源没有从webpack中加载到，就会从这个contentBase 文件夹中去加载
    // 现在不是使用contentBase了，而是使用static/directory
    static: {
      directory: "static",
    },
    hot: true,
    host: "localhost",
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
  // 解析配置
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".mjs", ".vue", ".ts", ".jsx", "tsx"],
    // 默认值就是index，一般我们不会配置
    mainFiles: ["index"],
    // 别名
    alias: {
      // @ 就是src目录
      "@": path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)/i,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "img/[name]_[hash:8].[ext]",
      //     },
      //   },
      //   dependency: { not: "url" },
      // },
      // {
      //   test: /\.(jpe?g|png|gif|svg)/i,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       name: "img/[name]_[hash:8].[ext]",
      //       limit: 20 * 1024,
      //     },
      //   },
      //   dependency: { not: "url" },
      // },
      {
        test: /\.(jpe?g|png|gif|svg)/i,
        type: "asset",
        generator: {
          filename: "img/[name]_[hash:8][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "font/[name]_[hash:8][ext]",
        },
      },
      {
        test: /\.js$/i,
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     presets: ["@babel/preset-env"],
        //   },
        // },
        loader: "babel-loader",
      },
      {
        test: /\.vue$/i,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Welcome Vue Project",
      minify: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public",
          to: "./",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
  ],
};
