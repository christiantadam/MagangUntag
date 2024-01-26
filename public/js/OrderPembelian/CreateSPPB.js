let table_CreatePurchaseOrder = document.getElementById(
    "table_CreatePurchaseOrder"
);
let tanggal_mohonKirim = document.getElementById("tanggal_mohonKirim");
let tanggal_purchaseOrder = document.getElementById("tanggal_purchaseOrder");

tanggal_purchaseOrder.valueAsDate = new Date();
tanggal_mohonKirim.valueAsDate = new Date();
$("#table_CreatePurchaseOrder").DataTable({
    responsive:true,
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
});

$(document).ready(function () {
    console.log(loadPermohonanData);
});
