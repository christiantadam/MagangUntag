let bet1 = document.getElementById("betwendate1");
let bet2 = document.getElementById("betwendate2");
let no = document.getElementById("no_po");
let redisplayButton = document.getElementById("redisplayButton");

bet1.addEventListener('change', function () {});
bet2.addEventListener('change', function () {});

$(document).ready(function () {
    // var dataTable = $("#tabeldata").dataTable({
    //     serverSide: true,
    //     ajax: {
    //         url: "/GETPurchaseOrder",
    //         type: "GET",
    //         data: function (p) {
    //             p.date1 = $("#betwendate2").val();
    //             p.date2 = $("#betwendate2").val();
    //             p.nopo = $("#no_po").val();
    //         },
    //     },
    //     columns: [
    //         { data: "NO_PO" }
    //     ]
    // });

    // $("#refreshButton").click(function () {
    //     dataTable.ajax.reload();
    // });

    redisplayButton.addEventListener("click", function (event) {
        if (radioButtonIsSelected()) {
            let radioButtonChecked = radioButtonIsSelected();
            let value = getSelectedDateRange();
            console.log(value);
            if (typeof value === 'object') {
                redisplay(value.startDate, value.endDate, null);
            } else {
                redisplay(null, null, value);
            }
        }
    });

    function getSelectedDateRange() {
        let radioButtons = document.getElementsByName("radiobutton");

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return radioButtons[i].value === "nomor_po" ? no.value : { startDate: bet1.value, endDate: bet2.value };
            }
        }
    }

    function radioButtonIsSelected() {
        let radioButtons = document.getElementsByName("radiobutton");

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return radioButtons[i].value;
            }
        }
        return false;
    }

    function redisplay(MinDate, MaxDate, noPO) {
        $.ajax({
            method: "GET",
            url: "/GETPurchaseOrder",
            data: {
                MinDate: MinDate,
                MaxDate: MaxDate,
                noPO: noPO,
            },
            success: function (response) {
                console.log('Data successfully sent to the server');
                console.log('Server response:', response);
                responseData(response);
                // var data = response;

                // $("table tbody").empty();

                // $.each(data, function (index, row) {

                //     $("table tbody").append(
                //         "<tr>" +
                //             "<td>" +
                //             row.NO_PO +
                //             "</td>" +
                //             // "<td>" +
                //             // row.NamaMesin +
                //             // "</td>" +
                //             // "<td>" +
                //             // row.JamOperasi +
                //             // "</td>" +
                //             // "<td>" +
                //             // row.NamaPart +
                //             // "</td>" +
                //             // "<td>" +
                //             // row.Keterangan +
                //             // "</td>" +
                //             // "<td>" +
                //             // row.Teknisi +
                //             // "</td>" +
                //             "</tr>"
                //     );
                // });

            },
            error: function (error) {
                console.error('Error sending data to the server:', error);
            },
        });
    }
});

function responseData (datas) {
    let tabelData = $('#tabelchelsy').DataTable();
    tabelData.clear();
    datas.forEach(function (data) {
        tabelData.row.add([data.NO_PO, data.Status, data.Tgl_sppb, data.Kd_div, data.Nama, data.No_BTTB]).draw();
    });
}