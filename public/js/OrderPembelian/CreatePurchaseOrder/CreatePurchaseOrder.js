let filter_radioButton1 = document.getElementById("filter_radioButton1");
let divisi_select = document.getElementById("divisi_select");
let filter_divisiRadioButton1 = document.getElementById(
    "filter_divisiRadioButton1"
);
let filter_divisiRadioButton2 = document.getElementById(
    "filter_divisiRadioButton2"
);
let filter_radioButton2 = document.getElementById("filter_radioButton2");
let filter_radioButtonUserInput = document.getElementById(
    "filter_radioButtonUserInput"
);
let filter_radioButton3 = document.getElementById("filter_radioButton3");
let filter_radioButtonOrderInput = document.getElementById(
    "filter_radioButtonOrderInput"
);
let redisplay = document.getElementById("redisplay");
let btn_close = document.getElementById("btn_close");
let btn_backCreatePO = document.getElementById("btn_backCreatePO");
let backGroup = document.getElementById("backGroup");
let check_nyantol = document.getElementById("check_nyantol");
let div_tablePO = document.getElementById("div_tablePO");
let table_PurchaseOrder = document.getElementById("table_PurchaseOrder");
let checkbox_centangSemuaBaris = document.getElementById(
    "checkbox_centangSemuaBaris"
);
let checkedAll = document.getElementById("CheckedAll");

let csrfToken = $('meta[name="csrf-token"]').attr("content");
let create_po = document.getElementById("create_po");
let form_createSPPB = document.getElementById("form_createSPPB");
let proses = 0;
let jnsBeli = 0;
let modeLoad = 0;
let selectedRows = [];

let table = $("#table_PurchaseOrder").DataTable({
    responsive: true,
    scrollX: true,
    searching: false,
    scrollY: "400px",
    paging: false,
    columnDefs: [{ orderable: false, targets: 0 }],
});

backGroup.style.display = "none";

check_nyantol.addEventListener("click", function (event) {
    if (check_nyantol.checked == true) {
        backGroup.style.display = "block";
        form_createSPPB.style.display = "none";
    } else {
        backGroup.style.display = "none";
        form_createSPPB.style.display = "block";
    }
});

checkedAll.addEventListener("click", function (event) {
    let rows = table
        .rows({
            search: "applied",
        })
        .nodes();
    if (checkedAll.checked == true) {
        $('input[type="checkbox"]', rows).prop("checked", true);
        let checkbox = $(this).find('input[type="checkbox"]');
        checkbox.prop("checked", !checkbox.prop("checked"));
        let checkedCount = $(
            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
        ).length;

        $("#checkedCount").text(`Jumlah Data Yang TerCentang ${checkedCount}`);
        selectedRows = table.rows().data().toArray();
    } else {
        $('input[type="checkbox"]', rows).prop("checked", false);
        selectedRows = [];
        let checkedCount = $(
            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
        ).length;

        $("#checkedCount").text(`Jumlah Data Yang TerCentang ${checkedCount}`);
    }
    console.log(selectedRows, "asd");
});

btn_backCreatePO.addEventListener("click", function (event) {
    if (selectedRows.length == 0) {
        alert("Pilih Dulu Data Yang Mau DiBack Create PO");
    } else {
        for (let i = 0; i < selectedRows.length; i++) {
            $.ajax({
                url: "/PurchaseOrderr/create/BackCreatePO",
                type: "PUT",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                data: {
                    noTrans: selectedRows[i][5].trim(),
                },
                success: function (response) {
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: "2000",
                    });
                    if (modeLoad == 1) {
                        proses = 1;
                        if (filter_divisiRadioButton1.checked == true) {
                            jnsBeli = 1;
                        } else if (filter_divisiRadioButton2.checked == true) {
                            jnsBeli = 0;
                        }
                        modeLoad = 1;
                        LoadPermohonanNyantol(proses, jnsBeli);
                    } else if (modeLoad == 2) {
                        proses = 2;
                        modeLoad = 2;
                        LoadPermohonanNyantol(proses, 2);
                    } else if (modeLoad == 3) {
                        proses = 3;
                        modeLoad = 3;
                        LoadPermohonanNyantol(proses, 3);
                    } else if (modeLoad == 4) {
                        proses = 1;
                        if (filter_divisiRadioButton1.checked == true) {
                            jnsBeli = 1;
                        } else if (filter_divisiRadioButton2.checked == true) {
                            jnsBeli = 0;
                        }
                        modeLoad = 4;
                        LoadPermohonan(proses, jnsBeli);
                    } else if (modeLoad == 5) {
                        proses = 2;
                        modeLoad = 5;
                        LoadPermohonan(proses, 2);
                    } else if (modeLoad == 6) {
                        proses = 3;
                        modeLoad = 6;
                        LoadPermohonan(proses, 3);
                    }
                },
                error: function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Data Tidak Berhasil DiBack To Create!",
                        showConfirmButton: false,
                        timer: "2000",
                    });
                    console.error("Error Send Data:", error);
                },
            });
        }
    }
});

btn_close.addEventListener("click", function (event) {
    if (selectedRows.length == 0) {
        alert("Pilih Dulu Data Yang Mau DiClose Order");
    } else {
        for (let i = 0; i < selectedRows.length; i++) {
            console.log(selectedRows[i][4], ":", selectedRows[i][8]);
            $.ajax({
                url: "/PurchaseOrderr/create/CloseOrder",
                type: "PUT",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                data: {
                    noTrans: selectedRows[i][5].trim(),
                    QtyCancel: parseFloat(selectedRows[i][9]),
                },
                success: function (response) {
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                        showConfirmButton: false,
                        timer: "2000",
                    });
                    if (modeLoad == 1) {
                        proses = 1;
                        if (filter_divisiRadioButton1.checked == true) {
                            jnsBeli = 1;
                        } else if (filter_divisiRadioButton2.checked == true) {
                            jnsBeli = 0;
                        }
                        modeLoad = 1;
                        LoadPermohonanNyantol(proses, jnsBeli);
                    } else if (modeLoad == 2) {
                        proses = 2;
                        modeLoad = 2;
                        LoadPermohonanNyantol(proses, 2);
                    } else if (modeLoad == 3) {
                        proses = 3;
                        modeLoad = 3;
                        LoadPermohonanNyantol(proses, 3);
                    } else if (modeLoad == 4) {
                        proses = 1;
                        if (filter_divisiRadioButton1.checked == true) {
                            jnsBeli = 1;
                        } else if (filter_divisiRadioButton2.checked == true) {
                            jnsBeli = 0;
                        }
                        modeLoad = 4;
                        LoadPermohonan(proses, jnsBeli);
                    } else if (modeLoad == 5) {
                        proses = 2;
                        modeLoad = 5;
                        LoadPermohonan(proses, 2);
                    } else if (modeLoad == 6) {
                        proses = 3;
                        modeLoad = 6;
                        LoadPermohonan(proses, 3);
                    }
                },
                error: function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Data Tidak Berhasil DiClose!",
                        showConfirmButton: false,
                        timer: "2000",
                    });
                    console.error("Error Send Data:", error);
                },
            });
        }
    }
});

filter_radioButtonOrderInput.addEventListener("change", function (event) {
    redisplay.focus();
});

filter_radioButtonUserInput.addEventListener("change", function (event) {
    redisplay.focus();
});

redisplay.addEventListener("click", function (event) {
    event.preventDefault();
    let nyantol = false;
    if (check_nyantol.checked == true) {
        nyantol = true;
    } else {
        nyantol = false;
    }
    console.log(nyantol);
    $('input[type="checkbox"]:checked').prop("checked", false);
    $("#checkedCount").text(`Jumlah Data Yang TerCentang 0`);
    if (nyantol == true) {
        check_nyantol.checked = true;
    } else {
        check_nyantol.checked = false;
    }
    if (check_nyantol.checked == true) {
        if (filter_radioButton1.checked == true) {
            proses = 1;
            if (filter_divisiRadioButton1.checked == true) {
                jnsBeli = 1;
            } else if (filter_divisiRadioButton2.checked == true) {
                jnsBeli = 0;
            }
            modeLoad = 1;
            LoadPermohonanNyantol(proses, jnsBeli);
        } else if (filter_radioButton2.checked == true) {
            proses = 2;
            modeLoad = 2;
            LoadPermohonanNyantol(proses, 2);
        } else if (filter_radioButton3.checked == true) {
            proses = 3;
            modeLoad = 3;
            LoadPermohonanNyantol(proses, 3);
        }
    } else {
        if (filter_radioButton1.checked == true) {
            proses = 1;
            if (filter_divisiRadioButton1.checked == true) {
                jnsBeli = 1;
            } else if (filter_divisiRadioButton2.checked == true) {
                jnsBeli = 0;
            }
            modeLoad = 4;
            LoadPermohonan(proses, jnsBeli);
        } else if (filter_radioButton2.checked == true) {
            proses = 2;
            modeLoad = 5;
            LoadPermohonan(proses, 2);
        } else if (filter_radioButton3.checked == true) {
            proses = 3;
            modeLoad = 6;
            LoadPermohonan(proses, 3);
        }
    }
});

create_po.addEventListener("click", function (event) {
    event.preventDefault();
    if (
        confirm(
            "Pastikan kembali bahwa order yang dicentang adalah milik divisi yang sama. 1 PO, 1 Supplier, 1 Divisi. Yakin akan memproses order ini?"
        )
    ) {
        let sameValues = true;
        for (let i = 0; i < selectedRows.length; i++) {
            if (
                selectedRows[0][1] !== selectedRows[i][1] ||
                selectedRows[0][2] !== selectedRows[i][2]
            ) {
                sameValues = false;
                alert("Ada data supplier dan divisi yang tidak sama!");
                return;
            }
        }
        if (sameValues == true) {
            let noTrans = [];
            for (let index = 0; index < selectedRows.length; index++) {
                noTrans.push(selectedRows[index][5]);
            }
            let input = document.createElement("input");
            input.type = "hidden";
            input.name = "noTrans";
            input.value = noTrans;
            form_createSPPB.appendChild(input);

            form_createSPPB.submit();
        }
    } else {
        return;
    }
});

function LoadPermohonan(proses, stbeli) {
    if (proses == 1) {
        fetch(
            "/get/dataPermohonanDivisi/" +
                stbeli +
                "/" +
                divisi_select.options[divisi_select.selectedIndex].value
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const rows = data.map((item) => {
                    return [
                        `<input type="checkbox" name="checked" value="${item.No_trans.trim()}" id="${item.No_trans.trim()}" style="width: 20px;height: 20px;" />`,
                        item.NM_SUP.trim(),
                        item.Kd_div.trim(),
                        item.NmUser.trim(),
                        item.StBeli.trim(),
                        item.No_trans.trim(),
                        item.Kd_brg.trim(),
                        item.NAMA_BRG.trim(),
                        item.nama_sub_kategori.trim(),
                        item.Qty.trim(),
                        item.Nama_satuan.trim(),
                        item.PriceUnit.trim(),
                        item.PriceSub.trim(),
                        item.PPN.trim(),
                        item.PriceExt.trim(),
                        item.Curr.trim(),
                        item.Tgl_Dibutuhkan.trim(),
                        item.keterangan.trim(),
                        item.Ket_Internal.trim(),
                        item.AppMan.trim(),
                        item.AppPBL.trim(),
                        item.AppDir.trim() + " " + item.Tgl_Direktur.trim(),
                    ];
                });
                table.clear();
                table.rows.add(rows);
                table.draw();
                $("#table_PurchaseOrder tbody").off("dblclick", "tr");
                $("#table_PurchaseOrder tbody").on(
                    "dblclick",
                    "tr",
                    function () {
                        let checkbox = $(this).find('input[type="checkbox"]');
                        checkbox.prop("checked", !checkbox.prop("checked"));
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        selectedRows = [];
                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });
                        console.log(selectedRows);
                    }
                );
                $("#table_PurchaseOrder tbody").on(
                    "click",
                    'input[type="checkbox"]',
                    function () {
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        let selectedRows = [];

                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });

                        console.log(selectedRows);
                    }
                );
            });
    } else if (proses == 2) {
        fetch("/get/dataPermohonanUser/" + filter_radioButtonUserInput.value)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const rows = data.map((item) => {
                    return [
                        `<input type="checkbox" name="checked" value="${item.No_trans.trim()}" id="${item.No_trans.trim()}" style="width: 20px;height: 20px;" />`,
                        item.NM_SUP.trim(),
                        item.Kd_div.trim(),
                        item.NmUser.trim(),
                        item.StBeli.trim(),
                        item.No_trans.trim(),
                        item.Kd_brg.trim(),
                        item.NAMA_BRG.trim(),
                        item.nama_sub_kategori.trim(),
                        item.Qty.trim(),
                        item.Nama_satuan.trim(),
                        item.PriceUnit.trim(),
                        item.PriceSub.trim(),
                        item.PPN.trim(),
                        item.PriceExt.trim(),
                        item.Curr.trim(),
                        item.Tgl_Dibutuhkan.trim(),
                        item.keterangan.trim(),
                        item.Ket_Internal.trim(),
                        item.AppMan.trim(),
                        item.AppPBL.trim(),
                        item.AppDir.trim() + " " + item.Tgl_Direktur.trim(),
                    ];
                });
                table.clear();
                table.rows.add(rows);
                table.draw();
                $("#table_PurchaseOrder tbody").off("dblclick", "tr");
                $("#table_PurchaseOrder tbody").on(
                    "dblclick",
                    "tr",
                    function () {
                        let checkbox = $(this).find('input[type="checkbox"]');
                        checkbox.prop("checked", !checkbox.prop("checked"));
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        selectedRows = [];
                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });
                        console.log(selectedRows);
                    }
                );
                $("#table_PurchaseOrder tbody").on(
                    "click",
                    'input[type="checkbox"]',
                    function () {
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        let selectedRows = [];

                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });

                        console.log(selectedRows);
                    }
                );
            });
    } else if (proses == 3) {
        fetch("/get/dataPermohonanOrder/" + filter_radioButtonOrderInput.value)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const rows = data.map((item) => {
                    return [
                        `<input type="checkbox" name="checked" value="${item.No_trans.trim()}" id="${item.No_trans.trim()}" style="width: 20px;height: 20px;" />`,
                        item.NM_SUP.trim(),
                        item.Kd_div.trim(),
                        item.NmUser.trim(),
                        item.StBeli.trim(),
                        item.No_trans.trim(),
                        item.Kd_brg.trim(),
                        item.NAMA_BRG.trim(),
                        item.nama_sub_kategori.trim(),
                        item.Qty.trim(),
                        item.Nama_satuan.trim(),
                        item.PriceUnit.trim(),
                        item.PriceSub.trim(),
                        item.PPN.trim(),
                        item.PriceExt.trim(),
                        item.Curr.trim(),
                        item.Tgl_Dibutuhkan.trim(),
                        item.keterangan.trim(),
                        item.Ket_Internal.trim(),
                        item.AppMan.trim(),
                        item.AppPBL.trim(),
                        item.AppDir.trim() + " " + item.Tgl_Direktur.trim(),
                    ];
                });
                table.clear();
                table.rows.add(rows);
                table.draw();
                $("#table_PurchaseOrder tbody").off("dblclick", "tr");
                $("#table_PurchaseOrder tbody").on(
                    "dblclick",
                    "tr",
                    function () {
                        let checkbox = $(this).find('input[type="checkbox"]');
                        checkbox.prop("checked", !checkbox.prop("checked"));
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        selectedRows = [];
                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });
                        console.log(selectedRows);
                    }
                );
                $("#table_PurchaseOrder tbody").on(
                    "click",
                    'input[type="checkbox"]',
                    function () {
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        let selectedRows = [];

                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });

                        console.log(selectedRows);
                    }
                );
            });
    }
}

function LoadPermohonanNyantol(proses, stbeli) {
    if (proses == 1) {
        fetch(
            "/get/dataPermohonanDivisiNyantol/" +
                stbeli +
                "/" +
                divisi_select.options[divisi_select.selectedIndex].value
        )
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                const rows = data.map((item) => {
                    return [
                        `<input type="checkbox" name="checked" value="${item.No_trans.trim()}" id="${item.No_trans.trim()}" style="width: 20px;height: 20px;" />`,
                        item.NM_SUP.trim(),
                        item.Kd_div.trim(),
                        item.NmUser.trim(),
                        item.StBeli.trim(),
                        item.No_trans.trim(),
                        item.Kd_brg.trim(),
                        item.NAMA_BRG.trim(),
                        item.nama_sub_kategori.trim(),
                        item.Qty.trim(),
                        item.Nama_satuan.trim(),
                        item.PriceUnit.trim(),
                        item.PriceSub.trim(),
                        item.PPN.trim(),
                        item.PriceExt.trim(),
                        item.Curr.trim(),
                        item.Tgl_Dibutuhkan.trim(),
                        item.keterangan.trim(),
                        item.Ket_Internal.trim(),
                        item.AppMan.trim(),
                        item.AppPBL.trim(),
                        item.AppDir.trim() + " " + item.Tgl_Direktur.trim(),
                    ];
                });
                table.clear();
                table.rows.add(rows);
                table.draw();
                $("#table_PurchaseOrder tbody").off("dblclick", "tr");
                $("#table_PurchaseOrder tbody").on(
                    "dblclick",
                    "tr",
                    function () {
                        let checkbox = $(this).find('input[type="checkbox"]');
                        checkbox.prop("checked", !checkbox.prop("checked"));
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        selectedRows = [];
                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });
                        console.log(selectedRows);
                    }
                );
                $("#table_PurchaseOrder tbody").on(
                    "click",
                    'input[type="checkbox"]',
                    function () {
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        let selectedRows = [];

                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });

                        console.log(selectedRows);
                    }
                );
            });
    } else if (proses == 2) {
        fetch(
            "/get/dataPermohonanUserNyantol/" +
                filter_radioButtonUserInput.value
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const rows = data.map((item) => {
                    return [
                        `<input type="checkbox" name="checked" value="${item.No_trans.trim()}" id="${item.No_trans.trim()}" style="width: 20px;height: 20px;" />`,
                        item.NM_SUP.trim(),
                        item.Kd_div.trim(),
                        item.NmUser.trim(),
                        item.StBeli.trim(),
                        item.No_trans.trim(),
                        item.Kd_brg.trim(),
                        item.NAMA_BRG.trim(),
                        item.nama_sub_kategori.trim(),
                        item.Qty.trim(),
                        item.Nama_satuan.trim(),
                        item.PriceUnit.trim(),
                        item.PriceSub.trim(),
                        item.PPN.trim(),
                        item.PriceExt.trim(),
                        item.Curr.trim(),
                        item.Tgl_Dibutuhkan.trim(),
                        item.keterangan.trim(),
                        item.Ket_Internal.trim(),
                        item.AppMan.trim(),
                        item.AppPBL.trim(),
                        item.AppDir.trim() + " " + item.Tgl_Direktur.trim(),
                    ];
                });
                table.clear();
                table.rows.add(rows);
                table.draw();
                $("#table_PurchaseOrder tbody").off("dblclick", "tr");
                $("#table_PurchaseOrder tbody").on(
                    "dblclick",
                    "tr",
                    function () {
                        let checkbox = $(this).find('input[type="checkbox"]');
                        checkbox.prop("checked", !checkbox.prop("checked"));
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        selectedRows = [];
                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });
                        console.log(selectedRows);
                    }
                );
                $("#table_PurchaseOrder tbody").on(
                    "click",
                    'input[type="checkbox"]',
                    function () {
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        let selectedRows = [];

                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });

                        console.log(selectedRows);
                    }
                );
            });
    } else if (proses == 3) {
        fetch(
            "/get/dataPermohonanOrderNyantol/" +
                filter_radioButtonOrderInput.value
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const rows = data.map((item) => {
                    return [
                        `<input type="checkbox" name="checked" value="${item.No_trans.trim()}" id="${item.No_trans.trim()}" style="width: 20px;height: 20px;" />`,
                        item.NM_SUP.trim(),
                        item.Kd_div.trim(),
                        item.NmUser.trim(),
                        item.StBeli.trim(),
                        item.No_trans.trim(),
                        item.Kd_brg.trim(),
                        item.NAMA_BRG.trim(),
                        item.nama_sub_kategori.trim(),
                        item.Qty.trim(),
                        item.Nama_satuan.trim(),
                        item.PriceUnit.trim(),
                        item.PriceSub.trim(),
                        item.PPN.trim(),
                        item.PriceExt.trim(),
                        item.Curr.trim(),
                        item.Tgl_Dibutuhkan.trim(),
                        item.keterangan.trim(),
                        item.Ket_Internal.trim(),
                        item.AppMan.trim(),
                        item.AppPBL.trim(),
                        item.AppDir.trim() + " " + item.Tgl_Direktur.trim(),
                    ];
                });

                table.clear();
                table.rows.add(rows);
                table.draw();
                $("#table_PurchaseOrder tbody").off("dblclick", "tr");
                $("#table_PurchaseOrder tbody").on(
                    "dblclick",
                    "tr",
                    function () {
                        let checkbox = $(this).find('input[type="checkbox"]');
                        checkbox.prop("checked", !checkbox.prop("checked"));
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        selectedRows = [];
                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });
                        console.log(selectedRows);
                    }
                );
                $("#table_PurchaseOrder tbody").on(
                    "click",
                    'input[type="checkbox"]',
                    function () {
                        let checkedCount = $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).length;

                        $("#checkedCount").text(
                            `Jumlah Data Yang TerCentang ${checkedCount}`
                        );
                        let selectedRows = [];

                        $(
                            '#table_PurchaseOrder tbody input[type="checkbox"]:checked'
                        ).each(function () {
                            let row = $(this).closest("tr");
                            let rowData = table.row(row).data();
                            selectedRows.push(rowData);
                        });

                        console.log(selectedRows);
                    }
                );
            });
    }
}
