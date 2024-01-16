@extends('layouts.appOrderPembelian')

@section('content')
    <link href="{{ asset('css/ListPurchaseOrder.css') }}" rel="stylesheet">
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
                    <div class="card-header">List Purchase Order</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row mb-3">
                            <div class="col">
                                <label for="nomor_po" class="form-label">Nomor PO</label>
                                <input type="text" class="form-control" id="nomor_po" name="nomor_po">
                            </div>
                            <div class="col">
                                <label for="tanggal_po" class="form-label">Tanggal PO</label>
                                <input type="date" class="form-control" id="tanggal_po" name="tanggal_po">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <label for="supplier" class="form-label">Supplier</label>
                                <input type="text" class="form-control" id="supplier" name="supplier">
                            </div>
                            <div class="col">
                                <label for="tanggal_mohonKirim" class="form-label">Tanggal Mohon Kirim</label>
                                <input type="date" class="form-control" id="tanggal_mohonKirim" name="tanggal_mohonKirim">
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <label for="payment_term" class="form-label">Payment Term</label>
                                <input type="text" class="form-control" id="payment_term" name="payment_term">
                            </div>
                            <div class="col">
                                <label for="supplier_input" class="form-label">Mata uang</label>
                                <input type="text" class="form-control" id="supplier_input" name="supplier_input">
                            </div>
                        </div>
                        <!-- ... sisa konten ... -->
                           <!-- Tabel Data -->
                           <table class="table">
                            <thead>
                                <tr>
                                    <th>No Order</th>
                                    <th>Kd. Barang</th>
                                    <th>Nama Barang</th>
                                    <th>Sub Kategori</th>
                                    <th>Ket. Order</th>
                                    <th>Ket. Internal</th>
                                    <th>Kty</th>
                                    <th>Satuan</th>
                                    <th>Qty Delay</th>
                                    <th>Harga</th>
                                    <th>Subtotal</th>
                                    <th>PPN</th>
                                    <th>Harga Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Baris-baris tabel yang dapat diisi akan ditambahkan melalui JavaScript atau PHP/Laravel -->
                                <!-- Contoh baris kosong -->
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
                                </tr>     </tr>
                            </tbody>
                        </table>
                    <!-- Buttons -->
                        <div class="d-flex justify-content-end">
                              <button class="btn btn-primary me-2" onclick="printData()">Print</button>
                              <button class="btn btn-danger" onclick="exitPage()">Exit</button>
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
            }
        </script>
        @endsection
