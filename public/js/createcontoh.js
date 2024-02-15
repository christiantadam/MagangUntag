// data irpan
let formIsi = document.getElementById("formIsi");
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

function clearData() {
    tanggal_purchaseOrder.valueAsDate = new Date();
    tanggal_mohonKirim.valueAsDate = new Date();
    no_po.value = "";
    kode_barang.value = "";
    nama_barang.value = "";
    sub_kategori.value = "";
    keterangan_order.value = "-";
    keterangan_internal.value = "-";
    supplier_select.selectedIndex = 0;
    matauang_select.selectedIndex = 0;
    paymentTerm_select.selectedIndex = 0;
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
            $("#matauang_select").val(data.ID_MATAUANG);
            $("#supplier_select option").each(function () {
                if ($(this).text() === data.NM_SUP) {
                    $("#supplier_select").val($(this).val());
                    return false;
                }
            });
            $("#ppn_select").val(data.IdPPN);
            fixValueQTYOrder = data.Qty;
            btn_update.disabled = false;
            btn_remove.disabled = false;

            paymentTerm_select.addEventListener("change", function (event) {
                if (paymentTerm_select.selectedIndex !== 0) {
                    btn_post.disabled = false;
                } else {
                    btn_post.disabled = true;
                }
            });
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
btn_update.addEventListener("click", function (event) {
    $.ajax({
        url: "/openFormCreateSPPB/create/Update",
        type: "POST",
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
            table.row(".selected").remove().draw(false);
            clearData();
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
        type: "POST",
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
            table.row(".selected").remove().draw(false);
            clearData();
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
        type: "POST",
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
            table.row(".selected").remove().draw(false);
            clearData();
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
    $.ajax({
        url: "/openFormCreateSPPB/create/Post",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            noTrans: no_po.value,
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
            table.row(".selected").remove().draw(false);
            clearData();
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
});

$(document).ready(function () {
    console.log(loadPermohonanData);

    qty_delay.addEventListener("input", function (event) {
        let qtyDelay = parseInt(fixValueQTYOrder - qty_delay.value);

        setInputFilter(
            document.getElementById("qty_delay"),
            function (value) {
                return (
                    /^\d*$/.test(value) &&
                    (value === "" || parseInt(value) <= fixValueQTYOrder)
                );
            },
            Tidak boleh ketik character dan angka dibawah 0, harus angka diatas 0 dan tidak boleh lebih dari angka awal
        );
        if (qtyDelay <= fixValueQTYOrder && qtyDelay >= 0) {
            qty_order.value = qtyDelay;
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
        let qtyOrder = parseInt(fixValueQTYOrder - qty_order.value);
        setInputFilter(
            document.getElementById("qty_order"),
            function (value) {
                return (
                    /^\d*$/.test(value) &&
                    (value === "" || parseInt(value) <= fixValueQTYOrder)
                );
            },
            Tidak boleh ketik character dan angka dibawah 0, harus angka diatas 0 dan tidak boleh lebih dari angka awal
        );
        if (qtyOrder <= fixValueQTYOrder && qtyOrder >= 0) {
            qty_delay.value = qtyOrder;
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







// data rayhan

$("#prosesButton").click(function (e) {
    e.preventDefault();

    // Ambil nilai-nilai form
    var tanggalValue = $("#tanggal").val();
    var divisi_pelapor1Value = $("#divisi_pelapor1").val();
    var nama_pelaporValue = $("#nama_pelapor").val();
    var penerima_laporanValue = $("#penerima_laporan").val();
    var jam_laporValue = $("#jam_lapor").val();
    var jam_perbaikanValue = $("#jam_perbaikan").val();
    var jam_selesaiValue = $("#jam_selesai").val();
    var tipe_gangguanValue = $("#tipe_gangguan").val();
    var penyebabValue = $("#penyebab").val();
    var penyelesaianValue = $("#penyelesaian").val();
    var keteranganValue = $("#keterangan").val();
    var teknisiValue = $("#teknisi").val();
    var agreeValue = $("#agree").prop("checked") ? 1 : 0;
    var id_laporanValue = $("#id_laporan").val();

    // Ambil file gambar
    var gambar1data = document.getElementById("gambarcoba");

    // Buat objek FormData
    // var formData = new FormData();
    // formData.append("tanggal", tanggalValue);
    // formData.append("divisi_pelapor1", divisi_pelapor1Value);
    // formData.append("nama_pelapor", nama_pelaporValue);
    // formData.append("penerima_laporan", penerima_laporanValue);
    // formData.append("jam_lapor", jam_laporValue);
    // formData.append("jam_perbaikan", jam_perbaikanValue);
    // formData.append("jam_selesai", jam_selesaiValue);
    // formData.append("tipe_gangguan", tipe_gangguanValue);
    // formData.append("penyebab", penyebabValue);
    // formData.append("penyelesaian", penyelesaianValue);
    // formData.append("keterangan", keteranganValue);
    // formData.append("teknisi", teknisiValue);
    // formData.append("agree", agreeValue);
    // formData.append("gambar1", gambar1data.files[0]);

    var requestData = {
        tanggal: tanggalValue,
        divisi_pelapor1: divisi_pelapor1Value,
        nama_pelapor: nama_pelaporValue,
        penerima_laporan: penerima_laporanValue,
        jam_lapor: jam_laporValue,
        jam_perbaikan: jam_perbaikanValue,
        jam_selesai: jam_selesaiValue,
        tipe_gangguan: tipe_gangguanValue,
        penyebab: penyebabValue,
        penyelesaian: penyelesaianValue,
        keterangan: keteranganValue,
        teknisi: teknisiValue,
        agree: agreeValue,
    };

    if (id_laporanValue) {
        requestData.Idlaporan = id_laporanValue;
    }
    console.log("FormData:", requestData);
    // console.log("Gambar:", formData.get("gambar1"));
    // console.log("Gambar:", formData.get("gambar1"));

    // Membuat permintaan AJAX
    $.ajax({
        url: id_laporanValue ? "/updateData" : "/postData",
        type: id_laporanValue ? "PUT" : "POST",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: requestData,
        error: function (xhr, status, error) {
            if (xhr.status === 419) {
                // Penanganan khusus untuk status 419 (sesi tidak valid)
                console.log("Sesi tidak valid. Silakan login kembali.");
                // Lakukan tindakan yang sesuai, seperti mengarahkan pengguna ke halaman login
            } else {
                // Penanganan kesalahan lainnya
                console.log("Terjadi kesalahan saat menyimpan gambar.");
            }
        },
        success: function (response) {
            console.log(response);
            // Respons sukses
            dataTable.ajax.reload();
            console.log("Gambar berhasil disimpan.");
        },
    });
});
