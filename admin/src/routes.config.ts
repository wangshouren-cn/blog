import Tag from "./pages/Tag";

/**
 * @description: 如果有name值才渲染Link，key依赖于pages下的目录结构
 */
const routesConfig: RoutesConfig = [
  {
    key: "Article",
    name: "文章管理",
    children: [
      {
        key: "Article/Edit",
      },
      {
        key: "Article/Look",
      },{
        key: "Article/Create",
      },
    ],
  },
  {
    key: "Comment",
    name: "评论管理",
  },
  {
    key: "Tag",
    name: "标签管理",
  },

  {
    key: "Category",
    name: "分类管理",
  },
  {
    key: "About",
    name: "关于管理",
  },
];

export default routesConfig;
