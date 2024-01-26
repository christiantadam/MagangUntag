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
    $(".checkboxsdp").prop("checked", false);
    clearFormSDP();
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
    $("#bulan-sdp").val("");
    $("#tahun-sdp").val("");
    $("#produksiSearch-sdp").val("");
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
            KWH: kwhValue,
            ct: ctFaktorValue,
            Teknisi: teknisiSDPValue,
        };
        if (nomorsdpValue) {
            requestData1.NomorSDP = nomorsdpValue;
        }
        $.ajax({
            url: nomorsdpValue ? "/update-sdp" : "/save-sdp",
            method: nomorsdpValue ? "PUT" : "POST",
            data: requestData1,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData1);
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
                dataTableSDP.ajax.reload();
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

    $("#exitButton-sdp").click(function (e) {
        e.preventDefault();
        clearFormSDP();
        dataTableSDP.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxsdp", function () {
        if ($(this).prop("checked")) {
            deleteButtonSDP.disabled = false;
            updateButtonSDP.disabled = false;

            var selectedNomorSDP = $(this).val();

            $("#hiddenNomorsdp").val(selectedNomorSDP);

            $.ajax({
                url: "/get-sdp-id",
                type: "GET",
                data: { idSDP: selectedNomorSDP },
                success: function (data) {
                    console.log(data);

                    produksiSDP.value = data.NoProduksi;
                    var date = new Date(data.Tanggal + "Z");
                    tanggalSDP.value = date.toISOString().split("T")[0];

                    var startHours = new Date(data.Jam + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.Jam + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jamSDP.value = startHours + ":" + startMinutes;

                    kwhSDP.value = data.KWH;
                    teknisiSDP.value = data.Teknisi;
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            clearFormSDP();
        }
    });

    // DeleteButton click
    $("#deleteButton-sdp").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

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
                text: "Pilih setidaknya satu data SDP untuk dihapus.",
            });
            return; // Abort further processing
        }

        var requestData = {
            NomorSDP: checkboxValues,
        };

        $.ajax({
            url: "/delete-sdp",
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
var tanggal_Input = document.getElementById("tanggal-ba");
var tanggal_Output = new Date().toISOString().split("T")[0];
tanggal_Input.value = tanggal_Output;

// Form Button
let inputButtonBA = document.getElementById("inputButton-ba");
let cancelButtonBA = document.getElementById("cancelButton-ba");
let updateButtonBA = document.getElementById("updateButton-ba");
let deleteButtonBA = document.getElementById("deleteButton-ba");
let saveButtonBA = document.getElementById("saveButton-ba");
let refreshButtonBA = document.getElementById("refreshButton-ba");

// Checkbox
let nomorba = document.getElementById("hiddenNomorBA");

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

updateButtonBA.disabled = true;
deleteButtonBA.disabled = true;
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

// InputButton click
inputButtonBA.addEventListener("click", function () {
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

    // Check if there are selected checkboxes
    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih setidaknya satu data SDP untuk update.",
        });
    } else {
    }
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
    // console.log(checkboxpln.value)
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
        // if (nomorBAValue) {
        //     requestData2.nomorBA = nomorBAValue;
        // }
        $.ajax({
            url: "/save-ba",
            // url: nomorBAValue ? "/update-ba" : "/save-ba",
            method: "POST",
            // method: nomorBAValue ? "PUT" : "POST",
            data: requestData2,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData2);
                console.log(nomorBAValue);
                Swal.fire({
                    icon: "success",
                    title: "Data Berita Acara Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                clearFormSDP();
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
                // render: function (data, type, full, meta) {
                //     return (
                //         '<input type="checkbox" class="checkboxba" value="' +
                //         data +
                //         '">'
                //     );
                // },
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
        updateButtonBA.disabled = true;
        deleteButtonBA.disabled = true;
        clearFormBA();
        dataTableBA.ajax.reload();
    });

    $("#exitButton-ba").click(function (e) {
        e.preventDefault();
        clearFormSDP();
        dataTableSDP.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxba", function () {
        if ($(this).prop("checked")) {
            deleteButtonBA.disabled = false;
            updateButtonBA.disabled = false;

            var selectedIdBA = $(this).val();

            $("#hiddenNomorBA").val(selectedIdBA);

            // $.ajax({
            //     url: "/get-ba-id",
            //     type: "GET",
            //     data: { idBA: selectedIdBA },
            //     success: function (data) {
            //         console.log(data);

            //         produksiSDP.value = data.NoProduksi;
            //         var date = new Date(data.Tanggal + "Z");
            //         tanggalSDP.value = date.toISOString().split("T")[0];

            //         var startHours = new Date(data.Jam + "Z")
            //             .getUTCHours()
            //             .toString()
            //             .padStart(2, "0");
            //         var startMinutes = new Date(data.Jam + "Z")
            //             .getUTCMinutes()
            //             .toString()
            //             .padStart(2, "0");
            //         jamSDP.value = startHours + ":" + startMinutes;

            //         kwhSDP.value = data.KWH;
            //         teknisiSDP.value = data.Teknisi;
            //     },
            //     error: function (xhr, status, error) {
            //         console.error("Error fetching data:", error);
            //     },
            // });
        } else {
            clearFormBA();
        }
    });

    // DeleteButton click
    $("#deleteButton-ba").click(function (e) {
        e.preventDefault();
        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var checkboxValues = $(".checkboxba:checked")
            .map(function () {
                return this.value;
            })
            .get();
        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data Berita untuk dihapus.",
            });
            return;
        }

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
                console.log(requestData3);
                dataTableBA.ajax.reload();
                Swal.fire({
                    icon: "success",
                    title: "Terhapus!",
                    text: "Data Berita Acara Berhasil Dihapus!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.log("data berita acara delete successfully", response);
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});

// ------------------------------------------------------------------------------------------------------------------------------------- //
