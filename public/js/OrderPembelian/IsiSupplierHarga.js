let redisplay = document.getElementById("button_redisplay");
let formCekRedisplay = document.getElementById("formCekRedisplay");
let supplier_select = document.getElementById("supplier_select");
let matauang_select = document.getElementById("matauang_select");
let ppn_select = document.getElementById("ppn_select");
let ppn = document.getElementById("ppn");
let kurs = document.getElementById("kurs");
let harga_unit = document.getElementById("harga_unit");
let harga_sub_total = document.getElementById("harga_sub_total");
let idr_sub_total = document.getElementById("idr_sub_total");

let url = window.location.href;
let segments = url.split("/");
let id = segments[segments.length - 1];

redisplay.disabled = true;
formCekRedisplay.addEventListener("change", function () {
    redisplay.disabled = !radioButtonIsSelected();
});

redisplay.addEventListener("click", function (event) {
    if (radioButtonIsSelected()) {
        let radioButtonChecked = radioButtonIsSelected();
        let value = getSelectedInputValue();
        if (radioButtonChecked === "AllOrder") {
            $("#table_IsiHarga").DataTable().clear().destroy();
            redisplayData(null, null, 24);
        } else if (radioButtonChecked === "NomorOrder") {
            $("#table_IsiHarga").DataTable().clear().destroy();
            redisplayData(value, null, 11);
        } else if (radioButtonChecked === "User") {
            $("#table_IsiHarga").DataTable().clear().destroy();
            redisplayData(null, value, 23);
        }
    } else {
        alert("Silahkan Mengisi Form Input");
    }
});

function radioButtonIsSelected() {
    let radioButtons = document.getElementsByName("filter_radioButton");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
    return false;
}

function getSelectedInputValue() {
    let radioButtons = document.getElementsByName("filter_radioButton");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            if (radioButtons[i].value !== "AllOrder") {
                let inputText = document.getElementsByName(
                    "search_" + radioButtons[i].value
                )[0];
                return inputText.value.trim();
            } else {
                return radioButtons[i].value;
            }
        }
    }
    return false;
}

function redisplayData(noTrans, requester, kd) {
    $("#table_IsiHarga").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/IsiSupplierHargaRedisplay/" + id,
            type: "GET",
            data: function (data) {
                (data.noTrans = noTrans),
                    (data.requester = requester),
                    (data.kd = kd);
            },
        },
        columns: [
            { data: "No_trans" },
            { data: "StatusPembelian" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "nama_sub_kategori" },
            { data: "Qty" },
            { data: "Nama_satuan" },
            { data: "Nama" },
            { data: "Kd_div" },
            {
                data: "Tgl_Dibutuhkan",
                render: function (data, type, row) {
                    let date = new Date(data);
                    return date.toISOString().split("T")[0];
                },
            },
            { data: "keterangan" },
            { data: "Ket_Internal" },
        ],
        rowCallback: function (row, data) {
            $(row).on("click", function () {
                let tgl = new Date(data.Tgl_Dibutuhkan)
                    .toISOString()
                    .split("T")[0];
                document.getElementById("no_po").value = data.No_trans;
                document.getElementById(
                    "status_beliPengadaanPembelian"
                ).checked = data.StatusPembelian === "Pengadaan Pembelian";
                document.getElementById("status_beliBeliSendiri").checked =
                    data.StatusPembelian === "Beli Sendiri";
                document.getElementById("tanggal_dibutuhkan").value = tgl;
                document.getElementById("divisi").value = data.Kd_div;
                document.getElementById("kode_barang").value = data.Kd_brg;
                document.getElementById("nama_barang").value = data.NAMA_BRG;
                document.getElementById("sub_kategori").value =
                    data.nama_sub_kategori;
                document.getElementById("qty_order").value = data.Qty;
                document.getElementById("user_input").value = data.Nama;
                document.getElementById("keterangan_order").value =
                    data.keterangan;
                document.getElementById("keterangan_internal").value =
                    data.Ket_Internal;
            });
        },
    });
}
$(document).ready(function () {
    $.ajax({
        url: "/DaftarData",
        type: "GET",
        success: function (data) {
            let matauang = data.matauang;
            let supplier = data.supplier;
            let ppn = data.ppn;
            matauang.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.Id_MataUang;
                option.text = data.Nama_MataUang;
                matauang_select.add(option);
            });
            supplier.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.NO_SUP;
                option.text = data.NM_SUP;
                supplier_select.add(option);
            });
            ppn.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.IdPPN;
                option.text = data.JumPPN;
                ppn_select.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
    kurs.addEventListener("change", function (event) {
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
    });
    harga_unit.addEventListener("change", function (event) {
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
    });
});

function updateIdrUnit() {
    let kurs = parseFloat(document.getElementById("kurs").value);
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    let idr_unit = document.getElementById("idr_unit");
    if (!isNaN(kurs) && !isNaN(hargaUnit)) {
        let idrUnitValue = hargaUnit * kurs;
        idr_unit.value = idrUnitValue;
    }
}

function updateSubTotal() {
    let qty_order = parseFloat(document.getElementById("qty_order").value);
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    if (!isNaN(qty_order) && !isNaN(hargaUnit)) {
        let SubTotalValue = hargaUnit * qty_order;
        harga_sub_total.value = SubTotalValue;
    }
}

function updateIDRSubTotal() {
    let kurs = parseFloat(document.getElementById("kurs").value);
    let hargaSubTotal = parseFloat(document.getElementById("harga_sub_total").value);
    if (!isNaN(kurs) && !isNaN(hargaSubTotal)) {
        let idrSubTotalValue = hargaSubTotal * kurs;
        idr_sub_total.value = idrSubTotalValue;
    }
}
