let supplier = document.getElementById("supplier")
let POdropdown = document.getElementById("po")

function clearOptions(selectElement) {
    let length = selectElement.options.length;

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}

supplier.addEventListener("change", function(event) {
    if (supplier.selectedIndex != 0) {
        clearOptions(POdropdown);
        let selectedSupplierId = supplier.value;
        console.log(POdropdown)
        $.ajax({
            url: "/Drop1",
            type: "GET",
            data: {
                idSup: supplier.value,
            },
            success: function(response) {
                // console.log(response)
                response.forEach(function(data) {  console.log(data)
                    let option = document.createElement("option");
                    option.value = data.NO_PO;
                    option.text = data.NO_PO;
                    POdropdown.add(option);
                });
            },
            error: function(error) {
                console.error("Error Fetch Data:", error);
            },
        });
    } else {
        POdropdown = true;
    }
});


POdropdown.addEventListener("change", function(event) {
    $('#tabelcreate').DataTable().clear();
    $.ajax({
        url: "/Create",
        type: "GET",
        data: {
            noPO: POdropdown.value,
        },
        success: function(response) {
            responseData(response);
            console.log(response)
        },
        error: function(error) {
            console.error("Error Fetch Data:", error);
            responseData(response);
        },
    });
});

//remove

function removeData() {
    var selectedRow = $('#tabelcreate tr.selected');
    if (selectedRow.length > 0) {
        selectedRow.remove();
    }
}

// Event listener untuk mengaktifkan fungsi removeRow saat salah satu baris di dalam tabel diklik
$('#tabelcreate').on('click', 'tr', function() {
    $(this).toggleClass('selected');
});

// Event listener untuk mengaktifkan fungsi removeRow saat tombol "Remove Selected Row" diklik
$('#removebutton').on('click', function() {
    removeData();
});

//update
// Event listener untuk tombol "Update"
$('#updatebutton').on('click', function() {
    updateData();
});
console.log(updateData)

// Fungsi untuk melakukan update data
function updateData() {
    // Ambil nilai-nilai dari kolom bawah yang ingin Anda ubah
    var nomororder = $('#nomororder').val();
    var kurs = $('#kurs').val();
    var matauang = $('#matauang').val();
    var kdbarang = $('#kdbarang').val();
    var hargaunit = $('#hargaunit').val();
    var idr = $('#idr').val();
    var namabarang = $('#namabarang').val();
    var disc = $('#disc').val();
    var idrdisc = $('#idrdisc').val();
    var subkategori = $('#subkategori').val();
    var hargasub = $('#hargasub').val();
    var idrsubtotal = $('#idrsubtotal').val();
    var qtyordered = $('#Qtyordered').val();
    var qtyremaining = $('#qtyremaining').val();
    var hargatotal = $('#hargatotal').val();
    var idrtotal = $('#idrtotal').val();

    // Perbarui data yang sesuai di dalam tabel
    var rowData = [
        nomororder, kdbarang, namabarang, subkategori, qtyordered, '', '', '', qtyremaining, hargaunit, hargasub, '', hargatotal, kurs, idr, idrsubtotal, '', '', matauang, disc, '', idrdisc, qtyordered
    ];

    // Dapatkan indeks baris yang dipilih dalam tabel
    var rowIndex = $('#tabelcreate').find('tr.selected').index();

    // Perbarui data di dalam tabel
    tabelData.row(rowIndex).data(rowData).draw();
}




let tabelData = $('#tabelcreate').DataTable();
$('#tabelcreate tbody').on('click', 'tr', function () {
    var rowData = tabelData.row(this).data();

    $('#nomororder').val(rowData[0]);
    $('#kurs').val(rowData[13]);
    $('#matauang').val(rowData[20]);
    $('#kdbarang').val(rowData[1]);
    $('#hargaunit').val(rowData[9]);
    $('#idr').val(rowData[14]);
    $('#namabarang').val(rowData[2]);
    $('#disc').val(rowData[19]);
    $('#idrdisc').val(rowData[22]);
    $('#subkategori').val(rowData[3]);
    $('#hargasub').val(rowData[10]);
    $('#idrsubtotal').val(rowData[15]);
    $('#Qtyordered').val(rowData[4]);
    $('#qtyremaining').val(rowData[8]);
    $('#hargatotal').val(rowData[11]);
    $('#idrtotal').val(rowData[16]);
});


function responseData(datas) {
    let tabelData = $('#tabelcreate').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.no_kat_utama, data.Kd_brg, data.NAMA_BRG, data.no_sub_kategori, data.Qty, data.NoSatuan, data.QtyRcv, data.QtyShipped, data.QtyRemain, data.PriceUnit, data.PriceSub, data.PPN, data.PriceExt, data.Kurs, data.PriceUnitIDR,data.PriceSubIDR, data.PriceUnitIDR_PPN,data.JumPPN, data.ID_MATAUANG, data.disc, data.harga_disc, data.DiscIDR, data.Qty]).draw();
    });
}
