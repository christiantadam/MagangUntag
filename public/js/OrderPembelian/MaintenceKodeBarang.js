let kd_barang = document.getElementById("kd_barang");
let select_kategori_utama = document.getElementById("select_kategori_utama");
let select_kategori = document.getElementById("select_kategori");
let select_subKategori = document.getElementById("select_subKategori");
let ket_khusus = document.getElementById("ket_khusus");
let select_namaBarang = document.getElementById("select_namaBarang");
let ket_barang = document.getElementById("ket_barang");
let select_jenisPembelian = document.getElementById("select_jenisPembelian");
let check_round = document.getElementById("check_round");
let check_export = document.getElementById("check_export");
let check_barangSama = document.getElementById("check_barangSama");
let org_penjaluk = document.getElementById("org_penjaluk");
let select_satuanPrimer = document.getElementById("select_satuanPrimer");
let select_satuanSekunder = document.getElementById("select_satuanSekunder");
let select_satuanTritier = document.getElementById("select_satuanTritier");
let select_satuanUmum = document.getElementById("select_satuanUmum");
let textBox1 = document.getElementById("textBox1");
let textBox2 = document.getElementById("textBox2");
let textBox3 = document.getElementById("textBox3");
let textBox4 = document.getElementById("textBox4");
let textBox5 = document.getElementById("textBox5");
let textBox6 = document.getElementById("textBox6");
let textBox7 = document.getElementById("textBox7");
let textBox8 = document.getElementById("textBox8");
let textBox9 = document.getElementById("textBox9");
let textBox10 = document.getElementById("textBox10");
let textBox11 = document.getElementById("textBox11");
let textBox12 = document.getElementById("textBox12");
let textBox13 = document.getElementById("textBox13");
let textBox14 = document.getElementById("textBox14");
let textBox15 = document.getElementById("textBox15");
let textBox16 = document.getElementById("textBox16");
let btn_batal = document.getElementById("btn_batal");

let tamValueNamaBrg = "";
const SpesifikasiType = {
    Gelondongan: 1097,
    BenangExtruder: 1474,
    InnerGelondongan: 1516,
    PolybagGelondonganLDPE: 1852,
    PolybagGelondonganLLDPE: 1896,
    PolybagHDPE: 187,
    PolybagPE: 188,
    PolybagLLDPE: 350,
    PolybagLDPE: 187,
    PolybagLDPP: 187,
    KarungWovenBag: 1508,
};

btn_cari_kdBarang.addEventListener("click", function (event) {
    cariKodeBarang(kd_barang.value);
});
btn_batal.addEventListener("click", function (event) {
    // console.log(select_kategori.options.length);
    clearData();
});
check_export.disabled = true;

function clearOptions(selectElement) {
    console.log(selectElement.options.length)
    let length = selectElement.options.length

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}

function clearData() {
    tamValueNamaBrg = "";
    kd_barang.value = "";
    ket_khusus.value = "";
    org_penjaluk.value = "";
    ket_barang.value = "";
    select_kategori_utama.selectedIndex = 0;
    select_kategori.selectedIndex = 0;
    clearOptions(select_kategori);
    select_subKategori.selectedIndex = 0;
    // clearOptions(subKategori);
    select_namaBarang.selectedIndex = 0;
    // clearOptions(select_namaBarang);
    select_jenisPembelian.selectedIndex = 0;
    select_satuanPrimer.selectedIndex = 0;
    select_satuanSekunder.selectedIndex = 0;
    select_satuanTritier.selectedIndex = 0;
    select_satuanUmum.selectedIndex = 0;
    check_barangSama.checked = false;
    check_round.checked = false;
    check_export.checked = false;
    textBox1.value = "";
    textBox2.value = "";
    textBox3.value = "";
    textBox4.value = "";
    textBox5.value = "";
    textBox6.value = "";
    textBox7.value = "";
    textBox8.value = "";
    textBox9.value = "";
    textBox10.value = "";
    textBox11.value = "";
    textBox12.value = "";
    textBox13.value = "";
    textBox14.value = "";
    textBox15.value = "";
    textBox16.value = "";
}

function cariKodeBarang(kd_barang) {
    while (kd_barang.length < 9) {
        kd_barang = "0" + kd_barang;
    }
    $.ajax({
        url: "/Maintenance/KodeBarang",
        type: "GET",
        data: {
            kodeBarang: kd_barang,
        },
        success: function (response) {
            console.log(response);
            kategori(response[0].no_kat_utama, function () {
                for (let i = 0; i < select_kategori.options.length; i++) {
                    if (
                        select_kategori.options[i].text.replace(/\s/g, "") ===
                        response[0].nama_kategori.replace(/\s/g, "")
                    ) {
                        select_kategori.selectedIndex = i;
                    }
                }
            });

            subKategori(response[0].no_kategori, function () {
                for (let i = 0; i < select_subKategori.options.length; i++) {
                    if (
                        select_subKategori.options[i].text.replace(
                            /\s/g,
                            ""
                        ) === response[0].nama_sub_kategori.replace(/\s/g, "")
                    ) {
                        select_subKategori.selectedIndex = i;
                    }
                }
            });

            namaBarang(response[0].no_sub_kategori, function () {
                for (let i = 0; i < select_namaBarang.options.length; i++) {
                    if (
                        select_namaBarang.options[i].text.replace(/\s/g, "") ===
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    ) {
                        select_namaBarang.selectedIndex = i;
                    }
                }
            });

            for (let i = 0; i < select_kategori_utama.options.length; i++) {
                if (
                    select_kategori_utama.options[i].text.replace(/\s/g, "") ===
                    response[0].nama.replace(/\s/g, "")
                ) {
                    select_kategori_utama.selectedIndex = i;
                }
            }
            ket_khusus.value = response[0].KET_KHUSUS;
            ket_barang.value = response[0].KET;
            org_penjaluk.value = response[0].PENJALUK;
            if (response[0].kriteria != 0) {
                select_jenisPembelian.selectedIndex = 1;
            } else {
                select_jenisPembelian.selectedIndex = 0;
            }

            if (response[0].no_kategori == "011") {
                check_export.disabled = false;
            } else {
                check_export.disabled = true;
            }
            if (response[0].ROUND == "Y") {
                check_round.checked = true;
            } else {
                check_round.checked = false;
            }
            for (let i = 0; i < select_satuanPrimer.options.length; i++) {
                if (
                    select_satuanPrimer.options[i].value === response[0].ST_PRIM
                ) {
                    select_satuanPrimer.selectedIndex = i;
                }
            }
            for (let i = 0; i < select_satuanSekunder.options.length; i++) {
                if (
                    select_satuanSekunder.options[i].value ===
                    response[0].ST_SEK
                ) {
                    select_satuanSekunder.selectedIndex = i;
                }
            }
            for (let i = 0; i < select_satuanTritier.options.length; i++) {
                if (
                    select_satuanTritier.options[i].value === response[0].ST_TRI
                ) {
                    select_satuanTritier.selectedIndex = i;
                }
            }
            for (let i = 0; i < select_satuanUmum.options.length; i++) {
                if (
                    select_satuanUmum.options[i].value ===
                    response[0].NO_SATUAN_UMUM
                ) {
                    select_satuanUmum.selectedIndex = i;
                }
            }
            MySpesifikasi = parseInt(response[0].no_sub_kategori);
            switch (MySpesifikasi) {
                case SpesifikasiType.BenangExtruder:
                    PecahBenang(response[0].NAMA_BRG.replace(/\s/g, ""));
                    break;
                case SpesifikasiType.Gelondongan:
                    PecahGelondongan(response[0].NAMA_BRG.replace(/\s/g, ""));
                    break;
                case SpesifikasiType.InnerGelondongan:
                    PecahInnerGelondongan(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.PolybagGelondonganLDPE:
                    PecahInnerGelondongan(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.PolybagGelondonganLLDPE:
                    PecahInnerGelondongan(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.PolybagHDPE:
                    PecahInnerHasilPotong(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.PolybagLDPE:
                    PecahInnerHasilPotong(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.PolybagLDPP:
                    PecahInnerHasilPotong(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.PolybagLLDPE:
                    PecahInnerHasilPotong(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.PolybagPE:
                    PecahInnerHasilPotong(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                case SpesifikasiType.KarungWovenBag:
                    PecahKarungWovenBag(
                        response[0].NAMA_BRG.replace(/\s/g, "")
                    );
                    break;
                default:
                    break;
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

function kategori(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/Kategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kategori;
                option.text = data.nama_kategori;
                select_kategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}
function subKategori(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/SubKategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_sub_kategori;
                option.text = data.nama_sub_kategori;
                select_subKategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}
function namaBarang(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/NamaBarang",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.KD_BRG;
                option.text = data.NAMA_BRG;
                select_namaBarang.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

function PecahBenang(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        // E
        MyStart = 0;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let E = TypeBrg.substring(MyStart, MyPos);
        textBox1.value = E;

        // Ukuran
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Ukuran = TypeBrg.substring(MyStart, MyPos);
        textBox2.value = Ukuran;

        // Denier
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Denier = TypeBrg.substring(MyStart, MyPos);
        textBox3.value = Denier;

        // Warna
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos);
        textBox4.value = Warna;

        // Good-NoGood
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let GoodNoGood = TypeBrg.substring(MyStart, MyPos);
        textBox5.value = GoodNoGood;

        // UV-NoUV
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let UVNoUV = "";
        let AntiStatic = "";
        let WithDB = "";

        if (MyPos === -1) {
            UVNoUV = TypeBrg.substring(MyStart);
            textBox6.value = UVNoUV;
            textBox7.value = "";
        } else {
            UVNoUV = TypeBrg.substring(MyStart, MyPos);
            textBox6.value = UVNoUV;

            // AntiStatic
            MyStart = MyPos + 1;
            MyPos = TypeBrg.indexOf(MySearchChar, MyStart);

            if (MyPos === -1) {
                AntiStatic = TypeBrg.substring(MyStart);
                textBox7.value = AntiStatic;
            } else {
                AntiStatic = TypeBrg.substring(MyStart, MyPos);
                textBox7.value = AntiStatic;
            }

            if (MyPos !== -1) {
                // With DB
                MyStart = MyPos + 1;
                MyPos = TypeBrg.indexOf(MySearchChar, MyStart);

                if (MyPos === -1) {
                    WithDB = TypeBrg.substring(MyStart);
                    textBox8.value = WithDB;
                } else {
                    WithDB = TypeBrg.substring(MyStart, MyPos);
                    textBox8.value = WithDB;
                }
            }
        }

        if (AntiStatic !== "") {
            if (WithDB !== "") {
                tamValueNamaBrg =
                    E +
                    "-" +
                    Ukuran +
                    "-" +
                    Denier +
                    "-" +
                    Warna +
                    "-" +
                    GoodNoGood +
                    "-" +
                    UVNoUV +
                    "-" +
                    AntiStatic +
                    "-" +
                    WithDB;
            } else {
                tamValueNamaBrg =
                    E +
                    "-" +
                    Ukuran +
                    "-" +
                    Denier +
                    "-" +
                    Warna +
                    "-" +
                    GoodNoGood +
                    "-" +
                    UVNoUV +
                    "-" +
                    AntiStatic;
            }
        } else {
            tamValueNamaBrg =
                E +
                "-" +
                Ukuran +
                "-" +
                Denier +
                "-" +
                Warna +
                "-" +
                GoodNoGood +
                "-" +
                UVNoUV;
        }
    } catch (error) {
        console.error(error.message);
        alert("Error: " + error.message);
    }
}
function PecahGelondongan(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        let BeforePoint = "";
        let AfterPoint = "";
        let LongOfValue = 0;
        let MyInStart = 0;
        let MyInPos = 0;

        // No.Order
        MyStart = 0;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let NoOrder = TypeBrg.substring(MyStart, MyPos);
        textBox1.value = NoOrder;

        // Lebar
        let Lebar = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        try {
            MySearchChar = ".";
            MyInStart = 0;
            MyInPos = Lebar.indexOf(MySearchChar, MyInStart);
            BeforePoint = Lebar.substring(0, MyInPos).trim().padStart(3, " ");
            AfterPoint = Lebar.substring(MyInPos + 1, MyInPos + 3)
                .trim()
                .padEnd(2, "0");
            Lebar = BeforePoint + "." + AfterPoint;
        } catch (error) {
            Lebar = Lebar.trim().padStart(3, " ") + ".00";
        }
        textBox2.value = Lebar;

        // Wapf
        let Wapf = "";
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Wapf = TypeBrg.substring(MyStart, MyPos).trim();
        try {
            MySearchChar = ".";
            MyInStart = 0;
            MyInPos = Wapf.indexOf(MySearchChar, MyInStart);
            BeforePoint = Wapf.substring(0, MyInPos).trim().padStart(2, "0");
            AfterPoint = Wapf.substring(MyInPos + 1, MyInPos + 3)
                .trim()
                .padEnd(2, "0");
            Wapf = BeforePoint + "." + AfterPoint + " ";
        } catch (error) {
            Wapf = Wapf.trim().padStart(2, "0") + ".00 ";
        }
        textBox3.value = Wapf;

        // Wepf
        let Wepf = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Wepf = TypeBrg.substring(MyStart, MyPos).trim();
        try {
            MySearchChar = ".";
            MyInStart = 0;
            MyInPos = Wepf.indexOf(MySearchChar, MyInStart);
            BeforePoint = Wepf.substring(0, MyInPos).trim().padStart(2, "0");
            AfterPoint = Wepf.substring(MyInPos + 1, MyInPos + 3)
                .trim()
                .padEnd(2, "0");
            Wepf = " " + BeforePoint + "." + AfterPoint;
        } catch (error) {
            Wepf = " " + Wepf.trim().padStart(2, "0") + ".00";
        }
        textBox4.value = Wepf;

        // Denier
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Denier = TypeBrg.substring(MyStart, MyPos).trim().padStart(5, " ");
        textBox5.value = Denier;

        // Corak
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Corak = TypeBrg.substring(MyStart, MyPos).trim().padEnd(7, " ");
        textBox6.value = Corak;

        // Bahan
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Bahan = TypeBrg.substring(MyStart, MyPos).trim().padEnd(4, " ");
        textBox7.value = Bahan;

        // Keterangan
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Keterangan = TypeBrg.substring(MyStart, MyPos).trim();
        let LReinf = "0";
        let JmlReinf = "0";
        let WrnReinf = "  ";
        let JmlStripReinf = "00";
        let JrkReinf = "00";
        let WrnStrip = "  ";
        let JmlStripReinf2 = "00";
        let Keterangan2 = "-";
        let PanjangPotongan = "0";

        if (MyPos === -1) {
            Keterangan = TypeBrg.substring(MyStart).trim();
            textBox8.value = Keterangan;
            textBox9.value = LReinf;
            textBox10.value = JmlReinf;
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            Keterangan = TypeBrg.substring(MyStart, MyPos).trim();
            textBox8.value = Keterangan;
        }

        // LReinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            LReinf = TypeBrg.substring(MyStart).trim();
            textBox9.value = LReinf;
            textBox10.value = JmlReinf;
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            LReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox9.value = LReinf;
        }

        // JmlReinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JmlReinf = TypeBrg.substring(MyStart).trim();
            textBox10.value = JmlReinf;
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JmlReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox10.value = JmlReinf;
        }

        // WarnaReinf
        MyStart = MyPos + 1;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            WrnReinf = TypeBrg.substring(MyStart)
                .trim()
                .padStart(2, " ")
                .substr(0, 2);
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            WrnReinf = TypeBrg.substring(MyStart, MyPos).trim().padEnd(2, " ");
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
        }

        // Jumlah strip Reinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JmlStripReinf = TypeBrg.substring(MyStart).trim();
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JmlStripReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
        }

        // Jarak Reinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JrkReinf = TypeBrg.substring(MyStart).trim();
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JrkReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox12.value = JrkReinf;
        }

        // Warna Strip
        MyStart = MyPos + 1;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            WrnStrip = TypeBrg.substring(MyStart).trim().padEnd(2, " ");
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            WrnStrip = TypeBrg.substring(MyStart, MyPos).trim().padEnd(2, " ");
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
        }

        // jmlstrip reinforce 2
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JmlStripReinf2 = TypeBrg.substring(MyStart).trim();
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JmlStripReinf2 = TypeBrg.substring(MyStart, MyPos).trim();
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
        }

        // keterangan2
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Keterangan2 = TypeBrg.substring(MyStart).trim();
            textBox14.value = Keterangan2;
            return;
        } else {
            Keterangan2 = TypeBrg.substring(MyStart, MyPos).trim();
            textBox14.value = Keterangan2;
        }

        // panjang potongan (cm)
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            PanjangPotongan = TypeBrg.substring(MyStart).trim();
            textBox15.value = PanjangPotongan;
            return;
        } else {
            PanjangPotongan = TypeBrg.substring(MyStart, MyPos).trim();
            textBox15.value = PanjangPotongan;
        }

        tamValueNamaBrg =
            NoOrder +
            "/" +
            Lebar +
            "/" +
            Wapf +
            "X" +
            Wepf +
            "/" +
            Denier +
            "/" +
            Corak +
            "/" +
            Bahan +
            "/" +
            Keterangan +
            "/" +
            LReinf +
            "/" +
            JmlReinf +
            "/" +
            WrnReinf +
            "-" +
            JmlStripReinf +
            "/" +
            JrkReinf +
            "/" +
            WrnStrip +
            "-" +
            JmlStripReinf2 +
            "/" +
            Keterangan2 +
            "/" +
            PanjangPotongan;
    } catch (error) {
        switch (error.number) {
            case 5:
                textBox1.value = "";
                textBox2.value = "";
                textBox3.value = "";
                break;
            default:
                alert(error.message + ". Error# " + error.number);
        }
    }
}
function PecahInnerGelondongan(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "/";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        // Tebal
        MyStart = 0;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Tebal = TypeBrg.substring(MyStart, MyPos).trim();
        textBox1.value = Tebal;

        // Lebar
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        // Lebar = Lebar.substring(Lebar.length - 4);
        textBox2.value = Lebar;

        // Warna
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos).trim();
        textBox3.value = Warna;

        // Bahan
        MyStart = MyPos + 1;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Bahan = "";
        if (MyPos === -1) {
            Bahan = TypeBrg.substring(MyStart).trim();
        } else {
            Bahan = TypeBrg.substring(MyStart, MyPos).trim();
        }
        textBox4.value = Bahan;
        tamValueNamaBrg = Tebal + "/" + Lebar + "/" + Warna + "/" + Bahan;
    } catch (error) {
        alert(error.message);
    }
}

function PecahInnerHasilPotong(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "/";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        // Tebal
        MyStart = 0;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Tebal = TypeBrg.substring(MyStart, MyPos).trim();
        textBox1.value = Tebal;

        // Panjang
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Panjang = TypeBrg.substring(MyStart, MyPos).trim();
        textBox2.value = Panjang;

        // Lebar
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        textBox3.value = Lebar;

        // Seal
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Seal = TypeBrg.substring(MyStart, MyPos).trim();
        textBox4.value = Seal;

        // Warna
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos).trim();
        textBox5.value = Warna;

        // Bahan
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Bahan = "";
        if (MyPos === -1) {
            Bahan = TypeBrg.substring(MyStart).trim();
        } else {
            Bahan = TypeBrg.substring(MyStart, MyPos).trim();
        }
        textBox6.value = Bahan;
        tamValueNamaBrg =
            Tebal +
            "/" +
            Panjang +
            "X" +
            Lebar +
            "/" +
            Seal +
            "/" +
            Warna +
            "/" +
            Bahan;
    } catch (error) {
        alert(error.message);
    }
}
function PecahKarungWovenBag(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "/";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        let BeforePoint = "";
        let AfterPoint = "";
        let LongOfValue = 0;
        let MyInStart = 0;
        let MyInPos = 0;

        // Lebar
        let Lebar = "";
        MySearchChar = "+";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Lebar.length;
        try {
            MySearchChar = ".";
            MyInPos = Lebar.indexOf(MySearchChar, MyInStart);
            BeforePoint = Lebar.substring(MyInStart, MyInPos).trim();
            AfterPoint = Lebar.substring(MyInPos + 1, MyInPos + 2).trim();
            Lebar = BeforePoint + "." + AfterPoint;
        } catch (ex) {
            Lebar = ("000" + Lebar).slice(-3) + ".0";
        }
        textBox1.value = Lebar;

        // Gaset
        let Gaset = "";
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Gaset = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Gaset.length;
        try {
            MySearchChar = ".";
            MyInPos = Gaset.indexOf(MySearchChar, MyInStart);
            BeforePoint = Gaset.substring(MyInStart, MyInPos).trim();
            AfterPoint = Gaset.substring(MyInPos + 1, MyInPos + 2).trim();
            Gaset = BeforePoint + "." + AfterPoint;
        } catch (ex) {
            Gaset = ("00" + Gaset).slice(-2) + ".0";
        }
        textBox2.value = Gaset;

        // Panjang
        let Panjang = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Panjang = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Panjang.length;
        try {
            MySearchChar = ".";
            MyInPos = Panjang.indexOf(MySearchChar, MyInStart);
            BeforePoint = Panjang.substring(MyInStart, MyInPos).trim();
            AfterPoint = Panjang.substring(MyInPos + 1, MyInPos + 2).trim();
            Panjang = BeforePoint + "." + AfterPoint;
        } catch (ex) {
            Panjang = ("000" + Panjang).slice(-3) + ".0";
        }
        textBox3.value = Panjang;

        // Wapf
        let Wapf = "";
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Wapf = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Wapf.length;
        try {
            MySearchChar = ".";
            MyInPos = Wapf.indexOf(MySearchChar, MyInStart);
            BeforePoint = Wapf.substring(MyInStart, MyInPos).trim();
            AfterPoint = Wapf.substring(MyInPos + 1, MyInPos + 2).trim();
            Wapf = BeforePoint + "." + AfterPoint;
        } catch (ex) {
            Wapf = ("00" + Wapf).slice(-2) + ".0";
        }
        textBox4.value = Wapf;

        // Weft
        let Weft = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Weft = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Weft.length;
        try {
            MySearchChar = ".";
            MyInPos = Weft.indexOf(MySearchChar, MyInStart);
            BeforePoint = Weft.substring(MyInStart, MyInPos).trim();
            AfterPoint = Weft.substring(MyInPos + 1, MyInPos + 2).trim();
            Weft = BeforePoint + "." + AfterPoint;
        } catch (ex) {
            Weft = ("00" + Weft).slice(-2) + ".0";
        }
        textBox5.value = Weft;

        // Denier
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Denier = TypeBrg.substring(MyStart, MyPos).trim();
        textBox6.value = Denier;

        // Warna / Corak
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos).trim();
        textBox7.value = Warna;

        // Mark
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Mark = "";
        let Keterangan = "";
        let Lami = "-";
        let Inner = "-";
        let Ass = "-";
        if (MyPos === -1) {
            Mark = TypeBrg.substring(MyStart).trim();
            textBox8.value = Mark;
            Keterangan = "-";
            textBox9.value = Keterangan;
            textBox10.value = Inner;
            return;
        } else {
            Mark = TypeBrg.substring(MyStart, MyPos).trim();
            textBox8.value = Mark;
        }

        // Type Jahit
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Keterangan = TypeBrg.substring(MyStart).trim();
            textBox9.value = Keterangan;
            textBox10.value = Inner;
            return;
        } else {
            Keterangan = TypeBrg.substring(MyStart, MyPos).trim();
            textBox9.value = Keterangan;
        }

        // Lami
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Lami = TypeBrg.substring(MyStart).trim();
            textBox10.value = Lami;
            return;
        } else {
            Lami = TypeBrg.substring(MyStart, MyPos).trim();
            textBox10.value = Lami;
        }

        // Inner
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Inner = TypeBrg.substring(MyStart).trim();
            textBox11.value = Inner;
            return;
        } else {
            Inner = TypeBrg.substring(MyStart, MyPos).trim();
            textBox11.value = Inner;
        }

        // Assesories
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Ass = TypeBrg.substring(MyStart).trim();
            textBox12.value = Ass;
            return;
        } else {
            Ass = TypeBrg.substring(MyStart, MyPos).trim();
            textBox12.value = Ass;
        }

        // Update TextNamaBarang
        let TextNamaBarang =
            Lebar +
            "+" +
            Gaset +
            "X" +
            Panjang +
            "/" +
            Wapf +
            "X" +
            Weft +
            "/" +
            Denier +
            "/" +
            Warna +
            "/" +
            Mark +
            "/" +
            Keterangan +
            "/" +
            Inner +
            "/" +
            Lami +
            "/" +
            Ass;
        tamValueNamaBrg.value = TextNamaBarang;
    } catch (error) {
        alert(error.message);
    }
}

$(document).ready(function () {
    $.ajax({
        url: "/Maintenance/Data",
        type: "GET",
        success: function (response) {
            let kategoriUtama = response.kategoriUtama;
            let jenisPembelian = response.jenisPembelian;
            let satuanList = response.satuanList;
            kategoriUtama.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kat_utama;
                option.text = data.nama;
                select_kategori_utama.add(option);
            });
            jenisPembelian.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.kode;
                option.text = data.keterangan;
                select_jenisPembelian.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanPrimer.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanSekunder.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanTritier.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanUmum.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});
