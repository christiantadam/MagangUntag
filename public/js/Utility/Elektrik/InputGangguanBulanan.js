let bulan = document.getElementById("bulan");
let nama = document.getElementById("nama");
let pabrik = document.getElementById("pabrik");
let masalah = document.getElementById("masalah");
let gambar1 = document.getElementById("gambar1");
let gambar2 = document.getElementById("gambar2");
let RadioSelesai = document.getElementById("RadioSelesai");
let RadioBelumSelesai = document.getElementById("RadioBelumSelesai");
let solusi = document.getElementById("solusi");
let id = document.getElementById("id_bulanan");
let prosesButton = document.getElementById("ProsesButton");
let inputButton = document.getElementById("InputButton");
let changeButton = document.getElementById("ChangeButton");
let deleteButton = document.getElementById("DeleteButton");
let cancelButton = document.getElementById("CancelButton");

bulan.disabled = true;
nama.disabled = true;
pabrik.disabled = true;
masalah.disabled = true;
solusi.disabled = true;
prosesButton.style.display = "none";

function emptyForm() {
    bulan.value = "";
    nama.value = "";
    pabrik.value = "";
    masalah.value = "";
    solusi.value = "";
    id.value = "";
}
function disableForm() {
    bulan.disabled = true;
    nama.disabled = true;
    pabrik.disabled = true;
    masalah.disabled = true;
    solusi.disabled = true;
}

function enabledForm() {
    bulan.disabled = false;
    nama.disabled = false;
    pabrik.disabled = false;
    masalah.disabled = false;
    solusi.disabled = false;
}

$(inputButton).click(function (e) {
    e.preventDefault();

    enabledForm();
    emptyForm();

    inputButton.style.display = "none";
    prosesButton.style.display = "block";
});

$(changeButton).click(function (e) {
    e.preventDefault();
    enabledForm();
    inputButton.style.display = "none";
    prosesButton.style.display = "block";
});

$(cancelButton).click(function (e) {
    e.preventDefault();

    emptyForm();
    disableForm();

    inputButton.style.display = "block";
    prosesButton.style.display = "none";
});

// Event listener untuk Gambar 1
document.getElementById("gambar1").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-link").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("imagePreview1");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

// Event listener untuk Gambar 2
document.getElementById("gambar2").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-link").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("imagePreview2");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

$(document).ready(function () {
    var dataTable = $("#table-elektrik-bulanan").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/getDataBulanan",
            method: "GET",
        },
        columns: [
            {
                data: "No",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkbox_elektrik_bulanan" value="' +
                        data +
                        '">'
                    );
                },
            },

            { data: "Bulan" },
            { data: "Nama" },
            { data: "Pabrik" },
            { data: "Masalah" },
            { data: "Solusi" },
            { data: "Status" },
        ],
        order: [
            [1, "asc"],
            [5, "asc"],
        ],
    });

    $(prosesButton).click(function (e) {
        e.preventDefault();

        var bulanValue = bulan.value;
        var namaValue = nama.value;
        var pabrikValue = pabrik.value;
        var masalahValue = masalah.value;
        var solusiValue = solusi.value;
        var idValue = id.value;
        var gambar1Value = gambar1.files[0];
        var selectedStatus = $("input[name='status']:checked").val();

        var formData = new FormData();
        formData.append("bulan", bulanValue);
        formData.append("nama", namaValue);
        formData.append("pabrik", pabrikValue);
        formData.append("masalah", masalahValue);
        formData.append("gambar1", gambar1Value);
        formData.append("solusi", solusiValue);
        formData.append("status", selectedStatus);

        if (!gambar1Value) {
            // Handle the case where no file is selected
            console.error("No file selected.");
            return;
        }

        if (!(gambar1Value instanceof Blob)) {
            console.error("Invalid file object.");
            return;
        }

        var requestData = {
            bulan: bulanValue,
            nama: namaValue,
            pabrik: pabrikValue,
            masalah: masalahValue,
            gambar1: gambar1Value,
            solusi: solusiValue,
            status: selectedStatus,
        };

        // if (idValue) {
        //     requestData.id = idValue;
        // }
        console.log(formData);
        $.ajax({
            url: idValue ? "/updateDataBulanan" : "/postDataBulanan",
            method: idValue ? "PUT" : "POST",
            data: formData,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            processData: false,
            contentType: false,
            // dataType: "json",
            success: function (response) {
                dataTable.ajax.reload();
                console.log(formData);
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Data berhasil disimpan",
                    showConfirmButton: false,
                    timer: 1500,
                });
                emptyForm();
            },
            error: function (xhr, status, error) {
                if (xhr.status === 419) {
                    // Penanganan khusus untuk status 419 (sesi tidak valid)
                    console.log("Sesi tidak valid. Silakan login kembali.");
                    // Lakukan tindakan yang sesuai, seperti mengarahkan pengguna ke halaman login
                } else {
                    // Penanganan kesalahan lainnya
                    console.log("Terjadi kesalahan saat menyimpan gambar.");
                }
            },
        });
    });

    $("tbody").on("click", ".checkbox_elektrik_bulanan", function () {
        if ($(this).prop("checked")) {
            var id = $(this).val();
            $.ajax({
                url: "/getDataBulananId",
                type: "GET",
                data: { id: id },
                success: function (data) {
                    console.log(data);

                    // Assuming 'gambar' is the field containing the image data
                    var imageDataUri = data.gambar;

                    // Display the image in an <img> tag
                    $("#imagePreview1").attr(
                        "src",
                        "data:image/jpeg;base64,".imageDataUri
                    );

                    // Set other form fields
                    $("#id").val(data.No);
                    $("#bulan").val(data.Bulan);
                    $("#nama").val(data.Nama);
                    $("#pabrik").val(data.Pabrik);
                    $("#masalah").val(data.Masalah);
                    $("#solusi").val(data.Solusi);
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            // Handle unchecked checkbox if needed
        }
    });

    $(deleteButton).click(function (e) {
        var Token = $('meta[name="csrf-Token"]').attr("content");
        // Dapatkan checkbox tercentang di dalam baris yang dipilih
        var checkboxValues = $(".checkbox_elektrik_bulanan:checked")
            .map(function () {
                return this.value;
            })
            .get();
        if (checkboxValues.length > 0) {
            Swal.fire({
                title: "Anda yakin untuk menghapus data?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Ya",
                denyButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    var requestData = {
                        id: checkboxValues,
                    };

                    $.ajax({
                        url: "/deleteDataBulanan",
                        method: "DELETE",
                        data: requestData,
                        headers: {
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                                "content"
                            ),
                        },
                        success: function (response) {
                            console.log(response);
                            dataTable.ajax.reload();
                            emptyForm();
                            Swal.fire("Data berhasil dihapus!", "", "success");
                        },
                        error: function (error) {
                            console.error(error);
                        },
                    });
                } else if (result.isDenied) {
                    Swal.fire("Data tidak dihapus", "", "info");
                }
            });
        } else {
            Swal.fire(
                "Pilih data yang akan dihapus terlebih dahulu",
                "",
                "warning"
            );
        }
    });
});
