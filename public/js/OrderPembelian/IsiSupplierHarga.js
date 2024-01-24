let redisplay = document.getElementById("button_redisplay");
let formCekRedisplay = document.getElementById("formCekRedisplay");
let formApprove = document.getElementById("formApprove");
let supplier_select = document.getElementById("supplier_select");
let matauang_select = document.getElementById("matauang_select");
let ppn_select = document.getElementById("ppn_select");
let ppn = document.getElementById("ppn");
let kurs = document.getElementById("kurs");
let harga_unit = document.getElementById("harga_unit");
let harga_sub_total = document.getElementById("harga_sub_total");
let idr_sub_total = document.getElementById("idr_sub_total");
let idr_ppn = document.getElementById("idr_ppn");
let harga_total = document.getElementById("harga_total");
let idr_harga_total = document.getElementById("idr_harga_total");
let qty_delay = document.getElementById("qty_delay");
let qty_order = document.getElementById("qty_order");
let btn_clear = document.getElementById("btn_clear");
let btn_approve = document.getElementById("btn_approve");
let keterangan_internal = document.getElementById("keterangan_internal");
let keterangan_order = document.getElementById("keterangan_order");
let user_input = document.getElementById("user_input");
let sub_kategori = document.getElementById("sub_kategori");
let nama_barang = document.getElementById("nama_barang");
let kode_barang = document.getElementById("kode_barang");
let divisi = document.getElementById("divisi");
let no_po = document.getElementById("no_po");
let idr_unit = document.getElementById("idr_unit");

let fixValueQTYOrder;

let csrfToken = $('meta[name="csrf-token"]').attr("content");
let url = window.location.href;
let segments = url.split("/");
let id = segments[segments.length - 1];

redisplay.disabled = true;
formCekRedisplay.addEventListener("change", function () {
    redisplay.disabled = !radioButtonIsSelected();
});
btn_approve.disabled = true;
formApprove.addEventListener("change", function () {
    btn_approve.disabled = !supplier_select.selectedIndex === 0;
});

function clearData() {
    btn_approve.disabled = true;
    no_po.value = "";
    divisi.value = "";
    kode_barang.value = "";
    nama_barang.value = "";
    sub_kategori.value = "";
    user_input.value = "";
    keterangan_order.value = "-";
    keterangan_internal.value = "-";
    supplier_select.selectedIndex = 0;
    matauang_select.selectedIndex = 0;
    qty_delay.value = 0;
    qty_order.value = 0;
    harga_unit.value = 0;
    idr_unit.value = 0;
    harga_sub_total.value = 0;
    idr_sub_total.value = 0;
    ppn_select.value = "";
    ppn.value = 0;
    idr_ppn.value = 0;
    harga_total.value = "";
    idr_harga_total.value = "";
    kurs.value = "1";
}

btn_clear.addEventListener("click", function (event) {
    clearData();
});
btn_approve.addEventListener("click", function (event) {
    $.ajax({
        url: "/IsiSupplierHarga/" + id + "/approve",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            Qty: qty_order.value,
            QtyDelay: qty_delay.value,
            idsup: supplier_select.value,
            kurs: kurs.value,
            pUnit: harga_unit.value,
            pSub: harga_sub_total.value,
            idPPN: ppn_select.value,
            pPPN: ppn.value,
            pTOT: harga_total.value,
            pIDRUnit: idr_unit.value,
            pIDRSub: idr_sub_total.value,
            pIDRPPN: idr_ppn.value,
            pIDRTot: idr_harga_total.value,
            mtUang: matauang_select.value,
            noTrans: no_po.value,
        },
        success: function (response) {
            alert('Data Berhasil di Approve')
            clearData()
        },
        error: function (error) {
            console.error("Error Send Data:", error);
        },
    });
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
                fixValueQTYOrder = data.Qty;
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
    qty_delay.addEventListener("change", function (event) {
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateQTYOrder();
    });

    qty_order.addEventListener("change", function (event) {
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
    });

    kurs.addEventListener("change", function (event) {
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
    });
    harga_unit.addEventListener("change", function (event) {
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
    });
    ppn_select.addEventListener("change", function (event) {
        updatePPN();
        updateIDRPPN();
        updateHargaTotal();
        updateIDRHargaTotal();
    });
});

function updateQTYOrder() {
    let qty_orderValue = parseFloat(fixValueQTYOrder);
    let qty_delayValue = parseFloat(document.getElementById("qty_delay").value);
    if (!isNaN(qty_orderValue) && !isNaN(qty_delayValue)) {
        let qtyOrderValue = qty_orderValue - qty_delayValue;
        qty_order.value = qtyOrderValue;
    }
}

function updateIdrUnit() {
    let kurs = parseFloat(document.getElementById("kurs").value);
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
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
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );
    if (!isNaN(kurs) && !isNaN(hargaSubTotal)) {
        let idrSubTotalValue = hargaSubTotal * kurs;
        idr_sub_total.value = idrSubTotalValue;
    }
}

function updatePPN() {
    let selectedPPN = parseFloat(
        ppn_select.options[ppn_select.selectedIndex].text
    );
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );
    if (!isNaN(selectedPPN) && !isNaN(hargaSubTotal)) {
        let jumPPN = (hargaSubTotal * selectedPPN) / 100;
        ppn.value = jumPPN;
    }
}
function updateIDRPPN() {
    let selectedPPN = parseFloat(
        ppn_select.options[ppn_select.selectedIndex].text
    );
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );
    let kurs = parseFloat(document.getElementById("kurs").value);
    if (!isNaN(selectedPPN) && !isNaN(hargaSubTotal) && !isNaN(kurs)) {
        let jumPPN = (hargaSubTotal * selectedPPN) / 100;
        let idrPPNValue = jumPPN * kurs;
        idr_ppn.value = idrPPNValue;
    }
}

function updateHargaTotal() {
    let ppn = parseFloat(document.getElementById("ppn").value);
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );
    if (!isNaN(ppn) && !isNaN(hargaSubTotal)) {
        let hargaTotalValue = hargaSubTotal + ppn;
        harga_total.value = hargaTotalValue;
    }
}

function updateIDRHargaTotal() {
    let kurs = parseFloat(document.getElementById("kurs").value);
    let hargaTotal = parseFloat(document.getElementById("harga_total").value);
    if (!isNaN(kurs) && !isNaN(hargaTotal)) {
        let IDRHargaTotalValue = hargaTotal * kurs;
        idr_harga_total.value = IDRHargaTotalValue;
    }
}
