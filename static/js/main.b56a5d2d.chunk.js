(this["webpackJsonptiny-collector"]=this["webpackJsonptiny-collector"]||[]).push([[0],{114:function(e,t,r){},115:function(e,t,r){},116:function(e,t,r){},137:function(e,t,r){"use strict";r.r(t);var n=r(3),o=r(0),c=r(11),a=r.n(c),i=(r(114),r(115),r(35)),l=r(34),s=(r(116),r(28)),d=r.n(s),j=r(62),b=r.n(j),h=r(63),u=r.n(h),x=r(200),O=r(85),p=r.n(O),f=r(84),m=r.n(f),g=r(188),w=r(201),y=r(183),v=r(184),k=r(185),C=r(186),N=r(83),I=r.n(N),S=r(179),F=r(187),H=r(182),R=r(177),D=r(64),G=r(65),M=Object(R.a)({red:{backgroundColor:D.a[100],color:D.a[600]},blue:{backgroundColor:G.a[100],color:G.a[600]}}),P=function(e){var t=e.onClose,r=e.title,o=e.selectedValue,c=e.selectedPlot,a=e.open,i=function(){t(o)},l=function(e){t(e,c)},s=M();return Object(n.jsxs)(S.a,{onClose:i,"aria-labelledby":"simple-dialog-title",open:a,maxWidth:!0,children:[Object(n.jsx)(H.a,{id:"simple-dialog-title",children:r}),Object(n.jsxs)(y.a,{children:[Object(n.jsxs)(v.a,{button:!0,onClick:function(){return l("gather")},children:[Object(n.jsx)(k.a,{children:Object(n.jsx)(w.a,{className:s.blue,children:Object(n.jsx)(I.a,{})})}),Object(n.jsx)(C.a,{primary:"Gather"})]}),Object(n.jsxs)(v.a,{button:!0,onClick:function(){return l("delete")},children:[Object(n.jsx)(k.a,{children:Object(n.jsx)(w.a,{className:s.red,children:Object(n.jsx)(m.a,{})})}),Object(n.jsx)(C.a,{primary:"Delete"})]})]}),Object(n.jsx)(F.a,{children:Object(n.jsx)(g.a,{onClick:i,color:"primary",children:Object(n.jsx)(p.a,{})})})]})},T=function(e){var t=e.plot,r=(e.handleClick,e.performGather),c="hexagon "+t.content,a="",i="";t.isFlower&&t.age>=1&&(i=t.flowerHex,a=Object(n.jsx)(b.a,{})),t.isFlower&&t.age<1&&(i=t.budColor,a=Object(n.jsx)(u.a,{})),t.isFlower||(i=t.color);var s=t.isFlower?t.flowerColorName+" Flower":"Empty Plot",d=Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("p",{children:s}),Object(n.jsxs)("p",{style:{fontSize:14},children:[t.row,", ",t.col]})]}),j={backgroundColor:i},h=Object(o.useState)(!1),O=Object(l.a)(h,2),p=O[0],f=O[1],m=Object(o.useState)("delete"),g=Object(l.a)(m,2),w=g[0],y=g[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(x.a,{title:d,arrow:!0,children:Object(n.jsx)("div",{className:c,style:j,onClick:function(){t.isFlower&&t.age>=1&&r(t)},children:Object(n.jsx)("div",{className:"hexagontent",children:a})})}),t.isFlower&&t.age&&Object(n.jsx)(P,{onClose:function(e,t){f(!1),y(e),"gather"===e&&r(t)},title:s,open:p,selectedValue:w,selectedPlot:t})]})},z=["#42796c","#3a514c","#185653"],A=[{id:0,colorName:"Red",colorHex:"#9f1f2b"},{id:1,colorName:"Yellow",colorHex:"#e0c55f"},{id:2,colorName:"Green",colorHex:"#7ddf84"},{id:3,colorName:"Cyan",colorHex:"#00c0cd"},{id:4,colorName:"Blue",colorHex:"#3b66db"},{id:5,colorName:"Violet",colorHex:"#9e7af0"}],B="tiny collector",q=10,E=3,J=!1,V=4,W=function(e){return Math.floor(Math.random()*Math.floor(e))},L=function(e){var t=e.x,r=void 0===t?-1:t,n=e.y,o=void 0===n?-1:n,c=e.colorID,a=e.id,i=void 0===a?-1:a;return c||(c=W(z.length)),{id:i,isFlower:!1,color:z[c],name:"Empty",content:"grass",row:r,col:o}},U=function(e){var t=e.x,r=void 0===t?-1:t,n=e.y,o=void 0===n?-1:n,c=e.colorID,a=e.age,i=void 0===a?0:a,l=e.id,s=void 0===l?-1:l;return c||(c=W(6)),{row:r,col:o,id:s,budColor:z[W(z.length)],isFlower:!0,flowerHex:A[c].colorHex,flowerColorName:A[c].colorName,flowerColorId:c,name:A[c].colorName+" Flower",age:i}},Y=function(e){var t=e.plots,r=e.gridState,o=e.gridStateSetter,c=e.inventoryState,a=e.inventoryStateSetter,l=function(e){t.filter((function(t){return t.id===e}))[0]},s=function(e){var t=c.findIndex((function(t){return t.flowerColor===e.flowerColorId}));if(t>-1)c[t].quantity++,a(Object(i.a)(c));else{var n={flowerColor:e.flowerColorId,colorName:e.flowerColorName,quantity:1};a([].concat(Object(i.a)(c),[n]))}r[e.row][e.col]=L({x:e.row,y:e.col,id:e.id}),o(Object(i.a)(r))};return Object(n.jsx)("div",{className:"ibws-fix",children:t.map((function(e,t){return Object(n.jsx)(T,{plot:e,handleClick:l,performGather:s},"plot"+t)}))})},K=r(191),Q=r(190),X=r(75),Z=r(189),$=r(7),_=function(e){var t=e.flowerHues,r=e.items,o=(e.setItems,Object(R.a)((function(e){return{root:{flexGrow:1},paper:{height:50,width:50}}}))),c=Object($.a)((function(e){return{badge:{top:35,right:5,border:"2px solid ".concat(e.palette.background.paper),padding:"0 4px"}}}))(Z.a),a=o(),i=function(e){var t=e.children,r=e.condition,n=e.wrapper;return r?n(t):t};return Object(n.jsx)(Q.a,{maxWidth:"sm",style:{paddingTop:"1em"},children:Object(n.jsx)(K.a,{container:!0,className:a.root,spacing:2,children:Object(n.jsx)(K.a,{item:!0,xs:12,children:Object(n.jsx)(K.a,{container:!0,justify:"center",spacing:1,children:r.map((function(e,r){return Object(n.jsx)(K.a,{item:!0,children:Object(n.jsx)(i,{condition:e.quantity>1,wrapper:function(t){return Object(n.jsx)(c,{color:"primary",badgeContent:e.quantity,children:t})},children:Object(n.jsx)(w.a,{component:X.a,style:{backgroundColor:t[e.flowerColor],color:"white"},elevation:1,variant:"rounded",children:Object(n.jsx)(b.a,{})})})},r)}))})})})})},ee=r(192),te=r(193),re=r(46),ne=r(194),oe=r(87),ce=r.n(oe),ae=function(e){var t=e.drawerOpen,r=e.setDrawerOpen,o=Object(R.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}))(),c=t?o.hide:"otherclass";return Object(n.jsx)("div",{className:o.root,children:Object(n.jsx)(ee.a,{position:"fixed",children:Object(n.jsxs)(te.a,{children:[Object(n.jsx)(re.a,{variant:"h6",noWrap:!0,className:o.title,children:"tiny collector"}),Object(n.jsx)(ne.a,{color:"inherit","aria-label":"open drawer",edge:"end",onClick:function(){r(!0)},className:c,children:Object(n.jsx)(ce.a,{})})]})})})},ie=r(74),le=r(29),se=r(202),de=r(195),je=r(196),be=r(88),he=r.n(be),ue=r(89),xe=r.n(ue),Oe=r(91),pe=r.n(Oe),fe=r(45),me=Object(R.a)((function(e){return{drawer:{width:240,flexShrink:0},drawerPaper:{width:240},drawerHeader:Object(ie.a)(Object(ie.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-start"})}})),ge=function(e){var t=e.open,r=e.setOpen,o=function(){r(!1)},c=Object(le.a)(),a=me(),i={color:"#666",textDecoration:"none"};return Object(n.jsxs)(se.a,{className:a.drawer,variant:"persistent",anchor:"right",open:t,classes:{paper:a.drawerPaper},children:[Object(n.jsx)("div",{className:a.drawerHeader,children:Object(n.jsx)(ne.a,{onClick:o,children:"rtl"===c.direction?Object(n.jsx)(he.a,{}):Object(n.jsx)(xe.a,{})})}),Object(n.jsx)(de.a,{}),Object(n.jsxs)(y.a,{children:[Object(n.jsx)(fe.b,{style:i,to:"/tiny-collector",children:Object(n.jsxs)(v.a,{onClick:o,children:[Object(n.jsx)(je.a,{children:Object(n.jsx)(u.a,{})}),Object(n.jsx)(C.a,{children:"Tiny Collector"})]})}),Object(n.jsx)(fe.b,{style:i,to:"/about",children:Object(n.jsxs)(v.a,{onClick:o,children:[Object(n.jsx)(je.a,{children:Object(n.jsx)(pe.a,{})}),Object(n.jsx)(C.a,{children:"About"})]})})]}),Object(n.jsx)(de.a,{})]})},we=r(66),ye=r(199),ve=r(198),ke=r(92),Ce=r.n(ke),Ne=r(93),Ie=r.n(Ne),Se=r(98),Fe=r(197),He=r(94),Re=r.n(He),De=r(13),Ge=J?["#e6677","#ccbb44","#228833","#66ccee","#4477aa","#aa3377"]:["#9f1f2b","#e0c55f","#7ddf84","#00c0cd","#3b66db","#9e7af0"],Me=Object(Se.a)({palette:{primary:{main:"#185653"}}});var Pe=function(){var e=q,t=Object(o.useState)(function(e){var t=[],r=[],n=W(e);for(t[n]=U({age:0,id:n}),d()(e,(function(e){if(e!==n)if(W(100)<=E){var r=W(2);t[e]=U({age:r,id:e})}else t[e]=L({id:e})}));t.length;)r.push(t.splice(0,q));return d()(r.length,(function(e){d()(r[e].length,(function(t){r[e][t].row=e,r[e][t].col=t}))})),r}(e*(e-1))),r=Object(l.a)(t,2),c=r[0],a=r[1],s=Object(o.useState)(0),j=Object(l.a)(s,2),b=j[0],h=j[1],u=Object(o.useState)([]),x=Object(l.a)(u,2),O=x[0],p=x[1],f=1+Math.floor(b/3),m=function(e,t){var r=function(e,t){var r=[];return e>0&&r.push({row:e-1,col:t}),t<q-1&&r.push({row:e,col:t+1}),t<q-1&&r.push({row:e,col:t+1}),e<q-2&&r.push({row:e+1,col:t}),e<q-2&&t>0&&r.push({row:e+1,col:t-1}),e>0&&t>0&&r.push({row:e-1,col:t}),r}(e,t),n=[];return d()(r.length,(function(e){c[r[e].row][r[e].col].isFlower||n.push(c[r[e].row][r[e].col])})),n},g=function(){h(b+1),d()(c.length,(function(e){d()(c[e].length,(function(t){c[e][t].marked=!1}))}));var e=[];d()(c.length,(function(t){d()(c[t].length,(function(r){if(!c[t][r].marked&&(c[t][r].marked=!0,c[t][r].age<2&&(b%3===2||b%3===0)&&c[t][r].age++,c[t][r].isFlower&&2===c[t][r].age)){var n=m(t,r);if(n.length){var o=n[W(n.length)];o&&function(e,t){var r=c[e][t].id;c[e][t]=U({x:e,y:t,id:r,age:0}),a(Object(i.a)(c))}(o.row,o.col),c[o.row][o.col].marked=!0}else{W(V)||e.push({row:t,col:r})}}}))})),d()(e.length,(function(t){m(e[t].row,e[t].col).length||function(e,t){var r=c[e][t].id;c[e][t]=L({x:e,y:t,id:r}),a(Object(i.a)(c))}(e[t].row,e[t].col)}))},w="";b%3===0?w=Object(n.jsx)(we.c,{size:40,style:{backgroundColor:"#d47986",padding:"3 2 0 2",borderRadius:"10px",border:"2px solid white"}}):b%3===1?w=Object(n.jsx)(we.a,{size:40,style:{backgroundColor:"#dbbd72",padding:"3 2 0 2",borderRadius:"10px",border:"2px solid white"}}):b%3===2&&(w=Object(n.jsx)(we.b,{size:40,style:{backgroundColor:"#739cde",padding:"3 2 0 2",borderRadius:"10px",border:"2px solid white"}}));var k=Object(o.useState)(!1),N=Object(l.a)(k,2),I=N[0],S=N[1];return Object(n.jsx)(Fe.a,{theme:Me,children:Object(n.jsxs)(fe.a,{children:[Object(n.jsx)(ae,{drawerOpen:I,setDrawerOpen:S}),Object(n.jsxs)(De.c,{children:[Object(n.jsx)(De.a,{path:"/about",children:Object(n.jsxs)(ve.a,{style:{margin:"2em",padding:"4em"},children:[Object(n.jsx)("h1",{children:"About"}),Object(n.jsx)("p",{children:"This toy-game-thing was born out of an appreciation for hexagons, cellular automata, and Animal Crossing."}),Object(n.jsx)("p",{children:"I wanted to implement a few technologies I had not gotten the chance to play with yet, including:"}),Object(n.jsx)(y.a,{children:[{name:"React Hooks",description:"This game is made up of entirely functional components. Becoming fluent with Hooks was my priority in creating it.",checked:!0},{name:"Material UI",description:"I was raised on Bootstrap and I'm excited to graduate to a more professional looking interface starter. I have opinions about Material, but I'm mostly a fan!",checked:!0},{name:"React Router",description:!1,checked:!0},{name:"Jest",description:"I understand that testing the front end can save you big money in the long run but I am rusty! Looking forward to hanging onto this extremely valuable habit.",checked:!1},{name:"React Context",description:"I have some experience with Redux but I'm under the impression that Context can offer a lot of the same benefits with less developing time.",checked:!1}].map((function(e,t){return Object(n.jsxs)(v.a,{children:[Object(n.jsxs)(je.a,{children:[e.checked&&Object(n.jsx)(Ce.a,{}),!e.checked&&Object(n.jsx)(Ie.a,{})]}),Object(n.jsx)(C.a,{primary:e.name,secondary:e.description})]},"goal"+t)}))}),Object(n.jsx)("br",{}),Object(n.jsx)("p",{children:"- Shel, Front End Developer"}),Object(n.jsx)("a",{href:"https://www.linkedin.com/in/shel-keller/",children:"(My LinkedIn profile)"})]})}),Object(n.jsx)(De.a,{path:["/","/tiny-collector"],children:Object(n.jsx)("div",{className:"App",style:{paddingTop:"4em"},children:Object(n.jsxs)("header",{className:"App-header",children:[Object(n.jsx)(ye.a,{variant:"extended",color:"primary",onClick:function(){g()},style:{margin:"1em"},children:Object(n.jsx)(Re.a,{})}),Object(n.jsxs)("div",{style:{fontSize:"14px",margin:"2em"},children:[Object(n.jsx)("p",{children:"Proceed time with the button above. Click flowers to collect them."}),Object(n.jsx)("p",{children:"Overcrowded flowers might die."}),Object(n.jsx)("p",{children:"Coming soon: color breeding!"})]}),Object(n.jsx)("p",{children:w}),Object(n.jsx)("p",{children:"Day "+f}),Object(n.jsx)(_,{flowerHues:Ge,items:O,setItems:p}),Object(n.jsx)("div",{className:"honeycomb",style:{paddingTop:"2em"},children:c.map((function(e,t){return Object(n.jsx)(Y,{plots:e,gridState:c,gridStateSetter:a,inventoryState:O,inventoryStateSetter:p})}))})]})})})]}),Object(n.jsx)(ge,{open:I,setOpen:S})]})})},Te=r(95);a.a.render(Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(Te.a,{children:Object(n.jsx)("title",{children:B})}),Object(n.jsx)(Pe,{})]}),document.getElementById("root"))}},[[137,1,2]]]);
//# sourceMappingURL=main.b56a5d2d.chunk.js.map