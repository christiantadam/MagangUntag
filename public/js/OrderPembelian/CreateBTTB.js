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


    $(document).ready(function () {
        $("#btn_update").click(function () {
            // Ambil nilai dari input atau elemen lainnya
            var idTypeTransaksi = $("#idTypeTransaksi").val();
            var tanggal = $("#tanggal").val();
            var idSupplier = $("#idSupplier").val();
            // ... ambil nilai dari elemen lainnya

            // Data yang akan dikirim
            var data = {
                idTypeTransaksi: idTypeTransaksi,
                tanggal: tanggal,
                idSupplier: idSupplier,
                // ... tambahkan data lainnya
            };

            // Kirim request Ajax
            $.ajax({
                type: "POST", // Ganti dengan method yang sesuai
                url: "/path/to/your/endpoint", // Ganti dengan URL endpoint Anda
                data: data,
                success: function (response) {
                    // Handle respon dari server jika sukses
                    console.log(response);
                },
                error: function (error) {
                    // Handle error jika terjadi
                    console.error("Error:", error);
                }
            });
        });
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

