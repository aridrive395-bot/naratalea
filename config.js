/* ===== SATU TEMPAT UNTUK EDIT: brand, kontak, harga, paket, produk =====
   LINK DEMO: di setiap produk, isi  demo: "birthday" (folder di /demos)
   ATAU tempel link website kamu, contoh  demo: "https://websitekamu.com/ultah"
   Kalau template-mu mendukung nama, link otomatis ditambah  ?to=NamaPelanggan
   Kosongkan (null) kalau demo belum ada.  */
const NARA = {
  brand: "NARA STUDIO",
  tagline: "Little websites, meaningful stories.",
  wa: "6285169576067",            // GANTI: nomor WhatsApp (format 62...)
  ig: "@akun.instagram",         // GANTI
  email: "email@domainanda.com", // GANTI
  prices: { basic: 29000, premium: 49000, deluxe: 79000, custom: 99000 },
  packages: [
    { id: "basic", name: "Basic", items: ["Website ucapan sederhana", "Template pilihan", "Nama & pesan personal", "Link website"] },
    { id: "premium", name: "Premium", featured: true, items: ["Semua fitur Basic", "Galeri foto", "Animasi tambahan", "Musik opsional", "Desain lebih lengkap"] },
    { id: "deluxe", name: "Deluxe", items: ["Semua fitur Premium", "Lebih banyak halaman", "Fitur interaktif", "Ornamen tambahan", "Prioritas pengerjaan"] },
    { id: "custom", name: "Custom", from: true, items: ["Desain sesuai permintaan", "Layout khusus", "Fitur sesuai kebutuhan", "Harga sesuai tingkat kesulitan"] }
  ],
  categories: [
    ["birthday", "Birthday Wishes", "Kejutan ulang tahun yang bisa dibuka satu per satu."],
    ["anniversary", "Anniversary", "Perjalanan cerita berdua dalam satu halaman."],
    ["scrapbook", "Digital Scrapbook", "Memory book penuh foto, tape, dan catatan."],
    ["letter", "Love Letters", "Surat digital yang dibuka seperti amplop."],
    ["graduation", "Graduation", "Rayakan pencapaian dengan manis."],
    ["friendship", "Friendship", "Untuk sahabat yang selalu ada."],
    ["custom", "Custom Website", "Dirancang khusus sesuai ceritamu."]
  ],
  products: [
    { id: "p1", img: "assets/images/foto1.jpg", name: "Candle & Wish", cat: "birthday", tier: "basic", label: "Best Seller", date: "2026-09-01", pop: 98, demo: "birthday", desc: "Tiup lilin digital, lalu baca ucapan yang tersembunyi.", features: ["Animasi lilin interaktif", "Ucapan personal", "Responsif HP"] },
    { id: "p2", img: "assets/images/foto2.jpg", name: "Confetti Letters", cat: "birthday", tier: "premium", label: "Popular", date: "2026-08-10", pop: 90, demo: "birthday", desc: "Ucapan berbentuk kartu-kartu kecil yang bisa dibuka.", features: ["10 kartu ucapan", "Galeri foto", "Musik opsional"] },
    { id: "p3", img: "assets/images/foto3.jpg", name: "Our Timeline", cat: "anniversary", tier: "premium", label: "New Arrival", date: "2026-11-15", pop: 80, demo: "anniversary", desc: "Linimasa romantis dari hari pertama hingga hari ini.", features: ["Timeline momen", "Penghitung hari", "Galeri foto"] },
    { id: "p4", img: "assets/images/foto4.jpg", name: "Forever Yours", cat: "anniversary", tier: "deluxe", label: "Popular", date: "2026-07-20", pop: 85, demo: "anniversary", desc: "Multi-halaman dengan musik dan pesan rahasia.", features: ["Multi halaman", "Pesan rahasia", "Prioritas pengerjaan"] },
    { id: "p5", img: "assets/images/foto5.jpg", name: "Memory Book", cat: "scrapbook", tier: "deluxe", label: "Best Seller", date: "2026-10-05", pop: 95, demo: "scrapbook", desc: "Scrapbook digital dengan polaroid, tape, dan catatan tangan.", features: ["Halaman bisa dibalik", "Polaroid & tape", "Musik opsional"] },
    { id: "p6", img: "assets/images/foto6.jpg", name: "Sealed with Love", cat: "letter", tier: "basic", label: "", date: "2026-06-12", pop: 60, demo: null, desc: "Surat digital yang dibuka dari amplop berstempel.", features: ["Animasi amplop", "Pesan panjang", "Stempel tanggal"] },
    { id: "p7", img: "assets/images/foto1.jpg", name: "Toga Day", cat: "graduation", tier: "premium", label: "New Arrival", date: "2026-11-01", pop: 55, demo: null, desc: "Ucapan wisuda dengan galeri perjalanan kuliah.", features: ["Galeri kampus", "Ucapan keluarga", "Countdown"] },
    { id: "p8", img: "assets/images/foto2.jpg", name: "Dear Bestie", cat: "friendship", tier: "basic", label: "", date: "2026-05-02", pop: 50, demo: null, desc: "Kenangan persahabatan dalam format ringan dan manis.", features: ["Kenangan bersama", "Pesan personal", "Link mudah dibagikan"] },
    { id: "p9", img: "assets/images/foto3.jpg", name: "A Little Book of Memories", cat: "scrapbook", tier: "deluxe", label: "New Arrival", date: "2026-11-23", pop: 99,
      demo: "memories", desc: "Scrapbook digital dengan polaroid, tiket, koran kenangan, peta, dan radio lagu.",
      features: ["Polaroid & tiket bioskop", "Koran kenangan", "Peta tempat kita", "Musik & stiker interaktif"] },
    { id: "p10", img: "assets/images/foto4.jpg", name: "Memory Book Journey", cat: "scrapbook", tier: "deluxe", label: "Best Seller", date: "2026-11-22", pop: 97,
      demo: "https://aridrive395-bot.github.io/web-testing-2/", desc: "Buku kenangan 14 halaman: galeri foto, kartu gosok, kuis, toples harapan, dan surat.",
      features: ["14 halaman interaktif", "Kartu gosok & kuis kecil", "Toples harapan", "Surat penutup & musik"] },
    { id: "p11", img: "assets/images/foto5.jpg", name: "Langit yang Sama", cat: "letter", tier: "premium", label: "Popular", date: "2026-11-21", pop: 92,
      demo: "langit", desc: "Surat di langit malam: rasi bintang kenangan, fase bulan, dan lentera harapan.",
      features: ["Rasi bintang interaktif", "Lentera harapan", "Kembang api & musik"] }
  ],
  testimonials: [ // CONTOH DEMO, bukan ulasan asli
    { n: "Nama Contoh A", t: "Contoh teks testimoni. Ganti dengan ulasan asli pelanggan nanti.", s: 5 },
    { n: "Nama Contoh B", t: "Contoh teks testimoni kedua sebagai placeholder tampilan.", s: 5 },
    { n: "Nama Contoh C", t: "Contoh teks testimoni ketiga sebagai placeholder tampilan.", s: 4 }
  ]
};
