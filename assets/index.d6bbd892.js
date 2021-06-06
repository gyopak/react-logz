import{c as e,m as t,r as l,u as n,a,R as r,I as o,d as s,D as i,b as c,T as d,e as u,f as m,F as g,g as p,S as h,h as E,i as b,j as f,w as v,M as y,P as w,k as R,A as N,l as S,n as k,o as x,p as C,B as I,C as O,q as P,s as L,t as z,v as F,x as D,y as W,z as A,E as M}from"./vendor.aa957dfc.js";const q=e({name:"settings",initialState:{isDarkMode:null,visibleSeverities:["INFO","WARNING","ERROR"]},reducers:{setDarkMode(e,t){e.isDarkMode=t.payload},setSeverityVisible(e,t){const{shouldShow:l,severity:n}=t.payload,a=e.visibleSeverities.includes(n);l&&!a&&e.visibleSeverities.push(n),!l&&a&&(e.visibleSeverities=e.visibleSeverities.filter((e=>e!==n)))}}}),{setDarkMode:B,setSeverityVisible:G}=q.actions;var $=q.reducer;const T=t((e=>({closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1)},formRow:{padding:e.spacing(1)}})));function j(){const[e,t]=l.exports.useState(!1),{isDarkMode:E,visibleSeverities:b}=n((e=>e.settings)),f=a(),v=T(),y=b.includes("INFO"),w=b.includes("WARNING"),R=b.includes("ERROR"),N=()=>{t(!1)};return r.createElement(r.Fragment,null,r.createElement(o,{color:"inherit","aria-label":"settings",onClick:()=>{t(!0)}},r.createElement(s,null)),r.createElement(i,{onClose:N,"aria-labelledby":"settings-dialog",open:e},r.createElement(c,null,r.createElement(d,{variant:"h5"},"Settings"),r.createElement(o,{"aria-label":"close",className:v.closeButton,onClick:N},r.createElement(u,null))),r.createElement(m,{dividers:!0},r.createElement(d,{variant:"h6"},"Appearence"),r.createElement(g,{"aria-label":"position"},r.createElement(p,{className:v.formRow,value:"start",control:r.createElement(h,{checked:E,onChange:()=>{f(B(!E))},color:"primary"}),label:"Dark mode",labelPlacement:"end"}))),r.createElement(m,{dividers:!0},r.createElement(d,{variant:"h6"},"Content"),r.createElement(g,{"aria-label":"position"},r.createElement(p,{value:"start",className:v.formRow,control:r.createElement(h,{checked:y,onChange:()=>{f(G({severity:"INFO",shouldShow:!y}))},color:"primary"}),label:"Show infos",labelPlacement:"end"}),r.createElement(p,{value:"start",className:v.formRow,control:r.createElement(h,{checked:R,onChange:()=>{f(G({severity:"ERROR",shouldShow:!R}))},color:"primary"}),label:"Show errors",labelPlacement:"end"}),r.createElement(p,{value:"start",className:v.formRow,control:r.createElement(h,{checked:w,onChange:()=>{f(G({severity:"WARNING",shouldShow:!w}))},color:"primary"}),label:"Show warnings",labelPlacement:"end"})))))}const Q={error:"ERR",warning:"WARN",info:"INFO"},V=t((()=>({error:{backgroundColor:E[900]},warning:{backgroundColor:b[900]},info:{backgroundColor:f[900]}}))),H=v((e=>({root:{color:"white",minWidth:"70px",[e.breakpoints.down("sm")]:{minWidth:"20px"},margin:e.spacing(1)}})))(y),U=({type:e,label:t,size:l})=>{const n=V(),a=t||Q[e]||"";return r.createElement(H,{size:l,className:n[e],label:a})};U.propTypes={type:w.oneOf(["info","error","warning"]).isRequired,label:w.string,size:w.string},U.defaultProps={label:void 0,size:"medium"};function X(){const e=R("(min-width:450px)"),{counts:t}=n((e=>e.logCache));return[{type:"info",value:t.info,label:"INFO"},{type:"warning",value:t.warning,label:"ERROR"},{type:"error",value:t.error,label:"WARNING"}].map((t=>{const l=e?`${t.label}: `:"";return r.createElement(U,{type:t.type,label:`${l}${n=t.value,n<999?n:"999+"}`});var n}))}const Y=t((e=>({toolBar:{minHeight:e.spacing(9)},title:{flexGrow:1}})));function J(){const e=Y();return r.createElement(N,{position:"sticky"},r.createElement(S,{className:e.toolBar},r.createElement(d,{variant:"h6",className:e.title},"logz"),r.createElement(X,null),r.createElement(j,null)))}const K=k({reducerPath:"logApi",baseQuery:x({baseUrl:"https://sphenoid-outstanding-chef.glitch.me"}),endpoints:e=>({fetchNewLogs:e.query({query:(e=0,t=Date.now(),l=50)=>`/logs?limit=${l}&before=${t}&after=${e}`}),fetchOldLogs:e.query({query:(e=Date.now(),t=100)=>`/logs?limit=${t}&before=${e}`})})}),{useFetchNewLogsQuery:Z,useFetchOldLogsQuery:_}=K,ee={logs:[],isPollingEnabled:!0,cacheSize:200,counts:{error:0,warning:0,info:0}},te=(e,t)=>e.filter((e=>e.type===t)).length,le=e({name:"logCache",initialState:ee,reducers:{receivePolledLogs(e,t){const l=t.payload;e.logs.push(...l),e.counts.error+=te(l,"ERROR"),e.counts.warning+=te(l,"WARNING"),e.counts.info+=te(l,"INFO"),e.logs.length>e.cacheSize&&e.logs.splice(0,e.cacheSize/2)},receiveOldLogs(e,t){e.isPollingEnabled=!1;const l=t.payload;if(e.logs.unshift(...l),e.counts.error+=te(l,"ERROR"),e.counts.warning+=te(l,"WARNING"),e.counts.info+=te(l,"INFO"),e.logs.length>e.cacheSize){const t=e.cacheSize/2,l=e.logs.length-t;e.logs.splice(l,t)}},enablePolling(e){e.isPollingEnabled=!0},reset(e){e.logs=ee.logs,e.isPollingEnabled=!0}}}),{receivePolledLogs:ne,receiveOldLogs:ae,enablePolling:re,reset:oe}=le.actions;var se=le.reducer;const ie=v((e=>({root:{minWidth:"150px",margin:e.spacing(1),marginRight:0}})))(y),ce=({time:e})=>{const t=new Date(e).toLocaleString();return r.createElement(ie,{size:"small",variant:"outlined",label:t})};ce.propTypes={time:w.number},ce.defaultProps={time:Date.now()};const de=t((e=>({logLine:{display:"flex",[e.breakpoints.down("sm")]:{display:"block"},border:"1px solid",borderColor:e.palette.divider,cursor:"default","&:hover":{background:e.palette.action.selected}},line:{padding:e.spacing(1),[e.breakpoints.down("sm")]:{padding:e.spacing(2),paddingTop:0}}}))),ue=({time:e,type:t,line:l})=>{const a=de(),{visibleSeverities:o}=n((e=>e.settings));return o.includes(t)?r.createElement("div",{className:a.logLine},r.createElement(ce,{time:e}),r.createElement(U,{size:"small",type:t.toLowerCase()}),r.createElement(d,{variant:"body1",className:a.line},l)):null};ue.propTypes={time:w.number.isRequired,type:w.oneOf(["INFO","ERROR","WARNING"]).isRequired,line:w.string},ue.defaultProps={line:""};const me=t((e=>({loader:{backgroundColor:"rgba(0, 0, 0, 0.9)",color:"white",zIndex:1},followLogs:{position:"fixed",bottom:e.spacing(2),left:"50%",transform:"translateX(-50%);",width:"170px",display:"flex",justifyContent:"space-around"}})));function ge(){var e;const t=me(),o=C(),s=l.exports.useRef(null),{logs:i,isPollingEnabled:c}=n((e=>e.logCache)),d=a(),[u,m]=l.exports.useState(),[g,p]=l.exports.useState(!0),[h,E]=l.exports.useState(),{data:b,isError:f,isLoading:v}=Z(h),{data:y,isError:w,isFetching:R}=_(u,{skip:!u});l.exports.useEffect((()=>{const e=(null==b?void 0:b.logs)||[];e.length&&d(ne(e))}),[b,d]),l.exports.useEffect((()=>{const e=(null==y?void 0:y.logs)||[];e.length&&d(ae(e))}),[y,d]),l.exports.useEffect((()=>{const e=setInterval((()=>{var e;c&&E(null==(e=null==i?void 0:i[i.length-1])?void 0:e.time)}),1e3);return()=>clearInterval(e)}),[i,c]),l.exports.useEffect((()=>{if(!c){const e=y.logs.length,t=s.current.children[e].getBoundingClientRect().y,l=o.spacing(9);window.scroll(0,t-l)}}),[i,c,null==(e=null==y?void 0:y.logs)?void 0:e.length,o]),l.exports.useEffect((()=>{const e=w||f;e&&console.error(e)}),[w,f]);const N=()=>{var e;null==(e=null==s?void 0:s.current)||e.scrollIntoView({block:"end",inline:"nearest"})};return l.exports.useEffect((()=>{g&&N()}),[i,g]),r.createElement(r.Fragment,null,r.createElement(I,{className:t.loader,open:v||R||!i.length},r.createElement(O,{color:"inherit"})),r.createElement("div",{className:t.container,ref:s,onWheel:e=>{const{y:t}=s.current.getBoundingClientRect();t>=o.spacing(6)&&!R&&(()=>{const e=null==i?void 0:i[0].time;m(e)})(),g&&e.deltaY<0&&p(!1)}},i.map((({time:e,type:t,line:l})=>r.createElement(ue,{time:e,type:t,line:l}))),!g&&r.createElement(P,{variant:"extended",color:"primary",className:t.followLogs,onClick:()=>{c||(E(void 0),d(oe())),N(),p(!0)}},r.createElement(L,null),"Tail logs")))}const pe=()=>{const e=a(),t=n((e=>e.settings.isDarkMode)),o=R("(prefers-color-scheme: dark)");l.exports.useEffect((()=>{e(B(o))}),[e,o]);const s=r.useMemo((()=>z({palette:{type:t?"dark":"light",primary:{main:"rgba(0, 0, 0, 0.90)"},background:{default:t?"rgba(0, 0, 0, 0.95)":"rgba(0, 0, 0, 0.12)"}}})),[t]);return r.createElement(F,{theme:s},r.createElement(D,null),r.createElement(J,null),r.createElement(ge,null))},he=W({reducer:{settings:$,logCache:se,[K.reducerPath]:K.reducer},middleware:e=>e().concat(K.middleware)});A.render(r.createElement(r.StrictMode,null,r.createElement(M,{store:he},r.createElement(pe,null))),document.getElementById("root"));