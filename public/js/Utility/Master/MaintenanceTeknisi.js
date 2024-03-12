// let updateButtonTeknisi = document.getElementById("updateButtonTeknisi");
// let deleteButtonTeknisi = document.getElementById("deleteButtonTeknisi");
// let saveButtonTeknisi = document.getElementById("saveButtonTeknisi");
// let refreshButtonTeknisi = document.getElementById("refreshButton");
// let Teknisi = document.getElementById("teknisi");
// let Lokasi = document.getElementById("lokasi");

// saveButtonTeknisi.disabled = true;
// updateButtonTeknisi.disabled = false;
// // deleteButtonTeknisi.disabled = false;

// // Function to check if all fields are filled
// function checkAllFieldsFilled2() {
//     return Teknisi.value.trim() !== "" && Lokasi.value.trim() !== "";
// }

// updateButtonTeknisi.addEventListener("click", function () {
//     var checkboxValues = $(".checkboxteknisi:checked")
//         .map(function () {
//             return this.value;
//         })
//         .get();

//     if (checkboxValues.length === 0) {
//         Swal.fire({
//             icon: "error",
//             title: "Tidak Ada Data Terpilih",
//             text: "Pilih satu Data Teknisi untuk diperbarui.",
//         });
//         deleteButtonTeknisi.disabled = false;
//     } else {
//         Teknisi.disabled = false;
//         Lokasi.disabled = false;
//         deleteButtonTeknisi.disabled = true;
//     }
// });

// // Add event listeners to enable/disable saveButton based on input field values
// [Teknisi, Lokasi].forEach(function (inputField) {
//     inputField.addEventListener("input", function () {
//         saveButtonTeknisi.disabled = !checkAllFieldsFilled2();
//     });
// });
$(document).ready(function () {
    var dataTableTeknisi = $("#table-teknisi").DataTable({
        serverSide: true,
        responsive: true,
        ordering: false,
        ajax: {
            url: "/get-teknisi",
            type: "GET",
        },
        columns: [
            { data: "Lokasi" },
            { data: "NamaUser" },
            // { data: "IdUserMaster" },
            {
                data: "Id_Teknisi",
                render: function (data, type, full, meta) {
                    var rowID = data;
                    return (
                        '<button class="btn btn-primary editButtonTeknisi" data-teknisi-id="' +
                        rowID +
                        '" data-bs-toggle="modal" data-bs-target="#editmodal" type="button">Edit</button>' +
                        '<button class="btn btn-secondary deleteButtonTeknisi" data-id="' +
                        rowID +
                        '">Hapus</button>'
                    );
                },
            },
        ],
    });

    $("#refreshButtonTeknisi").click(function () {
        $("#hiddenIdTeknisi").val("");
        dataTableTeknisi.ajax.reload();
    });

    $(document).on("click", ".editButtonTeknisi", function (e) {
        // e.preventDefault();
        var teknisiId = $(this).data("teknisi-id");
        console.log("ID Teknisi yang akan diedit:", teknisiId);
        console.log("tes");

        var datas = {
            id: teknisiId,
        };
        $.ajax({
            type: "GET",
            url: "/get-teknisi-id",
            data: datas,
            success: function (response) {
                console.log(response);
                $("#hiddenIdTeknisi").val(response.Id_Teknisi);
                $("#editteknisi").val(response.IdUserMaster);
                $("#editlokasi").val(response.Lokasi);
            },
        });
    });

    $("#updateButtonTeknisi").click(function () {
        var TeknisiValue = $("#editteknisi").val();
        var LokasiValue = $("#editlokasi").val();
        var nomorIdValue = $("#hiddenIdTeknisi").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            ID: nomorIdValue,
            Teknisi: TeknisiValue,
            Lokasi: LokasiValue,
        };

        $.ajax({
            url: "/update-teknisi",
            method: "PUT",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                // Clear Form
                $("#editteknisi").val("");
                $("#editlokasi").val("");
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

    // DeleteButton click
    $(document).on("click", ".deleteButtonTeknisi", function (e) {
        e.preventDefault();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");
        var rowID = $(this).data("id");

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
                    id: rowID,
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
        var TeknisiValue = $("#teknisi").val();
        var LokasiValue = $("#lokasi").val();
        // var nomorIdValue = $("#hiddenIdTeknisi").val();

        var csrfToken = $('meta[name="csrf-token"]').attr("content");

        var requestData = {
            NamaTeknisi: TeknisiValue,
            Lokasi: LokasiValue,
        };
        console.log(TeknisiValue);
        console.log(LokasiValue);
        $.ajax({
            url: "/save-teknisi",
            method: "POST",
            data: requestData,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            success: function (response) {
                console.log(requestData);
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil Disimpan!",
                    showConfirmButton: false,
                    timer: "2000",
                });

                // Clear Form
                $("#teknisi").val("");
                $("#lokasi").val("");
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
