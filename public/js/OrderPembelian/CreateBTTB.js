var input = document.getElementById("po");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/Create",
            data: {
                noPO: input.value,
            },
            success: function (response) {
                console.log('Data successfully sent to the server');
                console.log('Server response:', response);
                responseData(response)
            },
            error: function (error) {
                console.error('Error sending data to the server:', error);
            }
        });
    }
});

let tabelData = $('#tabelcreate').DataTable();


$('#tabelcreate tbody').on('click', 'tr', function () {
    var rowData = tabelData.row(this).data();

    // Mengisi nilai ke elemen formulir
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
