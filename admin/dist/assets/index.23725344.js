var h=Object.defineProperty,j=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable;var d=(t,e,r)=>e in t?h(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,m=(t,e)=>{for(var r in e||(e={}))S.call(e,r)&&d(t,r,e[r]);if(f)for(var r of f(e))v.call(e,r)&&d(t,r,e[r]);return t},p=(t,e)=>j(t,B(e));import{B as D,E as k}from"./index.47941e8a.js";import{l as y,r as u}from"./vendor.2fb7d379.js";import{u as A,a as F,M as i,i as L,O as M,U as T,c as V,L as b,j as E,k as w,V as C,W as P}from"./index.b59ad4d7.js";const W=()=>{const{data:t,run:e,loading:r,error:c}=A(async()=>C(s)?await P(s):Promise.reject("url\u8DEF\u5F84\u4E2D\u672A\u83B7\u53D6\u5230id\u53C2\u6570")),[n]=F(),[x,H]=y(),s=u.exports.useMemo(()=>x.get("id"),[]),l=u.exports.useCallback(()=>{e().then(a=>{if(!a)return;const o=p(m({},a),{content:D.createEditorState(a.content)});n.setValues(o)})},[]);u.exports.useLayoutEffect(()=>{l()},[]);const g=u.exports.useCallback(async()=>{if(!s)return i.error("id\u4E0D\u5B58\u5728");const a=n.validateAll();if(!L(a))return i.error(a.join(";"));const o=n.getValues();M(o.content)&&(o.content=o.content.toHTML()),await T(s,o)},[n,s]);if(!!s)return c&&i.error(c),V(b,{loading:r,children:[E(k,{form:n}),E(w,{onRefresh:l,lastSaveTime:t==null?void 0:t.updateTime,showBack:!0,onSave:g})]})};export{W as default};
