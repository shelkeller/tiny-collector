(this["webpackJsonptiny-collector"]=this["webpackJsonptiny-collector"]||[]).push([[0],{108:function(e,t,n){"use strict";n.r(t);var o=n(4),r=n(0),c=n(11),l=n.n(c),a=(n(85),n(86),n(34)),i=(n(87),n(18)),s=n.n(i),d=n(49),j=n.n(d),b=n(67),u=n.n(b),h=n(158),p=n(56),x=n.n(p),O=n(55),f=n.n(O),g=n(152),m=n(159),w=n(147),C=n(148),y=n(149),v=n(150),k=n(66),F=n.n(k),N=n(157),S=n(151),z=n(146),M=n(141),R=n(50),E=n(51),G=Object(M.a)({red:{backgroundColor:R.a[100],color:R.a[600]},blue:{backgroundColor:E.a[100],color:E.a[600]}}),V=function(e){var t=e.onClose,n=e.title,r=e.selectedValue,c=e.open,l=function(){t(r)},a=function(e){console.log(e),t(e)},i=G();return Object(o.jsxs)(N.a,{onClose:l,"aria-labelledby":"simple-dialog-title",open:c,maxWidth:!0,children:[Object(o.jsx)(z.a,{id:"simple-dialog-title",children:n}),Object(o.jsxs)(w.a,{children:[Object(o.jsxs)(C.a,{button:!0,onClick:function(){return a("gather")},children:[Object(o.jsx)(y.a,{children:Object(o.jsx)(m.a,{className:i.blue,children:Object(o.jsx)(F.a,{})})}),Object(o.jsx)(v.a,{primary:"Gather"})]}),Object(o.jsxs)(C.a,{button:!0,onClick:function(){return a("delete")},children:[Object(o.jsx)(y.a,{children:Object(o.jsx)(m.a,{className:i.red,children:Object(o.jsx)(f.a,{})})}),Object(o.jsx)(v.a,{primary:"Delete"})]})]}),Object(o.jsx)(S.a,{children:Object(o.jsx)(g.a,{onClick:l,color:"primary",children:Object(o.jsx)(x.a,{})})})]})},A=function(e){var t=e.plot,n=e.handleClick,c="hexagon "+t.content,l="",i="";t.isFlower&&t.age>=1&&(i=t.flowerColor,l=Object(o.jsx)(j.a,{})),t.isFlower&&t.age<1&&(i=t.budColor,l=Object(o.jsx)(u.a,{})),t.isFlower||(i=t.color);var s=t.isFlower?t.flowerColorName+" Flower":"Empty Plot",d=Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)("p",{children:s}),Object(o.jsxs)("p",{style:{fontSize:14},children:[t.row,", ",t.col]})]}),b={backgroundColor:i},p=Object(r.useState)(!1),x=Object(a.a)(p,2),O=x[0],f=x[1],g=Object(r.useState)("delete"),m=Object(a.a)(g,2),w=m[0],C=m[1];return Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(h.a,{title:d,arrow:!0,children:Object(o.jsx)("div",{className:c,style:b,onClick:function(){n(t.id),f(!0)},children:Object(o.jsx)("div",{className:"hexagontent",children:l})})}),t.isFlower&&t.age&&Object(o.jsx)(V,{onClose:function(e){f(!1),C(e)},title:s,open:O,selectedValue:w})]})},B=function(e){var t=e.plots,n=(e.gridState,e.gridStateSetter,function(e){var n=t.filter((function(t){return t.id===e}))[0];console.log(n)});return Object(o.jsx)("div",{className:"ibws-fix",children:t.map((function(e,t){return Object(o.jsx)(A,{plot:e,handleClick:n},"key"+t)}))})},D=function(e){return Math.floor(Math.random()*Math.floor(e))},J=["#42796c","#3a514c","#185653"],T=["Red","Yellow","Green","Cyan","Blue","Violet"],W="tiny collector",I=10,P=3,Y=!1,q=n(52),H=n(154),K=n(143),L=n(156),Q=n(155),U=n(70),X=n(153),Z=n(69),$=n.n(Z),_=Y?["#e6677","#ccbb44","#228833","#66ccee","#4477aa","#aa3377"]:["#9f1f2b","#e0c55f","#7ddf84","#00c0cd","#3b66db","#9e7af0"],ee=Object(U.a)({palette:{primary:{main:"#185653"}}}),te=Object(M.a)((function(e){return{root:{flexGrow:1},paper:{height:50,width:50},control:{padding:e.spacing(2)}}}));var ne=function(){var e=I,t=W,n=Object(r.useState)(function(e){var t=[],n=[];for(s()(e,(function(e){var n;if(D(100)<=P){var o=D(2),r=J[D(J.length)],c=D(_.length),l=_[c],a=T[c];t[e]={id:e,isFlower:!0,budColor:r,flowerColor:l,flowerColorName:a,name:a+" Flower",age:o}}else n=J[D(J.length)],t[e]={id:e,isFlower:!1,color:n,name:"Empty",content:"grass"}}));t.length;)n.push(t.splice(0,I));return s()(n.length,(function(e){s()(n[e].length,(function(t){n[e][t].row=e,n[e][t].col=t}))})),n}(e*(e-1))),c=Object(a.a)(n,2),l=c[0],i=c[1],d=Object(r.useState)(0),b=Object(a.a)(d,2),u=b[0],h=b[1],p=1+Math.floor(u/3),x=function(e,t){var n=function(e,t){var n=[];return e>0&&n.push({row:e-1,col:t}),t<I-1&&n.push({row:e,col:t+1}),t<I-1&&n.push({row:e,col:t+1}),e<I-2&&n.push({row:e+1,col:t}),e<I-2&&t>0&&n.push({row:e+1,col:t-1}),e>0&&t>0&&n.push({row:e-1,col:t}),n}(e,t),o=[];return s()(n.length,(function(e){l[n[e].row][n[e].col].isFlower||o.push(l[n[e].row][n[e].col])})),o},O=function(){h(u+1),s()(l.length,(function(e){s()(l[e].length,(function(t){l[e][t].marked=!1}))})),s()(l.length,(function(e){s()(l[e].length,(function(t){if(!l[e][t].marked&&(l[e][t].marked=!0,l[e][t].age<2&&(u%3===2||u%3===0)&&l[e][t].age++,l[e][t].isFlower&&2===l[e][t].age)){var n=x(e,t),o=n[D(n.length)];o&&function(e,t){var n=D(_.length),o=_[n],r=T[n],c=J[D(J.length)];l[e][t]={isFlower:!0,flowerColor:o,flowerColorName:r,budColor:c,name:r+" Flower",content:"flower",row:e,col:t,age:0,marked:!0},i(l)}(o.row,o.col)}}))}))},f=te(),g="";return u%3===0?g=Object(o.jsx)(q.c,{size:40,style:{backgroundColor:"#d47986",padding:"3 2 0 2",borderRadius:"10px",border:"2px solid white"}}):u%3===1?g=Object(o.jsx)(q.a,{size:40,style:{backgroundColor:"#dbbd72",padding:"3 2 0 2",borderRadius:"10px",border:"2px solid white"}}):u%3===2&&(g=Object(o.jsx)(q.b,{size:40,style:{backgroundColor:"#739cde",padding:"3 2 0 2",borderRadius:"10px",border:"2px solid white"}})),"2px solid ".concat(ee.palette.background.paper),Object(o.jsx)(X.a,{theme:ee,children:Object(o.jsx)("div",{className:"App",children:Object(o.jsxs)("header",{className:"App-header",children:[t,Object(o.jsx)(H.a,{variant:"extended",color:"primary",onClick:function(){O()},style:{margin:"1em"},children:Object(o.jsx)($.a,{})}),Object(o.jsx)("p",{children:g}),Object(o.jsxs)("p",{children:[" ","Day "+p," "]}),Object(o.jsx)(Q.a,{maxWidth:"sm",style:{paddingTop:"1em"},children:Object(o.jsx)(L.a,{container:!0,className:f.root,spacing:2,children:Object(o.jsx)(L.a,{item:!0,xs:12,children:Object(o.jsx)(L.a,{container:!0,justify:"center",spacing:1,children:[0,1,2,3,4,5].map((function(e){return Object(o.jsx)(L.a,{item:!0,children:Object(o.jsx)(m.a,{component:K.a,style:{backgroundColor:_[e],color:"white"},elevation:1,variant:"rounded",children:Object(o.jsx)(j.a,{})})},e)}))})})})}),Object(o.jsx)("div",{className:"honeycomb",style:{paddingTop:"2em"},children:l.map((function(e,t){return Object(o.jsx)(B,{plots:e,gridState:l,gridStateSetter:i})}))})]})})})};l.a.render(Object(o.jsx)(o.Fragment,{children:Object(o.jsx)(ne,{})}),document.getElementById("root"))},85:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){}},[[108,1,2]]]);
//# sourceMappingURL=main.dfc43436.chunk.js.map