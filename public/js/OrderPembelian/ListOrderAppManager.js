let selectDivisi = document.getElementById("select_divisi");
let tglAwal = document.getElementById("tglAwal");
let jamAwal = document.getElementById("jamAwal");
let tglAkhir = document.getElementById("tglAkhir");
let jamAkhir = document.getElementById("jamAkhir");
let statusPengadaan = document.getElementById("status_beliPengadaanPembelian");
let statusBeliSendiri = document.getElementById("status_beliBeliSendiri");
let buttonRedisplay = document.getElementById("button_redisplay");
let tableListOrder = document.getElementById("table_ListOrder");
let checkedAll = document.getElementById("CheckedAll");
let btnPrint = document.getElementById("btn_print");

let currentDate = new Date();
tglAwal.valueAsDate = currentDate;
jamAwal.value =
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);
tglAkhir.valueAsDate = currentDate;
jamAkhir.value =
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);

buttonRedisplay.addEventListener("click", function (event) {
    let statusPembelian = 1;
    if (statusPengadaan.checked == true) {
        statusPembelian = 1;
    } else {
        statusPembelian = 0;
    }
    $("#table_ListOrder").DataTable().clear().destroy();

    let table = $("#table_ListOrder").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/ListOrderAppManager/Redisplay",
            type: "GET",
            data: function (data) {
                (data.Kd_Div = selectDivisi.value),
                    (data.stBeli = statusPembelian),
                    (data.MinDate = tglAwal.value + " " + jamAwal.value),
                    (data.MaxDate = tglAkhir.value + " " + jamAkhir.value);
            },
        },
        columns: [
            { data: "No_trans",
                render: function(data){
                return `<input type="checkbox" name="Checked[]" value="${data}" id="${data}" style="width: 20px;height: 20px;" />`;
            }  },
            { data: "No_trans" },
            {
                data: "Tgl_acc",
                render: function (data) {
                    let date = new Date(data);
                    let hours = ("0" + currentDate.getHours()).slice(-2);
                    let minutes = ("0" + currentDate.getMinutes()).slice(-2);
                    let seconds = ("0" + currentDate.getSeconds()).slice(-2);
                    let time = hours + ":" + minutes + ":" + seconds;
                    return date.toISOString().split("T")[0] + " " + time;
                },
            },
            { data: "StatusBeli" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "nama_sub_kategori" },
            { data: "Qty" },
            { data: "Nama_satuan" },
            { data: "Nama" },
            { data: "NM_DIV" },
            {
                data: "Tgl_Dibutuhkan",
                render: function (data) {
                    let date = new Date(data);
                    return date.toISOString().split("T")[0];
                },
            },
            { data: "keterangan" },
            { data: "Ket_Internal" },
        ],
    });
});

$(document).ready(function () {
    $.ajax({
        url: "/ListOrderAppManager/Divisi",
        type: "GET",
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.KD_DIV;
                option.text = data.NM_DIV;
                selectDivisi.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});
