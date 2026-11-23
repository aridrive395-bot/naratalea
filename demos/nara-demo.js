/* Helper bersama untuk SEMUA demo: bar DEMO PREVIEW + nama yang bisa diganti pelanggan.
   Cara pakai di template: tulis <span data-nara="to">Nama Kamu</span> di tempat nama,
   <span data-nara="msg">teks default</span> untuk pesan, lalu pasang
   <script src="../nara-demo.js"></script> sebelum </body>. */
(()=>{const q=new URLSearchParams(location.search);
const S=window.NARA_DEMO={to:(q.get("to")||"").trim().slice(0,30)||"Nama Kamu",msg:(q.get("msg")||"").trim().slice(0,200)};
const fill=()=>{document.querySelectorAll('[data-nara="to"]').forEach(e=>e.textContent=S.to);
document.querySelectorAll('[data-nara="msg"]').forEach(e=>{if(S.msg)e.textContent=S.msg});
document.title=`Untuk ${S.to} | Demo NARA STUDIO`;document.dispatchEvent(new CustomEvent("nara:update",{detail:S}))};
fill();
if(self!==parent)return; // di dalam mockup HP toko: tanpa bar
const bar=document.createElement("div");
bar.style.cssText="position:sticky;top:0;z-index:9999;display:flex;flex-wrap:wrap;gap:.5rem;justify-content:space-between;align-items:center;padding:.5rem 1rem;background:#E5718A;color:#fff;font:600 .8rem/1.2 system-ui,sans-serif";
bar.innerHTML='<span>● DEMO PREVIEW</span><form style="display:flex;gap:.4rem;align-items:center;margin:0"><label>Nama: <input maxlength="30" style="padding:.3rem .7rem;border-radius:99px;border:0;font:inherit;color:#352B28;width:9rem"></label><button style="padding:.3rem .8rem;border-radius:99px;border:2px solid #fff;background:none;color:#fff;font:inherit;cursor:pointer">Ganti</button></form><a href="../../index.html#catalog" style="color:#fff;border:1px solid #fff;padding:.3rem .8rem;border-radius:99px;text-decoration:none">← Kembali ke toko</a>';
document.body.prepend(bar);
const f=bar.querySelector("form"),i=bar.querySelector("input");i.value=S.to==="Nama Kamu"?"":S.to;
f.onsubmit=e=>{e.preventDefault();const v=i.value.trim().slice(0,30);if(!v)return;S.to=v;const u=new URL(location.href);u.searchParams.set("to",v);history.replaceState(null,"",u);fill()}})();
