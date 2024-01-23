$(document).ready(function () {
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
                        '<input type="checkbox" class="checkboxpanel" value="' +
                        data +
                        '">'
                    );
                },
            },
            {
                data: "Tanggal",
                render: function (data, type, full, meta) {
                    var date = new Date(data).toISOString().split("T")[0];
                    return date;
                },
            },
            { data: "NoMesin" },
            {
                data: "JamAwalProduksi",
                render: function (data, type, full, meta) {
                    var date = new Date(data);
                    var hours = date.getHours().toString().padStart(2, "0");
                    var minutes = date.getMinutes().toString().padStart(2, "0");
                    return hours + ":" + minutes;
                },
            },
            {
                data: "OperationHour",
                // render: function (data, type, full, meta) {
                //     var date = new Date(data);
                //     var hours = date.getHours().toString().padStart(2, "0");
                //     var minutes = date.getMinutes().toString().padStart(2, "0");
                //     return hours + ":" + minutes;
                // },
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
});
