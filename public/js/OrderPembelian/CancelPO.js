let supplierDropdown = document.getElementById("select_supplier");
let noPODropdown = document.getElementById("select_noPO");
let no_po = document.getElementById("no_po");
let qty_cancel = document.getElementById("qty_cancel");
let alasan = document.getElementById("alasan_cancel");
let csrfToken = $('meta[name="csrf-token"]').attr("content");

document.getElementById("removebutton").style.display = "none";
document.getElementById("buttoncancel").style.display = "block";
document.getElementById("removebutton").disabled = true;
document.getElementById("buttoncancel").disabled = true;

function clearOptions(selectElement) {
    let length = selectElement.options.length;

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}

let tabelData = $("#tableharga").DataTable({
    responsive: true,
    scrollX: true,
    searching: false,
    scrollY: "200px",
    paging: false,
});

function clearData() {
    document.getElementById("no_po").value = "";
    document.getElementById("kd_barang").value = "";
    document.getElementById("nama_barang").value = "";
    document.getElementById("subkategori").value = "";
    document.getElementById("qty_ordered").value = "";
    document.getElementById("qty_remaining").value = "";
    document.getElementById("qty_received").value = "";
    document.getElementById("qty_cancel").value = "";
    document.getElementById("alasan_cancel").value = "";
    document.getElementById("removebutton").disabled = true;
    document.getElementById("buttoncancel").disabled = true;
}

function dropdownData() {
    $.ajax({
        url: "/GETabel",
        type: "GET",
        data: {
            noPO: noPODropdown.value.trim(),
        },
        success: function (response) {
            if (response.data.length == 0) {
                supplierDropdown.selectedIndex = 0;
                tabelData.clear().draw();
                alert("Data Tidak Ada");
            } else {
                for (let i = 0; i < supplierDropdown.options.length; i++) {
                    if (
                        supplierDropdown.options[i].value.replace(/\s/g, "") ===
                        response.supplier[0].Supplier.replace(/\s/g, "")
                    ) {
                        supplierDropdown.selectedIndex = i;
                    }
                }
                responseData(response.data);
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

noPODropdown.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        dropdownData();
    }
});

document.getElementById("removebutton").addEventListener("click", function () {
    $.ajax({
        url: "/PurchaseOrder/Cancel/Close",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: { noTrans: no_po.value },
        success: function (response) {
            console.log(response);
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiClose Order!",
                showConfirmButton: false,
                timer: "2000",
            });
            dropdownData();
            clearData();
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiClose Order!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error: " + error);
        },
    });
});

document.getElementById("buttoncancel").addEventListener("click", function () {
    $.ajax({
        url: "/PurchaseOrder/Cancel/Close1",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            noTrans: no_po.value,
            QtyCancel: qty_cancel.value,
            alasan: alasan_cancel.value,
        },
        success: function (response) {
            // Lakukan sesuatu setelah pembatalan selesai
            console.log(response);
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiCancel Order!",
                showConfirmButton: false,
                timer: "2000",
            });
            dropdownData();
            clearData();
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiCancel Order!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error: " + error);
        },
    });
});

function responseData(datas) {
    tabelData.clear().draw();
    datas.forEach(function (data) {
        tabelData.row.add([
            data.No_trans,
            data.Kd_brg,
            data.NAMA_BRG,
            data.nama_sub_kategori,
            data.Qty,
            data.Nama_satuan,
            data.QtyRcv,
            data.QtyRemain,
            data.JumPPN,
            data.Status,
        ]);
    });
    tabelData.draw();

    $("#tableharga").off("dblclick", "tr");
    $("#tableharga").on("dblclick", "tr", function () {
        $("#tableharga tr.selected").not(this).removeClass("selected");
        $(this).toggleClass("selected");
        var rowData = tabelData.row(this).data();
        if (rowData && rowData.length > 9) {
            var cancel = rowData[9];
            // console.log(cancel.trim())
            if (cancel.trim() === "PRINTED") {
                console.log("TES");
                document.getElementById("removebutton").style.display = "none";
                document.getElementById("buttoncancel").style.display = "block";
                document.getElementById("removebutton").disabled = false;
                document.getElementById("buttoncancel").disabled = false;
                document.getElementById("qty_cancel").value = rowData[4] || "";
            } else {
                document.getElementById("removebutton").style.display = "block";
                document.getElementById("buttoncancel").style.display = "none";
                document.getElementById("removebutton").disabled = false;
                document.getElementById("buttoncancel").disabled = false;
                document.getElementById("qty_cancel").value = rowData[8] || "";
            }

            document.getElementById("no_po").value = rowData[0] || "";
            document.getElementById("kd_barang").value = rowData[1] || "";
            document.getElementById("nama_barang").value = rowData[2] || "";
            document.getElementById("subkategori").value = rowData[3] || "";
            document.getElementById("subkategori").value = rowData[3] || "";
            document.getElementById("qty_ordered").value = rowData[4] || "";
            document.getElementById("qty_remaining").value = rowData[6] || "";
            document.getElementById("qty_received").value = rowData[6] || "";
        }
    });
}
