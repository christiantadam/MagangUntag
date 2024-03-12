let supplier = document.getElementById("supplier");
let idSupplier = document.getElementById("idSupplier");
let po = document.getElementById("po");
let nobttb = document.getElementById("nobttb");
let nosj = document.getElementById("nosj");
let sppb = document.getElementById("sppb");
let registrasi = document.getElementById("registrasi");
let tglbttb = document.getElementById("tglbttb");
let nopib = document.getElementById("nopib");
let tglsppb = document.getElementById("tglsppb");
let tglregis = document.getElementById("tglregis");
let nopibext = document.getElementById("nopibext");
let skbm = document.getElementById("skbm");
let tglpib = document.getElementById("tglpib");
let tglskbm = document.getElementById("tglskbm");

let post_btn = document.getElementById("post_btn");

let csrfToken = $('meta[name="csrf-token"]').attr("content");
let tabelData = $("#tabelcreate").DataTable({
    responsive: true,
    scrollX: true,
    searching: false,
    scrollY: "200px",
    paging: false,
});
let data;

function dataPrint() {
    $.ajax({
        url: "/CCreateBTTB/Print",
        type: "GET",
        data: {
            No_BTTB: nobttb.value,
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

    let No = 0;
    let Page = 0;

    const chunkSize = 10;
    const chunkedData = [];
    for (let i = 0; i < data.print.length; i += chunkSize) {
        chunkedData.push(data.print.slice(i, i + chunkSize));
    }

    chunkedData.forEach((chunk, chunkIndex) => {
        chunk.forEach((item, index) => {
            tableRows += `
                <tr>
                    <td sty><p style="line-height: 13.8px; font-size: 14px; font-family: Helvetica; text-align: center">${
                        No + 1
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 14px; font-family: Helvetica;">${
                        item.Kd_brg
                    }</p></td>
                    <td><p style="line-height: 13.8px; font-size: 14px; font-family: Helvetica;">
                    ${item.NAMA_BRG}
                    </td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 14px; font-family: Helvetica;">${
                        !parseFloat(item.Qty)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.Qty).toLocaleString("en-US") +
                              ".00"
                            : parseFloat(item.Qty).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 14px; font-family: Helvetica;">${item.Nama_satuan.trim()}</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 14px; font-family: Helvetica;">${
                        !parseFloat(item.Qty_Terima)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.Qty_Terima).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.Qty_Terima).toLocaleString(
                                  "en-US"
                              )
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 14px; font-family: Helvetica;">${
                        !parseFloat(item.QtyRemain)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.QtyRemain).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.QtyRemain).toLocaleString("en-US")
                    }</p></td>
                </tr>
            `;
            No += 1;
        });

        const print = `
        <div style="width: 21.59cm; height: 27.94cm; padding: 0 0.5cm; margin: 0 auto; background: #FFFFFF; box-sizing: border-box; page-break-after: ${
            chunkIndex < chunkedData.length - 1 ? `always` : `avoid`
        };">
            <main style="width: 100%; height : 70%;">
                <div style="width: 100%; height: auto; display: flex;">
                    <div style="width: 50%; height: auto; margin-right: 20px;">
                        <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">PT. Kerta Rajasa Raya</h1>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
                        <br>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].NM_SUP
                        }</p>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].ALAMAT1
                        }</p>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].KOTA1
                        }</p>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">${
                            data.printHeader[0].NEGARA1
                        }</p>
                    </div>
                    <div style="width: 50%; height: auto; margin-left: 20px;">
                    <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Telephone</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: (031)8669595</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Fax</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: (031)8669989</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Giro</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: </p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Tax Registration Number</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: 01.140.897.8-641.000</p>
                            </div>
                        </div>
                        <br>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Page</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: Page ${
                                    Page + 1
                                } of ${chunkedData.length}</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Number</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].No_PO
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Date</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].Datang.split(" ")[0]
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Packing Slip</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].No_SuratJalan || ""
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin: 2px 0;">Internal Product Receipt</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">: ${
                                    data.printHeader[0].No_BTTB
                                }</p>
                            </div>
                        </div>
                        <br>
                        <h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Delivery To:</h1>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                        <p style="font-size: 14px; font-family: Helvetica; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
                    </div>
                </div>
                <div class="details" style="margin-top: 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th><h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; line-height: 13.8px">No.</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; line-height: 13.8px">Item Number</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; line-height: 13.8px">Description</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; line-height: 13.8px">Qty</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; line-height: 13.8px">Unit</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; line-height: 13.8px">Received</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 14px; font-family: Helvetica; font-weight: bold; line-height: 13.8px">Remaining</h1></th>
                            </tr>
                        </thead>
                        <tbody style="border-top: 1px dotted black; border-bottom: 1px dotted black;">
                            ${tableRows}
                        </tbody>
                    </table>
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

post_btn.addEventListener("click", function (event) {
    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            $.ajax({
                url: "/OpenReviewBTTB/Print",
                type: "PUT",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                data: {
                    tglDatang: tglbttb.value,
                    SJ: nosj.value.trim(),
                    NoPIB: nopib.value.trim(),
                    BTTB: No_BTTB,
                    NoPIBExt: nopibext.value.trim(),
                    TglPIB: tglpib.value,
                    NoSPPBBC: sppb.value.trim(),
                    TglSPPBBC: tglsppb.value,
                    NoSKBM: skbm.value.trim(),
                    TglSKBM: tglskbm.value,
                    NoReg: registrasi.value.trim(),
                    TglReg: tglregis.value,
                },
                success: function (response) {
                    console.log(response);
                    Swal.fire({
                        icon: "success",
                        title: "Data Berhasil DiPost!",
                        showConfirmButton: false,
                        timer: "2000",
                    });
                    if (i == data.length - 1) {
                        console.log("print");
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
    } else {
        alert("Data tidak ada");
    }
});

function responseData(datas) {
    data = datas;
    console.log(data);
    tabelData.clear().draw();
    data.forEach(function (data) {
        tabelData.row
            .add([
                data.No_trans,
                data.Kd_brg,
                data.NAMA_BRG,
                data.nama_sub_kategori,
                data.Nama_satuan,
                data.Qty || 0,
                data.Qty_Terima || 0,
                data.QtyRemain || 0,
                data.Id_MataUang_BC,
                data.Hrg_trm,
                data.Hrg_sub_bttb,
                data.hrg_disc,
                data.hrg_ppn,
                data.Hrg_tot_bttb,
                data.Kurs_Rp,
            ])
            .draw();
    });
}

$(document).ready(function () {
    responseData(loadPermohonanData);
    console.log(loadHeaderData);
    idSupplier.value = loadHeaderData[0].No_sup;
    supplier.value = loadHeaderData[0].NM_SUP;
    po.value = loadHeaderData[0].NO_PO;
    nosj.value = loadHeaderData[0].No_SuratJalan || "";
    sppb.value = loadHeaderData[0].NoSPPBBC || "";
    registrasi.value = loadHeaderData[0].NoReg || "";
    tglbttb.value = loadHeaderData[0].Datang.split(" ")[0];
    nopib.value = loadHeaderData[0].No_PIB || "";
    tglsppb.value = loadHeaderData[0].TglSPPBBC.split(" ")[0];
    tglregis.value = loadHeaderData[0].TglReg.split(" ")[0];
    nopibext.value = loadHeaderData[0].NoPIBExt || "";
    skbm.value = loadHeaderData[0].NoSKBM || "";
    tglpib.value = loadHeaderData[0].TglPIB.split(" ")[0];
    tglskbm.value = loadHeaderData[0].TglSKBM.split(" ")[0];
});
