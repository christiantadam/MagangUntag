let bet1 = document.getElementById("betwendate1");
let bet2 = document.getElementById("betwendate2");
let no = document.getElementById("no_po");
let redisplayButton = document.getElementById("redisplayButton");


bet1.valueAsDate = new Date()
bet2.valueAsDate = new Date()

let tabelData = $("#tabelchelsy").DataTable({
    searching: false,
    scrollY: "400px",
    paging: false,
});

$(document).ready(function () {
    tabelData.on("click","tbody tr", function (event) {
        const classList = event.currentTarget.classList;

        if (classList.contains("selected")) {
            const data = tabelData.row(event.currentTarget).data();
                const url =
                    "/OpenReviewPO" +
                    "?No_PO=" +
                    data[0]
                window.location.href = url;
        } else {
            tabelData
                .rows(".selected")
                .nodes()
                .each((row) => row.classList.remove("selected"));
            classList.add("selected");
        }
    });
    bet1.addEventListener("keypress", function(event){
        if (event.key === "Enter") {
            bet2.focus();
        }
    })
    bet2.addEventListener("keypress", function(event){
        if (event.key === "Enter") {
            redisplayButton.focus();
        }
    })
    no.addEventListener("keypress", function(event){
        if (event.key === "Enter") {
            redisplayButton.focus();
        }
    })
    redisplayButton.addEventListener("click", function (event) {
        if (radioButtonIsSelected()) {
            let radioButtonChecked = radioButtonIsSelected();
            let value = getSelectedDateRange();
            console.log(value);
            if (typeof value === 'object') {
                redisplay(value.startDate, value.endDate, null);
            } else {
                display(value);
            }
        }
    });

    function getSelectedDateRange() {
        let radioButtons = document.getElementsByName("radiobutton");
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return radioButtons[i].value === "nomor_po" ? no.value.trim() : { startDate: bet1.value, endDate: bet2.value };
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
            },
            error: function (error) {
                console.error('Error sending data to the server:', error);
            },
        });
    }
});


function display(noPO) {
    $.ajax({
        method: "GET",
        url: "/GETOrder",
        data: {
            noPO: noPO,
        },
        success: function (response) {
            console.log('Data successfully sent to the server');
            console.log('Server response:', response);
            responseData(response);
        },
        error: function (error) {
            console.error('Error sending data to the server:', error);
        },
    });
}

function responseData (datas) {
    tabelData.clear().draw();
    datas.forEach(function (data) {
        tabelData.row.add([data.NO_PO, data.Status, data.Tgl_sppb, data.Kd_div, data.Nama, data.No_BTTB]).draw();
    });
}
