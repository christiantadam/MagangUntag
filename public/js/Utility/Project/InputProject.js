let inputButton = document.getElementById("inputButton");
let koreksiButton = document.getElementById("koreksiButton");
let hapusButton = document.getElementById("hapusButton");
let prosesButton = document.getElementById("prosesButton");
let batalButton = document.getElementById("batalButton");
let refreshButton = document.getElementById("refreshButton");

let tanggal_mulai = document.getElementById("tanggal_mulai");
let tanggal_selesai = document.getElementById("tanggal_selesai");
let nama_project = document.getElementById("nama_project");
let nama_mesin = document.getElementById("nama_mesin");
let merk_mesin = document.getElementById("merk_mesin");
let lokasi_mesin = document.getElementById("lokasi_mesin");
let tahun_pembuatan = document.getElementById("tahun_pembuatan");
let keterangan_kerusakan = document.getElementById("keterangan_kerusakan");
let perbaikan = document.getElementById("perbaikan");
let progress = document.getElementById("progress");
let selesai = document.getElementById("selesai");
let gambar1 = document.getElementById("gambar1");
let ket_gambar1 = document.getElementById("ket_gambar1");
let gambar2 = document.getElementById("gambar2");
let ket_gambar2 = document.getElementById("ket_gambar2");
let user_input = document.getElementById("user_input");
let keterangan1 = document.getElementById("keterangan1");
let keterangan2 = document.getElementById("keterangan2");

tanggal_mulai.disabled = true;
tanggal_selesai.disabled = true;
nama_project.disabled = true;
nama_mesin.disabled = true;
merk_mesin.disabled = true;
lokasi_mesin.disabled = true;
tahun_pembuatan.disabled = true;
keterangan_kerusakan.disabled = true;
perbaikan.disabled = true;
gambar1.disabled = true;
ket_gambar1.disabled = true;
ket_gambar2.disabled = true;
gambar2.disabled = true;
keterangan1.disabled = true;
keterangan2.disabled = true;
prosesButton.disabled = true;

function checkAllFieldsFilled() {
    return (
        tanggal_mulai.value.trim() !== "" &&
        tanggal_selesai.value.trim() !== "" &&
        nama_project.value.trim() !== "" &&
        nama_mesin.value.trim() !== "" &&
        merk_mesin.value.trim() !== "" &&
        lokasi_mesin.value.trim() !== "" &&
        tahun_pembuatan.value.trim() !== "" &&
        keterangan_kerusakan.value.trim() !== "" &&
        perbaikan.value.trim() !== ""
    );
}

// Add event listeners to enable/disable prosesButton based on input field values
[
    tanggal_mulai,
    tanggal_selesai,
    nama_project,
    nama_mesin,
    merk_mesin,
    lokasi_mesin,
    tahun_pembuatan,
    keterangan_kerusakan,
    perbaikan,
].forEach(function (inputField) {
    inputField.addEventListener("input", function () {
        prosesButton.disabled = !checkAllFieldsFilled();
    });
});

$(document).ready(function () {
    $("#koreksiButton").click(function (e) {
        console.log("koreksi Button Clicked");
        // inputButton.disabled = true;
        // hapusButton.disabled = true;
        tanggal_mulai.disabled = false;
        tanggal_selesai.disabled = false;
        nama_project.disabled = false;
        nama_mesin.disabled = false;
        merk_mesin.disabled = false;
        lokasi_mesin.disabled = false;
        tahun_pembuatan.disabled = false;
        keterangan_kerusakan.disabled = false;
        perbaikan.disabled = false;
        gambar1.disabled = false;
        gambar2.disabled = false;
        ket_gambar2.disabled = false;
        ket_gambar1.disabled = false;
        keterangan1.disabled = false;
        keterangan2.disabled = false;

        var checkedCheckboxes = $(".checkbox_project:checked");

        if (checkedCheckboxes.length === 0) {
            // inputButton.disabled = true;
            // hapusButton.disabled = true;
            tanggal_mulai.disabled = true;
            tanggal_selesai.disabled = true;
            nama_project.disabled = true;
            nama_mesin.disabled = true;
            merk_mesin.disabled = true;
            lokasi_mesin.disabled = true;
            tahun_pembuatan.disabled = true;
            keterangan_kerusakan.disabled = true;
            perbaikan.disabled = true;
            gambar1.disabled = true;
            gambar2.disabled = true;
            ket_gambar2.disabled = true;
            ket_gambar1.disabled = true;
            keterangan1.disabled = true;
            keterangan2.disabled = true;
            Swal.fire(
                "Pilih data yang akan dikoreksi terlebih dahulu",
                "",
                "warning"
            );
            return; // Stop the function execution
        }
    });
});

document.getElementById("gambar2").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-link").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("hasil_gambar2");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

// Event listener untuk Gambar 2
document.getElementById("gambar1").addEventListener("change", function () {
    var fileInput = this;
    var fileName = fileInput.value.split("\\").pop();

    // Menampilkan nama file yang dipilih di label
    document.querySelector(".btn-link").textContent = fileName;

    // Membaca file gambar yang dipilih
    var reader = new FileReader();
    reader.onload = function (e) {
        var imagePreview = document.getElementById("hasil_gambar1");
        // Menetapkan sumber gambar saat file berhasil dibaca
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block"; // Menampilkan elemen gambar
    };
    reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
});

if (tanggal_mulai && tanggal_selesai) {
    var tanggal_akhirOutput = new Date().toISOString().split("T")[0];

    tanggal_mulai.value = tanggal_akhirOutput;
    tanggal_selesai.value = tanggal_akhirOutput;

    var currentDateTime = new Date();
    var hours = currentDateTime.getHours().toString().padStart(2, "0");
    var minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    var timeString = hours + ":" + minutes;
}

$(document).ready(function () {
    $("#prosesButton").click(function (e) {
        e.preventDefault();
        //var Kode = Kode.value;
        var nama_projectValue = $("#nama_project").val();
        var nama_mesinValue = $("#nama_mesin").val();
        var tanggal_mulaiValue = $("#tanggal_mulai").val();
        var tanggal_selesaiValue = $("#tanggal_selesai").val();
        // var Keterangan = Keterangan.value;
        //var user_input = user_input.value;
        var keterangan_kerusakanValue = $("#keterangan_kerusakan").val();
        var merk_mesinValue = $("#merk_mesin").val();
        var lokasi_mesinValue = $("#lokasi_mesin").val();
        var tahun_pembuatanValue = $("#tahun_pembuatan").val();
        var perbaikanValue = $("#perbaikan").val();
        var idLaporanValue = $("#id").val();
        var keteranganValue = $("input[name='keterangan']:checked").val();
        var gambar1data = document.getElementById("gambar1").files[0];
        var gambar2data = document.getElementById("gambar2").files[0];
        var ketgambar1Value = $("#ket_gambar1").val();
        var ketgambar2Value = $("#ket_gambar2").val();

        var formData = new FormData();

        formData.append("nama_project", nama_projectValue);
        formData.append("nama_mesin", nama_mesinValue);
        formData.append("tanggal_mulai", tanggal_mulaiValue);
        formData.append("tanggal_selesai", tanggal_selesaiValue);
        formData.append("keterangan_kerusakan", keterangan_kerusakanValue);
        formData.append("merk_mesin", merk_mesinValue);
        formData.append("lokasi_mesin", lokasi_mesinValue);
        formData.append("tahun_pembuatan", tahun_pembuatanValue);
        formData.append("perbaikan", perbaikanValue);
        formData.append("keterangan", keteranganValue);
        formData.append("gambar1data", gambar1data);
        formData.append("ketgambar1", ketgambar1Value);
        formData.append("gambar2data", gambar2data);
        formData.append("ketgambar2", ketgambar2Value);

        if (idLaporanValue) {
            requestData.Id = idLaporanValue;
        }
        console.log("FormData:", formData);

        $.ajax({
            url: idLaporanValue ? "/updateDataProject" : "/postDataProject",
            type: idLaporanValue ? "PUT" : "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            data: formData,
            processData: false,
            contentType: false,

            //data: requestData,
            error: function (xhr, status, error) {
                if (xhr.status === 419) {
                    // Penanganan khusus untuk status 419 (sesi tidak valid)
                    console.log("Sesi tidak valid. Silakan login kembali.");
                    // Lakukan tindakan yang sesuai, seperti mengarahkan pengguna ke halaman login
                } else {
                    // Penanganan kesalahan lainnya
                    console.log("Terjadi kesalahan saat menyimpan data.");
                }
            },
            success: function (response) {
                console.log(response);
                // Respons sukses
                dataTable.ajax.reload();

                $("#id").val("");
                if (idLaporanValue) {
                    // PUT request
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Data updated successfully.",
                    });
                } else {
                    // POST request
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Data added successfully.",
                    });
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

    var dataTable = $("#tabel_input_project").DataTable({
        //var Token = $('meta[name="csrf-Token"]').attr("content"),
        processing: true,
        serverSide: true,
        responsive: true,
        ajax: {
            url: "/getDataProject",
            type: "GET",
            data: function (d) {
                // d.kode = ;
                d.bulan = $("#bulan").val();
                d.tahun = $("#tahun").val();
            },
        },
        moment: {
            timezone: "Asia/Jakarta", // Sesuaikan dengan zona waktu yang sesuai
        },
        columns: [
            {
                data: "Id",
                render: function (data, type, full, meta) {
                    return (
                        '<input type="checkbox" class="checkbox_project" value="' +
                        data +
                        '">'
                    );
                },
            },
            { data: "NamaProject" },
            { data: "NamaMesin" },
            {
                data: "TglMulai",
                render: function (data, type, full, meta) {
                    // Assuming data is in UTC format, adjust it to the local timezone

                    var localDate = moment.utc(data).local();
                    return localDate.format("DD-MM-YYYY");
                },
            },
            {
                data: "TglSelesai",
                render: function (data, type, full, meta) {
                    // Assuming data is in UTC format, adjust it to the local timezone
                    var localDate = moment.utc(data).local();
                    return localDate.format("DD-MM-YYYY");
                },
            },
            { data: "KeteranganKerja" },
            { data: "Keterangan" },
            { data: "UserId" },
        ],
    });
    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        console.log(dataTable);
    });

    batalButton.addEventListener("click", function () {
        koreksiButton.disabled = false;
        inputButton.disabled = false;
        hapusButton.disabled = false;
        tanggal_mulai.disabled = true;
        tanggal_selesai.disabled = true;
        nama_project.disabled = true;
        nama_mesin.disabled = true;
        merk_mesin.disabled = true;
        lokasi_mesin.disabled = true;
        tahun_pembuatan.disabled = true;
        keterangan_kerusakan.disabled = true;
        perbaikan.disabled = true;
        gambar1.disabled = true;
        ket_gambar1.disabled = true;
        gambar2.disabled = true;
        ket_gambar2.disabled = true;
        keterangan1.disabled = true;
        keterangan2.disabled = true;
        dataTable.clear().draw();
        //$("#tanggal_mulai").val("");
        //$("#tanggal_selesai").val("");
        $("#nama_project").val("");
        $("#nama_mesin").val("");
        $("#merk_mesin").val("");
        $("#lokasi_mesin").val("");
        $("#tahun_pembuatan").val("");
        $("#keterangan_kerusakan").val("");
        $("#perbaikan").val("");
        $("#keterangan1").val("");
        $("#keterangan2").val("");
        $("#id").val("");
    });

    inputButton.addEventListener("click", function () {
        console.log("Input Button Clicked");
        koreksiButton.disabled = true;
        hapusButton.disabled = true;
        tanggal_mulai.disabled = false;
        tanggal_selesai.disabled = false;
        nama_project.disabled = false;
        nama_mesin.disabled = false;
        merk_mesin.disabled = false;
        lokasi_mesin.disabled = false;
        tahun_pembuatan.disabled = false;
        keterangan_kerusakan.disabled = false;
        perbaikan.disabled = false;
        gambar1.disabled = false;
        gambar2.disabled = false;
        ket_gambar2.disabled = false;
        ket_gambar1.disabled = false;
        keterangan1.disabled = false;
        keterangan2.disabled = false;
        dataTable.clear().draw();

        // $("#tanggal_mulai").val("");
        // $("#tanggal_selesai").val("");
        $("#nama_project").val("");
        $("#nama_mesin").val("");
        $("#merk_mesin").val("");
        $("#lokasi_mesin").val("");
        $("#tahun_pembuatan").val("");
        $("#keterangan_kerusakan").val("");
        $("#perbaikan").val("");
        $("#id").val("");
    });
});

$(document).ready(function () {
    // Inisialisasi DataTable
    var dataTable = $("#tabel_input_project").DataTable();
    var selectedData;

    $("tbody").on("click", ".checkbox_project", function () {
        if ($(this).prop("checked")) {
            var selectedRow = $(this).closest("tr");
            var id = $(this).val();
            selectedData = {
                UserId: selectedRow.find("td:eq(7)").text(),
                id_laporan: id,
            };

            hapusButton.disabled = false;
            koreksiButton.disabled = false;
            $("#id").val(id);

            $.ajax({
                url: "/getDataProjectId",
                type: "GET",
                data: { id: id },
                success: function (data) {
                    var TglMulai = new Date(data.TglMulai);
                    var offset = TglMulai.getTimezoneOffset();
                    TglMulai.setMinutes(TglMulai.getMinutes() - offset);

                    var TglSelesai = new Date(data.TglSelesai);
                    var offset = TglSelesai.getTimezoneOffset();
                    TglSelesai.setMinutes(TglSelesai.getMinutes() - offset);
                    $("#nama_project").val(data.NamaProject);
                    $("#nama_mesin").val(data.NamaMesin);
                    $("#merk_mesin").val(data.MerkMesin);
                    $("#lokasi_mesin").val(data.LokasiMesin);
                    $("#tahun_pembuatan").val(data.TahunPembuatan);
                    $("#tanggal_mulai").val(
                        TglMulai.toISOString().split("T")[0]
                    );
                    $("#tanggal_selesai").val(
                        TglSelesai.toISOString().split("T")[0]
                    );
                    $("#keterangan_kerusakan").val(data.KeteranganKerja);
                    $("#perbaikan").val(data.Perbaikan);

                    console.log(
                        "Selected id_laporan: ",
                        id,
                        data.NamaProject,
                        data.NamaMesin,
                        data.MerkMesin,
                        data.LokasiMesin,
                        data.TahunPembuatan,
                        data.TglMulai,
                        data.TglSelesai,
                        data.KeteranganKerja,
                        data.Perbaikan,
                        data.UserId
                    );
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        }
    });

    // Menangani klik pada checkbox di setiap baris

    // Menangani klik pada tombol hapus
    $("#hapusButton").click(function (e) {
        var Token = $('meta[name="csrf-Token"]').attr("content");
        // Dapatkan checkbox tercentang di dalam baris yang dipilih

        if (selectedData) {
            $.ajax({
                url: "/getDataUserId", // Gantilah dengan endpoint yang sesuai
                method: "GET",
                success: function (response) {
                    // console.log(response.NomorUser);
                    // console.log(selectedData.UserId);
                    // console.log(selectedData.id_laporan);
                    var nomorUserFromAPI = response.NomorUser;
                    //var nomorUserFromAPI = "4378";

                    // Ambil UserId dari selectedData
                    var userIdFromSelectedData = selectedData.UserId;

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
                                    id: selectedData.id_laporan,
                                };
                                $.ajax({
                                    url: "/deleteDataProject",
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
                        console.log("nomerUser dan idUser tidak sama");
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
