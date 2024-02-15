let supplierDropdown = document.getElementById("select_supplier");
let noPODropdown = document.getElementById("select_noPO");

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

noPODropdown.addEventListener("change", function(event) {
    $('#tableharga').DataTable().clear();
    $.ajax({
        url: "/GETabel",
        type: "GET",
        data: {
            noPO: noPODropdown.value,
        },
        success: function(response) {
            responseData(response);
        },
        error: function(error) {
            console.error("Error Fetch Data:", error);
        },
    });
});

$('#btnRemove').on('click', function() {
    var noTrans = $('#lblNoOrder').text();
    var kd = ($(this).text() === "CANCEL PO") ? 16 : 17;
    var Operator = ($('#btnRemove').text() === "CANCEL PO") ? "SystemInformation.UserName" : "";
    var QtyCancel = parseFloat($('#txtCancel').val());
    var alasan = $('#txtAlasan').val();

    $.ajax({
        url: '/YourController/CancelOrder',
        type: 'POST',
        dataType: 'json',
        data: {
            noTrans: noTrans,
            kd: kd,
            Operator: Operator,
            QtyCancel: QtyCancel,
            alasan: alasan
        },
        success: function(response) {
            if (response.success) {
                alert(response.message);
                clear(); // Memanggil fungsi clear untuk membersihkan UI setelah sukses
                loadDataAfter($('#txtPO').val()); // Memanggil fungsi loadDataAfter untuk memuat data setelah sukses
            } else {
                alert(response.message);
            }
        },
        error: function(xhr, status, error) {
            alert("Terjadi kesalahan: " + error);
        }
    });
});

function responseData(datas) {
    let tableData = $('#tableharga').DataTable();
    tableData.clear().destroy()
    datas.forEach(function (data) {
        tableData.row.add([data.No_trans, data.Kd_brg, data.NAMA_BRG, data.nama_sub_kategori, data.Qty, data.Nama_satuan, data.QtyRcv, data.QtyRemain, data.JumPPN, data.Status]).draw();
    });
}

let tabelData = $('#tableharga').DataTable();
$('#tableharga tbody').on('dblclick', 'tr', function () {
    var rowData = tabelData.row(this).data();

    if (rowData && rowData.length >= 8) {
        document.getElementById('no_po').value = rowData[0] || '';
        document.getElementById('kd_barang').value = rowData[1] || '';
        document.getElementById('nama_barang').value = rowData[2] || '';
        document.getElementById('subkategori').value = rowData[3] || '';
        document.getElementById('subkategori').value = rowData[3] || '';
        document.getElementById('qty_ordered').value = rowData[4] || '';
        document.getElementById('qty_remaining').value = rowData[5] || '';
        document.getElementById('qty_received').value = rowData[6] || '';
        document.getElementById('qty_cancel').value = rowData[7] || '';
    } else {
        console.error("Invalid rowData or insufficient length");
    }
});


