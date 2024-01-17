// Form Input
let tanggal = document.getElementById("tanggal");
let mesin = document.getElementById("select_mesin");
let jam = document.getElementById("jam_operasi");
let part = document.getElementById("select_sparepart");
let keterangan = document.getElementById("select_keterangan");
let teknisi = document.getElementById("select_teknisi");

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

saveButton.disabled = true;
tanggal.disabled = true;
mesin.disabled = true;
jam.disabled = true;
part.disabled = true;
keterangan.disabled = true;
teknisi.disabled = true;
updateButton.disabled = true;
deleteButton.disabled = true;

// Function to check if all fields are filled
function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        mesin.value.trim() !== "" &&
        jam.value.trim() !== "" &&
        part.value.trim() !== "" &&
        keterangan.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

// Add event listeners to enable/disable saveButton based on input field values
[mesin, jam, part, keterangan, teknisi].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    // Disable input fields and disable Update and Delete buttons
    tanggal.disabled = false;
    mesin.disabled = false;
    jam.disabled = false;
    part.disabled = false;
    keterangan.disabled = false;
    teknisi.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    // Disable input fields and enable Update and Delete buttons
    tanggal.disabled = true;
    mesin.disabled = true;
    jam.disabled = true;
    part.disabled = true;
    keterangan.disabled = true;
    teknisi.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    // Clear Form
    // tanggal.value = "";
    mesin.value = "";
    jam.value = "";
    part.value = "";
    keterangan.value = "";
    teknisi.value = "";

    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {
    // Clear Form
    // tanggal.value = "";
    mesin.value = "";
    jam.value = "";
    part.value = "";
    keterangan.value = "";
    teknisi.value = "";

    // Disable saveButton
    saveButton.disabled = true;
});

// Show Keterangan Input Perawatan
$(document).ready(function () {
    $("#select_sparepart").change(function () {
        var idPart = $(this).val();

        $.ajax({
            url: "/get-keterangan",
            method: "GET",
            data: { idPart: idPart },
            success: function (data) {
                // console.log(data);
                var selectKeterangan = $("#select_keterangan");
                selectKeterangan
                    .empty()
                    .append(
                        "<option selected disabled>Pilih keterangan...</option>"
                    );

                $.each(data, function (index, item) {
                    selectKeterangan.append(
                        '<option value="' +
                            item.NoKeteranganPart +
                            '">' +
                            item.Keterangan +
                            "</option>"
                    );
                });

                selectKeterangan.prop("disabled", false);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });
});

// Save Data Perawatan
$(document).ready(function () {
    $("#saveButton").click(function () {
        var tanggalValue = $("#tanggal").val();
        var noMesinValue = $("#select_mesin").val();
        var jamOperasiValue = $("#jam_operasi").val();
        var PartValue = $("#select_sparepart").val();
        var keteranganValue = $("#select_keterangan").val();
        var teknisiValue = $("#select_teknisi").val();
        var userInputValue = 1036;

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            NoMesin: noMesinValue,
            JamOperasi: jamOperasiValue,
            IdPart: PartValue,
            Keterangan: keteranganValue,
            Teknisi: teknisiValue,
            UserInput: userInputValue,
        };

        $.ajax({
            url: "/save-perawatan",
            method: "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log("Data saved successfully:", response);
                location.reload();
            },
            error: function (error) {
                console.error("Error saving data:", error);
            },
        });
    });
});

// Show Data Perawatan
$(document).ready(function () {
    $("#refreshButton").click(function () {
        var tanggal_awal = $("#tanggal-awal").val();
        var tanggal_akhir = $("#tanggal-akhir").val();
        var NoMesin = $("#NoMesinSearch").val();

        var requestData = {
            date1: tanggal_awal,
            date2: tanggal_akhir,
            NoMesin: NoMesin,
        };

        $.ajax({
            url: "/get-perawatan",
            method: "GET",
            data: requestData,
            dataType: "json",
            success: function (response) {
                // console.log("Data show successfully:", response);

                var data = response;

                $("table tbody").empty();

                $.each(data, function (index, row) {
                    var formattedDate = new Date(row.Tanggal);

                    var day = formattedDate.getDate();
                    var month = formattedDate.getMonth() + 1;
                    var year = formattedDate.getFullYear();

                    var formattedDateString =
                        (day < 10 ? "0" : "") +
                        day +
                        "-" +
                        (month < 10 ? "0" : "") +
                        month +
                        "-" +
                        year;

                    $("table tbody").append(
                        "<tr>" +
                            "<td>" +
                            formattedDateString +
                            "</td>" +
                            "<td>" +
                            row.NamaMesin +
                            "</td>" +
                            "<td>" +
                            row.JamOperasi +
                            "</td>" +
                            "<td>" +
                            row.NamaPart +
                            "</td>" +
                            "<td>" +
                            row.Keterangan +
                            "</td>" +
                            "<td>" +
                            row.Teknisi +
                            "</td>" +
                            "</tr>"
                    );
                });
            },
            error: function (error) {
                console.error("Error show Data : ", error.responseText);
            },
        });
    });
});
