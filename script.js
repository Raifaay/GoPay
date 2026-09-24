// ===== 1. SELEKSI ELEMEN =====
const saldoEl = document.getElementById("saldo");
const btnMata = document.getElementById("btn-mata");
const btnTopup = document.getElementById("btn-topup");
const btnTarik = document.getElementById("btn-tarik");
const btnBantuan = document.getElementById("btn-bantuan");
const btnQris = document.getElementById("btn-qris");
const gridLayanan = document.getElementById("grid-layanan");
const banner = document.getElementById("banner");
const overlay = document.getElementById("overlay");
const btnTutup = document.getElementById("btn-tutup");
const btnKonfirmasi = document.getElementById("btn-konfirmasi");
const toast = document.getElementById("toast");
const semuaNominal = document.querySelectorAll(".nominal");
const semuaNav = document.querySelectorAll(".nav-item");
const semuaChip = document.querySelectorAll(".chip");

// ===== 2. DATA & VARIABEL =====
let saldo = 51427;
let saldoTampil = true;
let nominalDipilih = 0;

const layanan = [
    { nama: "Transfer gratis", ikon: "✈️", badge: "MURAAAH", warna: "hijau" },
    { nama: "Paket Data", ikon: "📱", badge: "MURAAAH", warna: "hijau" },
    { nama: "Pulsa", ikon: "📲", badge: "MURAAAH", warna: "hijau" },
    { nama: "PLN", ikon: "⚡", badge: "MURAAAH", warna: "hijau" },
    { nama: "GoPay Pet", ikon: "🐱", badge: "HADIAH IJT", warna: "kuning" },
    { nama: "Gojek", ikon: "🛵", badge: "MURAAAH", warna: "hijau" },
    { nama: "Top up kartu e-money", ikon: "💳", badge: "MURAAAH", warna: "hijau" },
    { nama: "Lihat semua", ikon: "⋮⋮", badge: "", warna: "" }
];

// ===== 3. FUNCTION =====

// Mengubah angka 51427 menjadi teks "51.427"
function formatRupiah(angka) {
    let teks = String(angka);
    let hasil = "";
    let hitung = 0;

    for (let i = teks.length - 1; i >= 0; i--) {
        hitung++;
        hasil = teks[i] + hasil;

        if (hitung % 3 === 0 && i !== 0) {
            hasil = "." + hasil;
        }
    }
    return hasil;
}

// Menampilkan saldo sesuai status mata (terlihat / disembunyikan)
function tampilkanSaldo() {
    if (saldoTampil) {
        saldoEl.textContent = formatRupiah(saldo);
        btnMata.textContent = "👁️";
    } else {
        saldoEl.textContent = "•••••";
        btnMata.textContent = "🙈";
    }
}

// Memunculkan notifikasi kecil selama 2 detik
function tampilToast(pesan) {
    toast.textContent = pesan;
    toast.classList.add("tampil");

    setTimeout(function() {
        toast.classList.remove("tampil");
    }, 2000);
}

// Menutup modal dan mengosongkan pilihan nominal
function tutupModal() {
    overlay.classList.remove("tampil");
    nominalDipilih = 0;

    semuaNominal.forEach(function(tombol) {
        tombol.classList.remove("dipilih");
    });
}

// ===== 4. DOM DINAMIS: BUAT GRID LAYANAN =====
layanan.forEach(function(item) {
    // Buat elemen
    const tombol = document.createElement("button");
    const kotak = document.createElement("div");
    const nama = document.createElement("span");

    // Hias elemen
    tombol.classList.add("item");
    kotak.classList.add("ikon-box");
    kotak.textContent = item.ikon;
    nama.textContent = item.nama;

    // Badge hanya dibuat kalau ada isinya
    if (item.badge !== "") {
        const badge = document.createElement("span");
        badge.classList.add("badge");
        badge.classList.add(item.warna);
        badge.textContent = item.badge;
        kotak.appendChild(badge);
    }

    // Tempel ke halaman
    tombol.appendChild(kotak);
    tombol.appendChild(nama);
    gridLayanan.appendChild(tombol);

    tombol.addEventListener("click", function() {
        tampilToast("Layanan " + item.nama + " dipilih");
    });
});

// ===== 5. EVENT LISTENER =====

// Tombol mata: tampilkan / sembunyikan saldo
btnMata.addEventListener("click", function() {
    saldoTampil = !saldoTampil;
    tampilkanSaldo();
});

// Tombol Top up: buka modal
btnTopup.addEventListener("click", function() {
    overlay.classList.add("tampil");
});

// Tombol tutup modal
btnTutup.addEventListener("click", tutupModal);

// Klik area gelap di luar modal juga menutup modal
overlay.addEventListener("click", function(event) {
    if (event.target === overlay) {
        tutupModal();
    }
});

// Pilih nominal top up
semuaNominal.forEach(function(tombol) {
    tombol.addEventListener("click", function() {
        semuaNominal.forEach(function(t) {
            t.classList.remove("dipilih");
        });

        tombol.classList.add("dipilih");
        nominalDipilih = Number(tombol.value);
    });
});

// Konfirmasi top up: saldo bertambah
btnKonfirmasi.addEventListener("click", function() {
    if (nominalDipilih === 0) {
        tampilToast("Pilih nominal dulu ya");
        return;
    }

    saldo = saldo + nominalDipilih;
    tampilkanSaldo();
    tampilToast("Top up Rp" + formatRupiah(nominalDipilih) + " berhasil");
    tutupModal();
});

// Navigasi: menu yang diklik jadi aktif
semuaNav.forEach(function(item) {
    item.addEventListener("click", function() {
        semuaNav.forEach(function(n) {
            n.classList.remove("aktif");
        });

        item.classList.add("aktif");
    });
});

// Tombol lain yang hanya memunculkan notifikasi
btnQris.addEventListener("click", function() {
    tampilToast("Fitur scan QRIS belum tersedia");
});

btnTarik.addEventListener("click", function() {
    tampilToast("Fitur Tarik Tunai belum tersedia");
});

btnBantuan.addEventListener("click", function() {
    tampilToast("Pusat bantuan belum tersedia");
});

banner.addEventListener("click", function() {
    tampilToast("Transfer pertamamu segera hadir");
});

semuaChip.forEach(function(chip) {
    chip.addEventListener("click", function() {
        tampilToast("Fitur ini belum tersedia");
    });
});