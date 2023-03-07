(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();function pt(t,e){t.indexOf(e)===-1&&t.push(e)}const et=(t,e,n)=>Math.min(Math.max(n,t),e),g={duration:.3,delay:0,endDelay:0,repeat:0,easing:"ease"},R=t=>typeof t=="number",E=t=>Array.isArray(t)&&!R(t[0]),mt=(t,e,n)=>{const i=e-t;return((n-t)%i+i)%i+t};function gt(t,e){return E(t)?t[mt(0,t.length,e)]:t}const nt=(t,e,n)=>-n*t+n*e+t,it=()=>{},T=t=>t,Z=(t,e,n)=>e-t===0?1:(n-t)/(e-t);function st(t,e){const n=t[t.length-1];for(let i=1;i<=e;i++){const s=Z(0,e,i);t.push(nt(n,1,s))}}function yt(t){const e=[0];return st(e,t-1),e}function vt(t,e=yt(t.length),n=T){const i=t.length,s=i-e.length;return s>0&&st(e,s),r=>{let a=0;for(;a<i-2&&!(r<e[a+1]);a++);let o=et(0,1,Z(e[a],e[a+1],r));return o=gt(n,a)(o),nt(t[a],t[a+1],o)}}const rt=t=>Array.isArray(t)&&R(t[0]),B=t=>typeof t=="object"&&Boolean(t.createAnimation),S=t=>typeof t=="function",bt=t=>typeof t=="string",F={ms:t=>t*1e3,s:t=>t/1e3},at=(t,e,n)=>(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t,Tt=1e-7,At=12;function St(t,e,n,i,s){let r,a,o=0;do a=e+(n-e)/2,r=at(a,i,s)-t,r>0?n=a:e=a;while(Math.abs(r)>Tt&&++o<At);return a}function P(t,e,n,i){if(t===e&&n===i)return T;const s=r=>St(r,0,1,t,n);return r=>r===0||r===1?r:at(s(r),e,i)}const Ot=(t,e="end")=>n=>{n=e==="end"?Math.min(n,.999):Math.max(n,.001);const i=n*t,s=e==="end"?Math.floor(i):Math.ceil(i);return et(0,1,s/t)},J={ease:P(.25,.1,.25,1),"ease-in":P(.42,0,1,1),"ease-in-out":P(.42,0,.58,1),"ease-out":P(0,0,.58,1)},wt=/\((.*?)\)/;function K(t){if(S(t))return t;if(rt(t))return P(...t);if(J[t])return J[t];if(t.startsWith("steps")){const e=wt.exec(t);if(e){const n=e[1].split(",");return Ot(parseFloat(n[0]),n[1].trim())}}return T}class ot{constructor(e,n=[0,1],{easing:i,duration:s=g.duration,delay:r=g.delay,endDelay:a=g.endDelay,repeat:o=g.repeat,offset:l,direction:d="normal"}={}){if(this.startTime=null,this.rate=1,this.t=0,this.cancelTimestamp=null,this.easing=T,this.duration=0,this.totalDuration=0,this.repeat=0,this.playState="idle",this.finished=new Promise((p,c)=>{this.resolve=p,this.reject=c}),i=i||g.easing,B(i)){const p=i.createAnimation(n);i=p.easing,n=p.keyframes||n,s=p.duration||s}this.repeat=o,this.easing=E(i)?T:K(i),this.updateDuration(s);const h=vt(n,l,E(i)?i.map(K):T);this.tick=p=>{var c;r=r;let m=0;this.pauseTime!==void 0?m=this.pauseTime:m=(p-this.startTime)*this.rate,this.t=m,m/=1e3,m=Math.max(m-r,0),this.playState==="finished"&&this.pauseTime===void 0&&(m=this.totalDuration);const x=m/this.duration;let D=Math.floor(x),v=x%1;!v&&x>=1&&(v=1),v===1&&D--;const $=D%2;(d==="reverse"||d==="alternate"&&$||d==="alternate-reverse"&&!$)&&(v=1-v);const I=m>=this.totalDuration?1:Math.min(v,1),O=h(this.easing(I));e(O),this.pauseTime===void 0&&(this.playState==="finished"||m>=this.totalDuration+a)?(this.playState="finished",(c=this.resolve)===null||c===void 0||c.call(this,O)):this.playState!=="idle"&&(this.frameRequestId=requestAnimationFrame(this.tick))},this.play()}play(){const e=performance.now();this.playState="running",this.pauseTime!==void 0?this.startTime=e-this.pauseTime:this.startTime||(this.startTime=e),this.cancelTimestamp=this.startTime,this.pauseTime=void 0,this.frameRequestId=requestAnimationFrame(this.tick)}pause(){this.playState="paused",this.pauseTime=this.t}finish(){this.playState="finished",this.tick(0)}stop(){var e;this.playState="idle",this.frameRequestId!==void 0&&cancelAnimationFrame(this.frameRequestId),(e=this.reject)===null||e===void 0||e.call(this,!1)}cancel(){this.stop(),this.tick(this.cancelTimestamp)}reverse(){this.rate*=-1}commitStyles(){}updateDuration(e){this.duration=e,this.totalDuration=e*(this.repeat+1)}get currentTime(){return this.t}set currentTime(e){this.pauseTime!==void 0||this.rate===0?this.pauseTime=e:this.startTime=performance.now()-e/this.rate}get playbackRate(){return this.rate}set playbackRate(e){this.rate=e}}class Et{setAnimation(e){this.animation=e,e==null||e.finished.then(()=>this.clearAnimation()).catch(()=>{})}clearAnimation(){this.animation=this.generator=void 0}}const z=new WeakMap;function ct(t){return z.has(t)||z.set(t,{transforms:[],values:new Map}),z.get(t)}function xt(t,e){return t.has(e)||t.set(e,new Et),t.get(e)}const Dt=["","X","Y","Z"],It=["translate","scale","rotate","skew"],q={x:"translateX",y:"translateY",z:"translateZ"},Q={syntax:"<angle>",initialValue:"0deg",toDefaultUnit:t=>t+"deg"},Mt={translate:{syntax:"<length-percentage>",initialValue:"0px",toDefaultUnit:t=>t+"px"},rotate:Q,scale:{syntax:"<number>",initialValue:1,toDefaultUnit:T},skew:Q},V=new Map,G=t=>`--motion-${t}`,U=["x","y","z"];It.forEach(t=>{Dt.forEach(e=>{U.push(t+e),V.set(G(t+e),Mt[t])})});const Pt=(t,e)=>U.indexOf(t)-U.indexOf(e),Ft=new Set(U),lt=t=>Ft.has(t),Rt=(t,e)=>{q[e]&&(e=q[e]);const{transforms:n}=ct(t);pt(n,e),t.style.transform=Vt(n)},Vt=t=>t.sort(Pt).reduce($t,"").trim(),$t=(t,e)=>`${t} ${e}(var(${G(e)}))`,W=t=>t.startsWith("--"),Y=new Set;function Lt(t){if(!Y.has(t)){Y.add(t);try{const{syntax:e,initialValue:n}=V.has(t)?V.get(t):{};CSS.registerProperty({name:t,inherits:!1,syntax:e,initialValue:n})}catch{}}}const C=(t,e)=>document.createElement("div").animate(t,e),k={cssRegisterProperty:()=>typeof CSS<"u"&&Object.hasOwnProperty.call(CSS,"registerProperty"),waapi:()=>Object.hasOwnProperty.call(Element.prototype,"animate"),partialKeyframes:()=>{try{C({opacity:[1]})}catch{return!1}return!0},finished:()=>Boolean(C({opacity:[0,1]},{duration:.001}).finished),linearEasing:()=>{try{C({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0}},N={},w={};for(const t in k)w[t]=()=>(N[t]===void 0&&(N[t]=k[t]()),N[t]);const _t=.015,jt=(t,e)=>{let n="";const i=Math.round(e/_t);for(let s=0;s<i;s++)n+=t(Z(0,i-1,s))+", ";return n.substring(0,n.length-2)},tt=(t,e)=>S(t)?w.linearEasing()?`linear(${jt(t,e)})`:g.easing:rt(t)?qt(t):t,qt=([t,e,n,i])=>`cubic-bezier(${t}, ${e}, ${n}, ${i})`;function Ut(t,e){for(let n=0;n<t.length;n++)t[n]===null&&(t[n]=n?t[n-1]:e());return t}const zt=t=>Array.isArray(t)?t:[t];function X(t){return q[t]&&(t=q[t]),lt(t)?G(t):t}const j={get:(t,e)=>{e=X(e);let n=W(e)?t.style.getPropertyValue(e):getComputedStyle(t)[e];if(!n&&n!==0){const i=V.get(e);i&&(n=i.initialValue)}return n},set:(t,e,n)=>{e=X(e),W(e)?t.style.setProperty(e,n):t.style[e]=n}};function ut(t,e=!0){if(!(!t||t.playState==="finished"))try{t.stop?t.stop():(e&&t.commitStyles(),t.cancel())}catch{}}function Ct(t,e){var n;let i=(e==null?void 0:e.toDefaultUnit)||T;const s=t[t.length-1];if(bt(s)){const r=((n=s.match(/(-?[\d.]+)([a-z%]*)/))===null||n===void 0?void 0:n[2])||"";r&&(i=a=>a+r)}return i}function Nt(){return window.__MOTION_DEV_TOOLS_RECORD}function Bt(t,e,n,i={},s){const r=Nt(),a=i.record!==!1&&r;let o,{duration:l=g.duration,delay:d=g.delay,endDelay:h=g.endDelay,repeat:p=g.repeat,easing:c=g.easing,persist:m=!1,direction:x,offset:D,allowWebkitAcceleration:v=!1}=i;const $=ct(t),I=lt(e);let O=w.waapi();I&&Rt(t,e);const y=X(e),L=xt($.values,y),b=V.get(y);return ut(L.animation,!(B(c)&&L.generator)&&i.record!==!1),()=>{const _=()=>{var u,M;return(M=(u=j.get(t,y))!==null&&u!==void 0?u:b==null?void 0:b.initialValue)!==null&&M!==void 0?M:0};let f=Ut(zt(n),_);const H=Ct(f,b);if(B(c)){const u=c.createAnimation(f,e!=="opacity",_,y,L);c=u.easing,f=u.keyframes||f,l=u.duration||l}if(W(y)&&(w.cssRegisterProperty()?Lt(y):O=!1),I&&!w.linearEasing()&&(S(c)||E(c)&&c.some(S))&&(O=!1),O){b&&(f=f.map(A=>R(A)?b.toDefaultUnit(A):A)),f.length===1&&(!w.partialKeyframes()||a)&&f.unshift(_());const u={delay:F.ms(d),duration:F.ms(l),endDelay:F.ms(h),easing:E(c)?void 0:tt(c,l),direction:x,iterations:p+1,fill:"both"};o=t.animate({[y]:f,offset:D,easing:E(c)?c.map(A=>tt(A,l)):void 0},u),o.finished||(o.finished=new Promise((A,ht)=>{o.onfinish=A,o.oncancel=ht}));const M=f[f.length-1];o.finished.then(()=>{m||(j.set(t,y,M),o.cancel())}).catch(it),v||(o.playbackRate=1.000001)}else if(s&&I)f=f.map(u=>typeof u=="string"?parseFloat(u):u),f.length===1&&f.unshift(parseFloat(_())),o=new s(u=>{j.set(t,y,H?H(u):u)},f,Object.assign(Object.assign({},i),{duration:l,easing:c}));else{const u=f[f.length-1];j.set(t,y,b&&R(u)?b.toDefaultUnit(u):u)}return a&&r(t,e,f,{duration:l,delay:d,easing:c,repeat:p,offset:D},"motion-one"),L.setAnimation(o),o}}const Kt=(t,e)=>t[e]?Object.assign(Object.assign({},t),t[e]):Object.assign({},t);function ft(t,e){var n;return typeof t=="string"?e?((n=e[t])!==null&&n!==void 0||(e[t]=document.querySelectorAll(t)),t=e[t]):t=document.querySelectorAll(t):t instanceof Element&&(t=[t]),Array.from(t||[])}const Wt=t=>t(),dt=(t,e,n=g.duration)=>new Proxy({animations:t.map(Wt).filter(Boolean),duration:n,options:e},Zt),Xt=t=>t.animations[0],Zt={get:(t,e)=>{const n=Xt(t);switch(e){case"duration":return t.duration;case"currentTime":return F.s((n==null?void 0:n[e])||0);case"playbackRate":case"playState":return n==null?void 0:n[e];case"finished":return t.finished||(t.finished=Promise.all(t.animations.map(Gt)).catch(it)),t.finished;case"stop":return()=>{t.animations.forEach(i=>ut(i))};case"forEachNative":return i=>{t.animations.forEach(s=>i(s,t))};default:return typeof(n==null?void 0:n[e])>"u"?void 0:()=>t.animations.forEach(i=>i[e]())}},set:(t,e,n)=>{switch(e){case"currentTime":n=F.ms(n);case"currentTime":case"playbackRate":for(let i=0;i<t.animations.length;i++)t.animations[i][e]=n;return!0}return!1}},Gt=t=>t.finished;function Ht(t=.1,{start:e=0,from:n=0,easing:i}={}){return(s,r)=>{const a=R(n)?n:Jt(n,r),o=Math.abs(a-s);let l=t*o;if(i){const d=r*t;l=K(i)(l/d)*d}return e+l}}function Jt(t,e){if(t==="first")return 0;{const n=e-1;return t==="last"?n:n/2}}function Qt(t,e,n){return S(t)?t(e,n):t}function Yt(t){return function(n,i,s={}){n=ft(n);const r=n.length,a=[];for(let o=0;o<r;o++){const l=n[o];for(const d in i){const h=Kt(s,d);h.delay=Qt(h.delay,o,r);const p=Bt(l,d,i[d],h,t);a.push(p)}}return dt(a,s,s.duration)}}const kt=Yt(ot),te={any:0,all:1};function ee(t,e,{root:n,margin:i,amount:s="any"}={}){if(typeof IntersectionObserver>"u")return()=>{};const r=ft(t),a=new WeakMap,o=d=>{d.forEach(h=>{const p=a.get(h.target);if(h.isIntersecting!==Boolean(p))if(h.isIntersecting){const c=e(h);S(c)?a.set(h.target,c):l.unobserve(h.target)}else p&&(p(h),a.delete(h.target))})},l=new IntersectionObserver(o,{root:n,rootMargin:i,threshold:typeof s=="number"?s:te[s]});return r.forEach(d=>l.observe(d)),()=>l.disconnect()}function ne(t,e={}){return dt([()=>{const n=new ot(t,[0,1],e);return n.finished.catch(()=>{}),n}],e,e.duration)}function ie(t,e,n){return(S(t)?ne:kt)(t,e,n)}ee(".staggersection",()=>{ie(".staggeranimation",{opacity:[0,1]},{delay:Ht(1.2,{start:.5})})});
