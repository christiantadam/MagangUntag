let search = document.getElementById("search");
let formCari = document.getElementById("formCari");
let inputText = document.getElementById("search_nama_barang");
let tabelData = document.getElementById("tabelData");

tabelData.style.display = "none";
search.disabled = true;

formCari.addEventListener("input", function () {
    search.disabled = !getInputValue();
});

search.addEventListener("click", function (event) {
    if (getInputValue()) {
        let value = getInputValue();
        searchData(value);
        // alert(value);
    }
});

function getInputValue() {
    let value = inputText.value.trim();
    return value !== "" ? value : false;
}

function searchData(nm_brg) {
    $.ajax({
        type: "GET",
        url: "/CariTypeSearch",
        data: {
            nm_brg: nm_brg,
        },
        success: function (response) {
            // console.log(response);
            dataTabel(response);
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        },
    });
}

function dataTabel(datas) {
    tabelData.style.display = "block";
    let tableBody = $("#tabelData").DataTable({ searching: false });
    tableBody.clear();
    datas.forEach(function (data) {
        tableBody.row
            .add([
                data.NAMA_BRG,
                data.KD_BRG,
                data.nama,
                data.nama_kategori,
                data.nama_sub_kategori,
                data.KET,
            ])
            .draw();
    });
}
