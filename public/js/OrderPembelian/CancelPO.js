let supplierDropdown = document.getElementById("select_supplier");
let noPODropdown = document.getElementById("select_noPO");
let no_po = document.getElementById("no_po");
let qty_cancel = document.getElementById("qty_cancel");
let alasan = document.getElementById("alasan_cancel")
let csrfToken = $('meta[name="csrf-token"]').attr("content");


function clearOptions(selectElement) {
    let length = selectElement.options.length;

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}

supplierDropdown.addEventListener("change", function (event) {
    if (supplierDropdown.selectedIndex != 0) {
        clearOptions(noPODropdown);
        let selectedSupplierId = supplierDropdown.value;
        console.log(noPODropdown)
        $.ajax({
            url: "/GETPost",
            type: "GET",
            data: {
                idSup: supplierDropdown.value,
            },
            success: function (response) {
                // console.log(response)
                response.forEach(function (data) {
                    console.log(data)
                    let option = document.createElement("option");
                    option.value = data.NO_PO;
                    option.text = data.NO_PO;
                    noPODropdown.add(option);
                });
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });
    } else {
        // Disable dropdown No PO if no supplier is selected
        noPODropdown.disabled = true;
    }
});

noPODropdown.addEventListener("change", function (event) {
    $('#tableharga').DataTable().clear();
    $.ajax({
        url: "/GETabel",
        type: "GET",
        data: {
            noPO: noPODropdown.value,
        },
        success: function (response) {
            responseData(response);
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});


// $(document).ready(function () {
//     // Event handler untuk tombol "Remove"
//     $('#removebutton').click(function () {
//         // Mendapatkan nilai yang diperlukan dari elemen HTML atau dari sumber data lainnya
//         var noTrans = $('#no_po').text(); // Mendapatkan nomor transaksi dari elemen dengan ID lblNoOrder
//         var QtyCancel = $('#qty_cancel').val(); // Mendapatkan jumlah yang dibatalkan dari elemen dengan ID QtyCancel
//         var alasan = $('#alasan_cancel').val(); // Mendapatkan alasan pembatalan dari elemen dengan ID txtAlasan
//         if (operation === 'cancel') {
//             cancel(noTrans);
//         } else if (operation === 'cancel1') {
//             cancel1(noTrans, QtyCancel, alasan);
//         }
//     });
// });


document.getElementById('removebutton').addEventListener('click', function () {
    $.ajax({
        url: '/PurchaseOrder/Cancel/Close',
        type: 'POST',
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: { noTrans: no_po.value },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
})

document.getElementById('buttoncancel').addEventListener('click', function()
{
    $.ajax({
        url: '/PurchaseOrder/Cancel/Close1',
        type: 'POST',
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            noTrans: no_po.value,
            QtyCancel: qty_cancel.value,
            alasan: alasan_cancel.value
        },
        success: function (response) {
            // Lakukan sesuatu setelah pembatalan selesai
            console.log(response);
        },
        error: function (xhr, status, error) {
            console.error('Error: ' + error);
        }
    });
})

function responseData(datas) {
    let tableData = $('#tableharga').DataTable();
    tableData.clear().destroy()
    datas.forEach(function (data) {
        tableData.row.add([data.No_trans, data.Kd_brg, data.NAMA_BRG, data.nama_sub_kategori, data.Qty, data.Nama_satuan, data.QtyRcv, data.QtyRemain, data.JumPPN, data.Status]).draw();
    });
}

let tabelData;

function responseData(datas) {
    tabelData = $('#tableharga').DataTable();
    tabelData.clear().draw(); // Hanya clear tanpa menghancurkan tabel
    datas.forEach(function (data) {
        tabelData.row.add([data.No_trans, data.Kd_brg, data.NAMA_BRG, data.nama_sub_kategori, data.Qty, data.Nama_satuan, data.QtyRcv, data.QtyRemain, data.JumPPN, data.Status]);
    });
    tabelData.draw(); // Gambarkan tabel kembali setelah menambahkan data baru

    // Inisialisasi ulang event listener untuk double-click pada baris-baris tabel
    $('#tableharga').off('dblclick', 'tr'); // Hapus event listener yang sudah ada
    $('#tableharga').on('dblclick', 'tr', function () {
        var rowData = tabelData.row(this).data();
        if (rowData && rowData.length > 9) {


            var cancel = rowData[9];
            // console.log(cancel.trim())
            if (cancel.trim() === 'PRINTED') {
                console.log('TES')
                document.getElementById('removebutton').style.display = 'none';
                document.getElementById('buttoncancel').style.display = 'block';
                document.getElementById('qty_cancel').value = rowData[4] || '';
            } else {
                document.getElementById('removebutton').style.display = 'block';
                document.getElementById('buttoncancel').style.display = 'none';
                document.getElementById('qty_cancel').value = rowData[8] || '';
            }

            document.getElementById('no_po').value = rowData[0] || '';
            document.getElementById('kd_barang').value = rowData[1] || '';
            document.getElementById('nama_barang').value = rowData[2] || '';
            document.getElementById('subkategori').value = rowData[3] || '';
            document.getElementById('subkategori').value = rowData[3] || '';
            document.getElementById('qty_ordered').value = rowData[4] || '';
            document.getElementById('qty_remaining').value = rowData[6] || '';
            document.getElementById('qty_received').value = rowData[6] || '';
        }
    });
}




//     if (rowData && rowData.length >= 8) {
//  console.log(rowData[9])
//         var cancel = rowData[9]
//         if (cancel.trim == 'PRINTED') {
//             document.getElementById('removebutton').style.display = 'none'
//             document.getElementById('buttoncancel').style.display = 'block'
//         } else {
//             document.getElementById('buttoncancel').style.display = 'block'
//             document.getElementById('removebutton').style.display = 'none'
//         }
//         document.getElementById('no_po').value = rowData[0] || '';
//         document.getElementById('kd_barang').value = rowData[1] || '';
//         document.getElementById('nama_barang').value = rowData[2] || '';
//         document.getElementById('subkategori').value = rowData[3] || '';
//         document.getElementById('subkategori').value = rowData[3] || '';
//         document.getElementById('qty_ordered').value = rowData[4] || '';
//         document.getElementById('qty_remaining').value = rowData[6] || '';
//         document.getElementById('qty_received').value = rowData[6] || '';
//         document.getElementById('qty_cancel').value = rowData[4] || '';
//     } else {
//         console.error("Invalid rowData or insufficient length");
//     }



