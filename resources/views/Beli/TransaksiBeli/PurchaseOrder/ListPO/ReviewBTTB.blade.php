@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/CreateBTTB.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <script>
        let loadPermohonanData = {!! json_encode($loadPermohonan) !!};
        let loadHeaderData = {!! json_encode($loadHeader) !!};
        let No_BTTB = {!! json_encode($No_BTTB) !!};
    </script>
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
                    <div class="card-header">Review BTTB</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row">
                            <div class="col-md-3 mb-2">
                                <label for="nobttb" class="form-label">No. BTTB</label>
                                <input name="nobttb" class="form-control" id="nobttb"
                                    value="{{ $No_BTTB }}"readonly>
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="nosj" class="form-label">No. SJ</label>
                                <input type="text" class="form-control" id="nosj" name="nosj">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="sppb" class="form-label">No. SPPB BC</label>
                                <input type="text" class="form-control" id="sppb" name="sppb">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="registrasi" class="form-label">No. Registrasi</label>
                                <input type="text" class="form-control" id="registrasi" name="registrasi">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="tglbttb" class="form-label">tgl BTTB</label>
                                <input type="date" class="form-control" id="tglbttb" name="tglbttb"
                                    value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="nopib" class="form-label">No. PIB</label>
                                <input type="text" class="form-control" id="nopib" name="nopib">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="tglsppb" class="form-label">Tgl. SPPB BC</label>
                                <input type="date" class="form-control" id="tglsppb" name="tglsppb"
                                    value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="tglregis" class="form-label">Tgl. Rgistrasi</label>
                                <input type="date" class="form-control" id="tglregis" name="tglregis"
                                    value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="supplier" class="form-label">Supplier</label>
                                <input type="text" class="form-control" id="idSupplier" name="idSupplier"
                                    style="display: none;"readonly>
                                <input type="text" class="form-control" id="supplier" name="supplier"readonly>
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="nopibext" class="form-label">No. PIB Ext</label>
                                <input type="text" class="form-control" id="nopibext" name="nopibext">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="skbm" class="form-label">No SKBM</label>
                                <input type="text" class="form-control" id="skbm" name="skbm">
                            </div>
                            <div class="col-md-3 mb-2">

                            </div>
                            <div class="col-md-3">
                                <label for="po" class="form-label">No. PO</label>
                                <input type="text" class="form-control" id="po" name="po" readonly>
                            </div>
                            <div class="col-md-3">
                                <label for="tglpib" class="form-label">Tgl PIB</label>
                                <input type="date" class="form-control" id="tglpib" name="tglpib"
                                    value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3">
                                <label for="tglskbm" class="form-label">Tgl. SKBM</label>
                                <input type="date" class="form-control" id="tglskbm" name="tglskbm"
                                    value="{{ date('Y-m-d') }}">
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="table-responsive">
                                <table class="mx-auto table table-bordered" id="tabelcreate">
                                    <thead class="table-primary">
                                        <tr>
                                            <th>No Order</th>
                                            <th>Kd Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Sub Kategori</th>
                                            <th>Satuan</th>
                                            <th>Qty</th>
                                            <th>Qty Received</th>
                                            <th>Qty Remaining</th>
                                            <th>Mata Uang</th>
                                            <th>Harga Unit</th>
                                            <th>Subtotal</th>
                                            <th>Discount</th>
                                            <th>PPN</th>
                                            <th>Harga Total</th>
                                            <th>Kurs</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-md-12 d-flex justify-content-end pb-4">
                                <div class="col-md-12 d-flex justify-content-end">
                                    <button type="button" class="btn btn-success btn-lg mr-3" id="post_btn">Print</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/OrderPembelian/ReviewBTTB/ReviewBTTB.js') }}"></script>
@endsection
