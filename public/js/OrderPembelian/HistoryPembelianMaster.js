let redisplay = document.getElementById("redisplay");
let formDaftarHarga = document.getElementById("formDaftarHarga");
let tabelData = document.getElementById("tabelData");

tabelData.style.display = "none";
redisplay.disabled = true;
formDaftarHarga.addEventListener("change", function () {
    redisplay.disabled = !radioButtonIsSelected();
});

redisplay.addEventListener("click", function (event) {
    if (radioButtonIsSelected()) {
        let radioButtonChecked = radioButtonIsSelected();
        let value = getSelectedInputValue();
        if (radioButtonChecked === "kode_barang") {
            redisplayData(null, null, null, value);
        } else if (radioButtonChecked === "nama_barang") {
            redisplayData(value, null, null, null);
        } else if (radioButtonChecked === "supplier") {
            redisplayData(null, null, value, null);
        } else if (radioButtonChecked === "user") {
            redisplayData(null, value, null, null);
        }
    } else {
        alert("Silahkan Mengisi Form");
    }
});

function radioButtonIsSelected() {
    let radioButtons = document.getElementsByName("opsi");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
    return false;
}

function getSelectedInputValue() {
    let radioButtons = document.getElementsByName("opsi");

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            let inputText = document.getElementsByName(
                "search_" + radioButtons[i].value
            )[0];
            return inputText.value.trim();
        }
    }
    return false;
}


function redisplayData(nm_brg, req, sup, kdbrg) {
    tabelData.style.display = "block";

    $("#tabelData").DataTable({
        responsive:true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/HistoryPembelianMasterRedisplay",
            type: "GET",
            data: function(data) {
                data.nm_brg = nm_brg,
                data.req = req,
                data.sup = sup,
                data.kdbrg = kdbrg
            }
        },
        columns: [
            { data: "Kd_div" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "Nama_satuan" },
            { data: "NM_SUP" },
            { data: "KOTA1" },
            { data: "NEGARA1" },
            { data: "Hrg_trm" },
            { data: "Id_MataUang_BC" },
            { data: "Nama" },
            {data: "Tgl_order"},
        ],
    });
}