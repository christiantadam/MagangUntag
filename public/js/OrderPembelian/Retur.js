var input = document.getElementById("nomor_po");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/GETReturBTTB",
            data: {
                noPO: input.value,
            },
            success: function (response) {
                console.log('Data successfully sent to the server');
                console.log('Server response:', response);
                responseData(response);
            },
            error: function (error) {
                console.error('Error sending data to the server:', error);
            }
        });
    }
});

var input = document.getElementById("nomor_po");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $.ajax({
            method: "GET",
            url: "/GETBTTB",
            data: {
                noPO: input.value,
            },
            success: function (response) {
                console.log('Data successfully sent to the server');
                console.log('Server response:', response);

                document.getElementById('suplier').value = response[0].NM_SUP || '';
                document.getElementById('payment').value = response[0].Pembayaran || '';
                var formattedTanggalPO = new Date(response[0].Tgl_sppb).toISOString().split('T')[0];
                document.getElementById('tanggal_po').value = formattedTanggalPO || '';
                var formattedTanggalkirim = new Date(response[0].Est_Date).toISOString().split('T')[0];
                document.getElementById('tanggalkirim').value = formattedTanggalkirim || '';
                document.getElementById('matauang').value = response[0].Curr || '';
            },
            error: function (error) {
                console.error('Error sending data to the server:', error);
            }
        });
    }
});

let tabelData = $('#tabelretur').DataTable();
$('#tabelretur tbody').on('dblclick', 'tr', function () {
    var rowData = tabelData.row(this).data();

    document.getElementById('kdbarang').value = rowData[4] || '';
    document.getElementById('tanggalretur').value = rowData[12];
    document.getElementById('namabarang').value = rowData[5] || '';
    document.getElementById('type').value = rowData[9] || '';
    document.getElementById('kelompok').value = '';
    document.getElementById('subkategori').value = rowData[6] || '';
    document.getElementById('returprimer').value = rowData[11] || '';
    document.getElementById('sekunder').value = '';
    document.getElementById('tertier').value = '';
    document.getElementById('bttb').value = rowData[0] || '';
    document.getElementById('alasan').value = rowData[13] || '';
    document.getElementById('sj').value = rowData[1] || '';
    document.getElementById('id_terima').value = rowData[2] || '';
    document.getElementById('qty_terima').value = rowData[7] || '';

    $.ajax({
        method: "GET",
        url: "/GETRetur",
        data: {
            kodebarang: rowData[4],
        },
        success: function (response) {
            console.log('Data successfully sent to the server');
            console.log('Server response for tabelretur1:', response);

            responseDataTabelRetur1(response);
        },
        error: function (error) {
            console.error('Error sending data to the server:', error);
        }
    });
});


$(document).ready(function() {
    // Tambahkan event click pada tombol POST
    $('#postButton').click(function() {
        // Ambil data dari input form
        var id = $('#id').val();
        var qtyRetur = $('#returprimer').val();
        var tanggalRetur = $('#tanggalretur').val();
        var alasan = $('#alasan').val();
        var noBTTB = $('#bttb').val();
        var noSJ = $('#sj').val();
        var idTerima = $('#id_terima').val();
        var qtyTerima = $('#qty_terima').val();

        // Kirim data ke server menggunakan AJAX
        $.ajax({
            url: '/PostRetur',
            type: 'POST',
            data: {
                id: id,
                qty_retur: qtyRetur,
                tanggal_retur: tanggalRetur,
                alasan: alasan,
                no_bttb: noBTTB,
                no_sj: noSJ,
                id_terima: idTerima,
                qty_terima: qtyTerima,
                _token: '{{ csrf_token() }}'
            },
            success: function(response) {
                // Tindakan jika update berhasil
                alert('Data retur berhasil diupdate!');
            },
            error: function(xhr, status, error) {
                // Tindakan jika terjadi kesalahan
                alert('Terjadi kesalahan: ' + error);
            }
        });
    });
});





$.ajax({
    type: 'GET',
    url: '/Retur', // Sesuaikan dengan URL rute Anda
    dataType: 'json',
    success: function(response) {
        // Memasukkan data ke dalam dropdown
        var select = $('#suplier');
        $.each(response, function(index, supplier) {
            select.append('<option value="' + supplier.NO_SUP + '">' + supplier.NM_SUP + '</option>');
        });
    },
    error: function(error) {
        console.log(error);
    }
});

function responseData(datas) {
    let tabelData = $('#tabelretur').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.No_BTTB, data.No_SuratJalan, data.No_terima, data.No_trans, data.Kd_brg, data.NAMA_BRG, data.nama_sub_kategori, data.Qty_Terima, data.Nama_satuan, data.NoTransaksiTmp, data.NoTransaksiInv, data.JmlRetur, data.TglRetur, data.KetRetur, data.Satuan_Terima, data.Id_Penagihan]).draw();
    });
}

function responseDataTabelRetur1(datas) {
    let tabelData = $('#tabelretur1').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.IdType, data.KodeBarang, data.NamaType, data.SaldoPrimer, data.satPrimer, data.Unitritier, data.SaldoTritier, data.SaldoSekunder, data.satSekunder, data.NamaSubKelompok, data.NamaKelompok, data.NamaKelompokUtama, data.NamaObjek]).draw();
    });
}

