// Form Input
let tanggal = document.getElementById("tanggal");
let feeder = document.getElementById("feeder");
let jam_gangguan = document.getElementById("jam_gangguan");
let jam_selesai = document.getElementById("jam_selesai");
let ket_gangguan = document.getElementById("ket_gangguan");
let keterangan = document.getElementById("keterangan");
let id_transaksi = document.getElementById("hiddenNomorpanel");

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

function clearForm() {
    // tanggal.value = "";
    feeder.value = "";
    jam_gangguan.value = "";
    jam_selesai.value = "";
    ket_gangguan.value = "";
    keterangan.value = "";
    id_transaksi.value = "";
}
saveButton.disabled = true;
tanggal.disabled = true;
feeder.disabled = true;
jam_gangguan.disabled = true;
jam_selesai.disabled = true;
ket_gangguan.disabled = true;
keterangan.disabled = true;
updateButton.disabled = true;
deleteButton.disabled = true;

// Function to check if all fields are filled
function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        feeder.value.trim() !== "" &&
        jam_gangguan.value.trim() !== "" &&
        jam_selesai.value.trim() !== "" &&
        ket_gangguan.value.trim() !== ""
    );
}

// Add event listeners to enable/disable saveButton based on input field values
[tanggal, feeder, jam_gangguan, jam_selesai, ket_gangguan].forEach(function (
    inputField
) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    // Disable input fields and disable Update and Delete buttons
    tanggal.disabled = false;
    feeder.disabled = false;
    jam_gangguan.disabled = false;
    jam_selesai.disabled = false;
    ket_gangguan.disabled = false;
    keterangan.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;
});

// UpdateButton click
updateButton.addEventListener("click", function () {
    // Disable input fields and disable Update and Delete buttons
    tanggal.disabled = false;
    feeder.disabled = false;
    jam_gangguan.disabled = false;
    jam_selesai.disabled = false;
    ket_gangguan.disabled = false;
    keterangan.disabled = false;
    inputButton.disabled = true;
    deleteButton.disabled = true;
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    feeder.disabled = true;
    jam_gangguan.disabled = true;
    jam_selesai.disabled = true;
    ket_gangguan.disabled = true;
    keterangan.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;

    // Clear Form
    clearForm();

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
        var tanggalValue = tanggal.value;
        var feederValue = feeder.value;
        var startValue = jam_gangguan.value;
        var endValue = jam_selesai.value;
        var ket_ganggguanValue = ket_gangguan.value;
        var keteranganValue = keterangan.value;
        var nomorpanelValue = $("#hiddenNomorpanel").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            Feeder: feederValue,
            JamMulai: startValue,
            JamSelesai: endValue,
            Gangguan: ket_ganggguanValue,
            Keterangan: keteranganValue,
        };
        if (nomorpanelValue) {
            requestData.NomorPanel = nomorpanelValue;
        }

        $.ajax({
            url: nomorpanelValue ? "/update-panel" : "/save-panel",
            method: nomorpanelValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                nomorpanelValue
                    ? Swal.fire({
                          icon: "success",
                          title: "Data Berhasil Diperbarui!",
                          showConfirmButton: false,
                          timer: "2000",
                      })
                    : Swal.fire({
                          icon: "success",
                          title: "Data Berhasil Disimpan!",
                          showConfirmButton: false,
                          timer: "2000",
                      });
                tanggal.disabled = true;
                feeder.disabled = true;
                jam_gangguan.disabled = true;
                jam_selesai.disabled = true;
                ket_gangguan.disabled = true;
                keterangan.disabled = true;
                updateButton.disabled = false;
                deleteButton.disabled = false;
                // Clear Form
                clearForm();
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

    var dataTable = $("#table-panelinduk").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-panel",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
            },
        },
        columns: [
            {
                data: "Id_transaksi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxpanel" value="' +
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
            { data: "Feeder_line" },
            {
                data: "Start_time",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            {
                data: "Finish_time",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            {
                data: "L_Gangguan_panel_induk",
                render: function (data, type, full, meta) {
                    return full.Ket_gangguan;
                },
            },
            { data: "Keterangan" },
        ],
    });

    $("#refreshButton").click(function () {
        clearForm();
        dataTable.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxpanel", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedNomorpanel = $(this).val();

            $("#hiddenNomorpanel").val(selectedNomorpanel);

            $.ajax({
                url: "/get-panel-id",
                type: "GET",
                data: { id: selectedNomorpanel },
                success: function (data) {
                    console.log(data);

                    var date = new Date(data.tanggal + "Z");
                    tanggal.value = date.toISOString().split("T")[0];

                    feeder.value = data.Feeder_line;

                    var startHours = new Date(data.Start_time + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.Start_time + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_gangguan.value = startHours + ":" + startMinutes;

                    var endHours = new Date(data.Finish_time + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var endMinutes = new Date(data.Finish_time + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_selesai.value = endHours + ":" + endMinutes;

                    ket_gangguan.value = data.L_Gangguan_panel_induk;
                    keterangan.value = data.Keterangan;
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            clearForm();
        }
    });

    // DeleteButton click
    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxpanel:checked")
            .map(function () {
                return this.value;
            })
            .get();

        var requestData = {
            id: checkboxValues,
        };

        $.ajax({
            url: "/delete-panel",
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
                clearForm();
                console.log("data delete successfully", response);
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });
});

// ------------------------------------------------------------------------------------------------------------ //

//Modal Keterangan Gangguan

let updateButtonKeterangan = document.getElementById("updateButtongangguan");
let deleteButtonKeterangan = document.getElementById("deleteButtongangguan");
let saveButtonKeterangan = document.getElementById("saveButtongangguan");
let refreshButtonKeterangan = document.getElementById("refreshButtongangguan");
let keterangan_gangguan = document.getElementById("keterangan_gangguan");

saveButtonKeterangan.disabled = true;
updateButtonKeterangan.disabled = true;
deleteButtonKeterangan.disabled = true;

// Function to check if all fields are filled
function checkAllFieldsFilled1() {
    return keterangan_gangguan.value.trim() !== "";
}

// Add event listeners to enable/disable saveButton based on input field values
[keterangan_gangguan].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButtonKeterangan.disabled = !checkAllFieldsFilled1();
        deleteButtonKeterangan.disabled = !checkAllFieldsFilled1();
        updateButtonKeterangan.disabled = !checkAllFieldsFilled1();
    });
});

$(document).ready(function () {
    $("#tambahKetGangguanButton").on("click", function () {
        $("#keterangan_gangguan").val("");
        $("#hiddenIdKeterangan").val("");
        dataTableKeterangan.ajax.reload();
        $("#tambahKetGangguanModal").modal("show");
    });

    var dataTableKeterangan = $("#table-ketgangguan").DataTable({
        serverSide: true,
        responsive: true,
        searching: false,
        ordering: false,
        scrollY: 200,
        ajax: {
            url: "/get-keterangangangguan",
            type: "GET",
        },
        columns: [
            {
                data: "Id_gangguan",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxketgangguan" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "Ket_gangguan" },
        ],
    });

    $("#refreshButtongangguan").click(function () {
        $("#keterangan_gangguan").val("");
        $("#hiddenIdKeterangan").val("");
        dataTableKeterangan.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxketgangguan", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedKeterangan = selectedRow.find("td:eq(1)").text();

            var selectedId = $(this).val();

            $("#hiddenIdKeterangan").val(selectedId);
            $("#keterangan_gangguan").val(selectedKeterangan);

            console.log("Selected Id: ", selectedId);
            console.log("Selected Keterangan: ", selectedKeterangan);
        } else {
            $("#keterangan_gangguan").val("");
            $("#hiddenIdKeterangan").val("");
        }
    });

    // DeleteButton click
    $("#deleteButtongangguan").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxketgangguan:checked")
            .map(function () {
                return this.value;
            })
            .get();

        var requestData = {
            id: checkboxValues,
        };

        $.ajax({
            url: "/delete-keterangangangguan",
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
                $("#keterangan_gangguan").val("");
                $("#hiddenIdKeterangan").val("");

                console.log("data delete successfully", response);
            },
            error: function (error) {
                console.error("Error delete Data : ", error.responseText);
            },
        });
    });

    $("#saveButtongangguan").click(function () {
        var keteranganValue = $("#keterangan_gangguan").val();
        var nomorIdValue = $("#hiddenIdKeterangan").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Keterangan: keteranganValue,
        };
        if (nomorIdValue) {
            requestData.NomorId = nomorIdValue;
        }

        $.ajax({
            url: nomorIdValue
                ? "/update-keterangangangguan"
                : "/save-keterangangangguan",
            method: nomorIdValue ? "PUT" : "POST",
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

                // Clear Form
                $("#keterangan_gangguan").val("");
                $("#hiddenIdKeterangan").val("");
                dataTable.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error saving data:", error);
            },
        });
    });
});
