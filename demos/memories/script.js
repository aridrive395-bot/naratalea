/* ============================================================
   PENGATURAN: teks barang ada di index.html (cari komentar GANTI).
   Di sini hanya urutan "tur" kamera dan benang merah.
   ============================================================ */
const STOPS = [   // ids = barang yang ditampilkan kamera pada tahap itu
  { ids: ["t-judul"], nama: "Sampul" },
  { ids: ["t-intro"], nama: "Pesan pembuka" },
  { ids: ["p1", "p2", "p3"], nama: "Foto-foto · ketuk untuk membalik" },
  { ids: ["t-koran"], nama: "Berita kecil" },
  { ids: ["t-strip", "t-tiket"], nama: "Photobooth & tiket · tekan JEPRET" },
  { ids: ["t-kaset"], nama: "Kaset kita · ketuk untuk memutar" },
  { ids: ["t-peta"], nama: "Peta tempat kita" },
  { ids: ["n1", "n2", "n3", "n4"], nama: "Catatan tempel" },
  { ids: ["t-amplop"], nama: "Sebuah surat · ketuk amplopnya" },
  { ids: ["t-terima"], nama: "Terima kasih" },
  { ids: ["t-akhir"], nama: "Halaman terakhir" },
];
const TALI = [["t-judul", "t-intro"], ["t-intro", "p1"], ["p1", "p2"], ["p2", "p3"], ["p3", "t-koran"], ["t-koran", "t-strip"], ["t-strip", "t-tiket"], ["t-tiket", "t-kaset"], ["t-kaset", "t-peta"], ["t-peta", "n1"], ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n4", "t-amplop"], ["t-amplop", "t-terima"], ["t-terima", "t-akhir"]];
/* ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const tunggu = (ms) => new Promise((r) => setTimeout(r, ms));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const BW = 3000, BH = 2000, papan = $("#papan"), layar = $("#layar"), lagu = $("#lagu");
let cam = { x: 0, y: 0, s: 1 }, kini = -1;

/* ---------- Huruf potongan majalah ---------- */
const FONT = ["'Abril Fatface'", "'Bungee'", "'Special Elite'", "'Playfair Display'"];
const WARNA = [["#fff", "#1f1b16"], ["#f4d35e", "#1f1b16"], ["#e63946", "#fff"], ["#2b59c3", "#fff"], ["#1f1b16", "#f4d35e"], ["#f08bb0", "#1f1b16"], ["#efe9db", "#c0392b"]];
const biji = (n) => { let a = n + 1; return () => ((a = (a * 16807) % 2147483647) - 1) / 2147483646; };
$$(".ransom").forEach((el, k) => {
  const r = biji(k * 97 + 13);
  el.innerHTML = [...el.dataset.teks].map((c) => {
    if (c === " ") return '<span class="spasi"></span>';
    const [bg, fg] = WARNA[Math.floor(r() * WARNA.length)], f = FONT[Math.floor(r() * FONT.length)];
    return `<span style="font-family:${f};background:${bg};color:${fg};font-size:${(0.82 + r() * 0.4).toFixed(2)}em;transform:rotate(${(r() * 12 - 6).toFixed(1)}deg) translateY(${(r() * 8 - 4).toFixed(0)}px)">${c}</span>`;
  }).join("");
});
$$(".foto img").forEach((img) => {
  const kosong = () => { img.parentElement.classList.add("kosong"); img.remove(); };
  img.addEventListener("error", kosong); if (img.complete && img.naturalWidth === 0) kosong();
});

/* ---------- Kamera ---------- */
const smin = () => Math.min(innerWidth / BW, innerHeight / BH) * 0.92;
function terapkan(anim) {
  papan.classList.toggle("terbang", !!anim && !reduce);
  const vw = innerWidth, vh = innerHeight, w = BW * cam.s, h = BH * cam.s;
  cam.x = w <= vw ? (vw - w) / 2 : Math.min(80, Math.max(vw - w - 80, cam.x));
  cam.y = h <= vh ? (vh - h) / 2 : Math.min(80, Math.max(vh - h - 80, cam.y));
  papan.style.transform = `translate(${cam.x}px,${cam.y}px) scale(${cam.s})`;
}
function fokusBox(b, anim) {
  const vw = innerWidth, vh = innerHeight;
  cam.s = Math.max(smin(), Math.min((vw * 0.84) / b.w, (vh * 0.56) / b.h, 1.5));
  cam.x = vw / 2 - (b.x + b.w / 2) * cam.s; cam.y = vh * 0.44 - (b.y + b.h / 2) * cam.s;
  terapkan(anim);
}
function kotak(ids) {
  let x1 = 1e9, y1 = 1e9, x2 = -1, y2 = -1;
  ids.forEach((id) => { const e = document.getElementById(id); x1 = Math.min(x1, e.offsetLeft); y1 = Math.min(y1, e.offsetTop); x2 = Math.max(x2, e.offsetLeft + e.offsetWidth); y2 = Math.max(y2, e.offsetTop + e.offsetHeight); });
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}
function bekukan() { const m = new DOMMatrix(getComputedStyle(papan).transform); cam.x = m.m41; cam.y = m.m42; cam.s = m.a; terapkan(false); }
function zoomDi(px, py, f) {
  const ns = Math.min(2.6, Math.max(smin(), cam.s * f)), k = ns / cam.s;
  cam.x = px - (px - cam.x) * k; cam.y = py - (py - cam.y) * k; cam.s = ns; terapkan(false);
}
function tur(i, anim = true) {
  i = Math.max(0, Math.min(STOPS.length - 1, i)); kini = i; fokusBox(kotak(STOPS[i].ids), anim);
  $("#no").textContent = String(i + 1).padStart(2, "0"); $("#nama").textContent = STOPS[i].nama; $("#penanda").textContent = `${i + 1} / ${STOPS.length}`;
  $("#prev").disabled = i === 0; $("#next").disabled = i === STOPS.length - 1;
  if (i === 6) setTimeout(() => $(".peta").classList.add("hidup"), 1300);
  if (i === 10) setTimeout(() => serpih(60), 1500);
}
function semua() {
  kini = -1; fokusBox({ x: 0, y: 0, w: BW, h: BH }, true);
  $("#no").textContent = "▦"; $("#nama").textContent = "Semua barang · seret papan untuk menjelajah"; $("#penanda").textContent = "papan"; $("#prev").disabled = true; $("#next").disabled = false;
}
$("#next").onclick = () => tur(kini + 1); $("#prev").onclick = () => tur(kini - 1); $("#semua").onclick = semua;
$("#zm").onclick = () => { bekukan(); zoomDi(innerWidth / 2, innerHeight / 2, 1.3); }; $("#zk").onclick = () => { bekukan(); zoomDi(innerWidth / 2, innerHeight / 2, 1 / 1.3); };
addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") tur(kini + 1); if (e.key === "ArrowLeft" && kini > 0) tur(kini - 1);
  if (e.key === "Escape") tutupSurat();
});
addEventListener("resize", () => (kini >= 0 ? tur(kini, false) : fokusBox({ x: 0, y: 0, w: BW, h: BH }, false)));

/* ---------- Benang merah ---------- */
const NS = "http://www.w3.org/2000/svg", pasang = [];
TALI.forEach(([a, b], i) => {
  const svg = $("#tali"), ps = ["bayang", "benang"].map((k) => { const p = document.createElementNS(NS, "path"); p.setAttribute("class", k); p.setAttribute("pathLength", "1"); p.style.setProperty("--d", 0.3 + i * 0.12 + "s"); svg.appendChild(p); return p; });
  pasang.push([a, b, ...ps]);
});
function updateTali() {
  const titik = (id) => { const e = document.getElementById(id); return { x: e.offsetLeft + e.offsetWidth / 2, y: e.offsetTop + 3 }; };
  pasang.forEach(([a, b, p1, p2]) => {
    const A = titik(a), B = titik(b), d = Math.hypot(A.x - B.x, A.y - B.y), dd = `M${A.x} ${A.y} Q${(A.x + B.x) / 2} ${(A.y + B.y) / 2 + 30 + d * 0.12} ${B.x} ${B.y}`;
    p1.setAttribute("d", dd); p2.setAttribute("d", dd);
  });
}
updateTali();

/* ---------- Seret barang, geser papan, cubit untuk zoom ---------- */
const ptr = new Map(); let mode = null, geser = null, sx = 0, sy = 0, bx = 0, by = 0, pindah = false, pinch0 = null, zTop = 20, alat = null, tgtAwal = null;
layar.addEventListener("pointerdown", (e) => {
  if (e.button > 0) return;
  bekukan(); layar.setPointerCapture(e.pointerId); ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (ptr.size === 1) { pindah = false; tgtAwal = e.target; }
  if (ptr.size === 2) { mode = "pinch"; pinch0 = null; pindah = true; return; }
  const it = e.target.closest(".geser");
  if (it && !alat) { mode = "item"; geser = it; bx = it.offsetLeft; by = it.offsetTop; it.classList.add("angkat"); it.style.zIndex = ++zTop; }
  else { mode = "pan"; bx = cam.x; by = cam.y; }
  sx = e.clientX; sy = e.clientY;
});
layar.addEventListener("pointermove", (e) => {
  if (!ptr.has(e.pointerId)) return; ptr.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (mode === "pinch" && ptr.size === 2) {
    const [a, b] = [...ptr.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
    if (!pinch0) { pinch0 = { d, s: cam.s }; return; }
    zoomDi((a.x + b.x) / 2, (a.y + b.y) / 2, (pinch0.s * d) / pinch0.d / cam.s); return;
  }
  const dx = e.clientX - sx, dy = e.clientY - sy;
  if (Math.abs(dx) + Math.abs(dy) > 6) pindah = true; if (!pindah) return;
  if (mode === "item") { geser.style.left = bx + dx / cam.s + "px"; geser.style.top = by + dy / cam.s + "px"; updateTali(); }
  else if (mode === "pan") { cam.x = bx + dx; cam.y = by + dy; terapkan(false); }
});
function lepasPtr(e) {
  if (!ptr.has(e.pointerId)) return; ptr.delete(e.pointerId);
  if (mode === "item" && geser) geser.classList.remove("angkat");
  if (ptr.size === 0) {
    if (!pindah && mode !== "pinch" && e.type === "pointerup") klik(tgtAwal, e.clientX, e.clientY);
    mode = null; geser = null; pinch0 = null;
  } else if (ptr.size === 1) { const p = [...ptr.values()][0]; mode = "pan"; sx = p.x; sy = p.y; bx = cam.x; by = cam.y; pinch0 = null; pindah = true; }
}
layar.addEventListener("pointerup", lepasPtr); layar.addEventListener("pointercancel", lepasPtr);
layar.addEventListener("wheel", (e) => { e.preventDefault(); bekukan(); zoomDi(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 1 / 1.12); }, { passive: false });

/* ---------- Ketukan pada barang ---------- */
const aksi = {
  balik: (el) => el.classList.toggle("balik"),
  kaset: () => toggleRadio(), surat: () => bukaSurat(), awal: () => tur(0),
  jepret: (el) => {
    const s = el.closest(".strip"), f = $("#flash");
    f.classList.remove("on"); void f.offsetWidth; f.classList.add("on");
    s.classList.remove("hidup"); void s.offsetWidth; setTimeout(() => s.classList.add("hidup"), 250);
  },
};
function klik(t, x, y) {
  if (!t) return;
  if (alat) { tempel(x, y); return; }
  const a = t.closest("[data-aksi]"); if (a) { aksi[a.dataset.aksi](a); return; }
  const it = t.closest(".item");
  if (it) { const i = STOPS.findIndex((s) => s.ids.includes(it.id)); if (i >= 0) tur(i); }
}

/* ---------- Stiker ---------- */
const pilihan = $$("#nampan [data-s]");
$("#btnStiker").onclick = () => {
  const buka = $("#nampan").hidden; $("#nampan").hidden = !buka; $("#btnStiker").classList.toggle("on", buka);
  if (!buka) { alat = null; layar.classList.remove("stiker"); $("#hintStiker").hidden = true; pilihan.forEach((b) => b.classList.remove("on")); }
};
pilihan.forEach((b) => (b.onclick = () => {
  const sama = alat === b.dataset.s; pilihan.forEach((x) => x.classList.remove("on"));
  alat = sama ? null : b.dataset.s; b.classList.toggle("on", !sama); layar.classList.toggle("stiker", !!alat); $("#hintStiker").hidden = !alat;
}));
$("#hapusS").onclick = () => $$(".stk").forEach((e) => e.remove());
function tempel(x, y) {
  const e = document.createElement("span"), u = 54 + Math.random() * 34;
  e.className = "stk"; e.textContent = alat;
  e.style.cssText = `left:${(x - cam.x) / cam.s - u / 2}px;top:${(y - cam.y) / cam.s - u / 2}px;font-size:${u}px;transform:rotate(${Math.random() * 40 - 20}deg)`;
  papan.appendChild(e); if ($$(".stk").length > 80) $(".stk").remove();
}

/* ---------- Musik ----------
   #lagu  = suara latar (mulai saat sampul dibuka, tombol ♪ di atas mengontrolnya)
   #radio = suara kaset/radio (hanya mulai saat gambar kaset diketuk)
   Saat radio bunyi, suara latar dijeda; saat radio dihentikan, suara latar lanjut lagi. */
/* Kalau <audio id="radio"> belum ada di index.html, dibuat otomatis di sini supaya halaman tidak macet. */
const radio = $("#radio") || Object.assign(new Audio("assets/music/radio.mp3"), { loop: true, preload: "auto" });
let latarBolehLanjut = false;   // true setelah sampul dibuka & belum dijeda manual lewat tombol ♪
function setLatar(v) { $("#musik").classList.toggle("jalan", v); $("#musik").setAttribute("aria-label", v ? "Jeda musik" : "Putar musik"); }
function setRadio(v) { $(".kaset").classList.toggle("jalan", v); }
function toggleLatar() {
  if (!radio.paused) { radio.pause(); return; }            // kalau radio sedang bunyi, tombol ♪ menghentikannya & kembali ke latar
  if (lagu.paused) { latarBolehLanjut = true; lagu.play().catch(() => {}); }
  else { latarBolehLanjut = false; lagu.pause(); }
}
function toggleRadio() {
  if (radio.paused) { radio.play().catch(() => {}); }
  else { radio.pause(); }
}
lagu.addEventListener("play", () => setLatar(true)); lagu.addEventListener("pause", () => setLatar(false));
radio.addEventListener("play", () => { setRadio(true); lagu.pause(); });
radio.addEventListener("pause", () => { setRadio(false); if (latarBolehLanjut) lagu.play().catch(() => {}); });
$("#musik").onclick = toggleLatar; lagu.volume = 0.7; radio.volume = 0.9;

/* ---------- Surat ---------- */
let tokS = 0, lewatiS = false;
async function bukaSurat() {
  const id = ++tokS; lewatiS = false; $("#modal").classList.add("tampil");
  const teks = $$("#teksSurat p").map((p) => p.innerHTML.replace(/<br\s*\/?>/g, "\n")), box = $("#isiSurat");
  box.innerHTML = teks.map(() => "<p></p>").join(""); const els = $$("p", box);
  if (reduce) { els.forEach((e, i) => (e.textContent = teks[i])); return; }
  for (let i = 0; i < teks.length; i++) {
    els[i].classList.add("kursor");
    for (let k = 1; k <= teks[i].length; k++) {
      if (id !== tokS) return; if (lewatiS) break;
      els[i].textContent = teks[i].slice(0, k); await tunggu(/[.,]/.test(teks[i][k - 1]) ? 110 : 18);
    }
    els[i].textContent = teks[i]; els[i].classList.remove("kursor"); await tunggu(lewatiS ? 0 : 200);
  }
}
function tutupSurat() { tokS++; $("#modal").classList.remove("tampil"); }
$("#tutupSurat").onclick = tutupSurat;
$("#modal").onclick = (e) => { if (e.target.id === "modal") tutupSurat(); else lewatiS = true; };

/* ---------- Serpihan kertas ---------- */
function serpih(n) {
  const w = ["#e63946", "#f4d35e", "#2b59c3", "#f08bb0", "#ffffff", "#9ad9b4"];
  for (let i = 0; i < n; i++) {
    const e = document.createElement("i"); e.className = "serpih";
    e.style.cssText = `left:${Math.random() * 100}vw;width:${6 + Math.random() * 10}px;height:${10 + Math.random() * 14}px;background:${w[i % 6]};--d:${2.5 + Math.random() * 2}s;--x:${Math.random() * 160 - 80}px;--p:${Math.random() * 720}deg;animation-delay:${Math.random() * 0.8}s`;
    document.body.appendChild(e); setTimeout(() => e.remove(), 6200);
  }
}

/* ---------- Buka sampul ---------- */
fokusBox({ x: 0, y: 0, w: BW, h: BH }, false);
$("#bukaSurat").onclick = () => {
  $("#sampul").classList.add("buka"); latarBolehLanjut = true; lagu.play().catch(() => {});
  setTimeout(() => tur(0), 900); setTimeout(() => $("#sampul").remove(), 1900);
};
$("#prev").disabled = true;
