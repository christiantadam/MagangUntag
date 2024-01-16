@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/DaftarHarga.css') }}" rel="stylesheet">
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
                    <div class="card-header">Daftar Harga</div>
                    <div class="card-body ">
                        <form action="">
                            <div class="row mt-4">
                                <div class="col-md-9">
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="options" value="kode_barang" >
                                            Kode Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="options" value="nama_barang">
                                            Nama Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="options" value="supplier">
                                            Supplier
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="options" value="user">
                                            User
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex flex-column justify-content-between">
                                        <button class="btn btn-primary mb-2">Redisplay</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/DaftarHarga.js') }}"></script>
    @endsection
