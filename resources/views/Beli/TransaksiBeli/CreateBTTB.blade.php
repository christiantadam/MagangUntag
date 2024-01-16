@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/CreateBTTB.css') }}" rel="stylesheet">
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
                    <div class="card-header"><strong>Create BTTB</strong></div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row">
                            <div class="col-md-3 mb-2">
                                <label for="nolabel" class="form-label"><strong>No. BTTB</strong></label>
                                <input type="text" class="form-control" id="nolabel" name="nolabel">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="nosj" class="form-label"><strong>No. SJ</strong></label>
                                <input type="text" class="form-control" id="nosj" name="nosj">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="sppb" class="form-label"><strong>No. SPPB BC</strong></label>
                                <input type="text" class="form-control" id="sppb" name="sppb">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="supplier" class="form-label"><strong>No. Registrasi</strong></label>
                                <input type="text" class="form-control" id="supplier" name="supplier">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="nomor_po" class="form-label"><strong>tgl BTTB</strong></label>
                                <input type="date" class="form-control" id="nomor_po" name="nomor_po">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="tanggal_po" class="form-label"><strong>No. PIB</strong></label>
                                <input type="text" class="form-control" id="tanggal_po" name="tanggal_po">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="supplier" class="form-label"><strong>Tgl. SPPB BC</strong></label>
                                <input type="date" class="form-control" id="supplier" name="supplier">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="supplier" class="form-label"><strong>Tgl. Rgistrasi</strong></label>
                                <input type="date" class="form-control" id="supplier" name="supplier">
                            </div>
                        <div class="col-md-3 mb-2">
                            <label for="nomor_po" class="form-label"><strong>Supplier</strong></label>
                            <input type="text" class="form-control" id="nomor_po" name="nomor_po">
                        </div>
                        <div class="col-md-3 mb-2">
                            <label for="tanggal_po" class="form-label"><strong>No. PIB Ext</strong></label>
                            <input type="float" class="form-control" id="tanggal_po" name="tanggal_po">
                        </div>
                        <div class="col-md-3 mb-2">
                            <label for="supplier" class="form-label"><strong>No SKBM</strong></label>
                            <input type="float" class="form-control" id="supplier" name="supplier">
                        </div>
                        <div class="col-md-3 mb-2">
                            <label for="supplier" class="form-label"><strong>Kode HS</strong></label>
                            <input type="float" class="form-control" id="supplier" name="supplier">
                        </div>
                    <div class="col-md-3">
                        <label for="tanggal_po" class="form-label"><strong>No. PO</strong></label>
                        <input type="text" class="form-control" id="tanggal_po" name="tanggal_po">
                    </div>
                    <div class="col-md-3">
                        <label for="supplier" class="form-label"><strong>Tgl PIB</strong></label>
                        <input type="date" class="form-control" id="supplier" name="supplier">
                    </div>
                    <div class="col-md-3">
                        <label for="supplier" class="form-label"><strong>Tgl. SKBM</strong></label>
                        <input type="float" class="form-control" id="supplier" name="supplier">
                    </div>
                    <div class="mb-10 m-5">
                            <div class="table-responsive">
                        <table class="mx-auto w-750 table sm">
                            <thead class="table-dark">
                                <tr>
                                    <th>No Order</th>
                                    <th>Kd Barang</th>
                                    <th style="width: 200px">Nama Barang</th>
                                    <th>Sub Kategori</th>
                                    <th>Qty</th>
                                    <th>Satuan</th>
                                    <th>Qty Terima</th>
                                    <th>Qty Shipped</th>
                                    <th>Qty Remaining</th>
                                    <th>Harga Unit</th>
                                    <th>Subtotal</th>
                                    <th>PPN</th>
                                    <th>Harga</th>
                                    <th>Kurs</th>
                                    <th>IDR Unit</th>
                                    <th>IDRS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                    <td contenteditable="true"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row mb-3 m-1">
                    <div class="col-md-4">
                        <label for="namabarang" class="form-label"><strong>Nomor Order</strong></label>
                        <input type="text" class="form-control" id="namabarang" name="namabarang">
                    </div>
                    <div class="col-md-4">
                        <label for="type" class="form-label"><strong>Kurs</strong></label>
                        <input type="text" class="form-control" id="type" name="type">
                    </div>
                    <div class="col-md-4">
                        <label for="kelompok" class="form-label"><strong>Mata Uang</strong></label>
                        <input type="text" class="form-control" id="kelompok" name="payment_term">
                    </div>
                    <div class="col-md-4">
                        <label for="namabarang" class="form-label"><strong>Kd. Barang</strong></label>
                        <input type="text" class="form-control" id="namabarang" name="namabarang">
                    </div>
                    <div class="col-md-4">
                        <label for="type" class="form-label"><strong>Harga Unit</strong></label>
                        <input type="text" class="form-control" id="type" name="type">
                    </div>
                    <div class="col-md-4">
                        <label for="kelompok" class="form-label"><strong>IDR Unit</strong></label>
                        <input type="text" class="form-control" id="kelompok" name="payment_term">
                    </div>
                    <div class="col-md-4">
                        <label for="namabarang" class="form-label"><strong>Nama Barang</strong></label>
                        <input type="text" class="form-control" id="namabarang" name="namabarang">
                    </div>
                    <div class="col-md-4">
                        <label for="type" class="form-label"><strong>Discount</strong></label>
                        <input type="text" class="form-control" id="type" name="type">
                    </div>
                    <div class="col-md-4">
                        <label for="kelompok" class="form-label"><strong>IDR Discount</strong></label>
                        <input type="text" class="form-control" id="kelompok" name="payment_term">
                    </div>
                    <div class="col-md-4">
                        <label for="namabarang" class="form-label"><strong>Sub Kategori</strong></label>
                        <input type="text" class="form-control" id="namabarang" name="namabarang">
                    </div>
                    <div class="col-md-4">
                        <label for="type" class="form-label"><strong>Harga Sub Total</strong></label>
                        <input type="text" class="form-control" id="type" name="type">
                    </div>
                    <div class="col-md-4">
                        <label for="kelompok" class="form-label"><strong>IDR SubTotal</strong></label>
                        <input type="text" class="form-control" id="kelompok" name="payment_term">
                    </div>
                    <div class="col-md-4">
                        <label for="namabarang" class="form-label"><strong>Qty ordered</strong></label>
                        <input type="text" class="form-control" id="namabarang" name="namabarang">
                    </div>
                    <div class="col-md-2">
                        <label for="type" class="form-label"><strong>Qty Remaining</strong></label>
                        <input type="text" class="form-control" id="type" name="type">
                    </div>
                    <div class="col-md-2">
                        <label for="kelompok" class="form-label"><strong>Harga Total</strong></label>
                        <input type="text" class="form-control" id="kelompok" name="payment_term">
                    </div>
                    <div class="col-md-2">
                        <label for="kelompok" class="form-label"><strong>IDR Total</strong></label>
                        <input type="text" class="form-control" id="kelompok" name="payment_term">

                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/CreateBTTB.js') }}"></script>
@endsection
