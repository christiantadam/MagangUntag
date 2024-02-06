//button
let inputButton = document.getElementById("inputButton");
let koreksiButton = document.getElementById("koreksiButton");
let hapusinputButton = document.getElementById("hapusButton");
let prosesButton = document.getElementById("prosesButton");
let batalButton = document.getElementById("batalButton");
let refreshButton = document.getElementById("refreshButton");

let gambar3 = document.getElementById("gambar3");
let ketgambar3 = document.getElementById("ketgambar3");
let hasilgambar3 = document.getElementById("imagePreview3");
let gambar4 = document.getElementById("gambar4");
let ketgambar4 = document.getElementById("ketgambar4");
let hasilgambar4 = document.getElementById("imagePreview4");
let gambar5 = document.getElementById("gambar5");
let ketgambar5 = document.getElementById("ketgambar5");
let hasilgambar5 = document.getElementById("imagePreview5");
let gambar6 = document.getElementById("gambar6");
let ketgambar6 = document.getElementById("ketgambar6");
let hasilgambar6 = document.getElementById("imagePreview6");
let gambar7 = document.getElementById("gambar7");
let ketgambar7 = document.getElementById("ketgambar7");
let hasilgambar7 = document.getElementById("imagePreview7");
let gambar8 = document.getElementById("gambar8");
let ketgambar8 = document.getElementById("ketgambar8");
let hasilgambar8 = document.getElementById("imagePreview8");
let gambar9 = document.getElementById("gambar9");
let ketgambar9 = document.getElementById("ketgambar9");
let hasilgambar9 = document.getElementById("imagePreview9");
let gambar10 = document.getElementById("gambar10");
let ketgambar10 = document.getElementById("ketgambar10");
let hasilgambar10 = document.getElementById("imagePreview10");

let tanggal = document.getElementById("tanggal");
let sampaiDengan = document.getElementById("sampaiDengan");
let divisi_pelapor = document.getElementById("divisi_pelapor");

gambar3.value = "";
hasilgambar3.value = "";
gambar3.disabled = true;
ketgambar3.disabled = true;

gambar4.value = "";
hasilgambar4.value = "";
gambar4.disabled = true;
ketgambar4.disabled = true;

gambar5.value = "";
hasilgambar5.value = "";
gambar5.disabled = true;
ketgambar5.disabled = true;

gambar6.value = "";
hasilgambar6.value = "";
gambar6.disabled = true;
ketgambar6.disabled = true;

gambar7.value = "";
hasilgambar7.value = "";
gambar7.disabled = true;
ketgambar7.disabled = true;

gambar8.value = "";
hasilgambar8.value = "";
gambar8.disabled = true;
ketgambar8.disabled = true;

gambar9.value = "";
hasilgambar9.value = "";
gambar9.disabled = true;
ketgambar9.disabled = true;

gambar10.value = "";
hasilgambar10.value = "";
gambar10.disabled = true;
ketgambar10.disabled = true;

$("#ketgambar3").val("");
$("#gambar4").val("");
$("#ketgambar5").val("");
$("#hasil_gambar3").attr("src", "");
$("#hasil_gambar4").attr("src", "");

if (tanggal && sampaiDengan) {
    var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
    tanggal.value = tanggal_akhirOutput;
    sampaiDengan.value = tanggal_akhirOutput;

    var currentDateTime = new Date();
    var hours = currentDateTime.getHours().toString().padStart(2, "0");
    var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    var timeString = hours + ":" + minutes;
}

// Event listener for Input Button
inputButton.addEventListener("click", function () {
    $("#ketgambar1").val("");
    $("#gambar1").val("");
    $("#gambar2").val("");
    $("#ketgambar2").val("");
    $("#hasil_gambar2").attr("src", "");
    $("#hasil_gambar1").attr("src", "");
});

batalButton.addEventListener("click", function () {
    // Disable all input fields and buttons
    prosesButton.disabled = true;
    inputButton.disabled = false;
    koreksiButton.disabled = false;
    hapusinputButton.disabled = false;
    tanggal.disabled = true;
    divisi_pelapor1.disabled = true;
    nama_pelapor.disabled = true;
    penerima_laporan.disabled = true;
    jam_lapor.disabled = true;
    jam_perbaikan.disabled = true;
    jam_selesai.disabled = true;
    tipe_gangguan.disabled = true;
    penyebab.disabled = true;
    penyelesaian.disabled = true;
    keterangan.disabled = true;
    teknisi.disabled = true;
    gambar1.disabled = true;
    ket_gambar1.disabled = true;
    gambar2.disabled = true;
    ket_gambar2.disabled = true;
    agree.checked = false;
    checkbox_tabel.checked = false;
    agree.disabled = true;

    // $("#id_laporan").val("");
    //$("#tanggal").val("");
    $("#divisi_pelapor1").val("");
    $("#nama_pelapor").val("");
    $("#penerima_laporan").val("");
    //$("#jam_lapor").val("");
    $("#jam_perbaikan").val("");
    $("#jam_selesai").val("");
    $("#tipe_gangguan").val("");
    $("#penyebab").val("");
    $("#penyelesaian").val("");
    $("#keterangan").val("");
    $("#teknisi").val("");
    $("#ket_gambar1").val("");
    $("#gambar1").val("");
    $("#gambar2").val("");
    $("#ket_gambar2").val("");
    $("#hasil_gambar2").attr("src", "");
    $("#hasil_gambar1").attr("src", "");
});

$(document).ready(function () {
    var timeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        var hours = date.getHours().toString().padStart(2, "0");
        var minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
    };

    var dataTable = $("#tabel_gambar").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/getData",
            type: "GET",
            data: function (d) {
                d.tanggal1 = $("#tanggal").val();
                d.tanggal2 = $("#sampaiDengan").val();
                d.divisi = $("#divisi_pelapor").val();
            },
        },

        columns: [
            {
                data: "Id_Laporan",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxgambar" value="' +
                        data +
                        '">'
                    );
                },
            },

            {
                data: "tanggal",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();

                    day = day < 10 ? "0" + day : day;
                    month = month < 10 ? "0" + month : month;
                    return day + "-" + month + "-" + year;
                },
            },

            { data: "L_div_pelapor" },
            { data: "Nama_pelapor" },
            { data: "Penerima_laporan" },
            { data: "Jam_lapor", render: timeRenderer },
            { data: "jam_pelaksanan", render: timeRenderer },
            { data: "Jam_selesai", render: timeRenderer },
            { data: "Type_gangguan" },
            { data: "Penyebab" },
            { data: "Penyelesaian" },
            { data: "Keterangan" },
            { data: "Teknisi" },
        ],
        order: [[1, "asc"]],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        console.log(dataTable);
    });

    $("tbody").on("click", ".checkboxgambar", function () {
        if ($(this).prop("checked")) {
            hapusButton.disabled = false;
            koreksiButton.disabled = false;
            var id = $(this).val();

            console.log(id);
        } else {
        }
    });

    $("#prosesButton").click(function (e) {
        e.preventDefault();

        // Ambil nilai-nilai form
        var ketgambar3Value = $("#ket_gambar3").val();
        var ketgambar4Value = $("#ket_gambar4").val();
        var ketgambar3Value = $("#ket_gambar5").val();
        var ketgambar4Value = $("#ket_gambar6").val();
        var ketgambar3Value = $("#ket_gambar7").val();
        var ketgambar4Value = $("#ket_gambar8").val();
        var ketgambar3Value = $("#ket_gambar9").val();
        var ketgambar4Value = $("#ket_gambar10").val();

        // Ambil file gambar
        var gambar3data = document.getElementById("gambar3").files[0];
        var gambar4data = document.getElementById("gambar4").files[0];
        var gambar3data = document.getElementById("gambar5").files[0];
        var gambar4data = document.getElementById("gambar6").files[0];
        var gambar3data = document.getElementById("gambar7").files[0];
        var gambar4data = document.getElementById("gambar8").files[0];
        var gambar3data = document.getElementById("gambar9").files[0];
        var gambar4data = document.getElementById("gambar10").files[0];

        // Buat objek FormData
        var formData = new FormData();
        formData.append("gambar3data", gambar3data);
        formData.append("ketgambar3", ketgambar3Value);
        formData.append("gambar4data", gambar4data);
        formData.append("ketgambar4", ketgambar4Value);
        formData.append("gambar5data", gambar5data);
        formData.append("ketgambar5", ketgambar5Value);
        formData.append("gambar6data", gambar6data);
        formData.append("ketgambar6", ketgambar6Value);
        formData.append("gambar7data", gambar7data);
        formData.append("ketgambar7", ketgambar7Value);
        formData.append("gambar8data", gambar8data);
        formData.append("ketgambar8", ketgambar8Value);
        formData.append("gambar9data", gambar9data);
        formData.append("ketgambar9", ketgambar9Value);
        formData.append("gambar10data", gambar10data);
        formData.append("ketgambar10", ketgambar10Value);

        if (id_laporanValue) {
            requestData.Idlaporan = id_laporanValue;
        }
        console.log("FormData:", formData);

        // Membuat permintaan AJAX
        $.ajax({
            url: id_laporanValue ? "/updateDataGambar" : "/postDataGambar",
            type: id_laporanValue ? "PUT" : "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: formData,
            processData: false,
            contentType: false,

            success: function (response) {
                console.log(response);
                dataTable.ajax.reload();
                console.log("Gambar berhasil disimpan.");
            },
            error: function (xhr, status, error) {
                if (xhr.status === 419) {
                    console.log("Sesi tidak valid. Silakan login kembali.");
                } else {
                    // Penanganan kesalahan lainnya
                    console.log("Terjadi kesalahan saat menyimpan gambar.");
                }
            },
        });
    });
});
