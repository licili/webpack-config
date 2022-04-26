const HtmlWebpackPlugin = require("html-webpack-plugin");

const { DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const path = require("path");

module.exports = {
  target: "web",
  // 入口的路径是不需要改的，它会更具context上下文的路径，也就是--config里面配置的路径去查找的
  // 可以自己设置context路径
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "js/bundle_[hash:8].js",
    // assetModuleFilename: "[name]_[hash:8][ext]",
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
      "@": path.resolve(__dirname, "../src"),
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
    new HtmlWebpackPlugin({
      // 这个路径是相对于根目录的
      template: "./public/index.html",
      title: "Welcome Vue Project",
      minify: true,
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoaderPlugin(),
  ],
};
