let redisplay = document.getElementById("button_redisplay");
let formCekRedisplay = document.getElementById("formCekRedisplay");
let formUpdate = document.getElementById("formUpdate");
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
let btn_update = document.getElementById("btn_update");
let no_po = document.getElementById("no_po");

let csrfToken = $('meta[name="csrf-token"]').attr("content");

formCekRedisplay.addEventListener("change", function (event) {
    redisplay.disabled = !radioButtonIsSelected();
});
redisplay.addEventListener("click", function (event) {
    if (radioButtonIsSelected()) {
        let radioButtonChecked = radioButtonIsSelected();
        let value = getSelectedInputValue();
        if (radioButtonChecked === "AllOrder") {
            $("#table_koreksi").DataTable().clear().destroy();
            redisplayData(null, null, 24);
        } else if (radioButtonChecked === "NomorOrder") {
            $("#table_koreksi").DataTable().clear().destroy();
            redisplayData(value, null, 11);
        } else if (radioButtonChecked === "User") {
            $("#table_koreksi").DataTable().clear().destroy();
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
    let table = $("#table_koreksi").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/StatusBeli/Redisplay",
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
        ],
        rowCallback: function (row, data) {
            $(row).on("click", function (event) {
                clearData();
                no_po.value = data.No_trans;
                document.getElementById(
                    "status_beliPengadaanPembelian"
                ).checked = data.StatusPembelian === "Pengadaan Pembelian";
                document.getElementById("status_beliBeliSendiri").checked =
                    data.StatusPembelian === "Beli Sendiri";
            });
        },
    });

    table.on("click", "tbody tr", (e) => {
        const classList = e.currentTarget.classList;

        if (classList.contains("selected")) {
            classList.remove("selected");
        } else {
            table
                .rows(".selected")
                .nodes()
                .each((row) => row.classList.remove("selected"));
            classList.add("selected");
        }
    });
}

function clearData() {
    no_po.value = "";
}
