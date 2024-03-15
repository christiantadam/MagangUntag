@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/IsiSupplierHarga.css') }}" rel="stylesheet">
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
                    <div class="card-header font-weight-bold">Isi Supplier - Harga</div>
                    <div class="card-body font-weight-bold">
                        <div class="w-100 h-auto">
                            <div class="w-100 h-auto">
                                <label class="font-weight-bold" for="filter">Search by:</label>
                                <div class="row" id="formCekRedisplay">
                                    <div class="col-12 col-xl-10 div-search">
                                        <div class="row align-items-center mx-2 mb-4 " style="border: 0.5px grey solid;">
                                            <div class="col-xl-2">
                                                <input type="radio" name="filter_radioButton"
                                                    id="filter_radioButtonAllOrder" value="AllOrder" class="radio-button"
                                                    checked>
                                                All Order
                                            </div>
                                            <div class="col-xl-2">
                                                <input type="radio" name="filter_radioButton"
                                                    id="filter_radioButtonNomorOrder" value="NomorOrder"
                                                    class="radio-button font-weight-bold">
                                                No. Order
                                            </div>
                                            <input type="text" name="search_NomorOrder" id="nomor_order"
                                                class="input col-12 col-xl-3 font-weight-bold">
                                            <div class="col-xl-2">
                                                <input type="radio" name="filter_radioButton" id="filter_radioButtonUser"
                                                    value="User" class="radio-button font-weight-bold">
                                                User
                                            </div>
                                            <input type="text" name="search_User" id="user"
                                                class="input col-12 col-xl-3 font-weight-bold">
                                        </div>

                                    </div>
                                    <div class="col-md-2">
                                        <button class="custom-button2 w-100" id="button_redisplay">Redisplay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="div_tablePO" class="acs-form3">
                            <table id="table_IsiHarga" class="table table-bordered" style="width:100%">
                                <thead class="table-primary">
                                    <tr>
                                        <th>No. Order</th>
                                        <th>Status Beli</th>
                                        <th>Kode Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Sub Kategori</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>User</th>
                                        <th>Id_Div</th>
                                        <th>Tgl. Dibutuhkan</th>
                                        <th>Ket. Order</th>
                                        <th>Ket. Internal</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="" id="formApprove">
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="no_po">Nomor Order</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="no_po" id="no_po" class="form-control font-weight-bold"
                                                    readonly>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <label class="font-weight-bold" for="status_beli">Status Beli</label>
                                        <div class="row align-items-center">
                                            <div class="col-6">
                                                <input type="radio" name="status_beliRadioButton"
                                                    id="status_beliPengadaanPembelian" class="input font-weight-bold" disabled
                                                    checked>Pengadaan
                                                Pembelian
                                            </div>
                                            <div style="col-6">
                                                <input type="radio" name="status_beliRadioButton"
                                                    id="status_beliBeliSendiri" class="input font-weight-bold" disabled>Beli Sendiri
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="tanggal_dibutuhkan">Tanggal Dibutuhkan</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="date" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan"
                                                    class="form-control font-weight-bold" readonly>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="divisi">Divisi</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="divisi" id="divisi" class="form-control font-weight-bold"
                                                    readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="kode_barang">Kode Barang</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    class="form-control font-weight-bold" readonly>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="nama_barang">Nama Barang</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="nama_barang" id="nama_barang"
                                                    class="form-control font-weight-bold" readonly>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="sub_kategori">Sub Kategori</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="sub_kategori" id="sub_kategori"
                                                    class="form-control font-weight-bold" readonly>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="keterangan_order">Keterangan Order</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="keterangan_order" id="keterangan_order"
                                                    class="form-control font-weight-bold" value="-" readonly>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="keterangan_internal">Keterangan Internal</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="keterangan_internal" id="keterangan_internal"
                                                    class="form-control font-weight-bold" value="-" readonly>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <div class="row align-items-center">
                                            <div class="col-4">
                                                <label class="font-weight-bold" for="user_input">User</label>
                                            </div>
                                            <div class="col-8 col-md-6">
                                                <input type="text" name="user_input" id="user_input"
                                                    class="form-control font-weight-bold" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="qty_order">Qty Order</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="qty_order" id="qty_order"
                                                            class="form-control font-weight-bold" value="0">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="qty_delay">Qty Delay</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="qty_delay" id="qty_delay"
                                                            class="form-control font-weight-bold" value="0">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-4 col-md-2">
                                                <label class="font-weight-bold" for="supplier">Supplier</label>
                                            </div>
                                            <div class="col-8 col-md-10">
                                                <select name="supplier_select" id="supplier_select" class="w-100 input font-weight-bold">
                                                    <option class="w-100" selected disabled>-- Pilih Supplier --</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-4 col-md-2">
                                                <label class="font-weight-bold" for="mata_uang">Mata Uang</label>
                                            </div>
                                            <div class="col-8 col-md-10">
                                                <select name="matauang_select" id="matauang_select" class="w-100 input font-weight-bold"
                                                    disabled>
                                                    <option class="w-100" selected disabled>-- Pilih Mata Uang --</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-4 col-md-2">
                                                <label class="font-weight-bold" for="kurs">Kurs</label>
                                            </div>
                                            <div class="col-8 col-md-10">
                                                <input type="text" name="kurs" id="kurs" class="form-control font-weight-bold"
                                                    value="1">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="harga_unit">Harga Unit</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="harga_unit" id="harga_unit"
                                                            class="form-control font-weight-bold" value="0">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="idr_unit">IDR Unit</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="idr_unit" id="idr_unit"
                                                            class="form-control font-weight-bold" value="0" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="harga_sub_total">Harga Sub Total</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="harga_sub_total" id="harga_sub_total"
                                                            class="form-control font-weight-bold" value="0" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="idr_sub_total">IDR Sub Total</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="idr_sub_total" id="idr_sub_total"
                                                            class="form-control font-weight-bold" value="0" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="ppn">PPN %</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <select name="ppn_select" id="ppn_select" class="w-100 input font-weight-bold">
                                                            <option class="w-100" selected disabled></option>
                                                        </select>
                                                        <input type="text" name="ppn" id="ppn"
                                                            class="form-control font-weight-bold" value="0" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="idr_ppn">IDR PPN</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="idr_ppn" id="idr_ppn"
                                                            class="form-control font-weight-bold" value="0" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="harga_total">Harga Total</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="harga_total" id="harga_total"
                                                            class="form-control font-weight-bold" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="row">
                                                    <div class="col-4">
                                                        <label class="font-weight-bold" for="idr_harga_total">IDR Total</label>
                                                    </div>
                                                    <div class="col-8">
                                                        <input type="text" name="idr_harga_total" id="idr_harga_total"
                                                            class="form-control font-weight-bold" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row align-items-center">
                                            <div class="col-4 col-md-2">
                                                <label class="font-weight-bold" for="alasan_reject">Alasan Reject</label>
                                            </div>
                                            <div class="col-8 col-md-10">
                                                <textarea rows="1" type="text" name="alasan_reject" id="alasan_reject" class="form-control font-weight-bold"></textarea>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-2">
                                    <div class="row">
                                        <div class="col-4 col-md-12">
                                            <button class="custom-button2" style="width: 100px;height: 40px;" id="btn_approve">Approve</button>
                                        </div>
                                        <div class="col-4 col-md-12">
                                            <button class="custom-button1" style="width: 100px;height: 40px;" id="btn_clear">Clear</button>
                                        </div>
                                        <div class="col-4 col-md-12">
                                            <button class="custom-button3" style="width: 100px;height: 40px;" id="btn_reject">Reject</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/IsiSupplierHarga.js') }}"></script>
@endsection
