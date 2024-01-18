$(document).ready(function () {
    // Click event for the Refresh button

});

// Form Input
let tanggal = document.getElementById("tanggal");
let mesin = document.getElementById("mesin");
let jam_operasi = document.getElementById("jam");
let temp = document.getElementById("temp");
let bar = document.getElementById("bar");
let rm_hours = document.getElementById("rm_hours");
let lm_hours = document.getElementById("lm_hours");
let r_hours = document.getElementById("r_hours");
let l_hours = document.getElementById("l_hours");
let efs = document.getElementById("efs");
let tech = document.getElementById("tech");
let keterangan = document.getElementById("keterangan");

// Mendapatkan waktu saat ini
let waktuSekarang = new Date();

// Membuat format jam dan menetapkannya pada elemen input
let jamSekarang = waktuSekarang.getHours().toString().padStart(2, "0"); // Menggunakan padStart untuk memastikan format dua digit
let menitSekarang = waktuSekarang.getMinutes().toString().padStart(2, "0");

// Menetapkan nilai input
jam_operasi.value = jamSekarang + ":" + menitSekarang;

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
jam_operasi.disabled = true;
temp.disabled = true;
bar.disabled = true;
rm_hours.disabled = true;
lm_hours.disabled = true;
r_hours.disabled = true;
l_hours.disabled = true;
efs.disabled = true;
tech.disabled = true;
keterangan.disabled = true;
updateButton.disabled = true;
deleteButton.disabled = true;

// Function to check if all fields are filled
function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        mesin.value.trim() !== "" &&
        jam_operasi.value.trim() !== "" &&
        temp.value.trim() !== "" &&
        bar.value.trim() !== "" &&
        rm_hours.value.trim() !== "" &&
        lm_hours.value.trim() !== "" &&
        r_hours.value.trim() !== "" &&
        l_hours.value.trim() !== "" &&
        efs.value.trim() !== "" &&
        tech.value.trim() !== "" &&
        keterangan.value.trim() !== ""
    );
}

[
    tanggal,
    mesin,
    jam_operasi,
    temp,
    bar,
    rm_hours,
    lm_hours,
    r_hours,
    l_hours,
    efs,
    tech,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    tanggal.disabled = false;
    mesin.disabled = false;
    jam_operasi.disabled = false;
    temp.disabled = false;
    bar.disabled = false;
    rm_hours.disabled = false;
    lm_hours.disabled = false;
    r_hours.disabled = false;
    l_hours.disabled = false;
    efs.disabled = false;
    tech.disabled = false;
    keterangan.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    saveButton.disabled = false;
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    mesin.disabled = true;
    jam_operasi.disabled = true;
    temp.disabled = true;
    bar.disabled = true;
    rm_hours.disabled = true;
    lm_hours.disabled = true;
    r_hours.disabled = true;
    l_hours.disabled = true;
    efs.disabled = true;
    tech.disabled = true;
    keterangan.disabled = true;
    updateButton.disabled = true;
    deleteButton.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    // Clear Form
    // tanggal.value = "";
    mesin.value = "";
    jam_operasi.value = "";
    temp.value = "";
    bar.value = "";
    rm_hours.value = "";
    lm_hours.value = "";
    r_hours.value = "";
    l_hours.value = "";
    efs.value = "";
    tech.value = "";
    keterangan.value = "";

    // Disable saveButton
    saveButton.disabled = true;
});

// Save Data Log Sheet
$(document).ready(function () {
    $("#saveButton").click(function () {
        var TanggalValue = $("#tanggal").val();
        var MesinValue = $("#mesin").val();
        var JamValue = $("#jam").val();
        var TempValue = $("#temp").val();
        var BarValue = $("#bar").val();
        var RM_HoursValue = $("#rm_hours").val();
        var LM_HoursValue = $("#lm_hours").val();
        var R_HoursValue = $("#r_hours").val();
        var L_HoursValue = $("#l_hours").val();
        var EfsValue = $("#efs").val();
        var TechValue = $("#tech").val();
        var KeteranganValue = $("#keterangan").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: TanggalValue,
            Mesin: MesinValue,
            Jam: JamValue,
            Temp: TempValue,
            Bar: BarValue,
            RM_Hours: RM_HoursValue,
            LM_Hours: LM_HoursValue,
            R_Hours: R_HoursValue,
            L_Hours: L_HoursValue,
            Efs: EfsValue,
            Tech: TechValue,
            Keterangan: KeteranganValue,
        };

        $.ajax({
            url: "/save-logsheet",
            method: "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log("Data saved successfully:", response);
                // console.log(response.body);
                console.log(requestData);

                // Display Bootstrap Alert
                $("#alertContainer").html(
                    '<div class="alert alert-success" role="alert">Data Log Sheet Berhasil Disimpan!</div>'
                );

                // setTimeout(function () {
                //     location.reload();
                // }, 2000);
            },
            error: function (error) {
                console.error("Error saving data:", error);
            },
        });
    });
});

// Show Data Log Sheet
$(document).ready(function () {

    $("#refreshButton").click(function () {
        fetchDataAndDisplay();
    });

    $("#table-logsheet").DataTable({
        order: [[1, "desc"]],
    });
    // Function to fetch and display data
    function fetchDataAndDisplay() {
        var tanggal_awal = $("#tanggal-awal").val();
        var tanggal_akhir = $("#tanggal-akhir").val();
        var NoMesin = $("#NoMesinSearch").val();

        var requestData = {
            date1: tanggal_awal,
            date2: tanggal_akhir,
            NoMesin: NoMesin,
        };

        $.ajax({
            url: "/get-logsheet",
            method: "GET",
            data: requestData,
            dataType: "json",
            success: function (response) {
                var data = response;

                // empty table body
                $("table tbody").empty();
                // $("#table-logsheet").DataTable().clear().draw();

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
                            '<input type="checkbox" class="checkboxlogsheet" value="' +
                            row.NoLogSheet +
                            '"></input>' +
                            "</td>" +
                            "<td>" +
                            formattedDateString +
                            "</td>" +
                            "<td>" +
                            row.NamaMesin +
                            "</td>" +
                            "<td>" +
                            row.Jam +
                            "</td>" +
                            "<td>" +
                            row.Temperatur +
                            "</td>" +
                            "<td>" +
                            row.Bar +
                            "</td>" +
                            "<td>" +
                            row.RMHours +
                            "</td>" +
                            "<td>" +
                            row.LMHours +
                            "</td>" +
                            "<td>" +
                            row.RHours +
                            "</td>" +
                            "<td>" +
                            row.LHours +
                            "</td>" +
                            "<td>" +
                            row.Efs +
                            "</td>" +
                            "<td>" +
                            row.Tech +
                            "</td>" +
                            "<td>" +
                            row.Keterangan +
                            "</td>" +
                            "</tr>"
                    );
                });
                // $("#table-logsheet").DataTable().draw();
            },
            error: function (error) {
                console.error("Error show Data : ", error.responseText);
            },
        });
    }

    // Checkbox click
    $("tbody").on("click", ".checkboxlogsheet", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedNomorLogSheet = $(this).val();

            // Assuming you have defined your hiddenNomorPerawatan input somewhere in your code
            $("#hiddenNomorPerawatan").val(selectedNomorLogSheet);

            console.log("Selected NomorPerawatan: ", selectedNomorLogSheet);
        }
    });

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxlogsheet:checked")
            .map(function () {
                return this.value;
            })
            .get();

        var requestData = {
            NoLogSheet: checkboxValues,
        };

        $.ajax({
            url: "/delete-logsheet",
            method: "DELETE",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log("data log sheet delete successfully", response);
                fetchDataAndDisplay();
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});
