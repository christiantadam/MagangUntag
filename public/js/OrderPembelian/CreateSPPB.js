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
    alasan_reject.value = "";
}

function submit(nomor, qtydelay) {
    $.ajax({
        url: "/openFormCreateSPPB/create/Submit",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            noTrans: nomor,
            QtyDelay: qtydelay,
        },
        success: function (response) {},
        error: function (error) {
            console.error("Error Send Data:", error);
        },
    });
}

function LoadPermohonan(data) {
    $("#table_CreatePurchaseOrder").DataTable().destroy();
    let table = $("#table_CreatePurchaseOrder").DataTable({
        responsive: true,
        scrollX: true,
        searching: false,
        scrollY: "150px",
        paging: false,
        data: data,
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
                data: "NmUser",
            },
            {
                data: "Qty",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0.00");
                },
            },
            {
                data: "Nama_satuan",
            },
            {
                data: "QtyCancel",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0.00");
                },
            },
            {
                data: "PriceUnit",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "PriceSub",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "PPN",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "PriceExt",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "Kurs",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0.0000");
                },
            },
            {
                data: "PriceUnitIDR",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "PriceSubIDR",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "PriceUnitIDR_PPN",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "PriceExtIDR",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "Disc",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0.00");
                },
            },
            {
                data: "harga_disc",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "DiscIDR",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
        ],
        rowCallback: function (row, data) {
            $(row).on("dblclick", function (event) {
                clearData();
                no_po.value = data.No_trans;
                kode_barang.value = data.Kd_brg;
                nama_barang.value = data.NAMA_BRG;
                sub_kategori.value = data.nama_sub_kategori;
                qty_order.value = parseFloat(data.Qty).toFixed(2);
                keterangan_order.value = data.keterangan;
                keterangan_internal.value = data.Ket_Internal;
                qty_delay.value = parseFloat(data.QtyCancel).toFixed(2);
                harga_unit.value = numeral(parseFloat(data.PriceUnit)).format(
                    "0,0.0000"
                );
                idr_unit.value = numeral(parseFloat(data.PriceUnitIDR)).format(
                    "0,0.0000"
                );
                harga_sub_total.value = numeral(
                    parseFloat(data.PriceSub)
                ).format("0,0.0000");
                idr_sub_total.value = numeral(
                    parseFloat(data.PriceSubIDR)
                ).format("0,0.0000");
                harga_total.value = numeral(parseFloat(data.PriceExt)).format(
                    "0,0.0000"
                );
                idr_harga_total.value = numeral(
                    parseFloat(data.PriceExtIDR)
                ).format("0,0.0000");
                ppn.value = numeral(parseFloat(data.PPN)).format("0,0.0000");
                idr_ppn.value = numeral(parseFloat(data.PPN)).format(
                    "0,0.0000"
                );
                disc.value = numeral(parseFloat(data.Disc)).format("0,0.00");
                total_disc.value = numeral(parseFloat(data.harga_disc)).format(
                    "0,0.0000"
                );
                idr_total_disc.value = numeral(parseFloat(data.DiscIDR)).format(
                    "0,0.0000"
                );
                kurs.value = parseFloat(data.Currency).toFixed(4);
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
    table.on("dblclick", "tbody tr", (e) => {
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
}

paymentTerm_select.addEventListener("change", function (event) {
    if (paymentTerm_select.selectedIndex !== 0) {
        btn_post.disabled = false;
    } else {
        btn_post.disabled = true;
    }
});

btn_update.addEventListener("click", function (event) {
    const nomor = no_po.value;
    const qtydelay = qty_delay.value;
    if (
        qty_order.value == 0 &&
        (isNaN(parseFloat(disc.value)) || !isFinite(parseFloat(disc.value)))
    ) {
        alert(
            "Data Tidak Bisa DiUpdate Karena Qty Order = 0. Jika ingin Mengupdate Qty Order = 0 Maka Disc% Harus 0"
        );
    } else {
        $.ajax({
            url: "/openFormCreateSPPB/create/Update",
            type: "PUT",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            data: {
                No_PO: nomor_purchaseOrder.value,
                Qty: qty_order.value,
                QtyCancel: qty_delay.value,
                kurs: kurs.value,
                pUnit: numeral(harga_unit.value).value(),
                pSub: numeral(harga_sub_total.value).value(),
                idPPN: ppn_select.value,
                pPPN: numeral(ppn.value).value(),
                pTot: numeral(harga_total.value).value(),
                pIDRUnit: numeral(idr_unit.value).value(),
                pIDRSub: numeral(idr_sub_total.value).value(),
                pIDRPPN: numeral(idr_ppn.value).value(),
                pIDRTot: numeral(idr_harga_total.value).value(),
                persen: numeral(disc.value).value(),
                disc: numeral(total_disc.value).value(),
                discIDR: numeral(idr_total_disc.value).value(),
                noTrans: no_po.value,
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil DiUpdate!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                if (qtydelay > 0) {
                    submit(nomor, qtydelay);
                } else {
                }
                if (loadPermohonanData.length == 0) {
                    window.location.href = "/PurchaseOrder/create";
                } else {
                    clearData();
                    loadPermohonanData = response.data;
                    LoadPermohonan(loadPermohonanData);
                }
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
    }
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
            let noOrder = no_po.value;
            let objekDitemukan = loadPermohonanData.filter(
                (obj) => obj.No_trans !== noOrder
            );
            loadPermohonanData = objekDitemukan;
            if (loadPermohonanData.length == 0) {
                window.location.href = "/PurchaseOrder/create";
            } else {
                LoadPermohonan(loadPermohonanData);
                clearData();
            }
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
    if (loadPermohonanData.length == 0) {
        alert("Data Yang Akan Dipost Tidak Ada");
    } else {
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
    let No = 0;
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
                    <td sty><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">${
                        No + 1
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">${
                        item.Kd_brg
                    }</p></td>
                    <td><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">
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
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">${
                        !parseFloat(item.Qty)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.Qty).toLocaleString("en-US") +
                              ".00"
                            : parseFloat(item.Qty).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">${item.Nama_satuan.trim()}</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">${
                        !parseFloat(item.PriceUnit)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.PriceUnit).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.PriceUnit).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">${
                        !parseFloat(
                            item.harga_disc == null ? 0 : item.harga_disc
                        )
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(
                                  item.harga_disc == null ? 0 : item.harga_disc
                              ).toLocaleString("en-US") + ".00"
                            : parseFloat(
                                  item.harga_disc == null ? 0 : item.harga_disc
                              ).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica;">${
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
            No += 1;
        });

        const print = `
        <div style="width: 20.5cm; height: 27.94cm; padding: 30px 10px 0px 10px; margin: 0; background: #FFFFFF; box-sizing: border-box; page-break-after: ${
            chunkIndex < chunkedData.length - 1 ? `always` : `avoid`
        };">
            <div style="width: 100%; height : 15%;">
            </div>
            <main style="width: 100%; height : 70%;">
                <div style="width: 100%; height: auto; display: flex;">
                    <div style="width: 50%; height: auto; margin-right: 20px;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Issued To:</h1>
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].NM_SUP
                        }</p>
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].ALAMAT1
                        }</p>
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].KOTA1
                        }</p>
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].NEGARA1
                        }</p>
                        <br>
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin-top: 10px; margin-bottom: 2px;">Delivery To:</h1>
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">PT. Kerta Rajasa Raya</p>
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
                    </div>
                    <div style="width: 50%; height: auto; margin-left: 20px;">
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Number</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].NO_PO
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Date</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].Tgl_sppb
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Delivery Date</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].Est_Date
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Payment Term</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].Pembayaran
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Divisi</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${data.printHeader[0].Kd_div.trim()} - ${data.printHeader[0].NM_DIV.trim()}</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Requester</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].Nama
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Page</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: Page ${
                                    Page + 1
                                } of ${chunkedData.length}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details" style="margin-top: 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">No.</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Item Number</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Description</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Qty</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Unit</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Unit Price IDR</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Disc. IDR</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">Amount IDR</h1></th>
                            </tr>
                        </thead>
                        <tbody style="border-top: 1px solid black; border-bottom: 1px solid black;">
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 50%;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold;margin-top:50px">Document Copy of ${
                            data.print[0].JumCetak
                        }</h1>
                    </div>
                    <div style="width: 50%;">
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; margin-right: 3rem;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Sub Total</h1>
                            </div>
                            <div style="width: 70%; border-bottom: 1px solid; text-align: right;">
                                <p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica; margin: 2px 0;">${sumAmountFix}</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; margin-right: 3rem;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">VAT</h1>
                            </div>
                            <div style="width: 70%; border-bottom: 1px solid; text-align: right;">
                                <p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica; margin: 2px 0;">${ppnFix}</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; margin-right: 3rem;">
                                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Total</h1>
                            </div>
                            <div style="width: 70%; border-bottom: 1px solid; text-align: right;">
                                <p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
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
    console.log(printContentDiv);
    const printWindow = window.open("", "_blank");
    const style = document.createElement("style");
    style.textContent = `
    body {
        margin: 0;
        padding: 0;
    }
    `;
    window.location.href = "/PurchaseOrder/create";
    printWindow.document.head.appendChild(style);
    printWindow.document.body.appendChild(printContentDiv);
    printWindow.print();
}

$(document).ready(function () {
    LoadPermohonan(loadPermohonanData);
    // console.log(loadPermohonanData);
    // console.log(loadHeaderData);

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
        // updateSubTotal();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        // updateDisc();
        updateTotalDisc();
        updateIDRDiscTotal();
        // updateIDRDisc();
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
        // updateSubTotal();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        // updateDisc();
        updateTotalDisc();
        updateIDRDiscTotal();
        // updateIDRDisc();
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
        // updateSubTotal();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        // updateIDRDisc();
        updateTotalDisc();
        updateIDRDiscTotal();
        // updateDisc();
    });

    harga_unit.addEventListener("input", function (event) {
        setInputFilter(
            document.getElementById("harga_unit"),
            function (value) {
                return /^-?\d*([.,]\d*)*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
        updateIdrUnit();
        // updateSubTotal();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        // updateDisc();
        updateTotalDisc();
        updateIDRDiscTotal();
        // updateIDRDisc();
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
                return /^-?\d*([.,]\d*)*$/.test(value);
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
    total_disc.addEventListener("input", function (event) {
        setInputFilter(
            document.getElementById("total_disc"),
            function (value) {
                return /^-?\d*([.,]\d*)*$/.test(value);
            },
            "Tidak boleh character, harus angka"
        );
        updateIdrUnit();
        updateSubTotalDisc();
        updateIDRSubTotal();
        updateIDRPPN();
        updatePPN();
        updateHargaTotal();
        updateIDRHargaTotal();
        updateTotalDisc();
        updateIDRDiscTotal();
    });

    qty_order.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            qty_order.value = parseFloat(qty_order.value).toFixed(2);
            qty_delay.focus();
            qty_delay.select();
        }
    });
    qty_delay.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            qty_delay.value = parseFloat(qty_delay.value).toFixed(2);
            kurs.focus();
            kurs.select();
        }
    });
    kurs.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            kurs.value = parseFloat(kurs.value).toFixed(4);
            disc.focus();
            disc.select();
        }
    });

    harga_unit.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const data = numeral(harga_unit.value).value();
            harga_unit.value = numeral(data).format("0,0.0000");
            ppn_select.focus();
        }
    });

    disc.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            disc.value = numeral(disc.value).format("0,0.00");
            total_disc.focus();
            total_disc.select();
        }
    });

    total_disc.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const data = numeral(total_disc.value).value();
            total_disc.value = numeral(data).format("0,0.0000");
            harga_unit.focus();
            harga_unit.select();
        }
    });
});

function updateIdrUnit() {
    let kurs = numeral(document.getElementById("kurs").value).value();
    let hargaUnit = numeral(
        document.getElementById("harga_unit").value
    ).value();
    if (!isNaN(kurs) && !isNaN(hargaUnit)) {
        let idrUnitValue = hargaUnit * kurs;
        idr_unit.value = numeral(idrUnitValue).format("0,0.0000");
    }
}

function updateSubTotal() {
    let qty_order = numeral(document.getElementById("qty_order").value).value();
    let hargaUnit = numeral(
        document.getElementById("harga_unit").value
    ).value();
    let disc = numeral(document.getElementById("disc").value).value();
    if (!isNaN(qty_order) && !isNaN(hargaUnit) && !isNaN(disc)) {
        let SubTotalValue = hargaUnit * qty_order;
        let discount = (SubTotalValue * disc) / 100;
        let hargaSubTotal = SubTotalValue - discount;

        harga_sub_total.value = numeral(hargaSubTotal).format("0,0.0000");
    }
}

function updateIDRSubTotal() {
    let kurs = numeral(document.getElementById("kurs").value).value();
    let hargaSubTotal = numeral(
        document.getElementById("harga_sub_total").value
    ).value();

    if (!isNaN(kurs) && !isNaN(hargaSubTotal)) {
        let idrSubTotalValue = hargaSubTotal * kurs;
        idr_sub_total.value = numeral(idrSubTotalValue).format("0,0.0000");
    }
}

function updateSubTotalDisc() {
    let qty_order = numeral(document.getElementById("qty_order").value).value();
    let hargaUnit = numeral(
        document.getElementById("harga_unit").value
    ).value();
    let total_disc = numeral(
        document.getElementById("total_disc").value
    ).value();
    if (!isNaN(qty_order) && !isNaN(hargaUnit) && !isNaN(total_disc)) {
        let SubTotalValue = hargaUnit * qty_order;
        let hargaSubTotal = SubTotalValue - total_disc;
        harga_sub_total.value = numeral(hargaSubTotal).format("0,0.0000");
    }
}

function updatePPN() {
    let selectedPPN = numeral(
        ppn_select.options[ppn_select.selectedIndex].text
    ).value();
    let hargaSubTotal = numeral(
        document.getElementById("harga_sub_total").value
    ).value();
    if (!isNaN(selectedPPN) && !isNaN(hargaSubTotal)) {
        let jumPPN = (hargaSubTotal * selectedPPN) / 100;
        ppn.value = numeral(jumPPN).format("0,0.0000");
    }
}

function updateIDRPPN() {
    let selectedPPN = numeral(
        ppn_select.options[ppn_select.selectedIndex].text
    ).value();
    let hargaSubTotal = numeral(
        document.getElementById("harga_sub_total").value
    ).value();
    let kurs = numeral(document.getElementById("kurs").value).value();
    if (!isNaN(selectedPPN) && !isNaN(hargaSubTotal) && !isNaN(kurs)) {
        let jumPPN = (hargaSubTotal * selectedPPN) / 100;
        let idrPPNValue = jumPPN * kurs;
        idr_ppn.value = numeral(idrPPNValue).format("0,0.0000");
    }
}

function updateHargaTotal() {
    let ppn = numeral(document.getElementById("ppn").value).value();
    let hargaSubTotal = numeral(
        document.getElementById("harga_sub_total").value
    ).value();
    if (!isNaN(ppn) && !isNaN(hargaSubTotal)) {
        let hargaTotalValue = hargaSubTotal + ppn;
        harga_total.value = numeral(hargaTotalValue).format("0,0.0000");
    }
}

function updateIDRHargaTotal() {
    let kurs = numeral(document.getElementById("kurs").value).value();
    let hargaTotal = numeral(
        document.getElementById("harga_total").value
    ).value();
    if (!isNaN(kurs) && !isNaN(hargaTotal)) {
        let IDRHargaTotalValue = hargaTotal * kurs;
        idr_harga_total.value = numeral(IDRHargaTotalValue).format("0,0.0000");
    }
}

function updateDisc() {
    let qty_order = numeral(document.getElementById("qty_order").value).value();
    let hargaUnit = numeral(
        document.getElementById("harga_unit").value
    ).value();
    let disc = numeral(document.getElementById("disc").value).value();
    if (!isNaN(hargaUnit) && !isNaN(qty_order) && !isNaN(disc)) {
        let SubTotalValue = hargaUnit * qty_order;
        let discount = (SubTotalValue * disc) / 100;
        total_disc.value = numeral(discount).format("0,0.0000");
    }
}

function updateTotalDisc() {
    let qty_order = numeral(document.getElementById("qty_order").value).value();
    let hargaUnit = numeral(
        document.getElementById("harga_unit").value
    ).value();
    let total_disc = numeral(
        document.getElementById("total_disc").value
    ).value();
    if (!isNaN(hargaUnit) && !isNaN(qty_order) && !isNaN(total_disc)) {
        let SubTotalValue = hargaUnit * qty_order;
        let discount = (total_disc / SubTotalValue) * 100;
        disc.value = numeral(discount).format("0,0.00");
    }
}

function updateIDRDisc() {
    let qty_order = numeral(document.getElementById("qty_order").value).value();
    let hargaUnit = numeral(
        document.getElementById("harga_unit").value
    ).value();
    let disc = numeral(document.getElementById("disc").value).value();
    let kurs = numeral(document.getElementById("kurs").value).value();

    if (
        !isNaN(hargaUnit) &&
        !isNaN(qty_order) &&
        !isNaN(disc) &&
        !isNaN(kurs)
    ) {
        let SubTotalValue = hargaUnit * qty_order;
        let discount = (SubTotalValue * disc) / 100;
        let totalIDRDiscValue = discount * kurs;
        idr_total_disc.value = numeral(totalIDRDiscValue).format("0,0.0000");
    }
}

function updateIDRDiscTotal() {
    let total_disc = numeral(
        document.getElementById("total_disc").value
    ).value();
    let kurs = numeral(document.getElementById("kurs").value).value();

    if (!isNaN(total_disc) && !isNaN(kurs)) {
        let totalIDRDiscValue = total_disc * kurs;
        idr_total_disc.value = numeral(totalIDRDiscValue).format("0,0.0000");
    }
}
