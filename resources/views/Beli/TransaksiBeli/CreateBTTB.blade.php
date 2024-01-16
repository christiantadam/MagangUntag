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
                    <div class="card-header">Create BTTB</div>
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

                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/CreateBTTB.js') }}"></script>
    @endsection