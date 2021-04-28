"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = request;
exports.getBanner = getBanner;

var _axios = _interopRequireDefault(require("axios"));

var _nprogress = _interopRequireDefault(require("nprogress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//导入进度条插件
function request(config) {
  //创建axios的实例
  var instance = _axios["default"].create({
    baseURL: "https://autumnfish.cn",
    timeout: 3000
  }); // axios的拦截器
  //请求拦截


  instance.interceptors.request.use(function (config) {
    // 进度条开始
    _nprogress["default"].start();

    return config;
  }, function (err) {
    console.log(err);
  }); //响应拦截

  instance.interceptors.response.use(function (res) {
    // 进度条结束
    _nprogress["default"].done();

    return res.data;
  }, function (err) {
    console.log(err);
  }); //发送网络请求

  return instance(config);
} //bannar图片


function getBanner() {
  return request({
    url: "/banner",
    methods: "get",
    params: {}
  });
}