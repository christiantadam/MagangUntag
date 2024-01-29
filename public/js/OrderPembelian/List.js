$(document).ready(function () {
    let bet1 = document.getElementById("betwendate1");
    let bet2 = document.getElementById("betwendate2");
    let no = document.getElementById("no_po");
    let redisplayButton = document.getElementById("redisplayButton");

    // Function to enable/disable the redisplay button based on radio button selection
    function updateRedisplayButtonState() {
        let radioButtonChecked = radioButtonIsSelected();
        redisplayButton.disabled = !radioButtonChecked; // Disable if no radio button is selected
        redisplayButton.style.backgroundColor = radioButtonChecked ? "blue" : ""; // Set button color to blue if a radio button is selected

        // Additional logic to change color of other elements (replace with your actual element IDs or classes)
        let exampleElement = document.getElementById("exampleElementId");
        if (radioButtonChecked) {
            // Change color of other elements when the radio button is checked
            exampleElement.style.backgroundColor = "blue";
        } else {
            // Reset color when the radio button is unchecked
            exampleElement.style.backgroundColor = ""; // Set to the default color or remove it
        }
    }

    // Event listeners for input changes
    bet1.addEventListener('change', function () {
        updateRedisplayButtonState();
    });

    bet2.addEventListener('change', function () {
        updateRedisplayButtonState();
    });

    no.addEventListener("input", function () {
        updateRedisplayButtonState();
    });

    // Event listeners for radio button changes
    document.getElementsByName("radiobutton").forEach(function (radioButton) {
        radioButton.addEventListener("change", function () {
            updateRedisplayButtonState();
        });
    });

    // Event listener for redisplay button click
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

    // ... your existing code ...

    // Initial state setup
    updateRedisplayButtonState();
});
