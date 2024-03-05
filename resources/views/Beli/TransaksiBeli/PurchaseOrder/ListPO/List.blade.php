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
                        <div class="col-12">
                            <div class="row">
                                <div class="col-5 ">
                                    <input class="form-check-input" type="radio" name="radiobutton" id="radiobutton"
                                        checked value="{{ date('Y-m-d') }}">
                                    Betwen Date
                                    <input type="date" class="form-control" id="betwendate1" name="betwendate1">
                                    <label for="betwendate1" class="form-label"> </label>
                                    <input type="date" class="form-control" id="betwendate2" name="betwendate2">
                                    <label for="betwendate2" class="form-label"></label>
                                </div>

                                <div class="col-5">
                                    <input class="form-check-input" type="radio" name="radiobutton" value="nomor_po">
                                    <label class="form-check-label" for="nomor_po">
                                        Nomor PO </label>
                                    <input type="text" class="form-control" id="no_po" name="no_po">
                                </div>
                                <div class="col-2">
                                    <div class="col-12">
                                        <button class="btn btn-primary mt-4 w-100" id="redisplayButton">Redisplay</button>
                                    </div>
                                    <div class="col-12 mt-5">
                                        <span id="lihat_BTTB" class="text-primary" style="cursor: pointer; font-size: 24px; text-decoration: underline">Lihat BTTB</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <table class ="table" id="tabelchelsy" style="width: 100%">
                                <thead class="table-dark">
                                    <tr>
                                        <th>No po</th>
                                        <th>Status</th>
                                        <th>Tanggal PO</th>
                                        <th>Divisi</th>
                                        <th>User</th>
                                        <th>No BTTB</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/OrderPembelian/ListPO/List.js') }}"></script>
@endsection
