
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


let saldo = 51427;
let saldoTampil = true;
let nominalDipilih = 0;

const layanan = [
    { nama: "Transfer gratis", ikon: "✈️", badge: "murah" },
    { nama: "Paket Data", ikon: "📱", badge: "murah" },
    { nama: "Pulsa", ikon: "📲", badge: "murah" },
    { nama: "PLN", ikon: "⚡", badge: "murah" },
    { nama: "GoPay Pet", ikon: "🐱", badge: "hadiah" },
    { nama: "Gojek", ikon: "🛵", badge: "murah" },
    { nama: "Top up kartu e-money", ikon: "💳", badge: "murah" },
    { nama: "Lihat semua", ikon: "⋮⋮", badge: "" }
];


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


function tampilkanSaldo() {
    const mataImg = btnMata.querySelector("img");

    if (saldoTampil) {
        saldoEl.textContent = formatRupiah(saldo);
        mataImg.src = "assets/mata_terbuka.png";
    } else {
        saldoEl.textContent = "•••••";
        mataImg.src = "assets/mata_tertutup.png";
    }
}

function tampilToast(pesan) {
    toast.textContent = pesan;
    toast.classList.add("tampil");

    setTimeout(function() {
        toast.classList.remove("tampil");
    }, 2000);
}

function tutupModal() {
    overlay.classList.remove("tampil");
    nominalDipilih = 0;

    semuaNominal.forEach(function(tombol) {
        tombol.classList.remove("dipilih");
    });
}

layanan.forEach(function(item) {

    const tombol = document.createElement("button");
    const kotak = document.createElement("div");
    const nama = document.createElement("span");

    tombol.classList.add("item");
    kotak.classList.add("ikon-box");
    kotak.textContent = item.ikon;
    nama.textContent = item.nama;

    if (item.badge === "murah") {
        const badge = document.createElement("img");
        badge.classList.add("badge");
        badge.src = "assets/logomurah.png";
        badge.alt = "MURAAAH";
        kotak.appendChild(badge);
    } else if (item.badge === "hadiah") {
        const badge = document.createElement("img");
        badge.classList.add("badge");
        badge.src = "assets/hadiah_1_juta.png";
        badge.alt = "HADIAH 1 JT";
        kotak.appendChild(badge);
    }

    tombol.appendChild(kotak);
    tombol.appendChild(nama);
    gridLayanan.appendChild(tombol);

    tombol.addEventListener("click", function() {
        tampilToast("Layanan " + item.nama + " dipilih");
    });
});


btnMata.addEventListener("click", function() {
    saldoTampil = !saldoTampil;
    tampilkanSaldo();
});

btnTopup.addEventListener("click", function() {
    overlay.classList.add("tampil");
});

btnTutup.addEventListener("click", tutupModal);

overlay.addEventListener("click", function(event) {
    if (event.target === overlay) {
        tutupModal();
    }
});

semuaNominal.forEach(function(tombol) {
    tombol.addEventListener("click", function() {
        semuaNominal.forEach(function(t) {
            t.classList.remove("dipilih");
        });

        tombol.classList.add("dipilih");
        nominalDipilih = Number(tombol.value);
    });
});

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

semuaNav.forEach(function(item) {
    item.addEventListener("click", function() {
        semuaNav.forEach(function(n) {
            n.classList.remove("aktif");
        });

        item.classList.add("aktif");
    });
});

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