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

// // // Mendapatkan waktu saat ini
// // let waktuSekarang = new Date();

// // // Membuat format jam dan menetapkannya pada elemen input
// // let jamSekarang = waktuSekarang.getHours().toString().padStart(2, "0"); // Menggunakan padStart untuk memastikan format dua digit
// // let menitSekarang = waktuSekarang.getMinutes().toString().padStart(2, "0");

// // Menetapkan nilai input
// jam_operasi.value = jamSekarang + ":" + menitSekarang;

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
    var dataTable = $("#table-logsheet").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-logsheet",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMesin = $("#NoMesinSearch").val();
            },
        },
        columns: [
            {
                data: "NoLogSheet",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxlogsheet" value="' +
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
            {
                data: "NamaMesin",  value :'NoMesin'
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
            { data: "Temperatur" },
            { data: "Bar" },
            { data: "RMHours" },
            { data: "LMHours" },
            { data: "RHours" },
            { data: "LHours" },
            { data: "Efs" },
            { data: "Tech" },
            { data: "Keterangan" },
        ],
    });

    $("#refreshButton").click(function () {
        // Panggil metode reload dari DataTables
        dataTable.ajax.reload();
    });

    $("tbody").on("click", ".checkboxlogsheet", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedDate = selectedRow.find("td:eq(1)").text();
            var selectedMesin = selectedRow.find("td:eq(2)").text();
            var selectedJamOperasi = selectedRow.find("td:eq(3)").text();
            var selectedTemp = selectedRow.find("td:eq(4)").text();
            var selectedBar = selectedRow.find("td:eq(5)").text();
            var selectedRMHours = selectedRow.find("td:eq(6)").text();
            var selectedLMHours = selectedRow.find("td:eq(7)").text();
            var selectedRHours = selectedRow.find("td:eq(8)").text();
            var selectedLHours = selectedRow.find("td:eq(9)").text();
            var selectedEfs = selectedRow.find("td:eq(10)").text();
            var selectedTech = selectedRow.find("td:eq(11)").text();
            var selectedKeterangan = selectedRow.find("td:eq(12)").text();

            var selectedNoLogSheet = $(this).val();

            // Set the values in your form inputs
            $("#tanggal").val(selectedDate);
            $("#mesin").val(selectedMesin);
            $("#jam").val(selectedJamOperasi);
            $("#temp").val(selectedTemp);
            $("#bar").val(selectedBar);
            $("#rm_hours").val(selectedRMHours);
            $("#lm_hours").val(selectedLMHours);
            $("#r_hours").val(selectedRHours);
            $("#l_hours").val(selectedLHours);
            $("#efs").val(selectedEfs);
            $("#tech").val(selectedTech);
            $("#keterangan").val(selectedKeterangan);
            $("#hiddenNoLogSheet").val(selectedNoLogSheet);

            console.log(
                "Selected No Log Sheet: ",
                selectedNoLogSheet,
                selectedDate,
                selectedMesin,
                selectedJamOperasi,
                selectedTemp,
                selectedRMHours,
                selectedLMHours,
                selectedRHours,
                selectedLHours,
                selectedEfs,
                selectedTech,
                selectedKeterangan,
            );
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

        var dataDelete = {
            NoLogSheet: checkboxValues,
        };

        $.ajax({
            url: "/delete-logsheet",
            method: "DELETE",
            data: dataDelete,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log("data delete successfully", response);
                dataTable.ajax.reload();
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});
