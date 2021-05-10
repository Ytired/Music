"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// 路由懒加载
var discovery = function discovery() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("pages/discovery/discovery.vue"));
  });
};

var playLists = function playLists() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("pages/playLists/playLists.vue"));
  });
};

var playList = function playList() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("pages/playList/playList.vue"));
  });
};

var songs = function songs() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("pages/songs/songs.vue"));
  });
};

var mvs = function mvs() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("pages/mvs/mvs.vue"));
  });
};

var mv = function mv() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("pages/mv/mv.vue"));
  });
};

var result = function result() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("pages/result/result.vue"));
  });
}; // 1.安装VueRouter


_vue["default"].use(_vueRouter["default"]);

var VueRouterPush = _vueRouter["default"].prototype.push;

_vueRouter["default"].prototype.push = function push(to) {
  return VueRouterPush.call(this, to)["catch"](function (err) {
    return err;
  });
}; // 2.获取路由信息


var routes = [{
  path: "/",
  redirect: "/discovery"
}, {
  path: "/discovery",
  component: discovery
}, {
  path: "/playLists",
  component: playLists
}, {
  path: "/playList",
  component: playList
}, {
  path: "/songs",
  component: songs
}, {
  path: "/mvs",
  component: mvs
}, {
  path: "/mv",
  component: mv
}, {
  path: "/result",
  component: result
}]; // 3.创建路由对象

var router = new _vueRouter["default"]({
  // mode: "history",
  routes: routes
}); // 4.导出

var _default = router;
exports["default"] = _default;