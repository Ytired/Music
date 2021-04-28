"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 1.安装VueRouter
_vue["default"].use(_vueRouter["default"]); // 2.获取路由信息
// 动态加载pages中所有的路由文件


var files = require.context('@/pages', true, /router\.js$/);

var routes = files.keys().map(function (key) {
  var page = require('@/pages' + key.replace('.', ''));

  return page["default"];
}); // 3.创建路由对象

var router = new _vueRouter["default"]({
  mode: 'history',
  routes: routes
}); // 4.导出

var _default = router;
exports["default"] = _default;