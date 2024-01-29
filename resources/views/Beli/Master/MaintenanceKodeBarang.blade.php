@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/ReturBTTB.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Maintence Kode Barang</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="kd_barang">Kd Barang</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="input w-100" id="kd_barang" name="kd_barang">
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-primary w-100"
                                            id="btn_cari_kdBarang">Cari</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="kategori_utama">Kategori Utama</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_kategori_utama" id="select_kategori_utama" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>-- Pilih Kategori Utama --
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-success w-100"
                                            id="btn_tambah_kategoriUtama">Tambah</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="kategori">Kategori</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_kategori" id="select_kategori" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>-- Pilih Kategori --
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-success w-100"
                                            id="btn_tambah_kategori">Tambah</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="subKategori">Sub Kategori</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_subKategori" id="select_subKategori" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>-- Pilih Sub Kategori --
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-success w-100"
                                            id="btn_tambah_subKategori">Tambah</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="ket_khusus">Keterangan Khusus</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="input w-100" id="ket_khusus" name="ket_khusus">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="namaBarang">Nama Barang</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_namaBarang" id="select_namaBarang" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>-- Pilih Nama Barang --
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-2">
                                        <button type="button" class="btn btn-primary w-100"
                                            id="btn_namaBarang">Cek</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="ket_barang">Keterangan Barang</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="input w-100" id="ket_barang" name="ket_barang">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="jenisPembelian"">Jenis Pembelian</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_jenisPembelian" id="select_jenisPembelian"
                                            class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                    </div>
                                    <div class="col-8">
                                        <div class="row">
                                            <div class="col-2">
                                                <input type="checkbox" class="input" id="check_round"
                                                    name="check_jenisPembelian">
                                                <label for="check_round">Round</label>
                                            </div>
                                            <div class="col-2">
                                                <input type="checkbox" class="input" id="check_export"
                                                    name="check_jenisPembelian">
                                                <label for="check_export">Export</label>
                                            </div>
                                            <div class="col-3">
                                                <input type="checkbox" class="input" id="check_barangSama"
                                                    name="check_jenisPembelian">
                                                <label for="check_barangSama">Barang Sama</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="org_penjaluk">Orang Penjaluk</label>
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="input w-100" id="org_penjaluk" name="org_penjaluk">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="satuanPrimer"">Satuan Primer</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanPrimer" id="select_satuanPrimer" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="satuanSekunder"">Satuan Sekunder</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanSekunder" id="select_satuanSekunder"
                                            class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="satuanTritier"">Satuan Tritier</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanTritier" id="select_satuanTritier"
                                            class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2 ">
                                        <label for="satuanUmum"">Satuan Umum</label>
                                    </div>
                                    <div class="col-8">
                                        <select name="select_satuanUmum" id="select_satuanUmum" class="w-100 input">
                                            <option class="w-100 text-center" selected disabled>
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                    <div class="col-3">
                                        <input type="text" class="input w-100" name="textBox" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mb-2">
                                <div class="row">
                                    <div class="col-2"><button type="button" class="w-100 btn btn-primary" id="btn_isi">Isi</button></div>
                                    <div class="col-2"><button type="button" class="w-100 btn btn-secondary" id="btn_koreksi">Koreksi</button></div>
                                    <div class="col-2"><button type="button" class="w-100 btn btn-danger" id="btn_hapus">Hapus</button></div>
                                    <div class="col-2"><button type="button" class="w-100 btn btn-success" id="btn_proses">Proses</button></div>
                                    <div class="col-2"><button type="button" class="w-100 btn btn-info" id="btn_batal">Batal</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/MaintenceKodeBarang.js') }}"></script>
@endsection
