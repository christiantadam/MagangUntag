// Form Input
let tanggal = document.getElementById("tanggal");
let jam = document.getElementById("jam");
let nometer = document.getElementById("nometer");
let nometersearch = document.getElementById("nometersearch");
let counter = document.getElementById("counter");
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
// let checkboxpdam = document.getElementsByClassName("checkboxpdam");

saveButton.disabled = true;
tanggal.disabled = true;
jam.disabled = true;
nometer.disabled = true;
counter.disabled = true;
teknisi.disabled = true;
updateButton.disabled = true;
deleteButton.disabled = true;

// Function to check if all fields are filled
function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        jam.value.trim() !== "" &&
        nometer.value.trim() !== "" &&
        counter.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

// Add event listeners to enable/disable saveButton based on input field values
[tanggal, jam, nometer, counter, teknisi].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    // Disable input fields and disable Update and Delete buttons
    tanggal.disabled = false;
    jam.disabled = false;
    nometer.disabled = false;
    counter.disabled = false;
    teknisi.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
});


// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    jam.disabled = true;
    nometer.disabled = true;
    counter.disabled = true;
    teknisi.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    // Clear Form
    // tanggal.value = "";
    jam.value = "";
    nometer.value = "";
    counter.value = "";
    teknisi.value = "";

    // Disable saveButton
    saveButton.disabled = true;
});

// Reload Window
window.addEventListener("beforeunload", function () {

    jam.value = "";
    nometer.value = "";
    counter.value = "";
    teknisi.value = "";
    nometersearch.value = "";


    // Disable saveButton
    saveButton.disabled = true;
});


$(document).ready(function () {
    $("#saveButton").click(function () {
        var tanggalValue = $("#tanggal").val();
        var jamValue = $("#jam").val();
        var meterValue = $("#nometer").val();
        var counterValue = $("#counter").val();
        var teknisiValue = $("#teknisi").val();
        var nomorpdamValue = $("#hiddenNomorpdam").val(); // Ambil nomorpdam dari elemen tersembunyi

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            Jam: jamValue,
            Meter: meterValue,
            Counter: counterValue,
            Teknisi: teknisiValue,
        };
        if (nomorpdamValue) {
            requestData.Nomorpdam = nomorpdamValue;
        }

        $.ajax({
            url: nomorpdamValue ? "/update-pdam" : "/save-pdam",
            method: nomorpdamValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
            },
            error: function (error) {
                Swal.fire({
                    icon: "failed",
                    title: "Data Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
        });
    });
});


$(document).ready(function () {
    var dataTable = $("#table-pdam").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-pdam",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMeter = $("#nometersearch").val();
            },
        },
        columns: [
            {
                data: "nomor",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxpdam" value="' +
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
            { data: "nometer" },
            { data: "counter" },
            { data: "teknisi" },
        ],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();


    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpdam", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedDate = selectedRow.find("td:eq(1)").text();
            var selectedJam = selectedRow.find("td:eq(2)").text();
            var selectedNoMeter = selectedRow.find("td:eq(3)").text();
            var selectedCounter = selectedRow.find("td:eq(4)").text();
            var selectedTeknisi = selectedRow.find("td:eq(5)").text();

            var selectedNomorpdam = $(this).val();

            $("#hiddenNomorpdam").val(selectedNomorpdam);
            $("#tanggal").val(selectedDate);
            $("#jam").val(selectedJam);
            $("#nometer").val(selectedNoMeter);
            $("#counter").val(selectedCounter);
            $("#teknisi").val(selectedTeknisi);

            console.log("Selected Nomorpdam: ", selectedNomorpdam);
            console.log("Selected Date: ", selectedDate);
            console.log("Selected Jam: ", selectedJam);
            console.log("Selected No Meter: ", selectedNoMeter);
            console.log("Selected Counter: ", selectedCounter);
            console.log("Selected Teknisi: ", selectedTeknisi);
        }
    });


    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxpdam:checked")
            .map(function () {
                return this.value;
            })
            .get();

        var requestData = {
            Nomor: checkboxValues,
        };

        $.ajax({
            url: "/delete-pdam",
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
                    text: "Data Berhasil Dihapus!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.log("data delete successfully", response);
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});
