let kd_barang = document.getElementById("kd_barang");
let select_kategori_utama = document.getElementById("select_kategori_utama");
let select_kategori = document.getElementById("select_kategori");
let select_subKategori = document.getElementById("select_subKategori");
let ket_khusus = document.getElementById("ket_khusus");
let select_namaBarang = document.getElementById("select_namaBarang");
let ket_barang = document.getElementById("ket_barang");
let select_jenisPembelian = document.getElementById("select_jenisPembelian");
let check_round = document.getElementById("check_round");
let check_export = document.getElementById("check_export");
let check_barangSama = document.getElementById("check_barangSama");
let org_penjaluk = document.getElementById("org_penjaluk");
let select_satuanPrimer = document.getElementById("select_satuanPrimer");
let select_satuanSekunder = document.getElementById("select_satuanSekunder");
let select_satuanTritier = document.getElementById("select_satuanTritier");
let select_satuanUmum = document.getElementById("select_satuanUmum");

let dataKdBarang;

btn_cari_kdBarang.addEventListener("click", function (event) {
    cariKodeBarang(kd_barang.value);
});

function cariKodeBarang(kd_barang) {
    $.ajax({
        url: "/Maintenance/KodeBarang",
        type: "GET",
        data: {
            kodeBarang: kd_barang,
        },
        success: function (response) {
            // dataKdBarang = response[0];
            console.log(response);
            kategori(response[0].no_kat_utama, function () {
                for (let i = 0; i < select_kategori.options.length; i++) {
                    if (
                        select_kategori.options[i].text.replace(/\s/g, "") ===
                        response[0].nama_kategori.replace(/\s/g, "")
                    ) {
                        select_kategori.selectedIndex = i;
                    }
                }
            });

            subKategori(response[0].no_kategori, function () {
                for (let i = 0; i < select_subKategori.options.length; i++) {
                    if (
                        select_subKategori.options[i].text.replace(
                            /\s/g,
                            ""
                        ) === response[0].nama_sub_kategori.replace(/\s/g, "")
                    ) {
                        select_subKategori.selectedIndex = i;
                    }
                }
            });

            namaBarang(response[0].no_sub_kategori, function () {
                for (let i = 0; i < select_namaBarang.options.length; i++) {
                    if (
                        select_namaBarang.options[i].text.replace(/\s/g, "") ===
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    ) {
                        select_namaBarang.selectedIndex = i;
                    }
                }
            });

            for (let i = 0; i < select_kategori_utama.options.length; i++) {
                if (
                    select_kategori_utama.options[i].text.replace(/\s/g, "") ===
                    response[0].nama.replace(/\s/g, "")
                ) {
                    select_kategori_utama.selectedIndex = i;
                }
            }

            ket_khusus.value = response[0].KET_KHUSUS;
            ket_barang.value = response[0].KET;
            org_penjaluk.value = response[0].PENJALUK;
            if (response[0].kriteria != 0) {
                select_jenisPembelian.selectedIndex = 1;
            } else {
                select_jenisPembelian.selectedIndex = 0;
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

function kategori(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/Kategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kategori;
                option.text = data.nama_kategori;
                select_kategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}
function subKategori(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/SubKategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_sub_kategori;
                option.text = data.nama_sub_kategori;
                select_subKategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}
function namaBarang(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/NamaBarang",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.KD_BRG;
                option.text = data.NAMA_BRG;
                select_namaBarang.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

$(document).ready(function () {
    $.ajax({
        url: "/Maintenance/Data",
        type: "GET",
        success: function (response) {
            let kategoriUtama = response.kategoriUtama;
            let jenisPembelian = response.jenisPembelian;
            kategoriUtama.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kat_utama;
                option.text = data.nama;
                select_kategori_utama.add(option);
            });
            jenisPembelian.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.kode;
                option.text = data.keterangan;
                select_jenisPembelian.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});
