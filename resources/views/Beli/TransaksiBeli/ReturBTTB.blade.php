@extends('layouts.appOrderPembelian')
@section('content')
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
                                <label for="tanggal_po" class="form-label">Suplier</label>
                                <input type="text" class="form-control" id="tanggal_po" name="tanggal_po">
                            </div>
                            <div class="col-md-4">
                                <label for="supplier" class="form-label">Payment Term</label>
                                <input type="text" class="form-control" id="supplier" name="supplier">
                            </div>
                        </div>
                        <div class="row mb-3 m-1">
                            <div class="col-md-4">
                                <label for="tanggal_mohonKirim" class="form-label">Tanggal PO</label>
                                <input type="date" class="form-control" id="tanggal_mohonKirim"
                                    name="tanggal_mohonKirim">
                            </div>
                            <div class="col-md-4">
                                <label for="payment_term" class="form-label">Tanggal Mohon Kirim</label>
                                <input type="date" class="form-control" id="payment_term" name="payment_term">
                            </div>
                            <div class="col-md-4">
                                <label for="matauang_input" class="form-label">Mata uang</label>
                                <input type="text" class="form-control" id="matauang_input" name="matauang_input">
                            </div>
                        </div>
                    </div>
                    <div class="mb-20 m-4">
                        <table class="mx-auto w-90 table sm">
                            <thead class="table-dark">
                                <tr>
                                    <th>No BTTB</th>
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
                                    <th>Alasan Retur</th>
                                    <th>Penagih</th>
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
                                </tr>
                            </tbody>
                        </table>
                        </table>
                        <table class="table sm">
                            <thead class="table-dark">
                                <tr>
                                    <th>No BTTB</th>
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
                                    <th>Alasan Retur</th>
                                    <th>Penagih</th>
                                </tr>
                            </thead>
                            <tbody>
                                <div class="text-left mt-20">
                                    <h5>Stock Inventory Divisi Pembelian</h5>
                                </div>
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
                                </tr>
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
                            <input type="date" class="form-control" id="tanggalretur" name="tanggalretur">
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
                            <input type="text" class="form-control" id="kelompok" name="payment_term">
                        </div>
                        <div class="col-md-4">
                            <label for="namabarang" class="form-label">Sub Kategori</label>
                            <input type="text" class="form-control" id="namabarang" name="namabarang">
                        </div>
                        <div class="col-md-2">
                            <label for="type" class="form-label">Qty Retur Primer</label>
                            <input type="float" class="form-control" id="type" name="type">
                        </div>
                        <div class="col-md-2">
                            <label for="kelompok" class="form-label">Qty Sekunder</label>
                            <input type="float" class="form-control" id="kelompok" name="payment_term">
                        </div>
                        <div class="col-md-2">
                            <label for="kelompok" class="form-label">Qty Tertier</label>
                            <input type="float" class="form-control" id="kelompok" name="payment_term">
                        </div>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="kelompok" class="form-label">No. BTTB</label>
                            <input type="float" class="form-control" ids="kelompok" name="payment_term">
                        </div>
                        <div class="col-md-8" style="width: 400px; margin-right: -60px;">
                            <label for="kelompok" class="form-label">Alasan</label>
                            <input type="float" class="form-control" id="kelompok" name="payment_term">
                        </div>
                    </div>

                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="kelompok" class="form-label">No. SJ</label>
                            <input type="float" class="form-control" id="kelompok" name="payment_term">
                        </div>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="kelompok" class="form-label">Id Terima</label>
                            <input type="int" class="form-control" id="kelompok" name="payment_term">
                        </div>
                    </div>
                    <div class="row mb-3 m-1">
                        <div class="col-md-2">
                            <label for="kelompok" class="form-label">Qty Terima</label>
                            <input type="float" class="form-control" id="kelompok" name="payment_term">
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="row align-items-center">
                        <div class="col-md-12 d-flex justify-content-end">
                        <button type="button" class="btn  btn-lg btn-success mr-3">POST</button>
                        <button type="button" class="btn btn-danger">EXIT</button>
                        </div>

                </div>

            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/ListPurchaseOrder.js') }}"></script>
        <script>
            function printData() {
                // Add your print logic here
                console.log('Printing...');
            }

            function exitPage() {
                // Add your exit logic here
                console.log('Exiting...');
            } <
            script src = "{{ asset('js/OrderPembelian/ReturBTTB.js') }}" >
        </script>
    @endsection
