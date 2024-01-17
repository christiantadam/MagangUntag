@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/ListOrderPembelian.css') }}" rel="stylesheet">

    <div class="container-fluid ">
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
                    <div class="card-header">Cari Type</div>
                    <div class="card-body">
                        <form action="" id="formDaftarHarga">
                            <div class="scrollmenu">
                                <table id="" class="table table-bordered table-striped" style="width:100%">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Kode Barang</th>
                                            <th>Kategori Utama</th>
                                            <th>Kategori</th>
                                            <th>Sub Kategori</th>
                                            <th>Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-9">
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            Nama Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" id="search_nama_barang" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex flex-column justify-content-between">
                                        <button id="search" class="btn btn-primary mb-2">Search</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/CariType.js') }}"></script>

    @endsection
