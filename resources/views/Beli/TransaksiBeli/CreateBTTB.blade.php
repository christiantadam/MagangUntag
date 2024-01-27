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
                        <div class="row">
                            <div class="col-md-3 mb-2">
                                <label for="nobttb" class="form-label">No. BTTB</label>
                                <input type="text" class="form-control" id="nobttb" name="nobttb">
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
                                <input type="date" class="form-control" id="tglbttb" name="tglbttb" value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="nopib" class="form-label">No. PIB</label>
                                <input type="text" class="form-control" id="nopib" name="nopib">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="tglsppb" class="form-label">Tgl. SPPB BC</label>
                                <input type="date" class="form-control" id="tglsppb" name="tglsppb" value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="tglregis" class="form-label">Tgl. Rgistrasi</label>
                                <input type="date" class="form-control" id="tglregis" name="tglregis" value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="supplier" class="form-label">Supplier</label>
                                <input type="text" class="form-control" id="supplier" name="supplier">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="nopibext" class="form-label">No. PIB Ext</label>
                                <input type="float" class="form-control" id="nopibext" name="nopibext">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="skbm" class="form-label">No SKBM</label>
                                <input type="float" class="form-control" id="skbm" name="skbm">
                            </div>
                            <div class="col-md-3 mb-2">
                                <label for="kodehs" class="form-label">Kode HS</label>
                                <input type="float" class="form-control" id="kodehs" name="kodehs">
                            </div>
                            <div class="col-md-3">
                                <label for="po" class="form-label">No. PO</label>
                                <input type="text" class="form-control" id="po" name="po">
                            </div>
                            <div class="col-md-3">
                                <label for="tglpib" class="form-label">Tgl PIB</label>
                                <input type="date" class="form-control" id="tglpib" name="tglpib" value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3">
                                <label for="tglskbm" class="form-label">Tgl. SKBM</label>
                                <input type="float" class="form-control" id="tglskbm" name="tglskbm">
                            </div>
                        </div>
                        <div class="mb-10 m-5">
                            <div class="table-responsive">
                                <table class="mx-auto w-750 table sm " id="tabelcreate">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>No Order</th>
                                            <th>Kd Barang</th>
                                            <th>Nama Barang</th>
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
                                            <th>IDRPPN</th>
                                            <th>IDRtotal</th>
                                            <th>MataUang</th>
                                            <th>Disc</th>
                                            <th>Disc H</th>
                                            <th>DiscIDR</th>
                                            <th>QtyRetc</th>

                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="row mb-3 m-1">
                            <div class="col-md-4">
                                <label for="nomororder" class="form-label">Nomor Order</label>
                                <input type="text" class="form-control" id="nomororder" name="nomororder">
                            </div>
                            <div class="col-md-4">
                                <label for="kurs" class="form-label">Kurs</label>
                                <input type="text" class="form-control" id="kurs" name="kurs">
                            </div>
                            <div class="col-md-4">
                                <label for="matauang" class="form-label">Mata Uang</label>
                                <input type="text" class="form-control" id="matauang" name="matauang">
                            </div>
                            <div class="col-md-4">
                                <label for="kdbarang" class="form-label">Kd. Barang</label>
                                <input type="text" class="form-control" id="kdbarang" name="kdbarang">
                            </div>
                            <div class="col-md-4">
                                <label for="hargaunit" class="form-label">Harga Unit</label>
                                <input type="text" class="form-control" id="hargaunit" name="hargaunit">
                            </div>
                            <div class="col-md-4">
                                <label for="idr" class="form-label">IDR Unit</label>
                                <input type="text" class="form-control" id="idr" name="idr">
                            </div>
                            <div class="col-md-4">
                                <label for="namabarang" class="form-label">Nama Barang</label>
                                <input type="text" class="form-control" id="namabarang" name="namabarang">
                            </div>
                            <div class="col-md-4">
                                <label for="disc" class="form-label">Discount</label>
                                <input type="text" class="form-control" id="disc" name="disc">
                            </div>
                            <div class="col-md-4">
                                <label for="idrdisc" class="form-label">IDR Discount</label>
                                <input type="text" class="form-control" id="idrdisc" name="idrdisc">
                            </div>
                            <div class="col-md-4">
                                <label for="subkategori" class="form-label">Sub Kategori</label>
                                <input type="text" class="form-control" id="subkategori" name="subkategori">
                            </div>
                            <div class="col-md-4">
                                <label for="hargasub" class="form-label">Harga Sub Total</label>
                                <input type="text" class="form-control" id="hargasub" name="harga">
                            </div>
                            <div class="col-md-4">
                                <label for="idrsubtotal" class="form-label">IDR SubTotal</label>
                                <input type="text" class="form-control" id="idrsubtotal" name="idrsubtotal">
                            </div>
                            <div class="col-md-4">
                                <label for="Qtyordered" class="form-label">Qty ordered</label>
                                <input type="text" class="form-control" id="Qtyordered" name="Qtyordered">
                            </div>
                            <div class="col-md-2">
                                <label for="qtyremaining" class="form-label">Qty Remaining</label>
                                <input type="text" class="form-control" id="qtyremaining" name="qtyremaining">
                            </div>
                            <div class="col-md-2">
                                <label for="hargatotal" class="form-label">Harga Total</label>
                                <input type="text" class="form-control" id="hargatotal" name="hargatotal">
                            </div>
                            <div class="col-md-2 mb-5">
                                <label for="idrtotal" class="form-label">IDR Total</label>
                                <input type="text" class="form-control" id="idrtotal" name="idrtotal">
                            </div>
                            <div class="col-md-12 d-flex justify-content-end pb-4">
                                <div class="col-md-12 d-flex justify-content-end">
                                    <button type="button" class="btn btn-primary btn-lg mr-3" onclick="updateData()">Update</button>
                                    <button type="button" class="btn btn-danger btn-lg mr-3" onclick="removeData()">Remove</button>
                                    <button type="button" class="btn btn-success btn-lg mr-3" onclick="postBTTB()">Post BTTB</button>
                                    <button type="button" class="btn btn-secondary btn-lg" onclick="exit()">Exit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/CreateBTTB.js') }}"></script>
@endsection
