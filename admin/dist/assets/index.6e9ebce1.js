var v=Object.defineProperty;var f=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var m=(r,e,s)=>e in r?v(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s,d=(r,e)=>{for(var s in e||(e={}))E.call(e,s)&&m(r,s,e[s]);if(f)for(var s of f(e))j.call(e,s)&&m(r,s,e[s]);return r};import{f as D,g as S,r as o}from"./vendor.5ea092ba.js";import{u as k,a as y,M as n,i as A,U as B,c as F,L as V,j as p,k as w,V as C,W as L}from"./index.cbb7f720.js";import M from"./index.f6f43993.js";const N=()=>{const{data:r,run:e,loading:s,error:c}=k(async()=>C(a)?await L(a):Promise.reject("url\u8DEF\u5F84\u4E2D\u672A\u83B7\u53D6\u5230id\u53C2\u6570")),g=D(),[t]=y(),[x,P]=S(),a=o.exports.useMemo(()=>x.get("id"),[]),l=o.exports.useCallback(()=>{e().then(u=>{if(!u)return;const i=d({},u);t.setValues(i)})},[]);o.exports.useLayoutEffect(()=>{l()},[]);const h=o.exports.useCallback(async()=>{if(!a)return n.error("id\u4E0D\u5B58\u5728");const u=t.validateAll();if(!A(u))return n.error(u.join(";"));const i=t.getValues();await B(a,i),g(-1)},[t,a]);if(!!a)return c&&n.error(c),F(V,{loading:s,children:[p(M,{form:t}),p(w,{onRefresh:l,lastSaveTime:r==null?void 0:r.updateTime,showBack:!0,onSave:h})]})};export{N as default};