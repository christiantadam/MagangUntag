@extends('layouts.appOrderPembelian')
@section('content')
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="{{ asset('css/ReturBTTB.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-18 RDZMobilePaddingLR0">
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
                    <div class="card-header">Retur BTTB</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row mb-3 m-1">
                            <div class="col-md-4">
                                <label for="nomor_po" class="form-label">No PO</label>
                                <input type="text" class="form-control" id="nomor_po" name="nomor_po">
                            </div>
                            <div class="col-md-4">
                                <label for="suplier" class="form-label">Suplier</label>
                                <div class="row">
                                    <div class="col-4">
                                        <input type="text" class="form-control" id="idsuplier" name="idsuplier">
                                    </div>
                                    <div class="col-8">
                                        <input type="text" class="form-control" id="suplier" name="suplier">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <label for="payment" class="form-label">Payment Term</label>
                                <input type="text" class="form-control" id="payment" name="payment">
                            </div>
                        </div>
                        <div class="row mb-3 m-1">
                            <div class="col-md-4">
                                <label for="tanggal_po" class="form-label">Tanggal PO</label>
                                <input type="date" class="form-control" id="tanggal_po" name="tanggal_po"
                                    value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-4">
                                <label for="tanggalkirim" class="form-label">Tanggal Mohon Kirim</label>
                                <input type="date" class="form-control" id="tanggalkirim" name="tanggalkirim"
                                    value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-4">
                                <label for="matauang" class="form-label">Mata uang</label>
                                <input type="text" class="form-control" id="matauang" name="matauang">
                            </div>
                        </div>
                    </div>
                    <div class="mb-20 m-4">
                        <table class="mx-auto w-90 table sm" id="tabelretur">
                            <thead class="table-dark">
                                <tr>
                                    <th id="nobttb"> BTTB</th>
                                    <th>No. SJ</th>
                                    <th>Id Terima</th>
                                    <th>Kd Barang</th>
                                    <th>Nama Barang</th>
                                    <th>Sub Kategori</th>
                                    <th>Qty Terima</th>
                                    <th>Satuan</th>
                                    <th>id. Transfer</th>
                                    <th>id Trans INV</th>
                                    <th>No Order</th>
                                    <th>Qty Retur</th>
                                    <th>Tgl Retur</th>
                                    <th>Alasan Retur</th>
                                    <th>Penagih</th>
                                </tr>
                            </thead>
                        </table>
                        </table>
                        <table class="table sm" id="tabelretur1">
                            <thead class="table-dark">
                                <tr>
                                    <th>Id Type</th>
                                    <th>Kd Barang</th>
                                    <th>Nama Barang</th>
                                    <th>Qty Primer</th>
                                    <th>Satuan Primer</th>
                                    <th>Qty Sekunder </th>
                                    <th>Satuan Sekunder</th>
                                    <th>Qty Tertier</th>
                                    <th>Satuan Tertier</th>
                                    <th>Sub Kelompok</th>
                                    <th>Kelompok</th>
                                    <th>Kel Utama</th>
                                    <th>Objek</th>
                                </tr>
                            </thead>
                            <tbody>
                                <div class="text-left mt-20">
                                    <h5>Stock Inventory Divisi Pembelian</h5>
                                </div>
                            </tbody>
                        </table>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-4">
                            <label for="kdbarang" class="form-label">Kode Barang</label>
                            <input type="text" class="form-control" id="kdbarang" name="kdbarang">
                        </div>
                        <div class="col-md-4">
                            <label for="tanggalretur" class="form-label">Tanggal Retur</label>
                            <input type="date" class="form-control" id="tanggalretur" name="tanggalretur"
                                value="{{ date('Y-m-d') }}">
                        </div>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-4">
                            <label for="namabarang" class="form-label">Nama Barang</label>
                            <input type="text" class="form-control" id="namabarang" name="namabarang">
                        </div>
                        <div class="col-md-4">
                            <label for="type" class="form-label">Id Type</label>
                            <input type="text" class="form-control" id="type" name="type">
                        </div>
                        <div class="col-md-4">
                            <label for="kelompok" class="form-label">Kelompok</label>
                            <input type="text" class="form-control" id="kelompok" name="kelompok">
                        </div>
                        <div class="col-md-4">
                            <label for="subkategori" class="form-label">Sub Kategori</label>
                            <input type="text" class="form-control" id="subkategori" name="subkategori">
                        </div>
                        <div class="col-md-2">
                            <label for="returprimer" class="form-label">Qty Retur Primer</label>
                            <input type="text" class="form-control" id="returprimer" name="returprimer">
                        </div>
                        <div class="col-md-2">
                            <label for="sekunder" class="form-label">Qty Sekunder</label>
                            <input type="text" class="form-control" id="sekunder" name="sekunder">
                        </div>
                        <div class="col-md-2">
                            <label for="tertier" class="form-label">Qty Tertier</label>
                            <input type="text" class="form-control" id="tertier" name="tertier">
                        </div>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="bttb" class="form-label">No. BTTB</label>
                            <input type="text" class="form-control" id="bttb" name="bttb">
                        </div>
                        <div class="col-md-8" style="width: 400px; margin-right: -60px;">
                            <label for="alasan" class="form-label">Alasan</label>
                            <input type="text" class="form-control" id="alasan" name="alasan">
                        </div>
                    </div>

                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="sj" class="form-label">No. SJ</label>
                            <input type="text" class="form-control" id="sj" name="sj">
                        </div>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="id_terima" class="form-label">Id Terima</label>
                            <input type="text" class="form-control" id="id_terima" name="id_terima">
                        </div>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="qty_terima" class="form-label">Qty Terima</label>
                            <input type="text" class="form-control" id="qty_terima" name="qty_terima">
                        </div>
                    </div>
                    <span id="keterangan"></span>
                    <div class="row align-items-center">
                        <div class="col-md-12 d-flex justify-content-end">
                            <button type="button " id="returbutton" class="btn  btn-lg btn-success mr-3">RETUR</button>
                            <button type="button " id="batalbutton" class="btn  btn-lg btn-success mr-3">BATAL</button>
                        </div>
                    </div>

                </div>
            </div>
            <script src="{{ asset('js/OrderPembelian/Retur.js') }}"></script>
        @endsection
