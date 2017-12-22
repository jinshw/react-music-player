# React Music Player
## 技术栈
* react
* webpack
* webpack-dev-server
* react-hot-loader
* react-hot-loader 局部刷新配置教程
    https://segmentfault.com/a/1190000004660311

* react-router:注意版本，本项目使用的是3.0，而最新4之后的版本，改动很大，需要按照新API开发。
* pubsubjs:事件发布和订阅插件
* jPlayer:基于jquery音频和视频播放器。


## 配置webpack及webpack-dev-server
## webpack
* entry: 入口文件
* output:
```
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/assets/"
    },
```
* module:
    loaders 加载器
* plugins：插件

## webpack-dev-server
* 简介：
    webpack-dev-server是一个小型的Node.js Express服务器,它使用webpack-dev-middleware来服务于webpack的包

