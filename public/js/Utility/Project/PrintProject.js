var bulan = document.getElementById("bulan");
var tahun = document.getElementById("tahun");

$(document).ready(function () {
    var timeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        return date.toLocaleString(); // Menggunakan waktu lengkap bersamaan dengan tanggal
    };

    var dataTable = $("#tabel_print_project").DataTable({
        //var Token = $('meta[name="csrf-Token"]').attr("content"),
        processing: true,
        serverSide: true,
        responsive: true,
        //scrollX: true,

        ajax: {
            url: "/getDataProject",
            type: "GET",
            data: function (d) {
                // d.kode = ;
                d.bulan = $("#bulan").val();
                d.tahun = $("#tahun").val();
            },
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
                    var date = new Date(data + "Z").toLocaleDateString();
                    return date;
                },
            },
            {
                data: "TglSelesai",
                render: function (data, type, full, meta) {
                    // Assuming data is in UTC format, adjust it to the local timezone
                    var localDate = moment.utc(data).local();

                    // Check if Keterangan is "Progress"
                    if (full.Keterangan === "Progress") {
                        return ""; // Jika "Progress", kembalikan string kosong
                    } else {
                        return localDate.format("MM/DD/YYYY"); // Jika bukan "Progress", kembalikan tanggal yang diformat
                    }
                },
            },
            { data: "KeteranganKerja" },
            { data: "Keterangan" },
            { data: "Nama" },
        ],
    });
    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        console.log(dataTable);
    });

    // Event listener for checkbox changes
    $("tbody").on("click", ".checkbox_project", function () {
        if ($(this).prop("checked")) {
            var id = $(this).val();
            var selectedRow = $(this).closest("tr");

            $.ajax({
                url: "/getDataProjectId",
                type: "GET",
                data: { id: id },
                success: function (data) {
                    var imageNames = ["Gambar1", "Gambar2"];

                    imageNames.forEach(function (imageName, index) {
                        $.ajax({
                            url: `/selectImageProject/${id}/${imageName}`,
                            method: "GET",
                            xhrFields: {
                                responseType: "blob",
                            },
                            success: function (data, status, xhr) {
                                displayImage(data, `hasil_gambar${index + 1}`);
                            },
                            error: function (xhr, status, error) {
                                //console.error("Error:", status, error);
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
                    var selectedData = {
                        Nama: selectedRow.find("td:eq(7)").text(),
                    };
                    var htmlCode = `
                    <style>
                    #previewData {
                        width: 210mm;
                        height: 297mm;
                        // text-align: center; /* Center text content */
                    }
                    .data {
                        margin-top: 100px;
                    }
                    .col-4{
                        width: 33,33%; /* Adjust column width as needed */
                        display: inline-block; /* Display columns side by side */
                        text-align: left; /* Align content within columns */
                    }
                    .col-4 div,
                    .col-6 div {
                        margin-bottom: 10px;
                    }
                    .row-12 {
                        margin-top: 10px;
                        margin-bottom: 10px;
                    }
                    .print-footer {
                        padding-top: 25px;
                        text-align: center; /* Center content within footer */
                    }
                    .table-container {
                        display: flex;
                        justify-content: center;
                    }
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #previewData, #previewData * {
                            visibility: visible;
                        }
                        #previewData {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 80vw;
                            height: 80vh;
                        }
                        .print-footer {
                            position: absolute;
                            bottom: 0;
                            text-align: center; /* Center content within footer */
                            width: 100%;
                        }
                        table-print {
                            visibility: visible;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                        @page {
                            size: A4;
                            margin: 10px;
                        }
                    }
                    </style>
                    <div id="previewData">
                        <h1 class="mb-4 text-center">Serah Terima Permintaan Jasa Teknik</h1>
                        <h1 class="mb-4 text-center">PT. KERTARAJASA RAYA</h1>
                        <h3 class="mb-5 text-center">JL. Raya Tropodo No.1 Waru - SIDOARJO</h3>
                        <div class="row">
                            <div class="col-12 mt-2">
                                <p class="mb-2"><strong>Nama Mesin:</strong> ${data.NamaMesin}</p>
                                <p class="mb-2"><strong>Merk Mesin:</strong> ${data.MerkMesin}</p>
                                <p class="mb-2"><strong>Lokasi Mesin:</strong> ${data.LokasiMesin}</p>
                                <p class="mb-5"><strong>Tahun Pembuatan:</strong> ${data.TahunPembuatan}</p>
                            </div>
                        </div>
                        <div class="table-container">
                            <table class="table-print w-100">
                                <thead>
                                    <tr class="text-center">
                                        <th class="col-md-4"><strong>Keterangan Kerusakan</strong></th>
                                        <th class="col-md-4"><strong>Perbaikan</strong></th>
                                        <th class="col-md-4"><strong>Keterangan</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="text-left">
                                        <td class="col-md-4" style="width: 100%; height: 175px;">${data.KeteranganKerja}</td>
                                        <td class="col-md-4" style="width: 100%; height: 175px;">${data.Perbaikan}</td>
                                        <td class="col-md-4" style="width: 100%; height: 175px;">${data.Keterangan}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="table-container mt-2">
                            <table class="table-print w-100">
                                <thead>
                                    <tr class="text-center">
                                        <th class="col-md-6"><strong>Gambar 1</strong></th>
                                        <th class="col-md-6"><strong>Gambar 2</strong></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="col-md-6"><img src="" id="hasil_gambar1" alt="" style="width: 100%; height: 200px; object-fit: cover;" /></td>
                                        <td class="col-md-6"><img src="" id="hasil_gambar2" alt="" style="width: 100%; height: 200px; object-fit: cover;" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row mt-5 print-footer justify-content-between">
                            <div class="col-3">
                                <strong>Pelaksana,</strong>
                                <div class="data">(${selectedData.Nama})</div>
                            </div>
                            <div class="col-3">
                                <strong>Penanggung jawab,</strong>
                                <div class="data">(Khelfin W)</div>
                            </div>
                            <div class="col-3">
                                <strong>Serah Terima,</strong>
                                <div class="data"></div>
                            </div>
                        </div>
                    </div>
                    `;
                    // $("#previewData").empty();
                    $("#previewData").append(htmlCode);
                },
                error: function (xhr, status, error) {
                    console.error("Error fetching data:", error);
                },
            });
        } else {
            $("#previewData").empty();
        }
    });
});
