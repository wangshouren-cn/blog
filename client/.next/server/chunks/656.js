exports.id = 656;
exports.ids = [656];
exports.modules = {

/***/ 1656:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5513);
/* harmony import */ var _utils_useUser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5954);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7819);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3501);
/* harmony import */ var _index_module_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_module_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3306);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_api__WEBPACK_IMPORTED_MODULE_5__]);
_api__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];










const ArticleDetail = ({
  article
}) => {
  var _user$articleIds;

  const {
    title,
    tags,
    content,
    category,
    createTime,
    likeNum,
    cover,
    comments,
    _id
  } = article;
  const forceUpdate = (0,react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__/* .useForceUpdate */ .NW)();
  const {
    user,
    setUser
  } = (0,_utils_useUser__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
  const isLiked = user === null || user === void 0 ? void 0 : (_user$articleIds = user.articleIds) === null || _user$articleIds === void 0 ? void 0 : _user$articleIds.includes(_id);
  const handleLike = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    if (!user) return react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__/* .Message.error */ .v0.error("动动手指登录下吧~");
    const {
      articleIds
    } = user;
    const index = articleIds.indexOf(_id);

    if (index === -1) {
      articleIds.push(_id);
      await (0,_api__WEBPACK_IMPORTED_MODULE_5__/* .updateUser */ .Nq)(user._id, {
        articleIds
      });
      article.likeNum++;
      react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__/* .Message.success */ .v0.success("收藏成功");
    } else {
      articleIds.splice(index, 1);
      await (0,_api__WEBPACK_IMPORTED_MODULE_5__/* .updateUser */ .Nq)(user._id, {
        articleIds
      });
      article.likeNum--;
      react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__/* .Message.success */ .v0.success("已取消收藏");
    }

    forceUpdate();
    setUser(user);
  }, [user, _id]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("ul", {
    className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().detail),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("li", {
      className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().categoryBox),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        type: "icon-category"
      }), " ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().category),
        children: category
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("li", {
      className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().tagBox),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        type: "icon-tags"
      }), tags && tags.length > 0 && tags.map(t => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().tag),
        children: t
      }, t))]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("li", {
      className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().dateBox),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        type: "icon-ico-date"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().date),
        children: (0,react_blog_library_lib__WEBPACK_IMPORTED_MODULE_1__/* .formatTimeStrap */ .m8)(createTime)
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("li", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx(_Icon__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        onClick: handleLike,
        className: classnames__WEBPACK_IMPORTED_MODULE_4___default()((_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().like), {
          "color-red": isLiked
        }),
        type: "icon-like"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx("span", {
        className: (_index_module_css__WEBPACK_IMPORTED_MODULE_7___default().likeNum),
        children: likeNum
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArticleDetail);
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3501:
/***/ ((module) => {

// Exports
module.exports = {
	"categoryBox": "ArticleDetail_categoryBox__hUFBN",
	"tagBox": "ArticleDetail_tagBox__f_bWj",
	"detail": "ArticleDetail_detail__WAXvj",
	"dateBox": "ArticleDetail_dateBox__ay2Es",
	"container": "ArticleDetail_container__nas4z",
	"articleContainer": "ArticleDetail_articleContainer__sBEDL",
	"title": "ArticleDetail_title__mhedz",
	"cover": "ArticleDetail_cover__GACPc",
	"tag": "ArticleDetail_tag__0_BSF",
	"category": "ArticleDetail_category__X2XYA",
	"likeNum": "ArticleDetail_likeNum__UsOBM",
	"date": "ArticleDetail_date__ykFJg",
	"commentContainer": "ArticleDetail_commentContainer__3l1rF",
	"commentTitle": "ArticleDetail_commentTitle__vYePf",
	"replyContainer": "ArticleDetail_replyContainer__l7Ymo",
	"empty": "ArticleDetail_empty__wA9Nr",
	"like": "ArticleDetail_like__9_pD2"
};


/***/ })

};
;