exports.id = 91;
exports.ids = [91];
exports.modules = {

/***/ 9328:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_blog_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2516);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(887);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ArticleDetail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1656);
/* harmony import */ var _Empty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5252);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Loading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5694);
/* harmony import */ var _utils_useHttpListData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(98);
/* harmony import */ var _utils_clearHtmlTag__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9423);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_blog_library__WEBPACK_IMPORTED_MODULE_1__, _ArticleDetail__WEBPACK_IMPORTED_MODULE_3__, _utils_useHttpListData__WEBPACK_IMPORTED_MODULE_7__]);
([react_blog_library__WEBPACK_IMPORTED_MODULE_1__, _ArticleDetail__WEBPACK_IMPORTED_MODULE_3__, _utils_useHttpListData__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);














const Article = ({
  api
}) => {
  const {
    run,
    list: fetchList,
    loading,
    page,
    total,
    pageSize,
    setSearchAndRun
  } = (0,_utils_useHttpListData__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z)(api);
  const {
    0: first,
    1: setFirst
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
  const refresh = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    await run();
  }, [run]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    refresh();
  }, [(0,react_blog_library__WEBPACK_IMPORTED_MODULE_1__.stringifySearch)(router.query), refresh]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (loading) return;
    window.scrollTo({
      top: Number(sessionStorage.getItem("scrollTop") || 0)
    });
  }, [loading]);
  const handleLink = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(id => {
    sessionStorage.setItem("scrollTop", window.pageYOffset.toString());
    router.push(`/article?id=${id}`);
  }, [router]);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let timer = null;

    if (ref.current) {
      timer = setTimeout(() => {
        const observer = new IntersectionObserver(changes => {
          changes.forEach(change => {
            const hasMore = page < Math.ceil(total / pageSize);

            if (change.isIntersecting && hasMore) {
              setFirst(false);
              sessionStorage.setItem("scrollTop", window.pageYOffset.toString());
              setSearchAndRun({
                pageSize: pageSize + 20
              });
            }
          });
        });
        observer.observe(ref.current);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [ref.current, page, pageSize, total]);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_Loading__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
    loading: loading,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("ul", {
      className: (_index_module_css__WEBPACK_IMPORTED_MODULE_9___default().ul),
      children: fetchList.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: [fetchList.map(article => {
          const {
            _id,
            title,
            content,
            cover,
            category,
            tags,
            createTime
          } = article;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("li", {
            className: (_index_module_css__WEBPACK_IMPORTED_MODULE_9___default().li),
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: (_index_module_css__WEBPACK_IMPORTED_MODULE_9___default().content),
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("h2", {
                  onClick: () => handleLink(_id),
                  className: (_index_module_css__WEBPACK_IMPORTED_MODULE_9___default().title),
                  children: title
                }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("span", {
                  children: content.length > 200 ? (0,_utils_clearHtmlTag__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(content.substring(0, 50)) + "[...]" : (0,_utils_clearHtmlTag__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z)(content)
                })]
              }), cover && cover.url ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(react_blog_library__WEBPACK_IMPORTED_MODULE_1__.Img, {
                className: classnames__WEBPACK_IMPORTED_MODULE_2___default()((_index_module_css__WEBPACK_IMPORTED_MODULE_9___default().img)),
                src: cover.url
              }) : null]
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_ArticleDetail__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
              article: article
            })]
          }, _id);
        }), page < Math.ceil(total / pageSize) && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
          className: (_index_module_css__WEBPACK_IMPORTED_MODULE_9___default().loadMore),
          ref: ref,
          children: "..."
        })]
      }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_Empty__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {})
    })
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Article);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6180);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




const Empty = props => {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: (_index_module_css__WEBPACK_IMPORTED_MODULE_2___default().empty),
    children: "\u65E0\u5185\u5BB9"
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Empty);

/***/ }),

/***/ 9423:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ clearHtmlTag)
/* harmony export */ });
function clearHtmlTag(str) {
  return str.replace(/\<.+?\>/g, "");
}

/***/ }),

/***/ 887:
/***/ ((module) => {

// Exports
module.exports = {
	"ul": "ArticleList_ul__8wGx_",
	"li": "ArticleList_li__9yDY9",
	"title": "ArticleList_title__uyQII",
	"content": "ArticleList_content__k_zqp",
	"img": "ArticleList_img__iYiPd",
	"footer": "ArticleList_footer__3NaRg",
	"category": "ArticleList_category__d4cyL",
	"tag": "ArticleList_tag__MaMfE",
	"createTime": "ArticleList_createTime__2yemA",
	"empty": "ArticleList_empty__4QMkB",
	"pageOperations": "ArticleList_pageOperations__yg59q",
	"loadMore": "ArticleList_loadMore__fnhvr"
};


/***/ }),

/***/ 6180:
/***/ ((module) => {

// Exports
module.exports = {
	"empty": "Empty_empty__jAuf1"
};


/***/ }),

/***/ 5644:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "index_container__Xi8tY"
};


/***/ })

};
;