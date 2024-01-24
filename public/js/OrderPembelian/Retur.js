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
                responseData(response)
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

                  // Mengisi nilai ke elemen-elemen HTML
                //   console.log(response[0].NM_SUP)
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
$('#tabelretur tbody').on('click', 'tr', function () {
    // Mengambil data dari baris yang diklik
    var rowData = tabelData.row(this).data();

    // Mengisi nilai ke elemen-elemen HTML di bawah tabel
    document.getElementById('kdbarang').value = rowData[4] || ''; // Ganti dengan indeks yang sesuai dengan kolom Kd Barang
    document.getElementById('tanggalretur').value = rowData[12]; // Ganti dengan indeks yang sesuai dengan kolom Tgl Retur
    document.getElementById('namabarang').value = rowData[5] || ''; // Ganti dengan indeks yang sesuai dengan kolom Nama Barang
    document.getElementById('type').value = rowData[9] || ''; // Ganti dengan indeks yang sesuai dengan kolom id Type
    document.getElementById('kelompok').value = ''; // Ganti dengan indeks yang sesuai dengan kolom Kelompok
    document.getElementById('subkategori').value = rowData[6] || ''; // Ganti dengan indeks yang sesuai dengan kolom Sub Kategori
    document.getElementById('returprimer').value = rowData[11] || ''; // Ganti dengan indeks yang sesuai dengan kolom Qty Retur
    document.getElementById('sekunder').value = ''; // Ganti dengan indeks yang sesuai dengan kolom Qty Sekunder
    document.getElementById('tertier').value = ''; // Ganti dengan indeks yang sesuai dengan kolom Qty Tertier
    document.getElementById('bttb').value = rowData[0] || ''; // Ganti dengan indeks yang sesuai dengan kolom No. BTTB
    document.getElementById('alasan').value = rowData[13] || ''; // Ganti dengan indeks yang sesuai dengan kolom Alasan
    document.getElementById('sj').value = rowData[1] || ''; // Ganti dengan indeks yang sesuai dengan kolom No. SJ
    document.getElementById('id_terima').value = rowData[2] || ''; // Ganti dengan indeks yang sesuai dengan kolom Id Terima
    document.getElementById('qty_terima').value = rowData[7] || ''; // Ganti dengan indeks yang sesuai dengan kolom Qty Terima
});



function responseData(datas) {
    let tabelData = $('#tabelretur').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.No_BTTB, data.No_SuratJalan, data.No_terima, data.No_trans, data.Kd_brg, data.NAMA_BRG, data.nama_sub_kategori, data.Qty_Terima, data.Nama_satuan, data.NoTransaksiTmp, data.NoTransaksiInv, data.JmlRetur, data.TglRetur, data.KetRetur, data.Satuan_Terima, data.Id_Penagihan]).draw();
    });
}
