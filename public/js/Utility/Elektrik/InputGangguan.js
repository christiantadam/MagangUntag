//button
let inputButton = document.getElementById("inputButton");
let koreksiButton = document.getElementById("koreksiButton");
let hapusinputButton = document.getElementById("hapusButton");
let prosesButton = document.getElementById("prosesButton");
let batalButton = document.getElementById("batalButton");
let refreshButton = document.getElementById("refreshButton");

//form
let tanggal = document.getElementById("tanggal");
let divisi_pelapor1 = document.getElementById("divisi_pelapor1");
let nama_pelapor = document.getElementById("nama_pelapor");
let penerima_laporan = document.getElementById("penerima_laporan");
let jam_lapor = document.getElementById("jam_lapor");
let jam_perbaikan = document.getElementById("jam_perbaikan");
let jam_selesai = document.getElementById("jam_selesai");
let tipe_gangguan = document.getElementById("tipe_gangguan");
let penyebab = document.getElementById("penyebab");
let penyelesaian = document.getElementById("penyelesaian");
let keterangan = document.getElementById("keterangan");
let teknisi = document.getElementById("teknisi");
let gambar1 = document.getElementById("gambar1");
let ket_gambar1 = document.getElementById("ket_gambar1");
let hasil_gambar1 = document.getElementById("hasil_gambar1");
let gambar2 = document.getElementById("gambar2");
let ket_gambar2 = document.getElementById("ket_gambar2");
let hasil_gambar2 = document.getElementById("hasil_gambar2");
let bulan = document.getElementById("bulan");
let sampaiDengan = document.getElementById("sampaiDengan");
let divisi_pelapor2 = document.getElementById("divisi_pelapor2");
let imagePreviewContainer1 = document.getElementById("imagePreviewContainer1");
let imagePreviewContainer2 = document.getElementById("imagePreviewContainer2");
let checkbox_tabel = document.getElementById("checkbox_tabel");
let tabel_input_gangguan = document.getElementById("tabel_input_gangguan");
let id_laporan = document.getElementById("id_laporan");
let agree = document.getElementById("agree");

var bulanInput = document.getElementById("bulan");
var sampaiDenganInput = document.getElementById("sampaiDengan");
var tanggalInput = document.getElementById("tanggal");
var JamLapor = document.getElementById("jam_lapor");

if (tanggal && bulanInput && tanggalInput && JamLapor && sampaiDenganInput) {
    var tanggal_akhirOutput = new Date().toISOString().split("T")[0];
    bulanInput.value = tanggal_akhirOutput;
    tanggalInput.value = tanggal_akhirOutput;
    sampaiDengan.value = tanggal_akhirOutput;
    tanggal.value = tanggal_akhirOutput;

    var currentDateTime = new Date();
    var hours = currentDateTime.getHours().toString().padStart(2, "0");
    var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    var timeString = hours + ":" + minutes;

    JamLapor.value = timeString;
}

function clearForm() {
    $("#id_laporan").val("");
    $("#divisi_pelapor1").val("");
    $("#nama_pelapor").val("");
    $("#penerima_laporan").val("");
    $("#jam_perbaikan").val("");
    $("#jam_selesai").val("");
    $("#tipe_gangguan").val("");
    $("#penyebab").val("");
    $("#penyelesaian").val("");
    $("#keterangan").val("");
    $("#teknisi").val("");
    $("#ket_gambar1").val("");
    $("#gambar1").val("");
    $("#namagambar1").text("Pilih Gambar 1");
    $("#hasil_gambar1").removeAttr("src").hide();
    $("#ket_gambar2").val("");
    $("#gambar2").val("");
    $("#namagambar2").text("Pilih Gambar 2");
    $("#hasil_gambar2").removeAttr("src").hide();
    var currentDate = moment().format("YYYY-MM-DD");
    var currentTime = moment().format("HH:mm");
    $("#tanggal").val(currentDate);
    $("#jam_lapor").val(currentTime);
}

// Initially disable all form elements
tanggal.disabled = true;
divisi_pelapor1.disabled = true;
nama_pelapor.disabled = true;
penerima_laporan.disabled = true;
jam_lapor.disabled = true;
jam_perbaikan.disabled = true;
jam_selesai.disabled = true;
tipe_gangguan.disabled = true;
penyebab.disabled = true;
penyelesaian.disabled = true;
keterangan.disabled = true;
teknisi.disabled = true;
gambar1.disabled = true;
ket_gambar1.disabled = true;
hasil_gambar1.disabled = true;
gambar2.disabled = true;
ket_gambar2.disabled = true;
hasil_gambar2.disabled = true;
prosesButton.disabled = true;
agree.disabled = true;

// Event listener for Input Button
inputButton.addEventListener("click", function () {
    id_laporan.value = "";
    koreksiButton.disabled = true;
    hapusinputButton.disabled = true;
    tanggal.disabled = false;
    divisi_pelapor1.disabled = false;
    nama_pelapor.disabled = false;
    penerima_laporan.disabled = false;
    jam_lapor.disabled = false;
    jam_perbaikan.disabled = false;
    jam_selesai.disabled = false;
    tipe_gangguan.disabled = false;
    penyebab.disabled = false;
    penyelesaian.disabled = false;
    keterangan.disabled = false;
    teknisi.disabled = false;
    gambar1.disabled = false;
    ket_gambar1.disabled = false;
    hasil_gambar1.disabled = false;
    gambar2.disabled = false;
    ket_gambar2.disabled = false;
    hasil_gambar2.disabled = false;
    checkbox_tabel.disabled = true;
    tabel_input_gangguan.disabled = true;
    agree.disabled = false;
    clearForm();
    $(".checkbox_elektrik").prop("checked", false);
    $(".checkbox_elektrik").prop("disabled", true);
});

batalButton.addEventListener("click", function () {
    // Disable all input fields and buttons
    prosesButton.disabled = true;
    inputButton.disabled = false;
    koreksiButton.disabled = false;
    hapusinputButton.disabled = false;
    tanggal.disabled = true;
    divisi_pelapor1.disabled = true;
    nama_pelapor.disabled = true;
    penerima_laporan.disabled = true;
    jam_lapor.disabled = true;
    jam_perbaikan.disabled = true;
    jam_selesai.disabled = true;
    tipe_gangguan.disabled = true;
    penyebab.disabled = true;
    penyelesaian.disabled = true;
    keterangan.disabled = true;
    teknisi.disabled = true;
    gambar1.disabled = true;
    ket_gambar1.disabled = true;
    gambar2.disabled = true;
    ket_gambar2.disabled = true;
    agree.checked = false;
    checkbox_tabel.checked = false;
    agree.disabled = true;
    clearForm();
    $(".checkbox_elektrik").prop("checked", false);
    $(".checkbox_elektrik").prop("disabled", false);
});

koreksiButton.addEventListener("click", function () {
    var checkedCheckboxes = $(".checkbox_elektrik:checked");

    if (checkedCheckboxes.length === 0) {
        tanggal.disabled = true;
        divisi_pelapor1.disabled = true;
        nama_pelapor.disabled = true;
        penerima_laporan.disabled = true;
        jam_lapor.disabled = true;
        jam_perbaikan.disabled = true;
        jam_selesai.disabled = true;
        tipe_gangguan.disabled = true;
        penyebab.disabled = true;
        penyelesaian.disabled = true;
        keterangan.disabled = true;
        teknisi.disabled = true;
        gambar1.disabled = true;
        ket_gambar1.disabled = true;
        hasil_gambar1.disabled = true;
        gambar2.disabled = true;
        ket_gambar2.disabled = true;
        hasil_gambar2.disabled = true;
        Swal.fire(
            "Pilih data yang akan dikoreksi terlebih dahulu",
            "",
            "warning"
        );
        return; // Stop the function execution
    } else {
        tanggal.disabled = true;
        divisi_pelapor1.disabled = true;
        nama_pelapor.disabled = true;
        penerima_laporan.disabled = true;
        jam_lapor.disabled = true;

        inputButton.disabled = true;
        prosesButton.disabled = false;
        hapusButton.disabled = true;
        jam_perbaikan.disabled = false;
        jam_selesai.disabled = false;
        tipe_gangguan.disabled = false;
        penyebab.disabled = false;
        penyelesaian.disabled = false;
        keterangan.disabled = false;
        teknisi.disabled = false;
        gambar1.disabled = false;
        ket_gambar1.disabled = false;
        hasil_gambar1.disabled = false;
        gambar2.disabled = false;
        ket_gambar2.disabled = false;
        hasil_gambar2.disabled = false;
        agree.disabled = false;
    }
});

// Function to check if all fields are filled

// Event listener untuk Gambar 1
document.getElementById("gambar1").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-1").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("hasil_gambar1");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.width = "200px";
        imagePreview.style.height = "100px";
        imagePreview.style.objectFit = "cover";
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

// Event listener untuk Gambar 2
document.getElementById("gambar2").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-2").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview2 = document.getElementById("hasil_gambar2");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview2.src = e.target.result;
        imagePreview2.style.width = "200px";
        imagePreview2.style.height = "100px";
        imagePreview2.style.objectFit = "cover";
        imagePreview2.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

function checkAllFieldsFilled() {
    return (
        tanggal.value.trim() !== "" &&
        divisi_pelapor1.value.trim() !== "" &&
        nama_pelapor.value.trim() !== "" &&
        penerima_laporan.value.trim() !== "" &&
        jam_lapor.value.trim() !== "" &&
        jam_perbaikan.value.trim() !== "" &&
        jam_selesai.value.trim() !== "" &&
        tipe_gangguan.value.trim() !== "" &&
        penyebab.value.trim() !== "" &&
        penyelesaian.value.trim() !== "" &&
        keterangan.value.trim() !== "" &&
        teknisi.value.trim() !== ""
    );
}

// Add event listeners to enable/disable prosesButton based on input field values
[
    tanggal,
    divisi_pelapor1,
    nama_pelapor,
    penerima_laporan,
    jam_lapor,
    jam_perbaikan,
    jam_selesai,
    tipe_gangguan,
    penyebab,
    penyelesaian,
    keterangan,
    teknisi,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        prosesButton.disabled = !checkAllFieldsFilled();
    });
});

if (tanggal) {
    var currentDateTime = new Date();
    var hours = currentDateTime.getHours().toString().padStart(2, "0");
    var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    var timeString = hours + ":" + minutes;
}

$(document).ready(function () {
    $("#prosesButton").click(function (e) {
        e.preventDefault();

        // Ambil nilai-nilai form
        var tanggalValue = $("#tanggal").val();
        var divisi_pelapor1Value = $("#divisi_pelapor1").val();
        var nama_pelaporValue = $("#nama_pelapor").val();
        var penerima_laporanValue = $("#penerima_laporan").val();
        var jam_laporValue = $("#jam_lapor").val();
        var jam_perbaikanValue = $("#jam_perbaikan").val();
        var jam_selesaiValue = $("#jam_selesai").val();
        var tipe_gangguanValue = $("#tipe_gangguan").val();
        var penyebabValue = $("#penyebab").val();
        var penyelesaianValue = $("#penyelesaian").val();
        var keteranganValue = $("#keterangan").val();
        var teknisiValue = $("#teknisi").val();
        var ketgambar1Value = $("#ket_gambar1").val();
        var ketgambar2Value = $("#ket_gambar2").val();
        var agreeValue = $("#agree").prop("checked") ? 1 : 0;
        var id_laporanValue = $("#id_laporan").val();

        // Ambil file gambar
        var gambar1data = document.getElementById("gambar1").files[0];
        var gambar2data = document.getElementById("gambar2").files[0];

        // Buat objek FormData
        var formData = new FormData();
        formData.append("tanggal", tanggalValue);
        formData.append("divisi_pelapor1", divisi_pelapor1Value);
        formData.append("nama_pelapor", nama_pelaporValue);
        formData.append("penerima_laporan", penerima_laporanValue);
        formData.append("jam_lapor", jam_laporValue);
        formData.append("jam_perbaikan", jam_perbaikanValue);
        formData.append("jam_selesai", jam_selesaiValue);
        formData.append("tipe_gangguan", tipe_gangguanValue);
        formData.append("penyebab", penyebabValue);
        formData.append("penyelesaian", penyelesaianValue);
        formData.append("keterangan", keteranganValue);
        formData.append("teknisi", teknisiValue);
        formData.append("agree", agreeValue);
        formData.append("gambar1data", gambar1data);
        formData.append("ketgambar1", ketgambar1Value);
        formData.append("gambar2data", gambar2data);
        formData.append("ketgambar2", ketgambar2Value);

        if (id_laporanValue) {
            formData.append("ID", id_laporanValue);
        }

        console.log("FormData:", formData);

        // Membuat permintaan AJAX
        $.ajax({
            url: id_laporanValue ? "/updateDataElektrik" : "/postData",
            method: id_laporanValue ? "POST" : "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                // Respons sukses
                $(".checkbox_elektrik").prop("disabled", false);

                $("#id").val("");
                if (id_laporanValue) {
                    // PUT request
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Data updated successfully.",
                    });
                    dataTable.ajax.reload();
                } else {
                    // POST request
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Data added successfully.",
                    });
                    dataTable.ajax.reload();
                }
            },
            error: function (xhr, status, error) {
                if (xhr.status === 419) {
                    console.log("Sesi tidak valid. Silakan login kembali.");
                } else {
                    // Penanganan kesalahan lainnya
                    console.log("Terjadi kesalahan saat menyimpan gambar.");
                }
            },
        });
    });

    var timeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        var hours = date.getHours().toString().padStart(2, "0");
        var minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
    };

    var dataTable = $("#tabel_input_gangguan").DataTable({
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/getData",
            type: "GET",
            data: function (d) {
                d.tanggal1 = $("#bulan").val();
                d.tanggal2 = $("#sampaiDengan").val();
                d.divisi = $("#divisi_pelapor2").val();
            },
        },
        columns: [
            {
                data: "Id_Laporan",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkbox_elektrik" value="' +
                        data +
                        '">'
                    );
                },
            },

            {
                data: "tanggal",
                render: function (data, type, full, meta) {
                    var localDate = moment.utc(data).local();

                    return localDate.format("DD-MM-YYYY");
                },
            },
            { data: "L_div_pelapor" },
            { data: "Nama_pelapor" },
            { data: "Penerima_laporan" },
            { data: "Jam_lapor", render: timeRenderer },
            { data: "jam_pelaksanan", render: timeRenderer },
            { data: "Jam_selesai", render: timeRenderer },
            { data: "Type_gangguan" },
            { data: "Penyebab" },
            { data: "Penyelesaian" },
            { data: "Keterangan" },
            { data: "Teknisi" },
        ],
        order: [
            [1, "asc"],
            [5, "asc"],
        ],
    });

    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        // console.log(dataTable);
    });

    var selectedId;
    var selectedUser;

    $("tbody").on("click", ".checkbox_elektrik", function () {
        if ($(this).prop("checked")) {
            hapusButton.disabled = false;
            koreksiButton.disabled = false;

            var selectedRow = $(this).closest("tr");

            selectedId = {
                id: $(this).val(),
            };
            var selectedid_laporan = $(this).val();

            id_laporan.value = selectedId.id;

            console.log(selectedId);

            var imageNames = ["Gambar1", "Gambar2"];

            imageNames.forEach(function (imageName, index) {
                $.ajax({
                    url: `/selectImage/${selectedId.id}/${imageName}`,
                    method: "GET",
                    xhrFields: {
                        responseType: "blob",
                    },
                    success: function (data, status, xhr) {
                        displayImage(data, `hasil_gambar${index + 1}`);
                        updateFileInput(gambar1, data["Gambar1"]);
                        updateFileInput(gambar2, data["Gambar2"]);

                        var keterangan =
                            xhr.getResponseHeader("Image-Description");

                        if (index === 0) {
                            ket_gambar1.value = keterangan;
                        } else if (index === 1) {
                            ket_gambar2.value = keterangan;
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", status, error);
                    },
                });
            });

            function displayImage(data, containerId) {
                var blob = new Blob([data], { type: "image/*" });
                var objectURL = URL.createObjectURL(blob);

                $("#" + containerId).html(
                    `<img src="${objectURL}" alt="Image">`
                );
                $("#" + containerId)
                    .attr("src", objectURL)
                    .show();
            }

            function updateFileInput(fileInput, imageData) {
                var blob = new Blob([imageData], { type: "image/*" });
                var fileName = "image.jpg";
                var file = new File([blob], fileName);

                fileInput = [file];
            }

            selectedData = {
                Id_Laporan: selectedid_laporan,
                tanggal: selectedRow.find("td:eq(1)").text(),
                L_div_pelapor: selectedRow.find("td:eq(2)").text(),
                Nama_pelapor: selectedRow.find("td:eq(3)").text(),
                Penerima_laporan: selectedRow.find("td:eq(4)").text(),
                Jam_lapor: selectedRow.find("td:eq(5)").text(),
                jam_pelaksanan: selectedRow.find("td:eq(6)").text(),
                Jam_selesai: selectedRow.find("td:eq(7)").text(),
                Type_gangguan: selectedRow.find("td:eq(8)").text(),
                Penyebab: selectedRow.find("td:eq(9)").text(),
                Penyelesaian: selectedRow.find("td:eq(10)").text(),
                Keterangan: selectedRow.find("td:eq(11)").text(),
                Teknisi: selectedRow.find("td:eq(12)").text(),
            };

            var formattanggal = moment(
                selectedData.tanggal,
                "DD/MM/YYYY"
            ).format("YYYY-MM-DD");

            // Update the form fields with the selectedData
            $("#id_laporan").val(selectedData.Id_Laporan);
            $("#tanggal").val(formattanggal);
            $("#divisi_pelapor1").val(selectedData.L_div_pelapor);
            $("#nama_pelapor").val(selectedData.Nama_pelapor);
            $("#penerima_laporan").val(selectedData.Penerima_laporan);
            $("#jam_lapor").val(selectedData.Jam_lapor);
            $("#jam_perbaikan").val(selectedData.jam_pelaksanan);
            $("#jam_selesai").val(selectedData.Jam_selesai);
            $("#tipe_gangguan").val(selectedData.Type_gangguan);
            $("#penyebab").val(selectedData.Penyebab);
            $("#penyelesaian").val(selectedData.Penyelesaian);
            $("#keterangan").val(selectedData.Keterangan);
            $("#teknisi").val(selectedData.Teknisi);

            console.log(
                "Selected id_laporan: ",
                selectedData.Id_Laporan,
                selectedData.tanggal,
                selectedData.L_div_pelapor,
                selectedData.Nama_pelapor,
                selectedData.Penerima_laporan,
                selectedData.Jam_lapor,
                selectedData.jam_pelaksanan,
                selectedData.Jam_selesai,
                selectedData.Type_gangguan,
                selectedData.Penyebab,
                selectedData.Penyelesaian,
                selectedData.Keterangan,
                selectedData.Teknisi
            );

            $.ajax({
                url: "/getDataElektrikId",
                type: "GET",
                data: { UP: selectedData.Id_Laporan },
                success: function (data) {
                    console.log("Data received:", data);
                    console.log(
                        "Selected user pelapor: ",

                        data.User_pelapor
                    );
                    selectedUser = {
                        user_pelapor: data.User_pelapor,
                    };
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            clearForm();

            console.log("Checkbox is unchecked. Form cleared.");
        }
    });

    // Menangani klik pada checkbox di setiap baris

    $(document).ready(function () {
        // Inisialisasi DataTable
        var dataTable = $("#tabel_input_gangguan").DataTable();

        $("tbody").on("click", ".checkbox_elektrik", function () {
            if ($(this).prop("checked")) {
                //var id = $(this).val();
                var user_pelapor = $(this).data("user_pelapor");
                selectedData = {
                    User: user_pelapor,
                    //id_laporan: id,
                };

                hapusButton.disabled = false;
                koreksiButton.disabled = false;
                //$("#id").val(id);
            }
        });

        // Menangani klik pada tombol hapus
        $("#hapusButton").click(function (e) {
            var Token = $('meta[name="csrf-Token"]').attr("content");
            // Dapatkan checkbox tercentang di dalam baris yang dipilih

            if (selectedUser) {
                $.ajax({
                    url: "/getUserId", // Gantilah dengan endpoint yang sesuai
                    method: "GET",
                    success: function (response) {
                        // console.log(response.NomorUser);
                        // console.log(selectedData.UserId);
                        // console.log(selectedData.id_laporan);
                        let nomorUserFromAPI = response.NomorUser.trim();
                        //var nomorUserFromAPI = "4384";

                        // Ambil UserId dari selectedData
                        var userIdFromSelectedData = selectedUser.user_pelapor;
                        console.log(userIdFromSelectedData);
                        console.log(nomorUserFromAPI, ",");

                        // Periksa apakah NomorUser dari API response sama dengan UserId dari selectedData
                        if (nomorUserFromAPI === userIdFromSelectedData) {
                            console.log("nomorUser dan userID sama");
                            Swal.fire({
                                title: "Anda yakin untuk menghapus data?",
                                showDenyButton: true,
                                showCancelButton: true,
                                confirmButtonText: "Ya",
                                denyButtonText: "Tidak",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    var requestData = {
                                        UP: selectedData.user_pelapor,
                                    };
                                    $.ajax({
                                        url: "/deleteData",
                                        method: "DELETE",
                                        data: requestData,
                                        headers: {
                                            "X-CSRF-TOKEN": $(
                                                'meta[name="csrf-token"]'
                                            ).attr("content"),
                                        },
                                        success: function (response) {
                                            dataTable.ajax.reload();
                                            Swal.fire(
                                                "Data berhasil dihapus!",
                                                "",
                                                "success"
                                            );
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
                            console.log(
                                "nomerUser dan user_pelapor tidak sama"
                            );
                            Swal.fire(
                                "Anda tidak memiliki izin untuk menghapus data ini",
                                "",
                                "warning"
                            );
                        }
                    },
                    error: function (error) {
                        console.error(error);
                    },
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
});
