import{l as u,r as c}from"./vendor.2fb7d379.js";import{u as i,M as d,c as p,L as f,j as s,k as l,W as m}from"./index.b59ad4d7.js";const w=g=>{const[e]=u(),r=e.get("id"),{data:t,run:o,loading:n,error:a}=i(async()=>{if(!r)throw new Error("id\u4E0D\u5B58\u5728");return await m(r)});return c.exports.useEffect(()=>{o()},[]),a&&d.error(a),p(f,{loading:n,children:[t&&s("div",{className:"braft-output-content",dangerouslySetInnerHTML:{__html:t.content}}),s(l,{showBack:!0})]})};export{w as default};
