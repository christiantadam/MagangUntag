// // tanggal form
// var tanggal_Input = document.getElementById("tanggal");
// var tanggal_Output = new Date().toISOString().split("T")[0];
// tanggal_Input.value = tanggal_Output;

// // tanggal awal search
// var tanggal_awalInput = document.getElementById("tanggal-awal");
// var tanggal_awalOutput = new Date().toISOString().split("T")[0];
// tanggal_awalInput.value = tanggal_awalOutput;

// // tanggal akhir search
// var tanggal_akhirInput = document.getElementById("tanggal-akhir");
// var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
// tanggal_akhirInput.value = tanggal_akhirOutput;

// // Form Button
// let inputButton = document.getElementById("inputButton");
// let cancelButton = document.getElementById("cancelButton");
// let updateButton = document.getElementById("updateButton");
// let deleteButton = document.getElementById("deleteButton");
// let saveButton = document.getElementById("saveButton");
// let refreshButton = document.getElementById("refreshButton");

// // Form Input
// let tanggal = document.getElementById("tanggal");
// let mesingenzet = document.getElementById("mesingenzet");
// let jam_awal = document.getElementById("jam_awal");
// let jam_akhir = document.getElementById("jam_akhir");
// let operationhours = document.getElementById("operationhours");
// let lubeoil = document.getElementById("lubeoil");
// let coolwater = document.getElementById("coolwater");
// let volt = document.getElementById("volt");
// let hz = document.getElementById("hz");
// let amp = document.getElementById("amp");
// let tambahbbm = document.getElementById("tambahbbm");
// let tambahoil = document.getElementById("tambahoil");
// let statuslog = document.getElementById("statuslog");
// let teknisi = document.getElementById("teknisi");
// let keterangan = document.getElementById("keterangan");
// let id = document.getElementById("hiddenNomorgenzet");

// if (jam_awal) {
//     function updateCurrentTime() {
//         var currentDateTime = new Date();
//         var hours = currentDateTime.getHours().toString().padStart(2, "0");
//         var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
//         var timeString = hours + ":" + minutes;

//         jam_awal.value = timeString;
//     }
//     updateCurrentTime();

//     // Update time every second (1000 milliseconds)
//     setInterval(updateCurrentTime, 1000);
// }

// ------------------------------------------------------------------------------------------------------------------------------------- //
// Modal Teknisi

let updateButtonTeknisi = document.getElementById("updateButtonTeknisi");
let deleteButtonTeknisi = document.getElementById("deleteButtonTeknisi");
let saveButtonTeknisi = document.getElementById("saveButtonTeknisi");
let refreshButtonTeknisi = document.getElementById("refreshButton");
let Teknisi = document.getElementById("teknisi");

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
                data: "Id_Teknisi",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkboxteknisi" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "Id_Lokasi" },
            { data: "NamaUser" },
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

            var selectedTeknisi = selectedRow.find("td:eq(2)").text();

            var selectedId = $(this).val();

            $("#teknisi").val(selectedTeknisi);
            $("#hiddenIdTeknisi").val(selectedId);
        } else {
            $("#teknisi").val("");
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
