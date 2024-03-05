let nomor_purchaseOrder = document.getElementById("nomor_purchaseOrder");
let supplier_select = document.getElementById("supplier_select");
let matauang_select = document.getElementById("matauang_select");
let paymentTerm_select = document.getElementById("paymentTerm_select");
let btn_post = document.getElementById("btn_post");

let csrfToken = $('meta[name="csrf-token"]').attr("content");

let tanggal_mohonKirim = document.getElementById("tanggal_mohonKirim");
let tanggal_purchaseOrder = document.getElementById("tanggal_purchaseOrder");

tanggal_purchaseOrder.valueAsDate = new Date();
tanggal_mohonKirim.valueAsDate = new Date();

function LoadPermohonan(data) {
    $("#table_CreatePurchaseOrder").DataTable().destroy();
    let table = $("#table_CreatePurchaseOrder").DataTable({
        responsive: true,
        scrollX: true,
        searching: false,
        scrollY: "200px",
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
                data: "DiscHarga",
            },
            {
                data: "DiscIDR",
            },
        ],
    });
}

btn_post.addEventListener("click", function (event) {
    if (loadPermohonanData.length == 0) {
        alert("Data Yang Akan Dipost Tidak Ada");
    } else {
        for (let i = 0; i < loadPermohonanData.length; i++) {
            $.ajax({
                url: "/OpenReviewPO/Print",
                type: "PUT",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                data: {
                    NoPO: nomor_purchaseOrder.value.trim(),
                    tglPO: tanggal_purchaseOrder.value,
                    Tgl_Dibutuhkan: tanggal_mohonKirim.value,
                },
                success: function (response) {
                    console.log(response);
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
                    <td sty><p style="line-height: 13.8px; font-size: 12px;">${
                        No + 1
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${
                        item.Kd_brg
                    }</p></td>
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
            No += 1;
        });

        const print = `
        <div style="width: 21.59cm; height: 27.94cm; padding: 0 0.5cm; margin: 0 auto; background: #FFFFFF; box-sizing: border-box; page-break-after: ${
            chunkIndex < chunkedData.length - 1 ? `always` : `avoid`
        };">
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
                                <p style="font-size: 12px; margin: 2px 0;">: Page ${
                                    Page + 1
                                } of ${chunkedData.length}</p>
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
    window.location.href = "/PurchaseOrder";
    printWindow.document.body.appendChild(printContentDiv);
    printWindow.print();
}

$(document).ready(function () {
    LoadPermohonan(loadPermohonanData);
    supplier_select.value = loadHeaderData[0].NM_SUP
    paymentTerm_select.value = loadHeaderData[0].Pembayaran
    matauang_select.value = loadHeaderData[0].Curr
    console.log(loadHeaderData)
});
