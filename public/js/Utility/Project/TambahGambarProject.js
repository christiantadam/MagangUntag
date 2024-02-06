var bulan = document.getElementById("bulan");
var tahun = document.getElementById("tahun");

$(document).ready(function () {
    var timeRenderer = function (data, type, full, meta) {
        var date = new Date(data);
        var hours = date.getHours().toString().padStart(2, "0");
        var minutes = date.getMinutes().toString().padStart(2, "0");
        return hours + ":" + minutes;
    };

    var dataTable = $("#tabel_gambar_project").DataTable({
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
            { data: "Keterangan" },
            { data: "UserId" },
        ],
    });
    $("#refreshButton").click(function () {
        dataTable.ajax.reload();
        console.log(dataTable);
    });
});
