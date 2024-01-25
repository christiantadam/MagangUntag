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
updateButton.disabled = true;
deleteButton.disabled = true;

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
    nomorpln.value = "";
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
            text: "Pilih setidaknya satu data PLN untuk update.",
        });
    } else {
        // Perform your other update logic if checkboxes are checked
        // ...
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

    // Clear Form
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
    // console.log(checkboxpln.value)
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
                console.log(requestData);
                console.log(nomorplnValue);
                Swal.fire({
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
        updateButton.disabled = true;
        deleteButton.disabled = true;
        clearForm();
        dataTable.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpln", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

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

            console.log("Selected Nomorpln: ", selectedNomorPLN);
            console.log("Selected Date: ", selectedDate);
            console.log("Selected Jam: ", selectedJam);
            console.log("Selected LWBP: ", selectedLWBP);
            console.log("Selected WBP: ", selectedWBP);
            console.log("Selected KVAR: ", selectedKVAR);
            console.log("Selected Teknisi: ", selectedTeknisi);
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

        // Check if there are selected checkboxes
        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data PLN untuk dihapus.",
            });
            return; // Abort further processing
        }

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
                console.log(requestData);
                dataTable.ajax.reload();
                Swal.fire({
                    icon: "success",
                    title: "Terhapus!",
                    text: "Data PLN Berhasil Dihapus!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.log("data pln delete successfully", response);
                clearForm();
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
// Panel SDP //

// Form Input
let produksiSDP = document.getElementById("produksi-sdp");
let tanggalSDP = document.getElementById("tanggal-sdp");
let jamSDP = document.getElementById("jam-sdp");
let kwhSDP = document.getElementById("kwh-sdp");
let ct_faktorSDP = document.getElementById("ct_faktor-sdp");
let teknisiSDP = document.getElementById("teknisi-sdp");

// tanggal form
var tanggal_Input = document.getElementById("tanggal-sdp");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// Form Button
let inputButtonSDP = document.getElementById("inputButton-sdp");
let cancelButtonSDP = document.getElementById("cancelButton-sdp");
let updateButtonSDP = document.getElementById("updateButton-sdp");
let deleteButtonSDP = document.getElementById("deleteButton-sdp");
let saveButtonSDP = document.getElementById("saveButton-sdp");
let refreshButtonSDP = document.getElementById("refreshButton-sdp");

// Checkbox
let nomorsdp = document.getElementById("hiddenNomorsdp");

function clearFormSDP() {
    produksiSDP.value = "";
    tanggalSDP.value = "";
    jamSDP.value = "";
    kwhSDP.value = "";
    ct_faktorSDP.value = "";
    teknisiSDP.value = "";
    nomorsdp.value = "";
}

saveButtonSDP.disabled = true;
produksiSDP.disabled = true;
tanggalSDP.disabled = true;
jamSDP.disabled = true;
kwhSDP.disabled = true;
ct_faktorSDP.disabled = true;
teknisiSDP.disabled = true;
updateButtonSDP.disabled = true;
deleteButtonSDP.disabled = true;

function checkAllFieldsFilled1() {
    return (
        produksiSDP.value.trim() !== "" &&
        tanggalSDP.value.trim() !== "" &&
        jamSDP.value.trim() !== "" &&
        kwhSDP.value.trim() !== "" &&
        ct_faktorSDP.value.trim() !== "" &&
        teknisiSDP.value.trim() !== ""
    );
}

[produksiSDP, tanggalSDP, jamSDP, kwhSDP, ct_faktorSDP, teknisiSDP].forEach(
    function (inputField) {
        inputField.addEventListener("input", function () {
            saveButtonSDP.disabled = !checkAllFieldsFilled1();
        });
    }
);

// InputButton click
inputButtonSDP.addEventListener("click", function () {
    produksiSDP.disabled = false;
    tanggalSDP.disabled = false;
    jamSDP.disabled = false;
    kwhSDP.disabled = false;
    ct_faktorSDP.disabled = false;
    teknisiSDP.disabled = false;
    updateButtonSDP.disabled = true;
    deleteButtonSDP.disabled = true;
    nomorsdp.value = "";
});
// UpdateButton click
updateButtonSDP.addEventListener("click", function () {
    produksiSDP.disabled = false;
    tanggalSDP.disabled = false;
    jamSDP.disabled = false;
    kwhSDP.disabled = false;
    ct_faktorSDP.disabled = false;
    teknisiSDP.disabled = false;
    inputButtonSDP.disabled = true;
    deleteButtonSDP.disabled = true;

    var checkboxValues = $(".checkboxsdp:checked")
        .map(function () {
            return this.value;
        })
        .get();

    // Check if there are selected checkboxes
    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih setidaknya satu data SDP untuk update.",
        });
    } else {
        // Perform your other update logic if checkboxes are checked
        // ...
    }
});

// CancelButton click
cancelButtonSDP.addEventListener("click", function () {
    produksiSDP.disabled = true;
    tanggalSDP.disabled = true;
    jamSDP.disabled = true;
    kwhSDP.disabled = true;
    ct_faktorSDP.disabled = true;
    teknisiSDP.disabled = true;
    inputButtonSDP.disabled = false;
    updateButtonSDP.disabled = false;
    deleteButtonSDP.disabled = false;

    // Clear Form
    clearFormSDP();

    $(".checkboxsdp").prop("checked", false);
    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    clearFormSDP();

    // Disable saveButton
    saveButtonSDP.disabled = true;
});

$(document).ready(function () {
    // console.log(checkboxpln.value)
    $("#saveButton-sdp").click(function () {
        var produksiSDPValue = $("#produksi-sdp").val();
        var tanggalSDPValue = $("#tanggal-sdp").val();
        var jamSDPValue = $("#jam-sdp").val();
        var kwhValue = $("#kwh-sdp").val();
        var teknisiSDPValue = $("#teknisi-sdp").val();
        var ctFaktorValue = $("#ct_faktor-sdp").val();
        var nomorsdpValue = $("#hiddenNomorsdp").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData1 = {
            Produksi: produksiSDPValue,
            Tanggal: tanggalSDPValue,
            Jam: jamSDPValue,
            Kwh: kwhValue,
            ct: ctFaktorValue,
            Teknisi: teknisiSDPValue,
        };
        if (nomorsdpValue) {
            requestData.NomorSDP = nomorsdpValue;
        }
        $.ajax({
            url: nomorsdpValue ? "/update-sdp" : "/save-sdp",
            method: nomorsdpValue ? "PUT" : "POST",
            data: requestData1,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                console.log(nomorsdpValue);
                Swal.fire({
                    icon: "success",
                    title: "Data SDP Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                clearFormSDP();
                tanggalSDP.disabled = true;
                jamSDP.disabled = true;
                kwhSDP.disabled = true;
                produksiSDP.disabled = true;
                ct_faktorSDP.disabled = true;
                teknisiSDP.disabled = true;
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

    var dataTableSDP = $("#table-panelsdp").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-sdp",
            type: "GET",
            data: function (d) {
                d.bulan = $("#bulan-sdp").val();
                d.tahun = $("#tahun-sdp").val();
                d.produksi = $("#produksiSearch-sdp").val();
            },
        },
        columns: [
            {
                data: "NoTransaksi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxsdp" value="' +
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

    $("#refreshButton-sdp").click(function () {
        inputButtonSDP.disabled = false;
        saveButtonSDP.disabled = true;
        produksiSDP.disabled = true;
        tanggalSDP.disabled = true;
        jamSDP.disabled = true;
        kwhSDP.disabled = true;
        ct_faktorSDP.disabled = true;
        teknisiSDP.disabled = true;
        updateButtonSDP.disabled = true;
        deleteButtonSDP.disabled = true;
        clearFormSDP();
        dataTableSDP.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpln", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedDate = selectedRow.find("td:eq(1)").text();
            var selectedJam = selectedRow.find("td:eq(2)").text();
            var selectedLWBP = selectedRow.find("td:eq(3)").text();
            var selectedWBP = selectedRow.find("td:eq(4)").text();
            var selectedKVAR = selectedRow.find("td:eq(5)").text();
            var selectedTeknisi = selectedRow.find("td:eq(6)").text();

            var selectedNomorSDP = $(this).val();

            $("#hiddenNomorsdp").val(selectedNomorSDP);
            $("#tanggal").val(selectedDate);
            $("#jam").val(selectedJam);
            $("#lwbp").val(selectedLWBP);
            $("#wbp").val(selectedWBP);
            $("#kvar").val(selectedKVAR);
            $("#teknisi").val(selectedTeknisi);

            console.log("Selected Nomorpln: ", selectedNomorPLN);
            console.log("Selected Date: ", selectedDate);
            console.log("Selected Jam: ", selectedJam);
            console.log("Selected LWBP: ", selectedLWBP);
            console.log("Selected WBP: ", selectedWBP);
            console.log("Selected KVAR: ", selectedKVAR);
            console.log("Selected Teknisi: ", selectedTeknisi);
        }
    });

    // DeleteButton click
    $("#deleteButton-sdp").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

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
                text: "Pilih setidaknya satu data PLN untuk dihapus.",
            });
            return; // Abort further processing
        }

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
                console.log(requestData);
                dataTableSDP.ajax.reload();
                Swal.fire({
                    icon: "success",
                    title: "Terhapus!",
                    text: "Data PLN Berhasil Dihapus!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.log("data pln delete successfully", response);
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
// Panel SDP //
