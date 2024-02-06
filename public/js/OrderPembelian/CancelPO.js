let suplier = document.getElementById("select_supplier");
let po = document.getElementById("select_noPO");

suplier.addEventListener("change", function (event) {
    po.selectedIndex = 0;
    clearOptions(po);

    if (suplier.selectedIndex != 0) {
        let idSup = suplier.value;
        $.ajax({
            url: "/PurchaseOrder/Cancel",
            type: "GET",
            data: {
                idSup: idSup,
            },
            success: function (response) {
                if (response.length != 0) {
                    response.forEach(function (data) {
                        let option = document.createElement("option");
                        option.value = data.IdObjek;
                        option.text = data.NamaObjek;
                        po.add(option);
                    });
                } else {
                    alert(
                        "Kode Barang Belum di Maintenance Type Pada Divisi Tersebut !"
                    );
                }
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });
    }
});
