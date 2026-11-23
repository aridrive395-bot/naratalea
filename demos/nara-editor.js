/* Editor demo NARA STUDIO: pelanggan bisa ganti NAMA, TEKS, dan FOTO langsung di demo.
   Pasang di template: <script src="../nara-editor.js" data-photos="assets/images/foto1.jpg,..."></script>
   Tulis kata "Nama" di template sebagai tempat nama penerima. */
(()=>{const D=document,SC=D.currentScript,$=(s,e=D)=>e.querySelector(s),q=new URLSearchParams(location.search),framed=self!==parent;
let to=(q.get("to")||"").trim().slice(0,30),edit=false;const PH={},T=/\bNama Kamu\b|\bNama\b/,G=/\bNama Kamu\b|\bNama\b/g;
const keys=[...new Set((SC.dataset.photos||"").split(",").concat([...D.images].map(i=>i.getAttribute("src")||"")).filter(s=>s&&!s.startsWith("data:")))];
function swap(root){const w=D.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const p=n.parentNode;if(!p||/^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)||p.closest("#nr-ui,#nr-bar")||n.__x)continue;
if(n.__o===undefined){if(!T.test(n.nodeValue))continue;n.__o=n.nodeValue}const v=to?n.__o.replace(G,to):n.__o;if(n.nodeValue!==v)n.nodeValue=v}}
function patch(){D.querySelectorAll("img").forEach(i=>{if(i.closest("#nr-ui"))return;const k=i.dataset.k||keys.find(k=>(i.getAttribute("src")||"").endsWith(k));if(k){i.dataset.k=k;if(PH[k]&&i.getAttribute("src")!==PH[k])i.src=PH[k]}});
try{if(typeof CONFIG!=="undefined"&&CONFIG.memori)CONFIG.memori.forEach(m=>{m.__f=m.__f||m.foto;if(PH[m.__f])m.foto=PH[m.__f]})}catch(e){}}
let busy=0;const run=()=>{if(busy)return;busy=1;requestAnimationFrame(()=>{busy=0;swap(D.body);patch()})};
swap(D.body);patch();new MutationObserver(run).observe(D.body,{childList:true,subtree:true,characterData:true});
D.addEventListener("input",e=>{const w=D.createTreeWalker(e.target,4);let n;while(n=w.nextNode())n.__x=1});
if(framed)return;
D.head.insertAdjacentHTML("beforeend",`<style>#nr-badge,#nr-bar,#nr-ui{font-family:system-ui,sans-serif;z-index:99999;color:#352B28}
#nr-badge{position:fixed;top:10px;left:10px;background:#E5718A;color:#fff;font:700 11px/1 system-ui;padding:.5rem .8rem;border-radius:99px;border:2px solid #352B28;box-shadow:2px 2px 0 #352B28}
#nr-bar{position:fixed;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:.5rem;background:#FFE9A8;border:2px solid #352B28;border-radius:99px;padding:.4rem;box-shadow:3px 3px 0 #352B28}
#nr-bar button,#nr-bar a,#nr-ui button{font:600 .85rem system-ui;padding:.5rem 1rem;border:2px solid #352B28;border-radius:99px;background:#fff;color:#352B28;cursor:pointer;text-decoration:none}#nr-open{background:#E5718A!important;color:#fff!important}
#nr-ui{position:fixed;right:12px;bottom:70px;width:min(340px,94vw);max-height:72vh;overflow:auto;background:#F9C6D0;border:2px solid #352B28;border-radius:22px;padding:1rem;box-shadow:5px 5px 0 #352B28;display:none}#nr-ui.on{display:block}
#nr-ui h3{margin:0 0 .6rem;font-size:1.1rem}#nr-ui label{font-size:.8rem;font-weight:600;display:block}#nr-ui input[type=text]{width:100%;box-sizing:border-box;padding:.6rem .8rem;border:2px solid #352B28;border-radius:14px;margin:.3rem 0 .8rem;font:inherit}
#nr-p{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;margin:.4rem 0 .8rem}.nr-s{position:relative;cursor:pointer;border:2px solid #352B28;border-radius:12px;overflow:hidden;aspect-ratio:1;background:#fff}.nr-s img{width:100%;height:100%;object-fit:cover}.nr-s span{position:absolute;inset:auto 0 0;background:rgba(53,43,40,.7);color:#fff;font-size:10px;text-align:center;padding:2px}
#nr-ui small{display:block;opacity:.8;margin:.3rem 0 .6rem}html.nr-ed :is(p,h1,h2,h3,span,b,small,figcaption,li,div.tulis):hover{outline:2px dashed #E5718A;cursor:text}</style>`);
D.body.insertAdjacentHTML("beforeend",`<div id="nr-badge">● DEMO PREVIEW</div><div id="nr-bar"><button id="nr-open">✏️ Sesuaikan</button><a href="../../index.html#catalog">← Toko</a></div>
<div id="nr-ui" role="dialog" aria-label="Sesuaikan demo"><h3>Sesuaikan demo 💗</h3><label>Nama penerima<input type="text" id="nr-n" maxlength="30" placeholder="Ketik nama..."></label>
${keys.length?`<label>Foto (ketuk untuk ganti)</label><div id="nr-p"></div>`:""}<button id="nr-e">✏️ Edit teks: mati</button><small>Kalau menyala, ketuk tulisan di halaman lalu ketik pesanmu sendiri.</small><button id="nr-r">↺ Reset</button></div>`);
const ui=$("#nr-ui"),n=$("#nr-n");n.value=to;$("#nr-open").onclick=()=>ui.classList.toggle("on");
n.oninput=()=>{to=n.value.trim().slice(0,30);const u=new URL(location.href);to?u.searchParams.set("to",to):u.searchParams.delete("to");history.replaceState(null,"",u);swap(D.body)};
const P=$("#nr-p");P&&keys.forEach(k=>{const l=D.createElement("label");l.className="nr-s";l.innerHTML=`<img src="${k}" alt=""><span>ganti</span><input type="file" accept="image/*" hidden>`;P.appendChild(l);
$("input",l).onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,1000/Math.max(im.width,im.height)),c=D.createElement("canvas");c.width=im.width*s;c.height=im.height*s;c.getContext("2d").drawImage(im,0,0,c.width,c.height);PH[k]=c.toDataURL("image/jpeg",.85);$("img",l).src=PH[k];patch()};im.src=r.result};r.readAsDataURL(f)}});
$("#nr-e").onclick=e=>{edit=!edit;D.documentElement.classList.toggle("nr-ed",edit);e.target.textContent="✏️ Edit teks: "+(edit?"NYALA":"mati");if(!edit)D.querySelectorAll("[contenteditable]").forEach(x=>x.removeAttribute("contenteditable"))};
$("#nr-r").onclick=()=>location.href=location.pathname;
const SEL="p,h1,h2,h3,h4,span,b,i,small,figcaption,li,.tulis,blockquote";
const hit=e=>{if(!edit||e.target.closest("#nr-ui,#nr-bar"))return null;const t=e.target.closest(SEL);return t&&t.textContent.trim()?t:null};
["pointerdown","mousedown","touchstart"].forEach(ev=>D.addEventListener(ev,e=>{if(hit(e))e.stopPropagation()},true));
D.addEventListener("click",e=>{const t=hit(e);if(!t)return;e.preventDefault();e.stopPropagation();t.contentEditable="true";t.focus()},true)})();
