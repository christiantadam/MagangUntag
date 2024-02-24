let supplier = document.getElementById("supplier");
let POdropdown = document.getElementById("po");
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
let kodehs = document.getElementById("kodehs");
let tglpib = document.getElementById("tglpib");
let tglskbm = document.getElementById("tglskbm");
let no_po = document.getElementById("no_po");
let kode_barang = document.getElementById("kode_barang");
let nama_barang = document.getElementById("nama_barang");
let sub_kategori = document.getElementById("sub_kategori");
let qty_ordered = document.getElementById("qty_ordered");
let qty_ship = document.getElementById("qty_ship");
let ordered_satuan = document.getElementById("ordered_satuan");
let qty_received = document.getElementById("qty_received");
let qty_remaining = document.getElementById("qty_remaining");
let kurs = document.getElementById("kurs");
let mata_uang = document.getElementById("mata_uang");
let disc = document.getElementById("disc");
let total_disc = document.getElementById("total_disc");
let idr_total_disc = document.getElementById("idr_total_disc");
let harga_unit = document.getElementById("harga_unit");
let idr_unit = document.getElementById("idr_unit");
let harga_sub_total = document.getElementById("harga_sub_total");
let idr_sub_total = document.getElementById("idr_sub_total");
let ppn_select = document.getElementById("ppn_select");
let ppn = document.getElementById("ppn");
let idr_ppn = document.getElementById("idr_ppn");
let harga_total = document.getElementById("harga_total");
let idr_harga_total = document.getElementById("idr_harga_total");

let post_btn = document.getElementById("post_btn");

let fixValueQTYOrder;
let fixValueQTYShip;
let fixValueQTYReceived;
let fixValueQTYRemain;

let csrfToken = $('meta[name="csrf-token"]').attr("content");
POdropdown.disabled = true;
let tabelData = $("#tabelcreate").DataTable();
let data;

function clearOptions(selectElement) {
    let length = selectElement.options.length;

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}

function clearHeader() {
    nobttb.value = "";
    nosj.value = "";
    sppb.value = "";
    registrasi.value = "";
    tglbttb.valueAsDate = new Date();
    nopib.value = "";
    tglsppb.valueAsDate = new Date();
    tglregis.valueAsDate = new Date();
    nopibext.value = "";
    skbm.value = "";
    kodehs.value = "";
    tglpib.valueAsDate = new Date();
    tglskbm.valueAsDate = new Date();
}

function clear() {
    no_po.value = "";
    kode_barang.value = "";
    nama_barang.value = "";
    sub_kategori.value = "";
    qty_ordered.value = "";
    ordered_satuan.value = "";
    qty_received.value = "";
    qty_remaining.value = "";
    kurs.value = "1";
    mata_uang.value = "IDR";
    disc.value = "0";
    total_disc.value = "0";
    idr_total_disc.value = "0";
    harga_unit.value = "0";
    idr_unit.value = "0";
    harga_sub_total.value = "0";
    idr_sub_total.value = "0";
    ppn_select.selectedIndex = 0;
    ppn.value = "0";
    idr_ppn.value = "0";
    harga_total.value = "";
    idr_harga_total.value = "";
    qty_ship.value = "";
}
function setStatusPO() {
    $.ajax({
        url: "/CCreateBTTB/SetStatusPO",
        type: "GET",
        data: {
            NoPO: POdropdown.value,
        },
        success: function (response) {
            console.log(response)
        },
        error: function (error) {
            console.error("Error Send Data:", error);
        },
    });
}

function post(bttb) {
    for (let i = 0; i < data.length; i++) {
        let noTrTmp = null;
        if (data[i].no_kat_utama == "009") {
            noTrTmp = 1;
        }
        $.ajax({
            url: "/CCreateBTTB/PostData",
            type: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            data: {
                tglDatang: tglbttb.value,
                Qty: data[i].Qty,
                qtyShip: data[i].QtyShipped || 0,
                qtyRcv: data[i].QtyRcv || 0,
                qtyremain: data[i].QtyRemain || 0,
                NoSatuan: data[i].NoSatuan,
                SJ: nosj.value,
                idSup: supplier.value,
                pUnit: data[i].PriceUnit,
                pPPN: data[i].PPN,
                noTrans: data[i].No_trans,
                kurs: data[i].Kurs,
                pIDRUnit: data[i].PriceUnitIDR,
                pIDRPPN: data[i].PriceUnitIDR_PPN,
                NoPIB: nopib.value,
                NoPO: POdropdown.value,
                BTTB: bttb,
                pSub: data[i].PriceSub,
                pIDRSub: data[i].PriceSubIDR,
                pTot: data[i].PriceExt,
                pIDRTot: data[i].PriceExtIDR,
                NoPIBExt: nopib.value,
                TglPIB: tglpib.value,
                NoSPPBBC: sppb.value,
                TglSPPBBC: tglsppb.value,
                NoSKBM: skbm.value,
                TglSKBM: tglskbm.value,
                NoReg: registrasi.value,
                TglReg: tglregis.value,
                idPPN: data[i].IdPPN,
                jumPPN: data[i].JumPPN,
                persen: data[i].disc,
                disc: data[i].Harga_disc,
                discIDR: data[i].DiscIDR,
                mtUang: data[i].ID_MATAUANG,
                KodeHS: kodehs.value,
                noTrTmp: noTrTmp,
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
                console.log('print')
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

    const chunkSize = 5;
    const chunkedData = [];
    for (let i = 0; i < data.print.length; i += chunkSize) {
        chunkedData.push(data.print.slice(i, i + chunkSize));
    }

    chunkedData.forEach((chunk, chunkIndex) => {
        chunk.forEach((item, index) => {
            tableRows += `
                <tr>
                    <td sty><p style="line-height: 13.8px; font-size: 12px; text-align: center">${
                        No + 1
                    }</p></td>
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${
                        item.Kd_brg
                    }</p></td>
                    <td><p style="line-height: 13.8px; font-size: 12px;">
                    ${item.NAMA_BRG}
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
                    <td style="text-align: center;"><p style="line-height: 13.8px; font-size: 12px;">${
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
            <div style="width: 100%; height : 15%;">
            </div>
            <main style="width: 100%; height : 70%;">
                <div style="width: 100%; height: auto; display: flex;">
                    <div style="width: 50%; height: auto; margin-right: 20px;">
                        <h1 style="font-size: 12px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">PT. Kerta Rajasa Raya</h1>
                        <p style="font-size: 12px; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                        <p style="font-size: 12px; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
                        <br>
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
                    </div>
                    <div style="width: 50%; height: auto; margin-left: 20px;">
                    <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Telephone</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: (031)8669595</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Fax</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: (031)8669989</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Giro</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: </p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Tax Registration Number</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: 01.140.897.8-641.000</p>
                            </div>
                        </div>
                        <br>
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
                                    data.printHeader[0].Datang
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Packing Slip</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${
                                    data.printHeader[0].No_SuratJalan
                                }</p>
                            </div>
                        </div>
                        <div style="width: 100%; display: flex;">
                            <div style="width: 30%; height: auto;">
                                <h1 style="font-size: 12px; font-weight: bold; margin: 2px 0;">Internal Product Receipt</h1>
                            </div>
                            <div style="width: 70%; height: auto;">
                                <p style="font-size: 12px; margin: 2px 0;">: ${
                                    data.printHeader[0].No_BTTB
                                }</p>
                            </div>
                        </div>
                        <br>
                        <h1 style="font-size: 12px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;">Delivery To:</h1>
                        <p style="font-size: 12px; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                        <p style="font-size: 12px; margin: 2px 0;">Waru - Sidoarjo 61256 East Java, Indonesia</p>
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
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Received</h1></th>
                                <th style="text-align: center;"><h1 style="font-size: 12px; font-weight: bold; line-height: 13.8px">Remaining</h1></th>
                            </tr>
                        </thead>
                        <tbody>
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
    // window.location.href = "/CreateBTTB";
    printWindow.document.body.appendChild(printContentDiv);
    printWindow.print();
}

post_btn.addEventListener("click", function (event) {
    if (data.length != 0) {
        $.ajax({
            url: "/CCreateBTTB/CreateNoBTTB",
            type: "GET",
            success: function (response) {
                nobttb.value = response.data;
                post(response.data);
                setStatusPO();
            },
            error: function (error) {
                console.error("Error Send Data:", error);
            },
        });
    } else {
        alert("Data tidak ada");
    }
});

supplier.addEventListener("change", function (event) {
    if (supplier.selectedIndex != 0) {
        clearOptions(POdropdown);
        clear();
        clearHeader();
        $.ajax({
            url: "/Drop1",
            type: "GET",
            data: {
                idSup: supplier.value,
            },
            success: function (response) {
                if (response.length == 0) {
                    alert("Data Tidak Ada");
                } else {
                    POdropdown.disabled = false;
                    response.forEach(function (data) {
                        let option = document.createElement("option");
                        option.value = data.NO_PO;
                        option.text = data.NO_PO;
                        POdropdown.add(option);
                    });
                }
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });
    }
});

POdropdown.addEventListener("change", function (event) {
    $("#tabelcreate").DataTable().clear().draw();
    clear();
    $.ajax({
        url: "/Create",
        type: "GET",
        data: {
            noPO: POdropdown.value,
        },
        success: function (response) {
            if (response.length == 0) {
                alert("Data Tidak Ada");
            } else {
                responseData(response);
            }
            console.log(response);
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
            responseData(response);
        },
    });
});

$("#tabelcreate").on("click", "tr", function () {
    $("#tabelcreate tr.selected").not(this).removeClass("selected");
    clear()
    $(this).toggleClass("selected");

    let rowData = tabelData.row(this).data();
    no_po.value = rowData[0];
    kode_barang.value = rowData[1];
    nama_barang.value = rowData[2];
    sub_kategori.value = rowData[3];
    qty_ordered.value = parseFloat(rowData[4]);
    ordered_satuan.value = rowData[5];
    qty_ship.value = parseFloat(rowData[6]) || 0;
    qty_remaining.value = parseFloat(rowData[7]) || 0;
    harga_unit.value = parseFloat(rowData[8]);
    harga_sub_total.value = parseFloat(rowData[9]);
    ppn.value = parseFloat(rowData[10]);
    harga_total.value = parseFloat(rowData[11]);
    kurs.value = parseFloat(rowData[12]);
    idr_unit.value = parseFloat(rowData[13]);
    idr_sub_total.value = parseFloat(rowData[14]);
    idr_ppn.value = parseFloat(rowData[15]);
    idr_harga_total.value = parseFloat(rowData[16]);
    mata_uang.value = rowData[17];
    disc.value = parseFloat(rowData[18]);
    total_disc.value = parseFloat(rowData[19]);
    idr_total_disc.value = parseFloat(rowData[20]);
    qty_received.value = parseFloat(rowData[21]);

    fixValueQTYOrder = parseFloat(rowData[4]);
    fixValueQTYReceived = parseFloat(rowData[21]);
    fixValueQTYRemain = parseFloat(rowData[7]) || 0;
    fixValueQTYShip = parseFloat(rowData[6]) || 0;
    // console.log(fixValueQTYShip);
    let noOrder = rowData[0];
    let objekDitemukan = data.filter((obj) => obj.No_trans === noOrder);
    for (let i = 0; i < ppn_select.options.length; i++) {
        if (
            ppn_select.options[i].value.replace(/\s/g, "") ===
            objekDitemukan[0].IdPPN.replace(/\s/g, "")
        ) {
            ppn_select.selectedIndex = i;
        }
    }
});

function removeData() {
    let noOrder = no_po.value;
    let objekDitemukan = data.filter((obj) => obj.No_trans !== noOrder);
    data = objekDitemukan;
    responseData(data);
    clear();
}

$("#removebutton").on("click", function () {
    removeData();
});

$("#updatebutton").on("click", function () {
    updateData();
});

function updateData() {
    let selectedRow = $("#tabelcreate tr.selected");

    if (selectedRow.length > 0) {
        let noOrder = no_po.value;
        let datas = data.filter((obj) => obj.No_trans === noOrder);
        datas[0].Qty = qty_ordered.value;
        datas[0].QtyShipped = parseFloat(qty_ship.value) || 0;
        datas[0].QtyRemain = parseFloat(qty_remaining.value) || 0;
        datas[0].PriceUnit = parseFloat(harga_unit.value) || 0;
        datas[0].PriceSub = parseFloat(harga_sub_total.value) || 0;
        datas[0].PPN = parseFloat(ppn.value) || 0;
        datas[0].PriceExt = parseFloat(harga_total.value) || 0;
        datas[0].PriceUnitIDR = parseFloat(idr_unit.value) || 0;
        datas[0].PriceSubIDR = parseFloat(idr_sub_total.value) || 0;
        datas[0].PriceUnitIDR_PPN = parseFloat(idr_ppn.value) || 0;
        datas[0].PriceExtIDR = parseFloat(idr_harga_total.value) || 0;
        datas[0].disc = disc.value || 0;
        datas[0].Harga_disc = parseFloat(total_disc.value) || 0;
        datas[0].DiscIDR = parseFloat(idr_total_disc.value) || 0;
        datas[0].QtyRcv = parseFloat(qty_received.value) || 0;
        responseData(data);
        clear();
    } else {
        alert("Pilih baris untuk diperbarui.");
    }
}

function responseData(datas) {
    data = datas;
    let tabelData = $("#tabelcreate").DataTable();
    tabelData.clear().draw();
    data.forEach(function (data) {
        tabelData.row
            .add([
                data.No_trans,
                data.Kd_brg,
                data.NAMA_BRG,
                data.nama_sub_kategori,
                parseFloat(data.Qty) || 0,
                data.Nama_satuan,
                parseFloat(data.QtyShipped) || 0,
                parseFloat(data.QtyRemain) || 0,
                parseFloat(data.PriceUnit) || 0,
                parseFloat(data.PriceSub) || 0,
                parseFloat(data.PPN) || 0,
                parseFloat(data.PriceExt) || 0,
                parseFloat(data.Kurs) || 0,
                parseFloat(data.PriceUnitIDR) || 0,
                parseFloat(data.PriceSubIDR) || 0,
                parseFloat(data.PriceUnitIDR_PPN) || 0,
                parseFloat(data.PriceExtIDR) || 0,
                data.Curr,
                parseFloat(data.disc) || 0,
                parseFloat(data.Harga_disc) || 0,
                parseFloat(data.DiscIDR) || 0,
                parseFloat(data.QtyRcv) || 0,
            ])
            .draw();
    });
}

$(document).ready(function () {
    qty_received.addEventListener("input", function (event) {
        let sisa = parseFloat(
            fixValueQTYOrder - (parseFloat(qty_received.value) - fixValueQTYReceived) - fixValueQTYShip
        );
        setInputFilter(
            document.getElementById("qty_received"),
            function (value) {
                return (
                    /^-?\d*[.,]?\d*$/.test(value) &&
                    (value === "" || parseFloat(value) <= fixValueQTYOrder)
                );
            },
            `Tidak boleh ketik character dan angka dibawah 0, harus angka diatas 0 dan tidak boleh lebih dari QTY Ordered`
        );
        if (sisa <= fixValueQTYOrder && sisa >= 0 && qty_received.value !== '' ) {
            qty_remaining.value = sisa.toFixed(2);
            if(qty_received.value != ''){
                qty_ship.value =  (fixValueQTYShip + parseFloat(qty_received.value - fixValueQTYReceived)).toFixed(2);
            }
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
    let qty_received = parseFloat(
        document.getElementById("qty_received").value
    );
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    let disc = parseFloat(document.getElementById("disc").value);
    if (!isNaN(qty_received) && !isNaN(hargaUnit) && !isNaN(disc)) {
        let SubTotalValue = hargaUnit * qty_received;
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
    let qty_received = parseFloat(
        document.getElementById("qty_received").value
    );
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    let disc = parseFloat(document.getElementById("disc").value);
    if (!isNaN(hargaUnit) && !isNaN(qty_received) && !isNaN(disc)) {
        let SubTotalValue = hargaUnit * qty_received;
        let discount = (SubTotalValue * disc) / 100;
        total_disc.value = discount;
    }
}

function updateIDRDisc() {
    let qty_received = parseFloat(
        document.getElementById("qty_received").value
    );
    let hargaUnit = parseFloat(document.getElementById("harga_unit").value);
    let disc = parseFloat(document.getElementById("disc").value);
    let kurs = parseFloat(document.getElementById("kurs").value);

    if (
        !isNaN(hargaUnit) &&
        !isNaN(qty_received) &&
        !isNaN(disc) &&
        !isNaN(kurs)
    ) {
        let SubTotalValue = hargaUnit * qty_received;
        let discount = (SubTotalValue * disc) / 100;
        let totalIDRDiscValue = discount * kurs;

        idr_total_disc.value = totalIDRDiscValue;
    }
}
