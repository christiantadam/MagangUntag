let selectDivisi = document.getElementById("select_divisi");
let filter_radioButtonDivisi = document.getElementById(
    "filter_radioButtonDivisi"
);
let nomor_order = document.getElementById("nomor_order");
let filter_radioButtonNomorOrder = document.getElementById(
    "filter_radioButtonNomorOrder"
);
let tglAwal = document.getElementById("tglAwal");
let jamAwal = document.getElementById("jamAwal");
let tglAkhir = document.getElementById("tglAkhir");
let jamAkhir = document.getElementById("jamAkhir");
let statusPengadaan = document.getElementById("status_beliPengadaanPembelian");
let statusBeliSendiri = document.getElementById("status_beliBeliSendiri");
let buttonRedisplay = document.getElementById("button_redisplay");
let tableListOrder = document.getElementById("table_ListOrder");
let checkedAll = document.getElementById("CheckedAll");
let btnPrint = document.getElementById("btn_print");
let checked = document.getElementsByName("checked");

let currentDate = new Date();
checkedAll.disabled = true;
tglAwal.valueAsDate = currentDate;
jamAwal.value =
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);
tglAkhir.valueAsDate = currentDate;
jamAkhir.value =
    ("0" + currentDate.getHours()).slice(-2) +
    ":" +
    ("0" + currentDate.getMinutes()).slice(-2);

tglAwal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        jamAwal.focus();
    }
});

jamAwal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        tglAkhir.focus();
    }
});

tglAkhir.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        jamAkhir.focus();
    }
});
nomor_order.addEventListener("change", function (event) {
    buttonRedisplay.focus();
});

buttonRedisplay.addEventListener("click", function (event) {
    if (filter_radioButtonDivisi.checked == true) {
        let statusPembelian = 1;
        if (statusPengadaan.checked == true) {
            statusPembelian = 1;
        } else {
            statusPembelian = 0;
        }
        $("#table_ListOrder").DataTable().clear().destroy();
        $('input[type="checkbox"]:checked').prop("checked", false);
        $("#checkedCount").text(`Jumlah Data Yang TerCentang 0`);
        $.ajax({
            url: "/ListOrderAppManager/Redisplay",
            method: "GET",
            data: {
                Kd_Div: selectDivisi.value,
                stBeli: statusPembelian,
                MinDate: tglAwal.value + " " + jamAwal.value,
                MaxDate: tglAkhir.value + " " + jamAkhir.value,
            },
            success: function (response) {
                if (response.recordTotal != 0) {
                    checkedAll.disabled = false;
                }
                inisialisasiDataTable(response.data);
            },
            error: function (error) {
                console.error("Error fetching data from server:", error);
            },
        });
    } else if (filter_radioButtonNomorOrder.checked == true) {
        $("#table_ListOrder").DataTable().clear().destroy();
        $('input[type="checkbox"]:checked').prop("checked", false);
        $("#checkedCount").text(`Jumlah Data Yang TerCentang 0`);
        $.ajax({
            url: "/ListOrderAppManager/RedisplayNoOrder",
            method: "GET",
            data: {
                noOrder: nomor_order.value.trim(),
            },
            success: function (response) {
                if (response.recordTotal != 0) {
                    checkedAll.disabled = false;
                }
                inisialisasiDataTable(response.data);
            },
            error: function (error) {
                console.error("Error fetching data from server:", error);
            },
        });
    }
});

function inisialisasiDataTable(response) {
    let table = $("#table_ListOrder").DataTable({
        responsive: true,
        scrollX: true,
        searching: false,
        scrollY: "400px",
        paging: false,
        // lengthChange:false,
        // pageLength : 500,
        data: response,
        columns: [
            {
                data: "No_trans",
                render: function (data) {
                    return `<input type="checkbox" name="checked" value="${data}" id="${data}" style="width: 20px;height: 20px;" />`;
                },
                orderable: false,
            },
            { data: "No_trans" },
            {
                data: "Tgl_acc",
                render: function (data) {
                    return (
                        data.split(" ")[0] +
                        " " +
                        data.split(" ")[1].slice(0, 8)
                    );
                },
            },
            { data: "StatusBeli" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "nama_sub_kategori" },
            { data: "Qty" },
            { data: "Nama_satuan" },
            { data: "Nama" },
            { data: "NM_DIV" },
            {
                data: "Tgl_Dibutuhkan",
                render: function (data) {
                    return data.split(" ")[0];
                },
            },
            { data: "keterangan" },
            { data: "Ket_Internal" },
        ],
    });
    $("#table_ListOrder tbody")
        .off("dblclick", "tr")
        .on("dblclick", "tr", function () {
            let checkbox = $(this).find('input[type="checkbox"]');
            checkbox.prop("checked", !checkbox.prop("checked"));
            let checkedCount = $(
                '#table_ListOrder tbody input[type="checkbox"]:checked'
            ).length;

            $("#checkedCount").text(
                `Jumlah Data Yang TerCentang ${checkedCount}`
            );
    });
    $("#table_ListOrder tbody").on(
        "change",
        'input[type="checkbox"]',
        function () {
            let checkedCount = $(
                '#table_ListOrder tbody input[type="checkbox"]:checked'
            ).length;
            $("#checkedCount").text(
                `Jumlah Data Yang TerCentang ${checkedCount}`
            );
        }
    );
}

checkedAll.addEventListener("click", function (event) {
    let table = $("#table_ListOrder").DataTable();
    let rows = table
        .rows({
            search: "applied",
        })
        .nodes();
    if (checkedAll.checked == true) {
        $('input[type="checkbox"]', rows).prop("checked", true);
        let checkedCount = $(
            '#table_ListOrder tbody input[type="checkbox"]:checked'
        ).length;

        $("#checkedCount").text(`Jumlah Data Yang TerCentang ${checkedCount}`);
    } else {
        $('input[type="checkbox"]', rows).prop("checked", false);
        let checkedCount = $(
            '#table_ListOrder tbody input[type="checkbox"]:checked'
        ).length;

        $("#checkedCount").text(`Jumlah Data Yang TerCentang ${checkedCount}`);
    }
});
btnPrint.addEventListener("click", function () {
    let checkedRowData = [];
    let checkboxes = document.querySelectorAll('input[name="checked"]:checked');
    checkboxes.forEach(function (checkbox) {
        let rowData = [];
        let row = checkbox.parentNode.parentNode;
        row.querySelectorAll("td").forEach(function (cell, index) {
            if (index > 0 && index != 3) {
                let cellText = cell.textContent.trim();
                cellText = cellText.replace(/,/g, ".");
                rowData.push(cellText);
            }
        });

        checkedRowData.push(rowData);
    });
    if (checkedRowData.length > 0 && checkedRowData[0].length > 0) {
        let headerRow = [
            "No. Order",
            "Tgl_Jam Acc",
            "Kode Barang",
            "NAMA Barang",
            "Sub Kategori",
            "Qty",
            "Satuan",
            "User",
            "DIV",
            "Tgl Dibutuhkan",
            "Ket. Order",
            "Ket. Internal",
        ];
        checkedRowData.unshift(headerRow);

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(checkedRowData);
        ws["!cols"] = [];
        headerRow.forEach(function (_, index) {
            ws["!cols"][index] = { wch: 10, s: { wrapText: true } };
        });
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, "data.xlsx");
    } else {
        alert("Pilih Data Yang Akan DiPrint Terlebih Dahulu");
    }
});

$(document).ready(function () {
    $.ajax({
        url: "/ListOrderAppManager/Divisi",
        type: "GET",
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.KD_DIV;
                option.text = data.NM_DIV;
                selectDivisi.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});
