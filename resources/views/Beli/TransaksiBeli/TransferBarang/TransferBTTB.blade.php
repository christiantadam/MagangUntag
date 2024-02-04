@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/TransferBarang.css') }}" rel="stylesheet">
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
                    <div class="card-header">Create Purchase Order</div>
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="nomor_purchaseOrder">No. PO</label>
                                    </div>
                                    <div class="col-10">
                                        <input type="text" name="nomor_purchaseOrder" id="nomor_purchaseOrder"
                                            class="input w-100" value="{{ $No_PO }}" readonly>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="supplier">Supplier</label>
                                    </div>
                                    <div class="col-10">
                                        <div class="col-10">
                                            <input type="text" name="no_bttb" id="no_bttb" class="input w-100"
                                                value="{{ $No_BTTB }}" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="tanggal">Tanggal</label>
                                    </div>
                                    <div class="col-10">
                                        <input type="date" name="tanggal" id="tanggal" class="input w-100">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="acs-form3">
                            <table id="table_transferBTTB" class="table table-bordered table-striped" style="width:100%">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>No Terima</th>
                                        <th>Kategori</th>
                                        <th>Sub Kategori</th>
                                        <th>Kd Barang</th>
                                        <th>Nama Barang</th>
                                        <th>QTY Shipped</th>
                                        <th>Satuan</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="no_terima">Nomor Terima</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="no_terima" id="no_terima"
                                                        class="input w-100" readonly>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="kode_barang">Kode Barang</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="kode_barang" id="kode_barang"
                                                        class="input w-100" readonly>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="nama_barang">Nama Barang</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="nama_barang" id="nama_barang"
                                                        class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="keterangan">Keterangan</label>
                                                </div>
                                                <div class="col-8 ">
                                                    <input type="text" name="keterangan" id="keterangan"
                                                        class="input w-100">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-6">
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="qty_terima">Qty Terima</label>
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" name="qty_terima" id="qty_terima"
                                                        class="input w-100" readonly>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_qtyTerima" id="ket_qtyTerima"
                                                        class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="qty_premier">Qty Premier</label>
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" name="qty_premier" id="qty_premier"
                                                        class="input w-100">
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_qtyPremier" id="ket_qtyPremier"
                                                        class="input w-100" readonly>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="qty_sekunder">Qty Sekunder</label>
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" name="qty_sekunder" id="qty_sekunder"
                                                        class="input w-100">
                                                </div>

                                                <div class="col-2">
                                                    <input type="text" name="ket_qtySekunder" id="ket_qtySekunder"
                                                        class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4">
                                                    <label for="qty_tertier">Qty Tertier</label>
                                                </div>
                                                <div class="col-6">
                                                    <input type="text" name="qty_tertier" id="qty_tertier"
                                                        class="input w-100">
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_qtyTertier" id="ket_qtyTertier"
                                                        class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="divisi">Divisi</label>
                                                </div>
                                                <div class="col-6 col-md-8">
                                                    <select name="divisi_select" id="divisi_select" class="w-100 input">
                                                        <option class="w-100" selected disabled></option>
                                                    </select>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_divisi"
                                                        id="ket_divisi" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="objek">Objek</label>
                                                </div>

                                                <div class="col-6 col-md-8">
                                                    <select name="objek_select" id="objek_select" class="w-100 input">
                                                        <option class="w-100" selected disabled></option>
                                                    </select>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_objek"
                                                        id="ket_objek" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="kelompok_utama">Kelompok Utama</label>
                                                </div>

                                                <div class="col-6 col-md-8">
                                                    <input type="text" name="kelompok_utama"
                                                        id="kelompok_utama" class="input w-100"
                                                        readonly>

                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_kelompokUtama"
                                                        id="ket_kelompokUtama" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="kelompok">Kelompok</label>
                                                </div>

                                                <div class="col-6 col-md-8">
                                                    <input type="text" name="kelompok" id="kelompok"
                                                        class="input w-100" readonly>

                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_kelompok"
                                                        id="ket_kelompok" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="sub_kelompok">Sub Kelompok</label>
                                                </div>

                                                <div class="col-6 col-md-8">
                                                    <input type="text" name="sub_kelompok" id="sub_kelompok"
                                                        class="input w-100" readonly>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_subKelompok"
                                                        id="ket_subKelompok" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="idType">Id Type</label>
                                                </div>

                                                <div class="col-6 col-md-8">
                                                    <input type="text" name="idType" id="idType"
                                                        class="input w-100" readonly>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_idType"
                                                        id="ket_idType" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="saldo_premier">Saldo Premier</label>
                                                </div>
                                                <div class="col-6 col-md-8">
                                                    <input type="text" name="saldo_premier" id="saldo_premier"
                                                        class="input w-100" readonly>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_saldoPremier"
                                                        id="ket_saldoPremier" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="saldo_sekunder">Saldo Sekunder</label>
                                                </div>
                                                <div class="col-6 col-md-8">
                                                    <input type="text" name="saldo_sekunder" id="saldo_sekunder"
                                                        class="input w-100" readonly>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_saldoSekunder"
                                                        id="ket_saldoSekunder" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-2">
                                            <div class="row align-items-center">
                                                <div class="col-4 col-md-2">
                                                    <label for="saldo_tertier">Saldo Tertier</label>
                                                </div>
                                                <div class="col-6 col-md-8">
                                                    <input type="text" name="saldo_tertier" id="saldo_tertier"
                                                        class="input w-100" readonly>
                                                </div>
                                                <div class="col-2">
                                                    <input type="text" name="ket_saldoTertier"
                                                        id="ket_saldoTertier" class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-success" id="btn_transfer">Transfer</button>
                                <button class="btn btn-info" id="btn_exit">Exit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <script src="{{ asset('js/OrderPembelian/TransferBTTB.js') }}"></script>
        @endsection
