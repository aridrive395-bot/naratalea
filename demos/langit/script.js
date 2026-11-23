/* ============================================================
   ISI WEBSITE: edit semua teks di sini
   ============================================================ */
const CONFIG = {
  judul: "Langit yang Sama",
  prolog: [
    "Untuk Nama,",
    "Ada hal-hal yang tidak sempat selesai diucapkan.",
    "Jadi aku menuliskannya di langit.",
    "Supaya di mana pun kamu berada, kita tetap berbagi satu atap yang sama.",
    "Pelan-pelan saja, ya.",
  ],
  // x & y = posisi bintang (0-100). Enam bintang membentuk hati jika diurutkan seperti ini.
  memori: [
    { x: 50, y: 88, tgl: "12 Maret 2022", judul: "Pertama kali", teks: "Aku gugup sepanjang jalan, tapi kamu bikin semuanya terasa mudah.", foto: "assets/images/foto1.jpg" },
    { x: 14, y: 52, tgl: "2 Juni 2022", judul: "Makan malam", teks: "Kita bicara sampai restorannya hampir tutup.", foto: "assets/images/foto2.jpg" },
    { x: 28, y: 16, tgl: "20 Agustus 2022", judul: "Hujan", teks: "Berteduh berjam-jam, dan aku tidak ingin hujannya berhenti.", foto: "assets/images/foto3.jpg" },
    { x: 50, y: 38, tgl: "5 Oktober 2022", judul: "Foto buram", teks: "Fotonya buram, tapi itu yang paling jujur.", foto: "assets/images/foto4.jpg" },
    { x: 72, y: 16, tgl: "31 Desember 2022", judul: "Pulang larut", teks: "Satu lagu dari dua earphone, jalanan sepi.", foto: "assets/images/foto5.jpg" },
    { x: 86, y: 52, tgl: "14 Februari 2023", judul: "Tertawa", teks: "Aku lupa lucunya apa. Yang kuingat cuma tawamu.", foto: "assets/images/foto6.jpg" },
  ],
  // 8 fase bulan: urutan dari bulan baru sampai sabit akhir
  fase: [
    { nama: "Bulan Baru", tgl: "Maret 2022", teks: "Semuanya dimulai dari langit yang gelap, dan satu sapaan kecil." },
    { nama: "Sabit Awal", tgl: "April 2022", teks: "Kita masih canggung, tapi diam-diam saling mencari." },
    { nama: "Perempat Awal", tgl: "Juni 2022", teks: "Setengah dari cerita sudah kita bagi malam itu." },
    { nama: "Cembung Awal", tgl: "Agustus 2022", teks: "Hari-hari biasa mulai terasa seperti rumah." },
    { nama: "Purnama", tgl: "Oktober 2022", teks: "Terang sekali. Kupikir waktu akan selalu seperti ini." },
    { nama: "Cembung Akhir", tgl: "Desember 2022", teks: "Cahayanya masih penuh, tapi kita mulai belajar melepas." },
    { nama: "Perempat Akhir", tgl: "Februari 2023", teks: "Tidak apa-apa. Setiap bulan memang berganti bentuk." },
    { nama: "Sabit Akhir", tgl: "Akhir 2023", teks: "Tinggal garis tipis, dan aku bersyukur pernah menyala bersamamu." },
  ],
  surat: [
    "Untuk Nama,",
    "Aku tidak tahu kapan surat ini sampai padamu, atau apakah kamu akan membacanya sampai habis. Tidak apa-apa. Aku menulisnya supaya semuanya terasa selesai dengan baik.",
    "Banyak hal yang ingin kusampaikan, tapi aku memilih yang paling jujur: aku bersyukur pernah mengenalmu. Kamu mengajariku tentang sabar, tentang berani, dan tentang menikmati hari yang biasa-biasa saja.",
    "Kalau ada hal yang dulu kurang baik dariku, aku minta maaf. Dan kalau ada hal baik yang tersisa, semoga itu cukup untuk dikenang tanpa rasa berat.",
    "Aku harap kamu bahagia, dikelilingi orang-orang yang menyayangimu, dan selalu punya alasan untuk tersenyum.",
    "Dengan hangat,<br>Namamu",
  ],
  kata: [
    { k: "tawa", t: "terima kasih untuk tawa di hari-hari biasa" },
    { k: "cerita", t: "terima kasih untuk cerita yang pernah kita bagi" },
    { k: "sabar", t: "terima kasih untuk sabar yang kamu ajarkan" },
    { k: "hujan", t: "terima kasih untuk hujan yang kita tunggu bersama" },
    { k: "lagu", t: "terima kasih untuk lagu yang masih kuingat" },
    { k: "pelajaran", t: "terima kasih untuk pelajaran yang kubawa sampai sekarang" },
    { k: "kenangan", t: "terima kasih untuk kenangan yang tetap baik" },
  ],
  akhir: "Semoga kamu selalu baik-baik saja, di mana pun kamu berada.",
};
/* ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const tunggu = (ms) => new Promise((r) => setTimeout(r, ms));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const lagu = $("#lagu"), adegan = $$(".adegan"), terbuka = new Set();
let kini = 0, sibuk = false, terbukaGerbang = false;

/* ====================  Langit: bintang, bintang jatuh, partikel  ==================== */
const cv = $("#langit"), cx = cv.getContext("2d"), dpr = Math.min(devicePixelRatio || 1, 2);
let W, H, warp = 0, mx = 0, my = 0, tx = 0, ty = 0, part = [], jatuh = [], tJatuh = 4000;
const Z = 1000, acak = (a, b) => a + Math.random() * (b - a);
const baru = () => ({ x: acak(-1300, 1300), y: acak(-1300, 1300), z: acak(1, Z), p: acak(0, 6), w: Math.random() < 0.12 ? "#ffe3a3" : Math.random() < 0.1 ? "#c9b6ff" : "#ffffff" });
const bintang = Array.from({ length: reduce ? 120 : 300 }, baru);
function ukur() { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
addEventListener("resize", ukur); ukur();
addEventListener("pointermove", (e) => {
  tx = e.clientX / W - 0.5; ty = e.clientY / H - 0.5;
  if (e.pointerType === "mouse" && Math.random() < 0.5) ledak(e.clientX, e.clientY, 1, "#ffe3a3", 0.8);
});
function ledak(x, y, n, warna, kec = 3, g = 0) {
  for (let i = 0; i < n; i++) {
    const a = acak(0, 6.28), v = acak(0.3, 1) * kec;
    part.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, c: warna, g, s: acak(1, 2.6) });
  }
}
function kembangApi(x, y) {
  const w = ["#ffe3a3", "#c9b6ff", "#ffffff", "#ffb8d1", "#9fc5ff"][Math.floor(Math.random() * 5)];
  ledak(x, y, 56, w, 5.5, 0.07);
}
function gambar(t) {
  cx.clearRect(0, 0, W, H);
  warp += (0 - warp) * 0.03; mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
  const v = 0.35 + warp;
  for (const s of bintang) {
    s.z -= v; if (s.z < 1) Object.assign(s, baru(), { z: Z });
    const d = 1 - s.z / Z, k = 520 / s.z, sx = W / 2 + s.x * k + mx * d * 70, sy = H / 2 + s.y * k + my * d * 70;
    if (sx < -50 || sx > W + 50 || sy < -50 || sy > H + 50) continue;
    cx.globalAlpha = Math.min(1, d * (0.55 + 0.45 * Math.sin(t / 700 + s.p)) * 1.4); cx.fillStyle = cx.strokeStyle = s.w;
    if (v > 3) { const k2 = 520 / (s.z + v * 2.4); cx.lineWidth = 0.4 + d * 1.2; cx.beginPath(); cx.moveTo(W / 2 + s.x * k2 + mx * d * 70, H / 2 + s.y * k2 + my * d * 70); cx.lineTo(sx, sy); cx.stroke(); }
    else { cx.beginPath(); cx.arc(sx, sy, 0.4 + d * 1.6, 0, 6.3); cx.fill(); }
  }
  if (!reduce && t > tJatuh) { tJatuh = t + acak(6000, 12000); jatuh.push({ x: acak(W * 0.3, W), y: acak(0, H * 0.35), vx: -acak(7, 11), vy: acak(3, 5), l: 1 }); }
  jatuh = jatuh.filter((s) => s.l > 0);
  for (const s of jatuh) {
    s.x += s.vx; s.y += s.vy; s.l -= 0.012;
    const g = cx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
    g.addColorStop(0, `rgba(255,240,200,${s.l})`); g.addColorStop(1, "rgba(255,240,200,0)");
    cx.globalAlpha = 1; cx.strokeStyle = g; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(s.x, s.y); cx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9); cx.stroke();
  }
  part = part.filter((p) => p.l > 0);
  for (const p of part) {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= 0.985; p.l -= 0.014;
    cx.globalAlpha = Math.max(p.l, 0); cx.fillStyle = p.c; cx.beginPath(); cx.arc(p.x, p.y, p.s, 0, 6.3); cx.fill();
  }
  cx.globalAlpha = 1; requestAnimationFrame(gambar);
}
requestAnimationFrame(gambar);
addEventListener("click", (e) => { if (!e.target.closest("button, input, textarea, #mem")) ledak(e.clientX, e.clientY, 8, "#ffe3a3", 2.4); });

/* ====================  Musik  ==================== */
function setMain(v) { $("#musik").classList.toggle("jalan", v); $("#musik").setAttribute("aria-label", v ? "Jeda musik" : "Putar musik"); }
lagu.addEventListener("play", () => setMain(true)); lagu.addEventListener("pause", () => setMain(false));
$("#musik").onclick = () => (lagu.paused ? lagu.play().catch(() => {}) : lagu.pause());

/* ====================  Gerbang: tahan untuk membuka  ==================== */
$("#jdl").textContent = CONFIG.judul;
let prog = 0, menahan = false, ticking = false;
function tick() {
  prog = Math.min(1, Math.max(0, prog + (menahan ? 1 / 84 : -1 / 36)));
  $("#prog").style.strokeDashoffset = 339.3 * (1 - prog); lagu.volume = prog * 0.7;
  if (prog >= 1 && !terbukaGerbang) { terbukaGerbang = true; selesaiGerbang(); return; }
  if (prog <= 0 && !menahan) { ticking = false; if (!terbukaGerbang) lagu.pause(); return; }
  requestAnimationFrame(tick);
}
function mulaiTahan() {
  if (terbukaGerbang) return; menahan = true;
  if (lagu.paused) { lagu.volume = 0; lagu.play().catch(() => {}); }
  if (!ticking) { ticking = true; requestAnimationFrame(tick); }
}
function lepas() {
  if (terbukaGerbang || !menahan) return; menahan = false;
  if (prog < 0.5) { const p = $("#petunjuk"); p.textContent = "tahan lebih lama…"; p.classList.remove("gagal"); void p.offsetWidth; p.classList.add("gagal"); }
}
$("#tahan").addEventListener("pointerdown", (e) => { e.preventDefault(); mulaiTahan(); });
["pointerup", "pointerleave", "pointercancel"].forEach((ev) => $("#tahan").addEventListener(ev, lepas));
$("#tahan").addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && !e.repeat) { e.preventDefault(); mulaiTahan(); } });
$("#tahan").addEventListener("keyup", lepas);
function selesaiGerbang() {
  lagu.volume = 0.7; if (lagu.paused) lagu.play().catch(() => {});
  $("#musik").hidden = false; $("#nav").classList.add("tampil");
  ledak(W / 2, H / 2, 60, "#ffe3a3", 6, 0.02); pergi(1);
}

/* ====================  Navigasi adegan  ==================== */
$("#titik").innerHTML = adegan.slice(1).map(() => "<i></i>").join("");
let timerLewati;
function perbarui() {
  const buka = terbuka.has(kini);
  $$("#titik i").forEach((d, i) => d.classList.toggle("on", i + 1 === kini));
  $("#prev").disabled = kini <= 1; $("#next").disabled = !buka || kini >= adegan.length - 1;
  $("#next").classList.toggle("siap", buka && kini < adegan.length - 1);
  $("#syarat").textContent = buka || kini === 0 ? "" : adegan[kini].dataset.syarat || "";
  $("#lewati").hidden = true; clearTimeout(timerLewati);
  if (!buka && kini > 0) timerLewati = setTimeout(() => !terbuka.has(kini) && ($("#lewati").hidden = false), 14000);
}
function buka(i) { if (terbuka.has(i)) return; terbuka.add(i); if (kini === i) perbarui(); }
$("#lewati").onclick = () => buka(kini);
function pergi(n) {
  if (sibuk || n < 0 || n >= adegan.length || n === kini) return;
  sibuk = true; warp = reduce ? 0 : 22;
  adegan[kini].classList.remove("aktif"); kini = n; adegan[n].classList.add("aktif"); perbarui();
  (init[n] || (() => {}))();
  setTimeout(() => (sibuk = false), 1000);
}
$("#next").onclick = () => pergi(kini + 1); $("#prev").onclick = () => pergi(kini - 1);
addEventListener("keydown", (e) => {
  if (e.target.matches("textarea, input[type=range]")) return;
  if (e.key === "ArrowRight" && !$("#next").disabled) pergi(kini + 1);
  if (e.key === "ArrowLeft" && !$("#prev").disabled) pergi(kini - 1);
  if (e.key === "Escape") tutupMem();
});

/* ====================  Adegan 1: prolog  ==================== */
let prologSudah = false;
async function initProlog() {
  const box = $("#prolog");
  if (prologSudah) return; prologSudah = true;
  box.innerHTML = CONFIG.prolog.map((t) => `<p>${t}</p>`).join("");
  await tunggu(1400);
  for (const p of $$("p", box)) { p.classList.add("tampil"); await tunggu(reduce ? 200 : 2600); }
  buka(1);
}

/* ====================  Adegan 2: rasi bintang  ==================== */
const ketemu = new Set(); let petaDibuat = false;
function initPeta() {
  if (!petaDibuat) {
    petaDibuat = true; const peta = $("#peta"), n = CONFIG.memori.length;
    let svg = `<path class="isi-hati" id="hatiIsi" d="M${CONFIG.memori.map((m) => m.x + " " + m.y).join(" L")} Z"/>`;
    for (let i = 0; i < n; i++) { const a = CONFIG.memori[i], b = CONFIG.memori[(i + 1) % n]; svg += `<path id="gr${i}" d="M${a.x} ${a.y} L${b.x} ${b.y}"/>`; }
    $("#garis").innerHTML = svg;
    CONFIG.memori.forEach((m, i) => {
      const b = document.createElement("button"); b.className = "bs"; b.type = "button"; b.setAttribute("aria-label", "Bintang kenangan " + (i + 1));
      b.style.left = m.x + "%"; b.style.top = m.y + "%"; b.innerHTML = `<small>${m.judul}</small>`;
      b.onclick = () => bukaMem(i, b); peta.appendChild(b);
    });
  }
  $("#hitung").textContent = `${ketemu.size} / ${CONFIG.memori.length} bintang ditemukan`;
}
function bukaMem(i, tombol) {
  const m = CONFIG.memori[i]; $("#memTgl").textContent = m.tgl; $("#memJudul").textContent = m.judul; $("#memTeks").textContent = m.teks;
  const f = $("#memFoto"); f.className = "foto"; f.innerHTML = `<img src="${m.foto}" alt="${m.judul}">`;
  $("img", f).onerror = () => { f.classList.add("kosong"); f.textContent = "taruh foto di " + m.foto; };
  $("#mem").classList.add("tampil");
  const r = tombol.getBoundingClientRect(); ledak(r.left + 28, r.top + 28, 24, "#ffe3a3", 3);
  ketemu.add(i); tombol.classList.add("ketemu");
  const n = CONFIG.memori.length;
  for (let k = 0; k < n; k++) if (ketemu.has(k) && ketemu.has((k + 1) % n)) $("#gr" + k).classList.add("on");
  $("#hitung").textContent = `${ketemu.size} / ${n} bintang ditemukan`;
  if (ketemu.size === n) { $("#hatiIsi").classList.add("on"); $("#hitung").textContent = "rasi hatinya lengkap ♡"; setTimeout(() => (kembangApi(W / 2, H * 0.4), buka(2)), 600); }
}
function tutupMem() { $("#mem").classList.remove("tampil"); }
$("#tutupMem").onclick = tutupMem; $("#mem").onclick = (e) => { if (e.target.id === "mem") tutupMem(); };

/* ====================  Adegan 3: fase bulan  ==================== */
const GESER = [0, -35, -55, -80, -100, 80, 55, 35];
let faseDibuat = false;
function setFase(i) {
  const f = CONFIG.fase[i]; $("#bayang").style.setProperty("--s", GESER[i] + "%");
  const t = $("#fteks"); t.style.opacity = 0;
  setTimeout(() => { $("#fnama").textContent = f.nama; $("#ftgl").textContent = f.tgl; t.textContent = f.teks; t.style.opacity = 1; }, 180);
  if (i === CONFIG.fase.length - 1) { buka(3); kembangApi(W / 2, H * 0.3); }
}
function initFase() { if (faseDibuat) return; faseDibuat = true; $("#fase").max = CONFIG.fase.length - 1; $("#fase").oninput = (e) => setFase(+e.target.value); setFase(0); }

/* ====================  Adegan 4: lentera harapan  ==================== */
let jmlHarapan = 0;
$("#terbang").onclick = () => {
  const ta = $("#harap"), teks = ta.value.trim();
  if (!teks) { ta.focus(); return; }
  const l = document.createElement("div"); l.className = "lentera"; l.textContent = teks; l.style.setProperty("--dx", acak(-60, 60) + "px");
  document.body.appendChild(l); setTimeout(() => l.remove(), 7200);
  ledak(W / 2, H * 0.68, 40, "#ffe3a3", 4, -0.01); ta.value = ""; jmlHarapan++;
  $("#harapInfo").textContent = `${jmlHarapan} harapan sudah terbang ke langit`; buka(4);
};

/* ====================  Adegan 5: surat  ==================== */
let suratSudah = false;
async function initSurat() {
  const box = $("#surat");
  if (suratSudah) return; suratSudah = true;
  box.innerHTML = CONFIG.surat.map((t) => `<p class="par">${t}</p>`).join("");
  await tunggu(1300);
  for (const p of $$(".par", box)) { p.classList.add("tampil"); p.scrollIntoView({ behavior: "smooth", block: "nearest" }); await tunggu(reduce ? 200 : 3200); }
  buka(5);
}

/* ====================  Adegan 6: kata melayang  ==================== */
let kataDibuat = false, pecah = 0;
function initKata() {
  if (kataDibuat) return; kataDibuat = true; const awan = $("#awan"), n = CONFIG.kata.length;
  CONFIG.kata.forEach((k, i) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "kata"; b.textContent = k.k;
    b.style.left = 6 + (i % 3) * 32 + acak(-3, 3) + "%"; b.style.top = 6 + Math.floor(i / 3) * 30 + acak(-4, 4) + "%";
    b.style.setProperty("--d", acak(3, 5.5) + "s");
    b.onclick = () => {
      const r = b.getBoundingClientRect(); ledak(r.left + r.width / 2, r.top + r.height / 2, 26, "#ffe3a3", 3.5);
      b.classList.add("pecah"); const p = $("#pesanTerima"); p.style.opacity = 0;
      setTimeout(() => { p.textContent = k.t; p.style.opacity = 1; }, 250);
      pecah++; $("#hitungKata").textContent = `${pecah} / ${n}`;
      if (pecah === n) setTimeout(() => (kembangApi(W / 2, H * 0.35), buka(6)), 900);
    };
    awan.appendChild(b);
  });
  $("#hitungKata").textContent = `0 / ${n}`;
}

/* ====================  Adegan 7: penutup  ==================== */
$("#akhirTeks").textContent = CONFIG.akhir;
function initAkhir() {
  buka(7); let n = 0;
  const id = setInterval(() => { kembangApi(acak(W * 0.2, W * 0.8), acak(H * 0.15, H * 0.5)); if (++n > 6 || kini !== 7) clearInterval(id); }, 700);
  setTimeout(() => $("#nav").classList.add("tampil"), 0);
}
$("#a7").addEventListener("click", (e) => { if (!e.target.closest("button")) kembangApi(e.clientX, e.clientY); });
$("#ulang").onclick = () => { warp = reduce ? 0 : 30; pergi(2); };

const init = { 1: initProlog, 2: initPeta, 3: initFase, 5: initSurat, 6: initKata, 7: initAkhir };
perbarui();
