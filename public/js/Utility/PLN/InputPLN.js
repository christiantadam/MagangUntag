// Form Input
let tanggal = document.getElementById("tanggal");
let jam = document.getElementById("jam");
let lwbp = document.getElementById("lwbp");
let wbp = document.getElementById("wbp");
let kvar = document.getElementById("kvar");
let teknisi = document.getElementById("teknisi");

// tanggal form
var tanggal_Input = document.getElementById("tanggal");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// tanggal awal search
var tanggal_awalInput = document.getElementById("tanggal-awal");
var tanggal_awalOutput = new Date().toISOString().split("T")[0];
tanggal_awalInput.value = tanggal_awalOutput;

// tanggal akhir search
var tanggal_akhirInput = document.getElementById("tanggal-akhir");
var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
tanggal_akhirInput.value = tanggal_akhirOutput;

// Form Button
let inputButton = document.getElementById("inputButton");
let cancelButton = document.getElementById("cancelButton");
let updateButton = document.getElementById("updateButton");
let deleteButton = document.getElementById("deleteButton");
let saveButton = document.getElementById("saveButton");
let refreshButton = document.getElementById("refreshButton");

// Checkbox
let nomorpln = document.getElementById("hiddenNomorpln");

function clearForm() {
    // tanggal.value = "";
    nomorpln.value = "";
    jam.value = "";
    lwbp.value = "";
    wbp.value = "";
    kvar.value = "";
    teknisi.value = "";
    nomorpln.value = "";
}

saveButton.disabled = true;
tanggal.disabled = true;
jam.disabled = true;
lwbp.disabled = true;
wbp.disabled = true;
kvar.disabled = true;
teknisi.disabled = true;
updateButton.disabled = false;
deleteButton.disabled = false;

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        jam.value.trim() !== "" &&
        lwbp.value.trim() !== "" &&
        wbp.value.trim() !== "" &&
        kvar.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

[tanggal, jam, lwbp, wbp, kvar, teknisi].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    tanggal.disabled = false;
    jam.disabled = false;
    lwbp.disabled = false;
    wbp.disabled = false;
    kvar.disabled = false;
    teknisi.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    clearForm();
});
// InputButton click
updateButton.addEventListener("click", function () {
    tanggal.disabled = false;
    jam.disabled = false;
    lwbp.disabled = false;
    wbp.disabled = false;
    kvar.disabled = false;
    teknisi.disabled = false;
    inputButton.disabled = true;
    deleteButton.disabled = true;

    var checkboxValues = $(".checkboxpln:checked")
        .map(function () {
            return this.value;
        })
        .get();

    // Check if there are selected checkboxes
    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data PLN untuk diperbarui.",
        });
        deleteButton.disabled = false;
    }
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    jam.disabled = true;
    lwbp.disabled = true;
    wbp.disabled = true;
    kvar.disabled = true;
    teknisi.disabled = true;
    inputButton.disabled = false;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    clearForm();

    $(".checkboxpln").prop("checked", false);
    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearForm();

    // Disable saveButton
    saveButton.disabled = true;
});

$(document).ready(function () {
    $("#saveButton").click(function () {
        var tanggalValue = $("#tanggal").val();
        var jamValue = $("#jam").val();
        var lwbpValue = $("#lwbp").val();
        var wbpValue = $("#wbp").val();
        var kvarValue = $("#kvar").val();
        var teknisiValue = $("#teknisi").val();
        var nomorplnValue = $("#hiddenNomorpln").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            Jam: jamValue,
            LWBP: lwbpValue,
            WBP: wbpValue,
            KVAR: kvarValue,
            Teknisi: teknisiValue,
        };
        if (nomorplnValue) {
            requestData.NomorPLN = nomorplnValue;
        }
        $.ajax({
            url: nomorplnValue ? "/update-pln" : "/save-pln",
            method: nomorplnValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                nomorplnValue
                    ? Swal.fire({
                          icon: "success",
                          title: "Data PLN Berhasil Diperbarui!",
                          showConfirmButton: false,
                          timer: "2000",
                      })
                    : Swal.fire({
                          icon: "success",
                          title: "Data PLN Berhasil Disimpan!",
                          showConfirmButton: false,
                          timer: "2000",
                      });
                clearForm();
                tanggal.disabled = true;
                jam.disabled = true;
                lwbp.disabled = true;
                wbp.disabled = true;
                kvar.disabled = true;
                teknisi.disabled = true;
                dataTable.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data PLN Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
        });
    });

    var dataTable = $("#table-pln").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-pln",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
            },
        },
        columns: [
            {
                data: "nomor",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxpln" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "tanggal",
                render: function (data, type, full, meta) {
                    var date = new Date(data).toISOString().split("T")[0];
                    return date;
                },
            },
            {
                data: "jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "lwbp" },
            { data: "wbp" },
            { data: "kvar" },
            { data: "teknisi" },
        ],
    });

    $("#refreshButton").click(function () {
        inputButton.disabled = false;
        saveButton.disabled = true;
        tanggal.disabled = true;
        jam.disabled = true;
        lwbp.disabled = true;
        wbp.disabled = true;
        kvar.disabled = true;
        teknisi.disabled = true;
        updateButton.disabled = false;
        deleteButton.disabled = false;
        clearForm();
        dataTable.ajax.reload();
        $(".checkboxpln").prop("checked", false);
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpln", function () {
        if ($(this).prop("checked")) {
            var selectedRow = $(this).closest("tr");

            var selectedDate = selectedRow.find("td:eq(1)").text();
            var selectedJam = selectedRow.find("td:eq(2)").text();
            var selectedLWBP = selectedRow.find("td:eq(3)").text();
            var selectedWBP = selectedRow.find("td:eq(4)").text();
            var selectedKVAR = selectedRow.find("td:eq(5)").text();
            var selectedTeknisi = selectedRow.find("td:eq(6)").text();

            var selectedNomorPLN = $(this).val();

            $("#hiddenNomorpln").val(selectedNomorPLN);
            $("#tanggal").val(selectedDate);
            $("#jam").val(selectedJam);
            $("#lwbp").val(selectedLWBP);
            $("#wbp").val(selectedWBP);
            $("#kvar").val(selectedKVAR);
            $("#teknisi").val(selectedTeknisi);
        } else {
            clearForm();
        }
    });

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxpln:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data PLN untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data PLN yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    Nomor: checkboxValues,
                };

                $.ajax({
                    url: "/delete-pln",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        dataTable.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data PLN Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        clearForm();
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
// Panel SPD //

// Form Input
let produksiSPD = document.getElementById("produksi-spd");
let tanggalSPD = document.getElementById("tanggal-spd");
let jamSPD = document.getElementById("jam-spd");
let kwhSPD = document.getElementById("kwh-spd");
let ct_faktorSPD = document.getElementById("ct_faktor-spd");
let teknisiSPD = document.getElementById("teknisi-spd");

// tanggal form
var tanggal_Input = document.getElementById("tanggal-spd");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// Form Button
let inputButtonSPD = document.getElementById("inputButton-spd");
let cancelButtonSPD = document.getElementById("cancelButton-spd");
let updateButtonSPD = document.getElementById("updateButton-spd");
let deleteButtonSPD = document.getElementById("deleteButton-spd");
let saveButtonSPD = document.getElementById("saveButton-spd");
let refreshButtonSPD = document.getElementById("refreshButton-spd");

// Checkbox
let nomorSPD = document.getElementById("hiddenNomorSPD");

function clearFormSPD() {
    produksiSPD.value = "";
    tanggalSPD.value = "";
    jamSPD.value = "";
    kwhSPD.value = "";
    ct_faktorSPD.value = "";
    teknisiSPD.value = "";
    nomorSPD.value = "";
}

saveButtonSPD.disabled = true;
produksiSPD.disabled = true;
tanggalSPD.disabled = true;
jamSPD.disabled = true;
kwhSPD.disabled = true;
ct_faktorSPD.disabled = true;
teknisiSPD.disabled = true;
updateButtonSPD.disabled = false;
deleteButtonSPD.disabled = false;

function checkAllFieldsFilled1() {
    return (
        produksiSPD.value.trim() !== "" &&
        tanggalSPD.value.trim() !== "" &&
        jamSPD.value.trim() !== "" &&
        kwhSPD.value.trim() !== "" &&
        ct_faktorSPD.value.trim() !== "" &&
        teknisiSPD.value.trim() !== ""
    );
}

[produksiSPD, tanggalSPD, jamSPD, kwhSPD, ct_faktorSPD, teknisiSPD].forEach(
    function (inputField) {
        inputField.addEventListener("input", function () {
            saveButtonSPD.disabled = !checkAllFieldsFilled1();
        });
    }
);

// InputButton click
inputButtonSPD.addEventListener("click", function () {
    produksiSPD.disabled = false;
    tanggalSPD.disabled = false;
    jamSPD.disabled = false;
    kwhSPD.disabled = false;
    ct_faktorSPD.disabled = false;
    teknisiSPD.disabled = false;
    updateButtonSPD.disabled = true;
    deleteButtonSPD.disabled = true;
    nomorSPD.value = "";
    $(".checkboxSPD").prop("checked", false);
    clearFormSPD();
});
// UpdateButton click
updateButtonSPD.addEventListener("click", function () {
    produksiSPD.disabled = false;
    tanggalSPD.disabled = false;
    jamSPD.disabled = false;
    kwhSPD.disabled = false;
    ct_faktorSPD.disabled = false;
    teknisiSPD.disabled = false;
    inputButtonSPD.disabled = true;
    deleteButtonSPD.disabled = true;

    var checkboxValues = $(".checkboxSPD:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih setidaknya satu data SPD untuk update.",
        });
        inputButtonSPD.disabled = false;
        deleteButtonSPD.disabled = false;
    }
});

// CancelButton click
cancelButtonSPD.addEventListener("click", function () {
    produksiSPD.disabled = true;
    tanggalSPD.disabled = true;
    jamSPD.disabled = true;
    kwhSPD.disabled = true;
    ct_faktorSPD.disabled = true;
    teknisiSPD.disabled = true;
    inputButtonSPD.disabled = false;
    updateButtonSPD.disabled = false;
    deleteButtonSPD.disabled = false;

    // Clear Form
    clearFormSPD();

    $(".checkboxSPD").prop("checked", false);
    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearFormSPD();
    $("#bulan-SPD").val("");
    $("#tahun-SPD").val("");
    $("#produksiSearch-SPD").val("");
    // Disable saveButton
    saveButtonSPD.disabled = true;
});

$(document).ready(function () {
    $("#saveButton-spd").click(function () {
        var produksiSPDValue = $("#produksi-spd").val();
        var tanggalSPDValue = $("#tanggal-spd").val();
        var jamSPDValue = $("#jam-spd").val();
        var kwhValue = $("#kwh-spd").val();
        var teknisiSPDValue = $("#teknisi-spd").val();
        var ctFaktorValue = $("#ct_faktor-spd").val();
        var nomorSPDValue = $("#hiddenNomorSPD").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData1 = {
            Produksi: produksiSPDValue,
            Tanggal: tanggalSPDValue,
            Jam: jamSPDValue,
            KWH: kwhValue,
            ct: ctFaktorValue,
            Teknisi: teknisiSPDValue,
        };
        if (nomorSPDValue) {
            requestData1.NomorSPD = nomorSPDValue;
        }
        $.ajax({
            url: nomorSPDValue ? "/update-spd" : "/save-spd",
            method: nomorSPDValue ? "PUT" : "POST",
            data: requestData1,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                nomorSPDValue
                    ? Swal.fire({
                          icon: "success",
                          title: "Data SPD Berhasil Diperbarui!",
                          showConfirmButton: false,
                          timer: "2000",
                      })
                    : Swal.fire({
                          icon: "success",
                          title: "Data SPD Berhasil Disimpan!",
                          showConfirmButton: false,
                          timer: "2000",
                      });
                clearFormSPD();
                tanggalSPD.disabled = true;
                jamSPD.disabled = true;
                kwhSPD.disabled = true;
                produksiSPD.disabled = true;
                ct_faktorSPD.disabled = true;
                teknisiSPD.disabled = true;
                dataTableSPD.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data SPD Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
        });
    });

    var dataTableSPD = $("#table-panelspd").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-spd",
            type: "GET",
            data: function (d) {
                d.bulan = $("#bulan-spd").val();
                d.tahun = $("#tahun-spd").val();
                d.produksi = $("#produksiSearch-spd").val();
            },
        },
        columns: [
            {
                data: "NoTransaksi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxSPD" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "Produksi" },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date = new Date(data).toISOString().split("T")[0];
                    return date;
                },
            },
            {
                data: "Jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "KWH" },
            { data: "Teknisi" },
        ],
    });

    $("#refreshButton-spd").click(function () {
        inputButtonSPD.disabled = false;
        saveButtonSPD.disabled = true;
        produksiSPD.disabled = true;
        tanggalSPD.disabled = true;
        jamSPD.disabled = true;
        kwhSPD.disabled = true;
        ct_faktorSPD.disabled = true;
        teknisiSPD.disabled = true;
        updateButtonSPD.disabled = true;
        deleteButtonSPD.disabled = true;
        clearFormSPD();
        dataTableSPD.ajax.reload();
    });

    $("#exitButton-spd").click(function (e) {
        e.preventDefault();
        clearFormSPD();
        dataTableSPD.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxSPD", function () {
        if ($(this).prop("checked")) {
            deleteButtonSPD.disabled = false;
            updateButtonSPD.disabled = false;

            var selectedNomorSPD = $(this).val();

            $("#hiddenNomorSPD").val(selectedNomorSPD);

            $.ajax({
                url: "/get-spd-id",
                type: "GET",
                data: { idspd: selectedNomorSPD },
                success: function (data) {
                    produksiSPD.value = data.NoProduksi;
                    var date = new Date(data.Tanggal + "Z");
                    tanggalSPD.value = date.toISOString().split("T")[0];
                    var startHours = new Date(data.Jam + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.Jam + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jamSPD.value = startHours + ":" + startMinutes;
                    kwhSPD.value = data.KWH;
                    teknisiSPD.value = data.Teknisi;
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            clearFormSPD();
        }
    });

    $("#deleteButton-spd").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxSPD:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data SPD untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data SPD terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    NomorSPD: checkboxValues,
                };

                $.ajax({
                    url: "/delete-spd",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        dataTableSPD.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data SPD Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        console.log("data SPD delete successfully", response);
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
// Berita Acara //

// Form Input
let nomorBA = document.getElementById("nomor-ba");
let tanggalBA = document.getElementById("tanggal-ba");
let lwbpBA = document.getElementById("lwbp-ba");
let wbpBA = document.getElementById("wbp-ba");
let kvarhBA = document.getElementById("kvarh-ba");
let kvaBA = document.getElementById("kva-ba");
let posisiJamBA = document.getElementById("posisijam-ba");
let timeswitchBA = document.getElementById("timeswitch-ba");
let pelangganBA = document.getElementById("pelanggan-ba");
let pembacaBA = document.getElementById("pembaca-ba");

// tanggal form
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggalBA.value = tanggal_Output;

// Form Button
let inputButtonBA = document.getElementById("inputButton-ba");
let cancelButtonBA = document.getElementById("cancelButton-ba");
let updateButtonBA = document.getElementById("updateButton-ba");
let deleteButtonBA = document.getElementById("deleteButton-ba");
let saveButtonBA = document.getElementById("saveButton-ba");
let refreshButtonBA = document.getElementById("refreshButton-ba");

function clearFormBA() {
    nomorBA.value = "";
    tanggalBA.value = "";
    lwbpBA.value = "";
    wbpBA.value = "";
    kvarhBA.value = "";
    kvaBA.value = "";
    posisiJamBA.value = "";
    timeswitchBA.value = "";
    pelangganBA.value = "";
    pembacaBA.value = "";
}

nomorBA.disabled = true;
tanggalBA.disabled = true;
lwbpBA.disabled = true;
wbpBA.disabled = true;
kvarhBA.disabled = true;
kvaBA.disabled = true;
posisiJamBA.disabled = true;
timeswitchBA.disabled = true;
pelangganBA.disabled = true;
pembacaBA.disabled = true;

updateButtonBA.disabled = false;
deleteButtonBA.disabled = false;
saveButtonBA.disabled = true;

function checkAllFieldsFilled2() {
    return (
        tanggalBA.value.trim() !== "" &&
        lwbpBA.value.trim() !== "" &&
        wbpBA.value.trim() !== "" &&
        kvarhBA.value.trim() !== "" &&
        kvaBA.value.trim() !== "" &&
        posisiJamBA.value.trim() !== "" &&
        timeswitchBA.value.trim() !== "" &&
        pelangganBA.value.trim() !== "" &&
        pembacaBA.value.trim() !== ""
    );
}

[
    tanggalBA,
    lwbpBA,
    wbpBA,
    kvarhBA,
    kvaBA,
    posisiJamBA,
    timeswitchBA,
    pelangganBA,
    pembacaBA,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButtonBA.disabled = !checkAllFieldsFilled2();
    });
});

// CancelButton click
cancelButtonBA.addEventListener("click", function () {
    nomorBA.disabled = true;
    tanggalBA.disabled = true;
    lwbpBA.disabled = true;
    wbpBA.disabled = true;
    kvarhBA.disabled = true;
    kvaBA.disabled = true;
    posisiJamBA.disabled = true;
    timeswitchBA.disabled = true;
    pelangganBA.disabled = true;
    pembacaBA.disabled = true;
    inputButtonBA.disabled = false;
    updateButtonBA.disabled = false;
    deleteButtonBA.disabled = false;

    // Clear Form
    clearFormBA();

    $(".checkboxba").prop("checked", false);
    // Disable saveButton
    saveButtonBA.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearFormBA();
    $("#tahun-ba").val("");
    // Disable saveButton
    saveButtonBA.disabled = true;
});

$(document).ready(function () {
    var mode = "insert";

    // InputButton click
    inputButtonBA.addEventListener("click", function () {
        mode = "insert";
        nomorBA.disabled = false;
        tanggalBA.disabled = false;
        lwbpBA.disabled = false;
        wbpBA.disabled = false;
        kvarhBA.disabled = false;
        kvaBA.disabled = false;
        posisiJamBA.disabled = false;
        timeswitchBA.disabled = false;
        pelangganBA.disabled = false;
        pembacaBA.disabled = false;
        updateButtonBA.disabled = true;
        deleteButtonBA.disabled = true;
        $(".checkboxba").prop("checked", false);
        clearFormBA();
    });

    // UpdateButton click
    updateButtonBA.addEventListener("click", function () {
        mode = "update";
        nomorBA.disabled = false;
        tanggalBA.disabled = false;
        lwbpBA.disabled = false;
        wbpBA.disabled = false;
        kvarhBA.disabled = false;
        kvaBA.disabled = false;
        posisiJamBA.disabled = false;
        timeswitchBA.disabled = false;
        pelangganBA.disabled = false;
        pembacaBA.disabled = false;
        inputButtonBA.disabled = true;
        deleteButtonBA.disabled = true;

        var checkboxValues = $(".checkboxba:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu Berita untuk diperbarui.",
            });
        } else {
        }
    });
    $("#saveButton-ba").click(function () {
        var nomorBAValue = nomorBA.value;
        var tanggalBAValue = tanggalBA.value;
        var lwbpBAValue = lwbpBA.value;
        var wbpBAValue = wbpBA.value;
        var kvarhBAValue = kvarhBA.value;
        var kvaBAValue = kvaBA.value;
        var posisiJamBAValue = posisiJamBA.value;
        var timeswitchBAValue = timeswitchBA.value;
        var pelangganBAValue = pelangganBA.value;
        var pembacaBAValue = pembacaBA.value;

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData2 = {
            nomorBA: nomorBAValue,
            TanggalBA: tanggalBAValue,
            lwbpBA: lwbpBAValue,
            wbpBA: wbpBAValue,
            kvarhBA: kvarhBAValue,
            kvaBA: kvaBAValue,
            posisiJamBA: posisiJamBAValue,
            timeswitchBA: timeswitchBAValue,
            pelangganBA: pelangganBAValue,
            pembacaBA: pembacaBAValue,
        };

        var url = mode === "insert" ? "/save-ba" : "/update-ba";
        var method = mode === "insert" ? "POST" : "PUT";
        var alert =
            mode === "insert"
                ? Swal.fire({
                      icon: "success",
                      title: "Data Berita Acara Berhasil Disimpan!",
                      showConfirmButton: false,
                      timer: "2000",
                  })
                : Swal.fire({
                      icon: "success",
                      title: "Data Berita Acara Berhasil Diperbarui!",
                      showConfirmButton: false,
                      timer: "2000",
                  });

        $.ajax({
            url: url,
            method: method,
            data: requestData2,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                alert;
                clearFormBA();
                inputButtonBA.disabled = false;
                deleteButtonBA.disabled = false;
                nomorBA.disabled = true;
                tanggalBA.disabled = true;
                lwbpBA.disabled = true;
                wbpBA.disabled = true;
                kvarhBA.disabled = true;
                kvaBA.disabled = true;
                posisiJamBA.disabled = true;
                timeswitchBA.disabled = true;
                pelangganBA.disabled = true;
                pembacaBA.disabled = true;
                dataTableBA.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data PLN Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
        });
    });

    var dataTableBA = $("#table-berita").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-ba",
            type: "GET",
            data: function (d) {
                d.tahun = $("#tahun-ba").val();
            },
        },
        columns: [
            {
                data: "Nomor",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxba" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "Nomor",
            },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date = new Date(data).toISOString().split("T")[0];
                    return date;
                },
            },
            { data: "LWBP" },

            { data: "WBP" },
            { data: "KVARH" },
            { data: "KVA_MAKS" },
            {
                data: "Posisi_Jam",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            {
                data: "Time_Switch",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            { data: "Pelanggan" },
            { data: "PembacaMeter" },
        ],
    });

    $("#refreshButton-ba").click(function () {
        inputButtonBA.disabled = false;
        saveButtonBA.disabled = true;
        updateButtonBA.disabled = false;
        deleteButtonBA.disabled = false;
        clearFormBA();
        dataTableBA.ajax.reload();
    });

    $("#exitButton-ba").click(function (e) {
        e.preventDefault();
        clearFormBA();
        dataTableSPD.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxba", function () {
        if ($(this).prop("checked")) {
            var selectedRow = $(this).closest("tr");
            var selectedIdBA = $(this).val();
            var selectedDate = selectedRow.find("td:eq(2)").text();
            var selectedLWBP = selectedRow.find("td:eq(3)").text();
            var selectedWBP = selectedRow.find("td:eq(4)").text();
            var selectedKVARH = selectedRow.find("td:eq(5)").text();
            var selectedKVA = selectedRow.find("td:eq(6)").text();
            var selectedPosisi = selectedRow.find("td:eq(7)").text();
            var selectedTime = selectedRow.find("td:eq(8)").text();
            var selectedPelanggan = selectedRow.find("td:eq(9)").text();
            var selectedPembaca = selectedRow.find("td:eq(10)").text();

            nomorBA.value = selectedIdBA;
            tanggalBA.value = selectedDate;
            lwbpBA.value = selectedLWBP;
            wbpBA.value = selectedWBP;
            kvarhBA.value = selectedKVARH;
            kvaBA.value = selectedKVA;
            posisiJamBA.value = selectedPosisi;
            timeswitchBA.value = selectedTime;
            pelangganBA.value = selectedPelanggan;
            pembacaBA.value = selectedPembaca;
        } else {
            clearFormBA();
        }
    });

    // DeleteButton click
    $("#deleteButton-ba").click(function (e) {
        e.preventDefault();

        var checkboxValues = $(".checkboxba:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu Berita untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data Berita Acara terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var csrfToken = $('meta[name="csrf-token"]').attr("content");
                var requestData3 = {
                    Nomor: checkboxValues,
                };

                $.ajax({
                    url: "/delete-ba",
                    method: "DELETE",
                    data: requestData3,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        dataTableBA.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Berita Acara Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        console.log(
                            "data berita acara delete successfully",
                            response
                        );
                    },
                    error: function (error) {
                        console.error(
                            "Error delete Data : ",
                            error.responseText
                        );
                    },
                });
            }
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
