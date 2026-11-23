const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const ROOT=document.body.dataset.root||"",fmt=n=>"Rp"+n.toLocaleString("id-ID");
const price=p=>NARA.prices[p.tier];
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
let cart=store.get("nara_cart",[]),wish=store.get("nara_wish",[]);
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),2200)}
const COL={birthday:["#D8B8B2","#F8F4EC"],anniversary:["#C9A19A","#EDE4D8"],scrapbook:["#B9A58F","#F8F4EC"],letter:["#E3CFC4","#D8B8B2"],graduation:["#A99485","#EDE4D8"],friendship:["#D8B8B2","#B9A58F"],custom:["#79685C","#D8B8B2"]};
const art=(cat,txt="")=>{const[a,b]=COL[cat]||COL.custom;return"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='400' height='300' fill='url(#g)'/><rect x='110' y='60' width='180' height='180' fill='#fffcf7' transform='rotate(-5 200 150)'/><rect x='125' y='75' width='150' height='120' fill='${a}' opacity='.5' transform='rotate(-5 200 150)'/><text x='200' y='225' font-family='Georgia' font-style='italic' font-size='20' fill='#352B28' text-anchor='middle'>${txt}</text></svg>`)};
const catName=id=>(NARA.categories.find(c=>c[0]===id)||[])[1]||id;
const demoUrl=p=>!p.demo?null:/^https?:\/\//.test(p.demo)?p.demo:`${ROOT}demos/${p.demo}/index.html`;
function waLink(lines){return`https://wa.me/${NARA.wa}?text=${encodeURIComponent(lines)}`}
function orderOne(p,pkg){pkg=pkg||p.tier;open(waLink(`Halo ${NARA.brand}, saya ingin memesan:\n• ${p.name} (${catName(p.cat)})\n• Paket: ${pkg}\n• Harga: ${fmt(NARA.prices[pkg])}`),"_blank","noopener")}
/* ---- cart ---- */
function saveCart(){store.set("nara_cart",cart);drawCart()}
function addCart(id,pkg){cart.push({id,pkg:pkg||NARA.products.find(p=>p.id===id).tier});saveCart();toast("Ditambahkan ke keranjang")}
function drawCart(){const l=$("#dl");if(!l)return;let sum=0;l.innerHTML=cart.length?cart.map((c,i)=>{const p=NARA.products.find(x=>x.id===c.id);sum+=NARA.prices[c.pkg];return`<div class="ci"><span>${p.name}<br><small>${c.pkg}</small></span><span>${fmt(NARA.prices[c.pkg])} <button data-rm="${i}" aria-label="Hapus" class="cartbtn">✕</button></span></div>`}).join(""):"<p>Keranjang masih kosong.</p>";
$("#dt").textContent=fmt(sum);$$(".cc").forEach(e=>e.textContent=cart.length);$$("[data-rm]").forEach(b=>b.onclick=()=>{cart.splice(+b.dataset.rm,1);saveCart()})}
function checkout(){if(!cart.length)return toast("Keranjang kosong");const t=cart.map((c,i)=>{const p=NARA.products.find(x=>x.id===c.id);return`${i+1}. ${p.name} (${c.pkg}) - ${fmt(NARA.prices[c.pkg])}`}).join("\n");open(waLink(`Halo ${NARA.brand}, saya ingin memesan:\n${t}\nTotal: ${$("#dt").textContent}`),"_blank","noopener")}
/* ---- cards ---- */
function card(p){const w=wish.includes(p.id);return`<article class="card reveal"><div class="th"><img loading="lazy" src="${p.img?ROOT+p.img:art(p.cat,p.name)}" alt="Preview desain ${p.name}">${p.label?`<span class="tag">${p.label}</span>`:""}<button class="heart ${w?"on":""}" data-w="${p.id}" aria-label="Wishlist" aria-pressed="${w}">${w?"♥":"♡"}</button></div>
<div class="bd"><small class="eyebrow">${catName(p.cat)}</small><h3><a href="${ROOT}products/product-detail.html?id=${p.id}">${p.name}</a></h3><p>${p.desc}</p><div class="price">${fmt(price(p))}</div>
<div class="acts"><button class="btn" data-pv="${p.id}">Live Preview</button><button class="btn solid" data-or="${p.id}">Order Now</button></div></div></article>`}
function bind(scope=document){$$("[data-w]",scope).forEach(b=>b.onclick=()=>{const id=b.dataset.w,i=wish.indexOf(id);i<0?wish.push(id):wish.splice(i,1);store.set("nara_wish",wish);const on=i<0;b.classList.toggle("on",on);b.textContent=on?"♥":"♡";b.setAttribute("aria-pressed",on);toast(on?"Masuk wishlist":"Dihapus dari wishlist")});
$$("[data-pv]",scope).forEach(b=>b.onclick=()=>preview(NARA.products.find(x=>x.id===b.dataset.pv)));
$$("[data-or]",scope).forEach(b=>b.onclick=()=>orderOne(NARA.products.find(x=>x.id===b.dataset.or)));reveal(scope)}
let io;function reveal(s=document){io=io||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});$$(".reveal:not(.in)",s).forEach(e=>io.observe(e))}
/* ---- common chrome ---- */
window.addEventListener("load",()=>{$("#loader")?.classList.add("off");document.body.classList.add("ready")});
const hd=$("header"),topBtn=$("#top");addEventListener("scroll",()=>{hd.classList.toggle("solid",scrollY>30||hd.dataset.solid);topBtn.classList.toggle("show",scrollY>600)},{passive:true});hd.dataset.solid&&hd.classList.add("solid");
topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});
$(".burger").onclick=e=>{const o=$(".links").classList.toggle("open");e.currentTarget.classList.toggle("open",o);e.currentTarget.setAttribute("aria-expanded",o)};
$$(".links a").forEach(a=>a.addEventListener("click",()=>$(".links").classList.remove("open")));
$$(".cartbtn.open").forEach(b=>b.onclick=()=>$("#drawer").classList.add("open"));$("#dc").onclick=()=>$("#drawer").classList.remove("open");$("#co").onclick=checkout;
if(matchMedia("(hover:hover)").matches){const c=$("#cur");c.style.display="block";addEventListener("mousemove",e=>c.style.transform=`translate(${e.clientX-9}px,${e.clientY-9}px)`)}
$$("[data-wa]").forEach(a=>a.href=waLink(`Halo ${NARA.brand}, saya ingin bertanya.`));$$("[data-brand]").forEach(e=>e.textContent=NARA.brand);$$("[data-ig]").forEach(e=>e.textContent=NARA.ig);$$("[data-mail]").forEach(e=>{e.textContent=NARA.email;e.href="mailto:"+NARA.email});
drawCart();
/* ---- home page ---- */
if(document.body.dataset.page==="home"){
$("#cats").innerHTML=NARA.categories.map(c=>{const n=NARA.products.filter(p=>p.cat===c[0]).length;return`<button class="cat reveal" data-cat="${c[0]}"><img loading="lazy" src="${ROOT}assets/images/foto${NARA.categories.indexOf(c)%6+1}.jpg" alt="Kategori ${c[1]}"><div><h3>${c[1]}</h3><p>${c[2]}</p><small>${n?n+" desain":"Segera hadir"} · Explore →</small></div></button>`}).join("");
$("#fc").innerHTML='<option value="">Semua kategori</option>'+NARA.categories.map(c=>`<option value="${c[0]}">${c[1]}</option>`).join("");
$$("[data-cat]").forEach(b=>b.onclick=()=>{$("#fc").value=b.dataset.cat;st.shown=6;list();$("#catalog").scrollIntoView({behavior:"smooth"})});
const st={shown:6};
function list(){const q=$("#q").value.toLowerCase(),c=$("#fc").value,mx=+$("#fp").value||1e9,s=$("#so").value;
let a=NARA.products.filter(p=>(!c||p.cat===c)&&price(p)<=mx&&(p.name+p.desc+catName(p.cat)).toLowerCase().includes(q));
a.sort({pop:(x,y)=>y.pop-x.pop,new:(x,y)=>y.date.localeCompare(x.date),lo:(x,y)=>price(x)-price(y),hi:(x,y)=>price(y)-price(x)}[s]);
$("#pg").innerHTML=a.slice(0,st.shown).map(card).join("")||"<p>Tidak ada desain yang cocok.</p>";$("#more").hidden=a.length<=st.shown;bind($("#pg"))}
["input","change"].forEach(ev=>$(".tools").addEventListener(ev,()=>{st.shown=6;list()}));$("#more").onclick=()=>{st.shown+=6;list()};list();
$("#pk").innerHTML=NARA.packages.map(k=>`<div class="pkg reveal ${k.featured?"feat":""}"><h3>${k.name}</h3><div class="pr">${k.from?"Mulai ":""}${fmt(NARA.prices[k.id])}</div><ul>${k.items.map(i=>`<li>${i}</li>`).join("")}</ul><a class="btn" target="_blank" rel="noopener" href="${waLink(`Halo ${NARA.brand}, saya tertarik paket ${k.name}.`)}">Pilih ${k.name}</a></div>`).join("");
let ti=0;const T=NARA.testimonials;function tshow(){const t=T[ti];$("#tc").innerHTML=`<div class="av" role="img" aria-label="Avatar placeholder"></div><div class="stars" aria-label="${t.s} bintang">${"★".repeat(t.s)}${"☆".repeat(5-t.s)}</div><p>“${t.t}”</p><strong>${t.n}</strong><div class="demo">Contoh konten demo, bukan ulasan asli</div>`}
const tgo=d=>{ti=(ti+d+T.length)%T.length;tshow()};$("#tp").onclick=()=>tgo(-1);$("#tn").onclick=()=>tgo(1);tshow();setInterval(()=>tgo(1),6000);
$("#nl").onsubmit=e=>{e.preventDefault();toast("Terima kasih! (demo, belum tersimpan)");e.target.reset()};
$("#cform").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);open(waLink(`Halo, saya ${f.get("n")}.\n${f.get("m")}`),"_blank","noopener");e.target.reset()};
$("#cb").innerHTML=[["Birthday","birthday"],["Anniversary","anniversary"],["Scrapbook","scrapbook"],["Little Book","memories"],["Langit","langit"]].map(d=>`<button class="btn" data-d="${d[1]}">${d[0]} →</button>`).join("");
$$("[data-d]").forEach(b=>b.onclick=()=>{const n=$("#cn").value.trim().slice(0,30),u=new URL(`demos/${b.dataset.d}/index.html`,location.href);n&&u.searchParams.set("to",n);location.href=u.href});
reveal()}
/* ---- product detail ---- */
if(document.body.dataset.page==="detail"){const p=NARA.products.find(x=>x.id===new URLSearchParams(location.search).get("id"))||NARA.products[0],u=demoUrl(p);document.title=`${p.name} | ${NARA.brand}`;
$("#pd").innerHTML=`<div><img src="${p.img?ROOT+p.img:art(p.cat,p.name)}" alt="Screenshot ${p.name}" style="border-radius:6px;box-shadow:var(--sh)"><div class="mock" style="margin-top:2rem">${u?`<iframe src="${u}" title="Preview ${p.name}" loading="lazy"></iframe>`:`<div class="pscreen">Demo segera hadir</div>`}</div></div>
<div><small class="eyebrow">${catName(p.cat)} ${p.label?"· "+p.label:""}</small><h1 style="font-size:3rem;margin:.5rem 0">${p.name}</h1><p>${p.desc} Cocok untuk momen spesial yang ingin dibagikan lewat satu link.</p>
<h3 style="margin-top:1.5rem">Yang kamu dapat</h3><ul>${p.features.map(f=>`<li>${f}</li>`).join("")}<li>Link website personal siap dibagikan</li></ul><p><strong>Estimasi pengerjaan:</strong> placeholder 1-3 hari kerja</p>
<label>Pilih paket <select id="pp">${NARA.packages.map(k=>`<option value="${k.id}" ${k.id===p.tier?"selected":""}>${k.name} - ${fmt(NARA.prices[k.id])}</option>`).join("")}</select></label>
<div class="acts" style="margin-top:1.2rem"><button class="btn" id="lp">Live Preview</button><button class="btn solid" id="os">Order This Design</button><button class="btn" id="ac">+ Keranjang</button></div></div>`;
$("#lp").onclick=()=>preview(p);$("#os").onclick=()=>orderOne(p,$("#pp").value);$("#ac").onclick=()=>addCart(p.id,$("#pp").value);
$("#sim").innerHTML=NARA.products.filter(x=>x.cat===p.cat&&x.id!==p.id||x.id!==p.id).slice(0,3).map(card).join("");bind($("#sim"))}
/* ---- cute ornaments ---- */
(()=>{const sets=[["🎀","⭐","🌷","☁️","💌","🧸","✨","🍓"],["💗","✨","🌸","🎈","🐰","🍒"],["🍓","🧁","☁️","⭐","🎀"],["🌼","✨","💛","🦋","🌈","🐥"],["💌","🌷","✨","💗","🎀"],["☁️","⭐","🧸","💙"]];
$$("main>section").forEach((s,i)=>{const set=sets[i%sets.length],n=i?9:12;for(let k=0;k<n;k++){const o=document.createElement("span");o.className="orn";o.setAttribute("aria-hidden","true");o.textContent=set[k%set.length];const l=k%2===0;
o.style.cssText=`left:${l?1+Math.random()*5:92+Math.random()*5}%;top:${8+Math.random()*80}%;--s:${22+Math.random()*26}px;--r:${Math.round(Math.random()*30-15)}deg;animation-delay:-${(Math.random()*5).toFixed(1)}s`;s.appendChild(o)}});
const st=$(".stage");st&&st.insertAdjacentHTML("beforeend",'<div class="badge" aria-hidden="true">made with<br>love ♡</div><span class="orn" style="left:46%;top:4%;--s:30px">✨</span><span class="orn" style="left:2%;top:0;--s:34px">🎀</span><span class="orn" style="right:30%;bottom:6%;--s:30px">💖</span>')})();

/* ---- live preview dengan nama pelanggan ---- */
function preview(p){const u=demoUrl(p);if(!u)return toast("Demo untuk desain ini segera hadir");askName(n=>{store.set("nara_name",n);const x=new URL(u,location.href);x.searchParams.set("to",n);location.href=x.href})}
function askName(cb){let d=$("#nm");if(!d){d=document.createElement("dialog");d.id="nm";d.innerHTML='<form method="dialog"><h3>Coba dengan namamu 💗</h3><p>Ketik nama yang mau tampil di demo.</p><input id="nmi" maxlength="30" required placeholder="Contoh: Sinta" aria-label="Nama"><div class="acts"><button type="button" class="btn" id="nmx">Batal</button><button class="btn solid" value="ok">Lihat Demo</button></div></form>';document.body.appendChild(d);$("#nmx").onclick=()=>d.close();d.addEventListener("close",()=>{const v=$("#nmi").value.trim();if(d.returnValue==="ok"&&v)d._cb(v)})}
d._cb=cb;d.returnValue="";$("#nmi").value=store.get("nara_name","");d.showModal();$("#nmi").focus()}
