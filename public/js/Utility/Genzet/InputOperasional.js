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

// Form Input
let tanggal = document.getElementById("tanggal");
let mesingenzet = document.getElementById("mesingenzet");
let jam_awal = document.getElementById("jam_awal");
let jam_akhir = document.getElementById("jam_akhir");
let operationhours = document.getElementById("operationhours");
let lubeoil = document.getElementById("lubeoil");
let coolwater = document.getElementById("coolwater");
let volt = document.getElementById("volt");
let hz = document.getElementById("hz");
let amp = document.getElementById("amp");
let tambahbbm = document.getElementById("tambahbbm");
let tambahoil = document.getElementById("tambahoil");
let statuslog = document.getElementById("statuslog");
let teknisi = document.getElementById("teknisi");
let keterangan = document.getElementById("keterangan");
let id = document.getElementById("hiddenNomorgenzet");

tanggal.disabled = true;
mesingenzet.disabled = true;
jam_awal.disabled = true;
jam_akhir.disabled = true;
operationhours.disabled = true;
lubeoil.disabled = true;
coolwater.disabled = true;
volt.disabled = true;
hz.disabled = true;
amp.disabled = true;
tambahbbm.disabled = true;
tambahoil.disabled = true;
statuslog.disabled = true;
teknisi.disabled = true;
keterangan.disabled = true;
updateButton.disabled = false;
deleteButton.disabled = false;
saveButton.disabled = true;

function clearForm() {
    // tanggal.value = "";
    mesingenzet.value = "";
    jam_awal.value = "";
    jam_akhir.value = "";
    operationhours.value = "";
    lubeoil.value = "";
    coolwater.value = "";
    volt.value = "";
    hz.value = "";
    amp.value = "";
    tambahbbm.value = "";
    tambahoil.value = "";
    statuslog.value = "";
    teknisi.value = "";
    keterangan.value = "";
    id.value = "";
}

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        mesingenzet.value.trim() !== "" &&
        jam_awal.value.trim() !== "" &&
        jam_akhir.value.trim() !== "" &&
        operationhours.value.trim() !== "" &&
        lubeoil.value.trim() !== "" &&
        coolwater.value.trim() !== "" &&
        volt.value.trim() !== "" &&
        hz.value.trim() !== "" &&
        amp.value.trim() !== "" &&
        tambahbbm.value.trim() !== "" &&
        tambahoil.value.trim() !== "" &&
        statuslog.value.trim() !== "" &&
        teknisi.value.trim() !== "" &&
        keterangan.value.trim() !== ""
    );
}

[
    tanggal,
    mesingenzet,
    jam_awal,
    jam_akhir,
    operationhours,
    lubeoil,
    coolwater,
    volt,
    hz,
    amp,
    tambahbbm,
    tambahoil,
    statuslog,
    teknisi,
    keterangan,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButton.disabled = !checkAllFieldsFilled();
    });
});

// InputButton click
inputButton.addEventListener("click", function () {
    tanggal.disabled = false;
    mesingenzet.disabled = false;
    jam_awal.disabled = false;
    jam_akhir.disabled = false;
    operationhours.disabled = false;
    lubeoil.disabled = false;
    coolwater.disabled = false;
    volt.disabled = false;
    hz.disabled = false;
    amp.disabled = false;
    tambahbbm.disabled = false;
    tambahoil.disabled = false;
    statuslog.disabled = false;
    teknisi.disabled = false;
    keterangan.disabled = false;
    updateButton.disabled = true;
    deleteButton.disabled = true;

    // Clear Form
    clearForm();

    $(".checkboxgenzet").prop("checked", false);
});

// InputButton click
updateButton.addEventListener("click", function () {
    var checkboxValues = $(".checkboxgenzet:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data Genzet untuk diperbarui.",
        });
        deleteButton.disabled = false;
        inputButton.disabled = false;
    } else {
        tanggal.disabled = false;
        mesingenzet.disabled = false;
        jam_awal.disabled = false;
        jam_akhir.disabled = false;
        operationhours.disabled = false;
        lubeoil.disabled = false;
        coolwater.disabled = false;
        volt.disabled = false;
        hz.disabled = false;
        amp.disabled = false;
        tambahbbm.disabled = false;
        tambahoil.disabled = false;
        statuslog.disabled = false;
        teknisi.disabled = false;
        keterangan.disabled = false;
        deleteButton.disabled = true;
        inputButton.disabled = true;
    }
});

// CancelButton click
cancelButton.addEventListener("click", function () {
    tanggal.disabled = true;
    mesingenzet.disabled = true;
    jam_awal.disabled = true;
    jam_akhir.disabled = true;
    operationhours.disabled = true;
    lubeoil.disabled = true;
    coolwater.disabled = true;
    volt.disabled = true;
    hz.disabled = true;
    amp.disabled = true;
    tambahbbm.disabled = true;
    tambahoil.disabled = true;
    statuslog.disabled = true;
    teknisi.disabled = true;
    keterangan.disabled = true;
    updateButton.disabled = false;
    deleteButton.disabled = false;
    inputButton.disabled = false;
    // Clear Form
    clearForm();

    $(".checkboxgenzet").prop("checked", false);

    // Disable saveButton
    saveButton.disabled = true;
});

$(document).ready(function () {
    // Get Data
    var dataTable = $("#table-genzet").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/get-genzet",
            type: "GET",
            data: function (d) {
                d.date1 = $("#tanggal-awal").val();
                d.date2 = $("#tanggal-akhir").val();
                d.NoMesin = $("#MesinSearch").val();
            },
        },
        columns: [
            {
                data: "NoTransaksi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxgenzet" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date = new Date(data + "Z");
                    var date1 = new Date(date).toISOString().split("T")[0];
                    return date1;
                },
            },
            { data: "NamaMesin" },
            {
                data: "JamAwalProduksi",
                render: function (data, type, full, meta) {
                    var startDate = new Date(data);
                    var endDate = new Date(full.JamAkhirProduksi);

                    var startHours = startDate
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = startDate
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");

                    var endHours = endDate
                        .getHours()
                        .toString()
                        .padStart(2, "0");
                    var endMinutes = endDate
                        .getMinutes()
                        .toString()
                        .padStart(2, "0");

                    return (
                        startHours +
                        ":" +
                        startMinutes +
                        " - " +
                        endHours +
                        ":" +
                        endMinutes
                    );
                },
            },
            {
                data: "OperationHour",
            },
            { data: "LubeOil" },
            { data: "CoolWater" },
            { data: "Volt380" },
            { data: "HZ" },
            { data: "Amp" },
            { data: "StatusLog" },
            { data: "Teknisi" },
            { data: "Keterangan" },
        ],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
    });

    // Save Data
    $("#saveButton").click(function () {
        var tanggalValue = tanggal.value;
        var mesinGenzetValue = mesingenzet.value;
        var jamAwalValue = jam_awal.value;
        var jamAkhirValue = jam_akhir.value;
        var operationValue = operationhours.value;
        var lubeOilValue = lubeoil.value;
        var waterValue = coolwater.value;
        var voltValue = volt.value;
        var hzValue = hz.value;
        var ampValue = amp.value;
        var bbmValue = tambahbbm.value;
        var oilValue = tambahoil.value;
        var statusLogValue = statuslog.value;
        var teknisiValue = teknisi.value;
        var keteranganValue = keterangan.value;
        var nomorgenzetValue = id.value;

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Tanggal: tanggalValue,
            MesinGenzet: mesinGenzetValue,
            JamAwal: jamAwalValue,
            JamAkhir: jamAkhirValue,
            OperationHours: operationValue,
            LubeOil: lubeOilValue,
            CoolWater: waterValue,
            Volt: voltValue,
            Hz: hzValue,
            Amp: ampValue,
            TambahBBM: bbmValue,
            TambahOil: oilValue,
            StatusLog: statusLogValue,
            Teknisi: teknisiValue,
            Keterangan: keteranganValue,
        };
        if (nomorgenzetValue) {
            requestData.NomorGenzet = nomorgenzetValue;
        }

        $.ajax({
            url: nomorgenzetValue ? "/update-genzet" : "/save-genzet",
            method: nomorgenzetValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                nomorgenzetValue
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

    $("tbody").on("click", ".checkboxgenzet", function () {
        if ($(this).prop("checked")) {
            deleteButton.disabled = false;
            updateButton.disabled = false;

            var selectedNomorgenzet = $(this).val();

            $("#hiddenNomorgenzet").val(selectedNomorgenzet);

            $.ajax({
                url: "/get-operational-genzet",
                type: "GET",
                data: { nomorGenzet: selectedNomorgenzet },
                success: function (data) {
                    console.log(data);

                    var date = new Date(data.Tanggal + "Z");
                    tanggal.value = date.toISOString().split("T")[0];
                    mesingenzet.value = data.NoMesin;

                    var startHours = new Date(data.JamAwalProduksi + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var startMinutes = new Date(data.JamAwalProduksi + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_awal.value = startHours + ":" + startMinutes;

                    var endHours = new Date(data.JamAkhirProduksi + "Z")
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0");
                    var endMinutes = new Date(data.JamAkhirProduksi + "Z")
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0");
                    jam_akhir.value = endHours + ":" + endMinutes;

                    operationhours.value = data.OperationHour;
                    lubeoil.value = data.LubeOil;
                    coolwater.value = data.CoolWater;
                    volt.value = data.Volt380;
                    hz.value = data.HZ;
                    amp.value = data.Amp;
                    tambahbbm.value = data.TambahBBM;
                    tambahoil.value = data.TambahOil;
                    statuslog.value = data.StatusLog;
                    teknisi.value = data.Teknisi;
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

    $("#deleteButton").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxgenzet:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu data Genzet untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus data Genzet terpilih?",
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
                    url: "/delete-genzet",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        console.log(requestData);
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Genzet Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        console.log(
                            "data Genzet delete successfully",
                            response
                        );
                        dataTable.ajax.reload();
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

// Modal Status Log

let updateButtonStatusLog = document.getElementById("updateButtonStatusLog");
let deleteButtonStatusLog = document.getElementById("deleteButtonStatusLog");
let saveButtonStatusLog = document.getElementById("saveButtonStatusLog");
let refreshButtonStatusLog = document.getElementById("refreshButtonStatusLog");
let StatusLog = document.getElementById("statuslogmodalinput");

saveButtonStatusLog.disabled = true;
updateButtonStatusLog.disabled = false;
deleteButtonStatusLog.disabled = false;

function checkAllFieldsFilled1() {
    return StatusLog.value.trim() !== "";
}

// InputButton click
updateButtonStatusLog.addEventListener("click", function () {
    var checkboxValues = $(".checkboxstatuslog:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu data Status Log untuk diperbarui.",
        });
        deleteButtonStatusLog.disabled = false;
    } else {
        StatusLog.disabled = false;
        deleteButtonStatusLog.disabled = true;
    }
});

[StatusLog].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButtonStatusLog.disabled = !checkAllFieldsFilled1();
    });
});

$(document).ready(function () {
    $("#modalstatus").click(function (e) {
        e.preventDefault();
        StatusLog.value = "";
        $("#hiddenIdStatusLog").val("");
        dataTableStatusLog.ajax.reload();
    });
    var dataTableStatusLog = $("#table-statuslog").DataTable({
        serverSide: true,
        responsive: true,
        searching: false,
        ordering: false,
        scrollY: 200,
        ajax: {
            url: "/get-statuslog",
            type: "GET",
        },
        columns: [
            {
                data: "NoStatusLog",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxstatuslog" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "NamaStatusLog" },
        ],
    });

    $("#refreshButtonStatusLog").click(function () {
        $("#statuslogmodalinput").val("");
        $("#hiddenIdStatusLog").val("");
        dataTableStatusLog.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxstatuslog", function () {
        if ($(this).prop("checked")) {
            updateButtonStatusLog.disabled = false;
            deleteButtonStatusLog.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedStatusLog = selectedRow.find("td:eq(1)").text();

            var selectedId = $(this).val();

            $("#statuslogmodalinput").val(selectedStatusLog);
            $("#hiddenIdStatusLog").val(selectedId);
        } else {
            $("#statuslogmodalinput").val("");
            $("#hiddenIdStatusLog").val("");
            updateButtonStatusLog.disabled = true;
            deleteButtonStatusLog.disabled = true;
        }
    });

    // DeleteButton click
    $("#deleteButtonStatusLog").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxstatuslog:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu Status Log untuk dihapus.",
            });
            return;
        }

        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus Status Log terpilih?",
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
                    url: "/delete-statuslog",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        dataTableStatusLog.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: "2000",
                        });
                        $("#statuslogmodalinput").val("");
                        $("#hiddenIdStatusLog").val("");
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

    $("#saveButtonStatusLog").click(function () {
        var StatusLogValue = $("#statuslogmodalinput").val();
        var nomorIdValue = $("#hiddenIdStatusLog").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            StatusLog: StatusLogValue,
        };
        if (nomorIdValue) {
            requestData.NomorId = nomorIdValue;
        }

        $.ajax({
            url: nomorIdValue ? "/update-statuslog" : "/save-statuslog",
            method: nomorIdValue ? "PUT" : "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                nomorIdValue
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
                // Clear Form
                $("#statuslogmodalinput").val("");
                $("#hiddenIdStatusLog").val("");
                dataTableStatusLog.ajax.reload();
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

// ------------------------------------------------------------------------------------------------------------------------------------- //

// Modal Teknisi

let updateButtonTeknisi = document.getElementById("updateButtonTeknisi");
let deleteButtonTeknisi = document.getElementById("deleteButtonTeknisi");
let saveButtonTeknisi = document.getElementById("saveButtonTeknisi");
let refreshButtonTeknisi = document.getElementById("refreshButtonTeknisi");
let Teknisi = document.getElementById("teknisimodalinput");

saveButtonTeknisi.disabled = true;
updateButtonTeknisi.disabled = false;
deleteButtonTeknisi.disabled = false;

// Function to check if all fields are filled
function checkAllFieldsFilled2() {
    return Teknisi.value.trim() !== "";
}

updateButtonTeknisi.addEventListener("click", function () {
    var checkboxValues = $(".checkboxteknisi:checked")
        .map(function () {
            return this.value;
        })
        .get();

    if (checkboxValues.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Tidak Ada Data Terpilih",
            text: "Pilih satu Data Teknisi untuk diperbarui.",
        });
        deleteButtonTeknisi.disabled = false;
    } else {
        Teknisi.disabled = false;
        deleteButtonTeknisi.disabled = true;
    }
});

// Add event listeners to enable/disable saveButton based on input field values
[Teknisi].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        saveButtonTeknisi.disabled = !checkAllFieldsFilled2();
    });
});
$(document).ready(function () {
    $("#modalteknisi").click(function (e) {
        e.preventDefault();
        $("#teknisimodalinput").val("");
        $("#hiddenIdTeknisi").val("");
        dataTableTeknisi.ajax.reload();
    });

    var dataTableTeknisi = $("#table-teknisi").DataTable({
        serverSide: true,
        responsive: true,
        searching: false,
        ordering: false,
        scrollY: 200,
        ajax: {
            url: "/get-teknisi",
            type: "GET",
        },
        columns: [
            {
                data: "NoTeknisi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxteknisi" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "NamaTeknisi" },
        ],
    });

    $("#refreshButtonTeknisi").click(function () {
        $("#teknisimodalinput").val("");
        $("#hiddenIdTeknisi").val("");
        dataTableTeknisi.ajax.reload();
    });

    // Checkbox click
    $("tbody").on("click", ".checkboxteknisi", function () {
        if ($(this).prop("checked")) {
            updateButtonTeknisi.disabled = false;
            deleteButtonTeknisi.disabled = false;

            var selectedRow = $(this).closest("tr");

            var selectedTeknisi = selectedRow.find("td:eq(1)").text();

            var selectedId = $(this).val();

            $("#teknisimodalinput").val(selectedTeknisi);
            $("#hiddenIdTeknisi").val(selectedId);

            console.log("Selected Id: ", selectedId);
            console.log("Selected Teknisi: ", selectedTeknisi);
        } else {
            $("#teknisimodalinput").val("");
            $("#hiddenIdTeknisi").val("");
        }
    });

    // DeleteButton click
    $("#deleteButtonTeknisi").click(function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var checkboxValues = $(".checkboxteknisi:checked")
            .map(function () {
                return this.value;
            })
            .get();

        if (checkboxValues.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Tidak Ada Data Terpilih",
                text: "Pilih setidaknya satu Teknisi untuk dihapus.",
            });
            return;
        }

        // Use SweetAlert for confirmation
        Swal.fire({
            title: "Konfirmasi",
            text: "Anda yakin ingin menghapus Data Teknisi yang terpilih?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                var requestData = {
                    id: checkboxValues,
                };
                $.ajax({
                    url: "/delete-teknisi",
                    method: "DELETE",
                    data: requestData,
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    success: function (response) {
                        console.log(requestData);
                        dataTableTeknisi.ajax.reload();
                        Swal.fire({
                            icon: "success",
                            title: "Terhapus!",
                            text: "Data Berhasil Dihapus!",
                            showConfirmButton: false,
                            timer: "2000",
                        });
                        $("#teknisimodalinput").val("");
                        $("#hiddenIdTeknisi").val("");

                        console.log("data delete successfully", response);
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

    $("#saveButtonTeknisi").click(function () {
        var TeknisiValue = $("#teknisimodalinput").val();
        var nomorIdValue = $("#hiddenIdTeknisi").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            Teknisi: TeknisiValue,
        };
        if (nomorIdValue) {
            requestData.NomorId = nomorIdValue;
        }

        $.ajax({
            url: nomorIdValue ? "/update-teknisi" : "/save-teknisi",
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
                $("#teknisimodalinput").val("");
                $("#hiddenIdTeknisi").val("");

                dataTableTeknisi.ajax.reload();
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
