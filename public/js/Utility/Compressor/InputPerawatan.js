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

// Checkbox
let checkboxperawatan = document.getElementsByClassName("checkboxperawatan");

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
[tanggal, mesin, jam, part, keterangan, teknisi].forEach(function (inputField) {
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
    tanggal.disabled = true;
    mesin.disabled = true;
    jam.disabled = true;
    part.disabled = true;
    keterangan.disabled = true;
    teknisi.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    // Clear Form
    tanggal.value = "";
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

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            NoMesin: noMesinValue,
            JamOperasi: jamOperasiValue,
            IdPart: PartValue,
            Keterangan: keteranganValue,
            Teknisi: teknisiValue,
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
                Swal.fire({
                    icon : "success",
                    title : "Data Berhasil Disimpan!",
                    showConfirmButton : false,
                    timer : "2000"
                });
            },
            error: function (error) {
                console.error("Error saving data:", error);
            },
        });
    });
});

$(document).ready(function () {
    var dataTable = $("#table-perawatan").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-perawatan",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMesin = $("#NoMesinSearch").val();
            },
        },
        columns: [
            {
                data: "NoPerawatan",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxperawatan" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var day = date.getDate();
                    var month = date.getMonth() + 1;
                    var year = date.getFullYear();

                    day = day < 10 ? "0" + day : day;
                    month = month < 10 ? "0" + month : month;
                    return day + "-" + month + "-" + year;
                },
            },
            { data: "NamaMesin" },
            { data: "JamOperasi" },
            { data: "NamaPart" },
            { data: "Keterangan" },
            { data: "Teknisi" },
        ],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxperawatan", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedDate = selectedRow.find("td:eq(1)").text();
            var selectedMesin = selectedRow.find("td:eq(2)").text();
            var selectedJamOperasi = selectedRow.find("td:eq(3)").text();
            var selectedSparepart = selectedRow.find("td:eq(4)").text();
            var selectedKeterangan = selectedRow.find("td:eq(5)").text();
            var selectedTeknisi = selectedRow.find("td:eq(6)").text();

            var selectedNomorPerawatan = $(this).val();

            $("#hiddenNomorPerawatan").val(selectedNomorPerawatan);
            // Set the values in your form inputs
            $("#tanggal").val(selectedDate);
            $("#select_mesin").val(selectedMesin);
            $("#jam_operasi").val(selectedJamOperasi);
            $("#select_sparepart").val(selectedSparepart);
            $("#select_keterangan").val(selectedKeterangan);
            $("#select_teknisi").val(selectedTeknisi);

            console.log("Selected NomorPerawatan: ", selectedNomorPerawatan);
            console.log("Selected Date: ", selectedDate);
            console.log("Selected Mesin: ", selectedMesin);
            console.log("Selected Jam: ", selectedJamOperasi);
            console.log("Selected Sparepart: ", selectedSparepart);
            console.log("Selected Keterangan: ", selectedKeterangan);
            console.log("Selected Teknisi: ", selectedTeknisi);
        }
    });

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxperawatan:checked")
            .map(function () {
                return this.value;
            })
            .get();

        var requestData = {
            NoPerawatan: checkboxValues,
        };

        $.ajax({
            url: "/delete-perawatan",
            method: "DELETE",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                dataTable.ajax.reload();
                Swal.fire({
                    icon : "success",
                    title : "Terhapus!",
                    text : "Data Berhasil Dihapus!",
                    showConfirmButton : false,
                    timer : "2000"
                });
                console.log("data delete successfully", response);
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});
