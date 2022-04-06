"use strict";
exports.id = 98;
exports.ids = [98];
exports.modules = {

/***/ 98:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_blog_library__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2516);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_blog_library__WEBPACK_IMPORTED_MODULE_2__]);
react_blog_library__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(api) {
  const forceUpdate = (0,react_blog_library__WEBPACK_IMPORTED_MODULE_2__.useForceUpdate)();
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
  const setSearch = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(partialSearch => {
    const search = router.query;
    Object.assign(search, partialSearch);
    router.push(router.pathname + `${(0,react_blog_library__WEBPACK_IMPORTED_MODULE_2__.stringifySearch)(search)}`);
  }, [router]);
  /**
   * @description:执行这个函数可以获取数据
   * @param {*}
   * @return {*}
   */

  const run = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async () => {
    const state = ref.current;
    Object.assign(state, {
      loading: true
    });
    forceUpdate();
    let data = {},
        error;

    try {
      data = await api(router.query);
    } catch (e) {
      error = e;
    } //这里用...将data展开了，所以能拿到list


    Object.assign(state, _objectSpread(_objectSpread({}, data), {}, {
      error,
      loading: false
    }));
    forceUpdate();
    return data.list;
  }, [router]);
  const setSearchAndRun = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(partialSearch => {
    setSearch(partialSearch);
    run();
  }, [run, setSearch]);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    page: 1,
    pageSize: 20,
    loading: false,
    error: null,
    list: [],
    run,
    total: 0,
    search: router.query,
    setSearchAndRun,
    setSearch
  });
  ref.current.run = run;
  ref.current.setSearchAndRun = setSearchAndRun;
  ref.current.setSearch = setSearch;
  return ref.current;
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;