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
                        <div class="col">
                            <div class="form-check">
                                <div class="row">
                                    <div class="col-4 md-2">
                                        <input class="form-check-input" type="radio" name="radiobutton" id="radiobutton"
                                            value="tanggal">
                                        Betwen Date
                                        <input type="date" class="form-control" id="betwendate1" name="betwendate1">
                                        <label for="" class="form-label"></label>
                                        <input type="date" class="form-control" id="betwendate2" name="betwendate2">
                                        <label for="betwendate2" class="form-label"></label>
                                    </div>

                                    <div class="col-4 md-1">
                                        <input class="form-check-input" type="radio" name="radiobutton" value="nomor_po">
                                        <label class="form-check-label" for="nomor_po">
                                            Nomor PO </label>
                                        <input type="text" class="form-control" id="no_po" name="no_po">
                                        <button class="btn btn-secondary mt-2" id="redisplayButton">Redisplay</button>
                                    </div>
                                </div>
                                <!-- ... sisa konten ... -->
                                <!-- Tabel Data -->
                                <table class ="table mt-4" id="tabelchelsy">

                                    <thead class="table-dark">
                                        <tr>
                                            <th>No po</th>
                                            <th>Status</th>
                                            <th>Tanggal PO</th>
                                            <th>Sub Kategori</th>
                                            <th>Divisi</th>
                                            <th>User PO</th>
                                            {{-- <th>No. BTTB</th> --}}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Baris-baris tabel yang dapat diisi akan ditambahkan melalui JavaScript atau PHP/Laravel -->
                                        <!-- Contoh baris kosong -->
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            {{-- <td contenteditable="true"></td>
                                            <td contenteditable="true"></td>
                                            <td contenteditable="true"></td>
                                            <td contenteditable="true"></td>
                                            <td contenteditable="true"></td>
                                            <td contenteditable="true"></td>
                                            <td contenteditable="true"></td> --}}
                                        </tr>
                                    </tbody>
                                </table>
                                <!-- Buttons -->
                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-danger">Exit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/OrderPembelian/List.js') }}"></script>

    {{-- <script>
        function updateMinDate() {
            var startDate = document.getElementById("betwendate1").value;
            document.getElementById("betwendate2").min = startDate;
        }

        function redisplayData() {
            // Logika untuk menampilkan kembali data
            console.log('Redisplaying data...');
        }

        function exitPage() {
            // Logika untuk keluar dari halaman
            console.log('Exiting...');
        }
    </script> --}}
@endsection
