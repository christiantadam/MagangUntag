let redisplay = document.getElementById("redisplay");
let formDaftarHarga = document.getElementById("formDaftarHarga");
redisplay.disabled = true;
formDaftarHarga.addEventListener("change", function () {
    redisplay.disabled = !radioButtonIsSelected();
});

redisplay.addEventListener("click", function (event) {
    if (radioButtonIsSelected()) {
        let radioButtonChecked = radioButtonIsSelected();
        let value = getSelectedInputValue();
        if (radioButtonChecked === "kode_barang") {
            searchData(null, null, null, value);
        } else if (radioButtonChecked === "nama_barang") {
            searchData(value, null, null, null);
        } else if (radioButtonChecked === "supplier") {
            searchData(null, null, value, null);
        } else if (radioButtonChecked === "user") {
            searchData(null, value, null, null);
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

function searchData(nm_brg, req, sup, kdbrg) {
    $.ajax({
        type: "GET",
        url: "/DaftarHargaSearch",
        data: {
            nm_brg: nm_brg,
            req: req,
            sup: sup,
            kdbrg: kdbrg,
        },
        success: function (response) {
            dataTabel(response)
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        },
    });
}

function dataTabel(data) {
    let tableBody = $("#tabelData tbody");
    tableBody.empty();
    $.each(data, function (index, row) {
        let newRow = $("<tr>");
        $.each(row, function (key, value) {
            let cell = $("<td>").text(value);
            newRow.append(cell);
        });

        tableBody.append(newRow);
    });
}
