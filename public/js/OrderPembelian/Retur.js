var input = document.getElementById("nomor_po");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/GETReturBTTB",
        data: {
            noPO: input.value,
        },
        success: function(response) {
            console.log('Data successfully sent to the server');
            console.log('Server response:', response);
            responseData(response)

        },
        error: function(error) {
            console.error('Error sending data to the server:', error);
        }
    });
  }
});

function responseData (datas) {
    let tabelData = $('#tabelretur').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.No_BTTB, data.No_SuratJalan, data.No_terima, data.No_trans, data.kd_brg, data.NAMA_BRG, data.nama_sub_kategori, data.Qty_Terima, data.Nama_satuan, data.NoTransaksiTMP, data.NoTransaksiInv, data.JmlRetur, data.TglRetur, data.KetRetur,data.Id_Penagihan, data.Satuan_Terima]).draw();
    });
}
