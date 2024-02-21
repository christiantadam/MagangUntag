let formIsi = document.getElementById("formIsi");
let nomor_purchaseOrder = document.getElementById("nomor_purchaseOrder");
let supplier_select = document.getElementById("supplier_select");
let matauang_select = document.getElementById("matauang_select");
let paymentTerm_select = document.getElementById("paymentTerm_select");
let ppn_select = document.getElementById("ppn_select");
let ppn = document.getElementById("ppn");
let kurs = document.getElementById("kurs");
let harga_unit = document.getElementById("harga_unit");
let harga_sub_total = document.getElementById("harga_sub_total");
let idr_sub_total = document.getElementById("idr_sub_total");
let idr_ppn = document.getElementById("idr_ppn");
let harga_total = document.getElementById("harga_total");
let idr_harga_total = document.getElementById("idr_harga_total");
let qty_delay = document.getElementById("qty_delay");
let qty_order = document.getElementById("qty_order");
let keterangan_internal = document.getElementById("keterangan_internal");
let keterangan_order = document.getElementById("keterangan_order");
let sub_kategori = document.getElementById("sub_kategori");
let nama_barang = document.getElementById("nama_barang");
let kode_barang = document.getElementById("kode_barang");
let no_po = document.getElementById("no_po");
let idr_unit = document.getElementById("idr_unit");
let alasan_reject = document.getElementById("alasan_reject");
let tanggal_dibutuhkan = document.getElementById("tanggal_dibutuhkan");
let total_disc = document.getElementById("total_disc");
let disc = document.getElementById("disc");
let idr_total_disc = document.getElementById("idr_total_disc");
let btn_update = document.getElementById("btn_update");
let btn_reject = document.getElementById("btn_reject");
let btn_remove = document.getElementById("btn_remove");
let btn_post = document.getElementById("btn_post");

let jenisSupplier;
let fixValueQTYOrder;

let csrfToken = $('meta[name="csrf-token"]').attr("content");

let table_CreatePurchaseOrder = document.getElementById(
    "table_CreatePurchaseOrder"
);
let tanggal_mohonKirim = document.getElementById("tanggal_mohonKirim");
let tanggal_purchaseOrder = document.getElementById("tanggal_purchaseOrder");

tanggal_purchaseOrder.valueAsDate = new Date();
tanggal_mohonKirim.valueAsDate = new Date();
btn_update.disabled = true;
btn_remove.disabled = true;
btn_reject.disabled = true;
btn_post.disabled = true;

alasan_reject.addEventListener("change", function () {
    btn_reject.focus();
});
function clearData() {
    tanggal_purchaseOrder.valueAsDate = new Date();
    tanggal_mohonKirim.valueAsDate = new Date();
    no_po.value = "";
    kode_barang.value = "";
    nama_barang.value = "";
    sub_kategori.value = "";
    keterangan_order.value = "-";
    keterangan_internal.value = "-";
    qty_delay.value = 0;
    qty_order.value = 0;
    harga_unit.value = 0;
    idr_unit.value = 0;
    harga_sub_total.value = 0;
    idr_sub_total.value = 0;
    ppn_select.value = "";
    ppn.value = 0;
    idr_ppn.value = 0;
    harga_total.value = "";
    idr_harga_total.value = "";
    kurs.value = 1;
    disc.value = 0;
    total_disc.value = 0;
    idr_total_disc.value = 0;
    btn_update.disabled = true;
    btn_remove.disabled = true;
    btn_reject.disabled = true;
    btn_post.disabled = true;
    alasan_reject.value = "";
}

let table = $("#table_CreatePurchaseOrder").DataTable({
    responsive: true,
    data: loadPermohonanData,
    columns: [
        {
            data: "No_trans",
        },
        {
            data: "Kd_brg",
        },
        {
            data: "NAMA_BRG",
        },
        {
            data: "nama_sub_kategori",
        },
        {
            data: "KET",
        },
        {
            data: "Ket_Internal",
        },
        {
            data: "Qty",
        },
        {
            data: "Nama_satuan",
        },
        {
            data: "QtyCancel",
        },
        {
            data: "PriceUnit",
        },
        {
            data: "PriceSub",
        },
        {
            data: "PPN",
        },
        {
            data: "PriceExt",
        },
        {
            data: "Kurs",
        },
        {
            data: "PriceUnitIDR",
        },
        {
            data: "PriceSubIDR",
        },
        {
            data: "PriceUnitIDR_PPN",
        },
        {
            data: "PriceExtIDR",
        },
        {
            data: "Disc",
        },
        {
            data: "harga_disc",
        },
        {
            data: "DiscIDR",
        },
    ],
    rowCallback: function (row, data) {
        $(row).on("click", function (event) {
            clearData();
            no_po.value = data.No_trans;
            kode_barang.value = data.Kd_brg;
            nama_barang.value = data.NAMA_BRG;
            sub_kategori.value = data.nama_sub_kategori;
            qty_order.value = parseFloat(data.Qty);
            keterangan_order.value = data.keterangan;
            keterangan_internal.value = data.Ket_Internal;
            qty_delay.value = parseFloat(data.QtyCancel);
            harga_unit.value = parseFloat(data.PriceUnit);
            idr_unit.value = parseFloat(data.PriceUnitIDR);
            harga_sub_total.value = parseFloat(data.PriceSub);
            idr_sub_total.value = parseFloat(data.PriceSubIDR);
            harga_total.value = parseFloat(data.PriceExt);
            idr_harga_total.value = parseFloat(data.PriceExtIDR);
            ppn.value = parseFloat(data.PPN);
            idr_ppn.value = parseFloat(data.PPN);
            disc.value = parseFloat(data.Disc);
            total_disc.value = parseFloat(data.harga_disc);
            kurs.value = parseFloat(data.Currency);
            $("#ppn_select").val(data.IdPPN);
            fixValueQTYOrder = data.Qty;
            btn_update.disabled = false;
            btn_remove.disabled = false;

            alasan_reject.addEventListener("input", function (event) {
                if (alasan_reject.value.trim() !== "") {
                    btn_reject.disabled = false;
                } else {
                    btn_reject.disabled = true;
                }
            });
        });
    },
});
table.on("click", "tbody tr", (e) => {
    const classList = e.currentTarget.classList;

    if (classList.contains("selected")) {
        classList.remove("selected");
    } else {
        table
            .rows(".selected")
            .nodes()
            .each((row) => row.classList.remove("selected"));
        classList.add("selected");
    }
});

paymentTerm_select.addEventListener("change", function (event) {
    if (paymentTerm_select.selectedIndex !== 0) {
        btn_post.disabled = false;
    } else {
        btn_post.disabled = true;
    }
});

btn_update.addEventListener("click", function (event) {
    $.ajax({
        url: "/openFormCreateSPPB/create/Update",
        type: "PUT",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            Qty: qty_order.value,
            QtyCancel: qty_delay.value,
            kurs: kurs.value,
            pUnit: harga_unit.value,
            pSub: harga_sub_total.value,
            idPPN: ppn_select.value,
            pPPN: ppn.value,
            pTot: harga_total.value,
            pIDRUnit: idr_unit.value,
            pIDRSub: idr_sub_total.value,
            pIDRPPN: idr_ppn.valu,
            pIDRTot: idr_harga_total.value,
            persen: disc.value,
            disc: total_disc.value,
            discIDR: idr_total_disc.value,
            noTrans: no_po.value,
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiUpdate!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.log(response);
            clearData();
            location.reload(true);
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiUpdate!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error Send Data:", error);
        },
    });
});
btn_remove.addEventListener("click", function (event) {
    $.ajax({
        url: "/openFormCreateSPPB/create/Remove",
        type: "PUT",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            noTrans: no_po.value,
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiRemove!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.log(response);
            clearData();
            location.reload(true);
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiRemove!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error Send Data:", error);
        },
    });
});
btn_reject.addEventListener("click", function (event) {
    $.ajax({
        url: "/openFormCreateSPPB/create/Reject",
        type: "PUT",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            noTrans: no_po.value,
            alasan: alasan_reject.value,
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiReject!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.log(response);
            clearData();
            location.reload(true);
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiReject!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error Send Data:", error);
        },
    });
});
btn_post.addEventListener("click", function (event) {
    // print();
    for (let i = 0; i < loadPermohonanData.length; i++) {
        $.ajax({
            url: "/openFormCreateSPPB/create/Post",
            type: "PUT",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            data: {
                noTrans: loadPermohonanData[i].No_trans,
                mtUang: matauang_select.value,
                tglPO: tanggal_purchaseOrder.value,
                idpay: paymentTerm_select.value,
                Tgl_Dibutuhkan: tanggal_mohonKirim.value,
                idSup: supplier_select.value,
            },
            success: function (response) {
                // console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil DiPost!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                if (i == loadPermohonanData.length - 1) {
                    dataPrint();
                }
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil DiPost!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error Send Data:", error);
            },
        });
    }
});

function dataPrint() {
    $.ajax({
        url: "/openFormCreateSPPB/create/Print",
        type: "GET",
        data: {
            noPO: nomor_purchaseOrder.value.trim(),
        },
        success: function (response) {
            console.log(response);
            print(response);
        },
        error: function (error) {
            console.error("Error Get Data:", error);
        },
    });
}

function print(data) {
    const printContentDiv = document.createElement("div");
    let tableRows = "";

    let sumAmount = 0;
    let ppn = 0;
    let No = 0 ;
    let Page = 0;

    for (let i = 0; i < data.print.length; i++) {
        sumAmount += parseFloat(data.print[i].PriceSub);
        ppn += parseFloat(data.print[i].PPN);
    }

    const sumAmountFix = !sumAmount.toLocaleString("en-US").includes(".")
        ? sumAmount.toLocaleString("en-US") + ".00"
        : sumAmount.toLocaleString("en-US");

    const ppnFix = !ppn.toLocaleString("en-US").includes(".")
        ? ppn.toLocaleString("en-US") + ".00"
        : ppn.toLocaleString("en-US");

    const chunkSize = 5;
    const chunkedData = [];
    for (let i = 0; i < data.print.length; i += chunkSize) {
        chunkedData.push(data.print.slice(i, i + chunkSize));
    }

    chunkedData.forEach((chunk, chunkIndex) => {
        chunk.forEach((item, index) => {
            tableRows += `
                <tr>
                    <td sty><p style="line-height: 13.8px; font-size: 12px;">${No + 1}</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${item.Kd_brg}</p></td>
                    <td><p style="line-height: 13.8px; font-size: 12px;">
                    ${item.NAMA_BRG}
                    <br>
                    ${item.keterangan}
                    <br>
                    ${item.nama_kategori}
                    <br>
                    ${item.nama_sub_kategori}
                    <br>
                    ${item.No_trans}</p>
                    </td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${
                        !parseFloat(item.Qty)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.Qty).toLocaleString("en-US") +
                              ".00"
                            : parseFloat(item.Qty).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${item.Nama_satuan.trim()}</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${
                        !parseFloat(item.PriceUnit)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.PriceUnit).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.PriceUnit).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${
                        !parseFloat(item.disc == null ? 0 : item.disc)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(
                                  item.disc == null ? 0 : item.disc
                              ).toLocaleString("en-US") + ".00"
                            : parseFloat(
                                  item.disc == null ? 0 : item.disc
                              ).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${
                        !parseFloat(item.PriceSub)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.PriceSub).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.PriceSub).toLocaleString("en-US")
                    }</p></td>
                </tr>
            `;
            No += 1
        });

        const print = `
        <div style="width: 21.59cm; height: 27.94cm; padding: 0 0.5cm; margin: 0 auto; background: #FFFFFF; box-sizing: border-box; page-break-after: ${chunkIndex < chunkedData.length - 1 ? `always` : `avoid`};">
            <div style="width: 100%; height : 15%;">
            </div>
            <main style="width: 100%; height : 70%;">
                <div style="width: 100%; height: auto; display: flex;">
                    <div style="width: 50%; height: auto; margin-right: 20px;">
                        <h1 style="font-size: 12px; font-weight: bold; margin-bottom: 5px;">Issued To:</h1>
                        <p style="font-size: 12px; margin: 2px 0;">${
                            data.printHeader[0].NM_SUP
                        }</p>
                        <p style="font-size: 12px; margin: 2px 0;">${
                            data.printHeader[0].ALAMAT1
                        }</p>
                        <p style="font-size: 12px; margin: 2px 0;">${
                            data.printHeader[0].KOTA1
                        }</p>
                        <p style="font-size: 12px; margin: 2px 0;">${
                            data.printHeader[0].NEGARA1
                        }</p>
                        <br>
                        <h1 style="font-size: 12px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Delivery To:</h1>
                        <p style="font-size: 12px; margin: 2px 0;">PT. Kerta Rajasa Raya</p>
                        <p style="font-size: 12px; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                        <p style="font-size: 12px; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
                    </div>
                    <div style="width: 50%; height: auto; margin-left: 20px;">
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Number</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${
                                    data.printHeader[0].NO_PO
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Date</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${
                                    data.printHeader[0].Tgl_sppb
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Delivery Date</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${
                                    data.printHeader[0].Est_Date
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Payment Term</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${
                                    data.printHeader[0].Pembayaran
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Divisi</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${data.printHeader[0].Kd_div.trim()} - ${data.printHeader[0].NM_DIV.trim()}</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Requester</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${
                                    data.printHeader[0].Nama
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Page</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: Page ${Page + 1} of ${chunkedData.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details" style="margin-top: 20px;">
                    <table style="width: 100%;">
                        <thead>
                            <tr>
                                <th><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">No.</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Item Number</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Description</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Qty</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Unit</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Unit Price IDR</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Disc. IDR</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Amount IDR</h1></th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
                <div style="width: 100%; display: flex; margin-top: 20px;">
                    <div style="width: 50%;">
                        <h1 style="font-size: 12px; font-weight: bold;">Document Copy of ${
                            data.print[0].JumCetak
                        }</h1>
                    </div>
                    <div style="width: 50%;">
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; margin-right: 3rem;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Sub Total</h1>
                            </div>
                            <div style="width: 70%; border-bottom: 1px solid; text-align: right;">
                                <p style="line-height: 13.8px; font-size: 12px; margin: 2px 0;">${sumAmountFix}</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; margin-right: 3rem;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">VAT</h1>
                            </div>
                            <div style="width: 70%; border-bottom: 1px solid; text-align: right;">
                                <p style="line-height: 13.8px; font-size: 12px; margin: 2px 0;">${ppnFix}</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; margin-right: 3rem;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Total</h1>
                            </div>
                            <div style="width: 70%; border-bottom: 1px solid; text-align: right;">
                                <p style="line-height: 13.8px; font-size: 12px; margin: 2px 0;">${
                                    !(sumAmount + ppn)
                                        .toLocaleString("en-US")
                                        .includes(".")
                                        ? (sumAmount + ppn).toLocaleString(
                                              "en-US"
                                          ) + ".00"
                                        : (sumAmount + ppn).toLocaleString(
                                              "en-US"
                                          )
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `;

        printContentDiv.innerHTML += print;
        tableRows = "";
        Page += 1;
    });
    const printWindow = window.open("", "_blank");
    window.location.href = "/PurchaseOrder/create";
    printWindow.document.body.appendChild(printContentDiv);
    printWindow.print();
}

$(document).ready(function () {
    console.log(loadPermohonanData);
    $("#matauang_select").val(loadPermohonanData[0].ID_MATAUANG);
    $("#supplier_select option").each(function () {
        if ($(this).text() === loadPermohonanData[0].NM_SUP) {
            $("#supplier_select").val($(this).val());
            return false;
        }
    });
    qty_delay.addEventListener("input", function (event) {
        let qtyDelay = parseFloat(fixValueQTYOrder - qty_delay.value);

        setInputFilter(
            document.getElementById("qty_delay"),
            function (value) {
                return (
                    /^-?\d*[.,]?\d*$$/.test(value) &&
                    (value === "" || parseFloat(value) <= fixValueQTYOrder)
                );
            },
            `Tidak boleh ketik character dan angka dibawah 0, harus angka diatas 0 dan tidak boleh lebih dari angka awal`
        );
        if (qtyDelay <= fixValueQTYOrder && qtyDelay >= 0) {
            qty_order.value = qtyDelay.toFixed(2);
        }
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateDisc();
        updateIDRDisc();
    });

    qty_order.addEventListener("input", function (event) {
        let qtyOrder = parseFloat(fixValueQTYOrder - qty_order.value);
        setInputFilter(
            document.getElementById("qty_order"),
            function (value) {
                return (
                    /^-?\d*[.,]?\d*$/.test(value) &&
                    (value === "" || parseFloat(value) <= fixValueQTYOrder)
                );
            },
            `Tidak boleh ketik character dan angka dibawah 0, harus angka diatas 0 dan tidak boleh lebih dari angka awal`
        );
        if (qtyOrder <= fixValueQTYOrder && qtyOrder >= 0) {
            qty_delay.value = qtyOrder.toFixed(2);
        }
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateDisc();
        updateIDRDisc();
    });

    kurs.addEventListener("input", function (event) {
        setInputFilter(
            document.getElementById("kurs"),
            function (value) {
                return /^-?\d*[.,]?\d*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateIDRDisc();
        updateDisc();
    });

    harga_unit.addEventListener("input", function (event) {
        setInputFilter(
            document.getElementById("harga_unit"),
            function (value) {
                return /^-?\d*[.,]?\d*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateDisc();
        updateIDRDisc();
    });

    ppn_select.addEventListener("change", function (event) {
        updatePPN();
        updateIDRPPN();
        updateHargaTotal();
        updateIDRHargaTotal();
    });
    disc.addEventListener("input", function (event) {
        setInputFilter(
            document.getElementById("disc"),
            function (value) {
                return /^-?\d*[.,]?\d*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
        updateIdrUnit();
        updateSubTotal();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateDisc();
        updateIDRDisc();
    });
});

function updateIdrUnit() {
    let kurs = parseFloat(document.getElementById("kurs").value);
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    if (!isNaN(kurs) && !isNaN(hargaUnit)) {
        let idrUnitValue = hargaUnit * kurs;
        idr_unit.value = idrUnitValue;
    }
}

function updateSubTotal() {
    let qty_order = parseFloat(document.getElementById("qty_order").value);
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    let disc = parseFloat(document.getElementById("disc").value);
    if (!isNaN(qty_order) && !isNaN(hargaUnit) && !isNaN(disc)) {
        let SubTotalValue = hargaUnit * qty_order;
        let discount = (SubTotalValue * disc) / 100;
        let hargaSubTotal = SubTotalValue - discount;

        harga_sub_total.value = hargaSubTotal;
    }
}

function updateIDRSubTotal() {
    let kurs = parseFloat(document.getElementById("kurs").value);
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );

    if (!isNaN(kurs) && !isNaN(hargaSubTotal)) {
        let idrSubTotalValue = hargaSubTotal * kurs;
        idr_sub_total.value = idrSubTotalValue;
    }
}

function updatePPN() {
    let selectedPPN = parseFloat(
        ppn_select.options[ppn_select.selectedIndex].text
    );
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );
    if (!isNaN(selectedPPN) && !isNaN(hargaSubTotal)) {
        let jumPPN = (hargaSubTotal * selectedPPN) / 100;
        ppn.value = jumPPN;
    }
}
function updateIDRPPN() {
    let selectedPPN = parseFloat(
        ppn_select.options[ppn_select.selectedIndex].text
    );
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );
    let kurs = parseFloat(document.getElementById("kurs").value);
    if (!isNaN(selectedPPN) && !isNaN(hargaSubTotal) && !isNaN(kurs)) {
        let jumPPN = (hargaSubTotal * selectedPPN) / 100;
        let idrPPNValue = jumPPN * kurs;
        idr_ppn.value = idrPPNValue;
    }
}

function updateHargaTotal() {
    let ppn = parseFloat(document.getElementById("ppn").value);
    let hargaSubTotal = parseFloat(
        document.getElementById("harga_sub_total").value
    );
    if (!isNaN(ppn) && !isNaN(hargaSubTotal)) {
        let hargaTotalValue = hargaSubTotal + ppn;
        harga_total.value = hargaTotalValue;
    }
}

function updateIDRHargaTotal() {
    let kurs = parseFloat(document.getElementById("kurs").value);
    let hargaTotal = parseFloat(document.getElementById("harga_total").value);
    if (!isNaN(kurs) && !isNaN(hargaTotal)) {
        let IDRHargaTotalValue = hargaTotal * kurs;
        idr_harga_total.value = IDRHargaTotalValue;
    }
}

function updateDisc() {
    let qty_order = parseFloat(document.getElementById("qty_order").value);
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    let disc = parseFloat(document.getElementById("disc").value);
    if (!isNaN(hargaUnit) && !isNaN(qty_order) && !isNaN(disc)) {
        let SubTotalValue = hargaUnit * qty_order;
        let discount = (SubTotalValue * disc) / 100;
        total_disc.value = discount;
    }
}

function updateIDRDisc() {
    let qty_order = parseFloat(document.getElementById("qty_order").value);
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    let disc = parseFloat(document.getElementById("disc").value);
    let kurs = parseFloat(document.getElementById("kurs").value);

    if (
        !isNaN(hargaUnit) &&
        !isNaN(qty_order) &&
        !isNaN(disc) &&
        !isNaN(kurs)
    ) {
        let SubTotalValue = hargaUnit * qty_order;
        let discount = (SubTotalValue * disc) / 100;
        let totalIDRDiscValue = discount * kurs;
        console.log(totalIDRDiscValue);

        idr_total_disc.value = totalIDRDiscValue;
    }
}
