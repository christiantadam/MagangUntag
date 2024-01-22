let redisplay = document.getElementById("button_redisplay");
let formCekRedisplay = document.getElementById("formCekRedisplay");

redisplay.disabled = true;
formCekRedisplay.addEventListener("change", function () {
    redisplay.disabled = !radioButtonIsSelected();
});

redisplay.addEventListener("click", function (event) {
    if (radioButtonIsSelected()) {
        let radioButtonChecked = radioButtonIsSelected();
        let value = getSelectedInputValue();
        if (radioButtonChecked === "AllOrder") {
            redisplayData(null, null, 24);
        } else if (radioButtonChecked === "NomorOrder") {
            redisplayData(value, null, 11);
        } else if (radioButtonChecked === "User") {
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
    let url = window.location.href;
    let segments = url.split("/");
    let id = segments[segments.length - 1];

    $("#table_IsiHarga")
        .DataTable({
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
                { data: "Tgl_Dibutuhkan" },
                { data: "keterangan" },
                { data: "Ket_Internal" },
            ],
        })
        .clear()
        .destroy();
}
