let search = document.getElementById("search");
let formDaftarHarga = document.getElementById("formDaftarHarga");
let inputText = document.getElementById("search_nama_barang");

search.disabled = true;

formDaftarHarga.addEventListener("input", function () {
    search.disabled = !getInputValue();
});

search.addEventListener("click", function (event) {
    if (getInputValue()) {
        let value = getInputValue();
        alert(value);
    }
});

function getInputValue() {
    return inputText.value.trim() !== "";
}
