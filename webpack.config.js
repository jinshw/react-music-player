var webpack = require("webpack");
var OpenBrowserPlugin = require("open-browser-webpack-plugin");

module.exports = {
  // 修改 entry
  entry: [
    // 写在入口文件之前
    'react-hot-loader/patch',
    "webpack-dev-server/client?http://localhost:9033",
    "webpack/hot/only-dev-server",
    
    // 这里是你的入口文件
    "./app/index.jsx"
  ],
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "jsx-loader!babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  // 添加插件
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: "http://localhost:9033" })
  ]
};
