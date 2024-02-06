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
                    var date = new Date(data + "Z").toLocaleDateString();
                    return date;
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

    // Event listener for checkbox changes
    $("tbody").on("click", ".checkbox_project", function () {
        if ($(this).prop("checked")) {
            var id = $(this).val();

            $.ajax({
                url: "/getDataProjectId",
                type: "GET",
                data: { id: id },
                success: function (data) {
                    // $("#previewData").empty();
                    $("#previewData").append(
                        "<style>" +
                            "@media print {" +
                            "  body * {" +
                            "    visibility: hidden;" +
                            "  }" +
                            "  #previewData, #previewData * {" +
                            "    visibility: visible;" +
                            "  }" +
                            "  #previewData {" +
                            "    position: absolute;" +
                            "    left: 0;" +
                            "    top: 0;" +
                            "  }" +
                            "}" +
                            "</style>" +
                            '<div class="preview-item border p-10 mb-4 rounded">' +
                            '<h1 class="mb-4 text-center">Serah Terima Permintaan Jasa Teknik</h1>' +
                            '<h1 class="mb-4 text-center">PT. KERTARAJASA RAYA</h1>' +
                            '<h3 class="mb-5 text-center">JL. Raya Tropodo No.1 Waru - SIDOARJO</h3>' +
                            '<div class="row">' +
                            '<div class="col-md-6 mt-3">' +
                            '<p class="mb-2"><strong>Nama Mesin:</strong> ' +
                            data.NamaMesin +
                            "</p>" +
                            '<p class="mb-2"><strong>Merk Mesin:</strong> ' +
                            data.MerkMesin +
                            "</p>" +
                            '<p class="mb-2"><strong>Lokasi Mesin:</strong> ' +
                            data.LokasiMesin +
                            "</p>" +
                            "<p><strong>Tahun Pembuatan:</strong> " +
                            data.TahunPembuatan +
                            "</p>" +
                            "</div>" +
                            "</div>" +
                            '<table class="table">' +
                            "<thead>" +
                            '<tr class="text-center">' +
                            '<th class="col-md-4">' +
                            "<p ><strong>Keterangan Kerusakan</strong></p> " +
                            "</th>" +
                            '<th class="col-md-4">' +
                            "<p ><strong>Perbaikan</strong></p> " +
                            "</th>" +
                            '<th class="col-md-4">' +
                            "<p ><strong>Keterangan </strong></p> " +
                            "</th>" +
                            "<tr >" +
                            "</tr>" +
                            "</thead>" +
                            "<tbody>" +
                            '<tr class="text-left">' +
                            '<td class="col-md-4">' +
                            "<p>" +
                            data.KeteranganKerja +
                            "</p>" +
                            "</td>" +
                            '<td class="col-md-4">' +
                            "<p>" +
                            data.Perbaikan +
                            "</p>" +
                            "</td>" +
                            '<td class="col-md-4">' +
                            "<p>" +
                            data.Keterangan +
                            "</p>" +
                            "</td>" +
                            "</tr>" +
                            "</tbody>" +
                            '<tfoot colspan="3">' +
                            '<tr class="text-center">' +
                            '<th   colspan="2">' +
                            "<p ><strong> Gambar1 </strong></p> " +
                            "</th>" +
                            "<th >" +
                            "<p ><strong> Gambar2 </strong></p> " +
                            "</th>" +
                            "</tr>" +
                            "</tfoot>" +
                            "</table>" +
                            '<div class="row text-center" >' +
                            '<div class="col-md-4 mb-5">' +
                            "<p><strong>Pelaksana,</strong> " +
                            "</p>" +
                            "</div>" +
                            '<div class="col-md-4">' +
                            "<p><strong>Penanggung jawab,</strong> " +
                            "</p>" +
                            "</div>" +
                            '<div class="col-md-4">' +
                            "<p><strong>Serah Terima,</strong> " +
                            "</p>" +
                            "</div>" +
                            "</div>" +
                            '<div class="row text-center mt-5" >' +
                            '<div class="col-md-4 ">' +
                            data.UserId +
                            "</div>" +
                            '<div class="col-md-4">' +
                            "<p>(Khelfin W) " +
                            "</p>" +
                            "</div>" +
                            '<div class="col-md-4">' +
                            "<p> " +
                            "</p>" +
                            "</div>" +
                            "</div>"
                    );
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
