exports.id = 963;
exports.ids = [963];
exports.modules = {

/***/ 1641:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ createComment)
/* harmony export */ });
/* harmony import */ var react_blog_library_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5513);

function createComment(data) {
  return react_blog_library_lib__WEBPACK_IMPORTED_MODULE_0__/* .http.post */ .dJ.post(`/comment`, data);
}

/***/ }),

/***/ 6429:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ sendCode)
/* harmony export */ });
/* harmony import */ var react_blog_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2516);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_blog_library__WEBPACK_IMPORTED_MODULE_0__]);
react_blog_library__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const sendCode = data => {
  return react_blog_library__WEBPACK_IMPORTED_MODULE_0__.http.post("/user/checkEmailAndSend", data);
};
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3306:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "z2": () => (/* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_0__.z2),
/* harmony export */   "Nq": () => (/* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_0__.Nq),
/* harmony export */   "Yr": () => (/* reexport safe */ _comment__WEBPACK_IMPORTED_MODULE_2__.Y)
/* harmony export */ });
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8746);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6429);
/* harmony import */ var _comment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1641);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_user__WEBPACK_IMPORTED_MODULE_0__, _common__WEBPACK_IMPORTED_MODULE_1__]);
([_user__WEBPACK_IMPORTED_MODULE_0__, _common__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8746:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x4": () => (/* binding */ login),
/* harmony export */   "z2": () => (/* binding */ register),
/* harmony export */   "Nq": () => (/* binding */ updateUser)
/* harmony export */ });
/* harmony import */ var react_blog_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2516);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_blog_library__WEBPACK_IMPORTED_MODULE_0__]);
react_blog_library__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

function login(data) {
  return react_blog_library__WEBPACK_IMPORTED_MODULE_0__.http.post("/user/login", data);
}
function register(data) {
  return react_blog_library__WEBPACK_IMPORTED_MODULE_0__.http.post("/user/register", data);
}
function updateUser(id, data) {
  return react_blog_library__WEBPACK_IMPORTED_MODULE_0__.http.put("/user/" + id, data);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__);

const Icon = (0,_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.createFromIconfontCN)({
  scriptUrl: '//at.alicdn.com/t/font_3275233_u5sqrfpg2c.js' // 在 iconfont.cn 上生成

});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Icon);

/***/ }),

/***/ 5694:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7819);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4620);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
const _excluded = ["loading", "children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







const Loading = _ref => {
  let {
    loading,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded);

  return loading ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    className: (_index_module_css__WEBPACK_IMPORTED_MODULE_3___default().loadingBox),
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_Icon__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, _objectSpread({
      className: (_index_module_css__WEBPACK_IMPORTED_MODULE_3___default().loading),
      type: "icon-icloading"
    }, props))
  }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: children
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loading);

/***/ }),

/***/ 5954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5513);


let _user = null;
/**
 * @description: 从localStorage中取出user，并可设置user，同步到localStorage中，组件销毁时需要调用removeUpdater清除更新
 * @param {*}
 * @return {*}
 */

let updaters = [];
function useUser() {
  const forceUpdate = (0,react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__/* .useForceUpdate */ .NW)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let userJson = localStorage.getItem("user");
    if (userJson) _user = JSON.parse(userJson);else _user = null;
    return () => {
      updaters = updaters.filter(u => u != forceUpdate);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    updaters.push(forceUpdate);
  }, []); // const removeUpdater = useCallback(
  //   () => {
  //     updaters = updaters.filter(u => u != forceUpdate);
  //   },
  //   [],
  // );

  const setUser = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(user => {
    _user = user;
    localStorage.setItem("user", JSON.stringify(user));
    updaters.forEach(u => u());
  }, []);
  const clearUser = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    _user = null;
    updaters.forEach(u => u());
    react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__/* .Message.success */ .v0.success("退出成功");
  }, []);
  return {
    user: _user,
    setUser,
    clearUser
  };
}

/***/ }),

/***/ 4620:
/***/ ((module) => {

// Exports
module.exports = {
	"loading": "Loading_loading__1zTzD",
	"loadingAnim": "Loading_loadingAnim__1u7wj",
	"loadingBox": "Loading_loadingBox__kPtRS"
};


/***/ })

};
;