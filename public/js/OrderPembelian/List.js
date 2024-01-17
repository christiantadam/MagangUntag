<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

    $(document).ready(function () {
        function redisplayData() {
            // Mendapatkan nilai input Nomor PO
            var nomorPoValue = $("#nomor_po_input").val();

            // Menyiapkan data yang akan dikirimkan ke server
            var formData = {
                radio_nomor_po: nomorPoValue,
            };

            $.ajax({
                type: "POST", // Metode HTTP
                url: "/PurchaseOrder",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },

                data: formData,
                success: function (response) {
                    console.log('Data successfully sent to the server');
                    console.log('Server response:', response);
                },
                error: function (error) {
                    console.error('Error sending data to the server:', error);
                }
            });
        }

        // Event listener untuk tombol
        $("#tombol_redisplay").on("click", function () {
            redisplayData();
        });
    });
