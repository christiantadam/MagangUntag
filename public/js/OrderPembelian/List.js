// let betwendate1=document.getElementById(betwendate1)

const { functions } = require("lodash");

// let betwendate2=document.getElementById(betwendate2)
let bet1 = document.getElementById("betwendate1");
let bet2 = document.getElementById("betwendate2");
let no = document.getElementById("no_po");
let tabeldata = document.getElementById("tabeldata");
let redisplay = document.getElementById("redisplayButton");

bet1.addEventListener('change', function () {

})
bet2.addEventListener('chage', function () {

})
redisplay.addEventListener("click", function (event) {
    if (radioButtonIsSelected()) {
        let radioButtonChecked = radioButtonIsSelected();
        let value = getSelectedDateRange();
        alert (value)
        if (radioButtonChecked === "tanggal") {
            redisplayData(value, null, null);
        } else if (radioButtonChecked === "no_po") {
            redisplay(value, null, null);
        }
    }

    function getSelectedDateRange() {
        let radioButtons = document.getElementsByName("radiobutton");

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked == 1) {
                let inputText = no_po.value
                return inputText;

            }
            else if (radioButtons[i].checked == 0) {
                let startDate = bet1.value
                let endDate = bet2.value
                return { startDate, endDate };
            }
        }
    }
    return

    function radioButtonIsSelected() {
        let radioButtons = document.getElementsByName("radiobutton");

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return radioButtons[i].value;
            }
        }
        return false;
    }

    var nomorPoValue = $("#no_po").val();
    var betwenDate1Value = $("#betwendate1").val();
    var betwenDate2Value = $("#betwendate2").val();


    // Menyiapkan data yang akan dikirimkan ke server
    var formData = {
        no_po: nomorPoValue,
        betwendate1: betwenDate1Value,
        betwendate2: betwenDate2Value,
    };

    function redisplay (){
        $.ajax({
            method: "GET", // Metode HTTP
            url: "/GETPurchaseOrder",
            data: formData,
            success: function (response) {
                console.log('Data successfully sent to the server');
                console.log('Server response:', response);
            },
            error: function (error) {
                console.error('Error sending data to the server:', error);
            }
        });
    });

