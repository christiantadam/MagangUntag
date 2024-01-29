let kd_barang = document.getElementById("kd_barang");
let btn_cari_kdBarang = document.getElementById("btn_cari_kdBarang");
let select_kategori_utama = document.getElementById("select_kategori_utama");

btn_cari_kdBarang.addEventListener("click", function (event) {
    $.ajax({
        url: "/Maintenance/KodeBarang",
        type: "GET",
        data: {
            kodeBarang: kd_barang.value,
        },
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});

$(document).ready(function () {
    $.ajax({
        url: "/Maintenance/KategoriUtama",
        type: "GET",
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kat_utama;
                option.text = data.nama;
                select_kategori_utama.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});
