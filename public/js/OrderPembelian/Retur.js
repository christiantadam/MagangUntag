let jenisTrans;
let unitMode;
let idTransferData = ''; // Inisialisasi variabel di luar fungsi responseData
let idTrans = '';
let csrfToken = $('meta[name="csrf-token"]').attr("content");
let tglRetur = document.getElementById("tanggalretur");
let returQty = document.getElementById("returprimer");
let Terima = document.getElementById("id_terima");
let alasan = document.getElementById("alasan");


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

    document.getElementById('kdbarang').value = rowData[3] || '';
    document.getElementById('tanggalretur').value = rowData[13];
    document.getElementById('namabarang').value = rowData[4] || '';
    document.getElementById('type').value = '';
    document.getElementById('kelompok').value = '';
    document.getElementById('subkategori').value = rowData[5] || '';
    document.getElementById('bttb').value = rowData[0] || '';
    document.getElementById('alasan').value = rowData[13] || '';
    document.getElementById('sj').value = rowData[1] || '';
    document.getElementById('id_terima').value = rowData[2] || '';
    document.getElementById('qty_terima').value = rowData[7] || '';

    if (idTmp.trim().length === 0 && idTrans.trim().length === 0) {
        $('#lblInfo').text("Data belum ditransfer ke inventory. Data adalah berupa jasa. Silahkan diproses batal BTTB.");
        jenisTrans = 1;
        $('#returbutton').show();
        $('#batalbutton').hide();
        $('#postbutton').hide();
    }
    if  (idTmp.trim().length > 0 && idTrans.trim().length === 0) {
        $('#lblInfo').text("Data sudah ditransfer ke inventory, tetapi belum diproses terima oleh gudang/divisi. Data adalah berupa jasa. Silahkan diproses batal BTTB.");
        jenisTrans = 2;
        $('#returbutton').hide(); // Sembunyikan tombol retur
        $('#batalbutton').show(); // Tampilkan tombol batal
        $('#postbutton').hide(); // Sembunyikan tombol post
    }
    if (idTmp.trim().length > 0) {
        $('#lblInfo').text("Data sudah ditransfer ke inventory dan sudah diterima oleh gudang/divisi. Sebelum proses retur, pastikan barang sudah dimutasi ke PBL terlebih dahulu.");
        checkInv(rowData[3])
        if ($('#TabelRetur1').length > 0) {
            jenisTrans = 3;
            $('#returbutton').show(); // Tampilkan tombol retur
            $('#batalbutton').hide(); // Sembunyikan tombol batal
            $('#postbutton').hide(); // Sembunyikan tombol post
        } else {
            $('#returbutton').hide(); // Sembunyikan tombol retur
            $('#batalbutton').hide(); // Sembunyikan tombol batal
            $('#postbutton').show(); // Tampilkan tombol post
            alert("Belum dapat dilakukan proses retur karena barang belum kembali ke inventory PBL.");
        }
    }
});

function checkInv(data){
    $.ajax({
        method: "GET",
        url: "/GETRetur",
        data: {
            kodebarang: data,
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
}

//tabelinv
$(document).ready(function () {
    let tabelData = $('#tabelretur1').DataTable();

    $('#tabelretur1 tbody').on('dblclick', 'tr', function () {
        var rowData = tabelData.row(this).data();

        $('#type').val(rowData[0] || '');
        $('#kelompok').val(rowData[10]);
        $('#returprimer').val(rowData[3] || '');
        $('#sekunder').val(rowData[4] || '');
        $('#tertier').val(rowData[5]);
    });
});

// Integration of VB.NET logic
var lblNoSatuan = document.getElementById("lblNoSatuan").textContent;
var lblIdPrim = document.getElementById("lblIdPrim").textContent;
var lblIdSek = document.getElementById("lblIdSek").textContent;
var lblIdTri = document.getElementById("lblIdTri").textContent;

var lblPrim = document.getElementById("lblPrim");
var lblSek = document.getElementById("lblSek");
var lblTer = document.getElementById("lblTer");

if (lblNoSatuan === lblIdPrim) {
    console.log(unitMode);
    unitMode = 1;
} else if (lblNoSatuan === lblIdSek) {
    console.log(unitMode);
    unitMode = 2;
} else if (lblNoSatuan === lblIdTri) {
    console.log(unitMode);
    unitMode = 3;
}


//ReturBatal
$(document).ready(function () {
    $('#postbutton').click(function () {
        var data = {};

        if ($('#postbutton').text() === "") {
            var returQty;
            var message;
            if (unitMode === 1) {
                returQty = $('#returprimer').val();
                message = "Yang akan diretur adalah quantity primer. Jumlah qty retur lebih kecil atau sama dengan jumlah qty terima. Lanjutkan proses retur?";
            } else if (unitMode === 2) {
                returQty = $('#sekunder').val();
                message = "Yang akan diretur adalah quantity sekunder. Jumlah qty retur lebih kecil atau sama dengan jumlah qty terima. Lanjutkan proses retur?";
            } else if (unitMode === 3) {
                returQty = $('#tertier').val();
                message = "Yang akan diretur adalah quantity tritier. Jumlah qty retur lebih kecil atau sama dengan jumlah qty terima. Lanjutkan proses retur?";
            }

            $.ajax({
                type: 'POST',
                url: '/ReturRetur',
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                data: {
                    Terima: id_terima,
                    tglRetur: tanggalretur,
                    unitMode: unitMode,
                    returQty: returprimer,

                },
                success: function (response) {
                    alert('Proses retur berhasil dilakukan.');
                },
                error: function (xhr, status, error) {
                    alert('Terjadi kesalahan: ' + error);
                }
            });
        } else if ($('#postbutton').text() === "BATAL") {
            $.ajax({
                type: 'POST',
                url: '/ReturBatal',
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                data: {
                    Terima: id_terima,
                    tglRetur: tanggalretur,
                    alasan: alasan,

                },
                success: function (response) {
                    alert(response);
                    $('#postbutton').prop('disabled', true);
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    alert('Terjadi kesalahan: ' + error);
                }
            });
        }
    });
});

function responseData(datas) {
    let tabelData = $('#tabelretur').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.No_BTTB, data.No_SuratJalan, data.No_terima, data.Kd_brg, data.NAMA_BRG, data.nama_sub_kategori, data.Qty_Terima, data.Nama_satuan, data.NoTransaksiTmp, data.NoTransaksiInv, data.No_trans,data.KetRetur, data.JmlRetur,  data.TglRetur, data.Id_Penagihan]).draw();
    });
}

function responseDataTabelRetur1(datas) {
    let tabelData = $('#tabelretur1').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.IdType, data.KodeBarang, data.NamaType, data.SaldoPrimer, data.satPrimer, data.Unitritier, data.SaldoTritier, data.SaldoSekunder, data.satSekunder, data.NamaSubKelompok, data.NamaKelompok, data.NamaKelompokUtama, data.NamaObjek]).draw();
    });
}
