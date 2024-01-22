@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/ReturBTTB.css') }}" rel="stylesheet">
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
                    <div class="card-header">Retur BTTB</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="mb-3 col-lg-8">
                            <label for="nomor_po" class="form-label">Kd Barang</label>
                            <input type="text" class="form-control" id="nomor_po" name="nomor_po">
                            <label for="suplier" class="form-label">Kategori Utama</label>
                            <input type="text" class="form-control" id="suplier" name="suplier">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="payment" class="form-label">Kategori</label>
                            <input type="text" class="form-control" id="payment" name="payment">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="tanggal_po" class="form-label">Sub Kategori</label>
                            <input type="date" class="form-control" id="tanggal_po" name="tanggal_po">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="tanggalkirim" class="form-label"> Ket. Khusus</label>
                            <input type="date" class="form-control" id="tanggalkirim" name="tanggalkirim">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="matauang" class="form-label">Nama Barang</label>
                            <input type="text" class="form-control" id="matauang" name="matauang">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="kdbarang" class="form-label">Ket</label>
                            <input type="text" class="form-control" id="kdbarang" name="kdbarang">
                        </div>
                        <label for="namabarang" class="form-label">Jenis Pembelian</label>
                        <div class="row justify-content-between">
                            <div class="col-lg-8">
                                <input type="text" class="form-control" id="namabarang" name="namabarang">
                            </div>
                            <div class="col-lg-4 form-check">
                                <input class="form-check-input float-end" type="checkbox" value="" id="checkbox1">
                                <label class="form-check-label" for="checkbox1">
                                    Barang Sama
                                </label>
                            </div>
                        </div>
                            <div class="ml-4 col-lg-4form-check">
                                <input class="form-check-input" type="checkbox" value="" id="checkbox1">
                                <label class="form-check-label" for="checkbox1">
                                    Barang Sama
                                </label>
                            </div>
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="matauang" class="form-label">Orang Penjaluk</label>
                            <input type="text" class="form-control" id="matauang" name="matauang">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="kdbarang" class="form-label">Satuan Primer</label>
                            <input type="text" class="form-control" id="kdbarang" name="kdbarang">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="namabarang" class="form-label">Satuan Sekunder</label>
                            <input type="text" class="form-control" id="namabarang" name="namabarang">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="namabarang" class="form-label">Satuan Triter</label>
                            <input type="text" class="form-control" id="namabarang" name="namabarang">
                        </div>
                        <div class="mb-3 col-lg-8">
                            <label for="namabarang" class="form-label">Satuan Umum</label>
                            <input type="text" class="form-control" id="namabarang" name="namabarang">
                        </div>
                        <!-- Buttons -->
                        <div class="row align-items-center mt-3">
                            <div class="col-md-12 d-flex justify-content-end">
                                <button class="btn btn-primary" type="submit">ISI</button>
                                <button type="button" class="btn btn-danger">KOREKSI</button>
                                <button type="button" class="btn btn-lg btn-success mr-1">HAPUS</button>
                                <button type="button" class="btn btn-danger">PROGRES</button>
                                <button type="button" class="btn btn-lg btn-success mr-1">BATAL</button>

                            </div>
                        {{-- -------- --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/Retur.js') }}"></script>
@endsection
