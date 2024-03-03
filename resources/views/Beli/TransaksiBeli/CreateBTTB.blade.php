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
                                <input name="nobttb" class="form-control" id="nobttb" readonly>
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
                                <select class="form-control" id="supplier" name="supplier" disabled>
                                    <option selected disabled>-- Pilih Supplier --</option>
                                    @foreach ($nosup as $bttb)
                                        <option value="{{ $bttb->NO_SUP }}">{{ $bttb->NM_SUP }}</option>
                                    @endforeach
                                </select>
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
                                <input type="float" class="form-control" id="po" name="po">
                            </div>
                            <div class="col-md-3">
                                <label for="tglpib" class="form-label">Tgl PIB</label>
                                <input type="date" class="form-control" id="tglpib" name="tglpib" value="{{ date('Y-m-d') }}">
                            </div>
                            <div class="col-md-3">
                                <label for="tglskbm" class="form-label">Tgl. SKBM</label>
                                <input type="date" class="form-control" id="tglskbm" name="tglskbm" value="{{ date('Y-m-d') }}">
                            </div>
                        </div>
                        <div class="mt-4">
                            <div class="table-responsive">
                                <table class="mx-auto table table-bordered" id="tabelcreate">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>No Order</th>
                                            <th>Kd Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Sub Kategori</th>
                                            <th>Qty</th>
                                            <th>Satuan</th>
                                            <th>Qty Shipped</th>
                                            <th>Qty Remaining</th>
                                            <th>Harga Unit</th>
                                            <th>Subtotal</th>
                                            <th>PPN</th>
                                            <th>Harga Total</th>
                                            <th>Kurs</th>
                                            <th>IDR Unit</th>
                                            <th>IDR SubTotal</th>
                                            <th>IDR PPN</th>
                                            <th>IDR total</th>
                                            <th>Mata Uang</th>
                                            <th>Disc</th>
                                            <th>Disc Harga</th>
                                            <th>Disc IDR</th>
                                            <th>Qty Received</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="no_po">Nomor Order</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="no_po" id="no_po" class="form-control"
                                                readonly>
                                        </div>

                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="kode_barang">Kode Barang</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="kode_barang" id="kode_barang" class="form-control"
                                                readonly>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="nama_barang">Nama Barang</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="nama_barang" id="nama_barang" class="form-control"
                                                readonly>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="sub_kategori">Sub Kategori</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="sub_kategori" id="sub_kategori"
                                                class="form-control" readonly>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="qty_ordered">QTY Ordered</label>
                                        </div>
                                        <div class="col-6 col-md-4">
                                            <input type="text" name="qty_ordered" id="qty_ordered"
                                                class="form-control" readonly>
                                        </div>
                                        <div class="col-2">
                                            <input type="text" name="ordered_satuan" id="ordered_satuan"
                                                class="form-control" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="qty_ship">QTY Shipped</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="qty_ship" id="qty_ship"
                                                class="form-control" readonly>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="qty_received">QTY Receive</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="qty_received" id="qty_received"
                                                class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="qty_remaining">QTY Remaining</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="qty_remaining" id="qty_remaining"
                                                class="form-control" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="kurs">Kurs</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="kurs" id="kurs"
                                                        class="form-control" value="1">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="mata_uang">Mata Uang</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="mata_uang" id="mata_uang"
                                                        class="form-control" value="IDR" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="disc">Disc %</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="disc" id="disc"
                                                        class="form-control" value="0">
                                                    <input type="text" name="total_disc" id="total_disc"
                                                        class="form-control" value="0">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="idr_total_disc">Idr Discount</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="idr_total_disc" id="idr_total_disc"
                                                        class="form-control" value="0" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="harga_unit">Harga Unit</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="harga_unit" id="harga_unit"
                                                        class="form-control" value="0">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="idr_unit">IDR Unit</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="idr_unit" id="idr_unit"
                                                        class="form-control" value="0" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="harga_sub_total">Harga Sub Total</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="harga_sub_total" id="harga_sub_total"
                                                        class="form-control" value="0" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="idr_sub_total">IDR Sub Total</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="idr_sub_total" id="idr_sub_total"
                                                        class="form-control" value="0" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="ppn">PPN %</label>
                                                </div>
                                                <div class="col-8">
                                                    <select name="ppn_select" id="ppn_select" class="w-100 input">
                                                        <option class="w-100" selected disabled></option>
                                                        @foreach ($ppn as $data)
                                                            <option value="{{ $data->IdPPN }}">{{ $data->JumPPN }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                    <input type="text" name="ppn" id="ppn"
                                                        class="form-control" value="0" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="idr_ppn">IDR PPN</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="idr_ppn" id="idr_ppn"
                                                        class="form-control" value="0" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="harga_total">Harga Total</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="harga_total" id="harga_total"
                                                        class="form-control" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="idr_harga_total">IDR Total</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="idr_harga_total" id="idr_harga_total"
                                                        class="form-control" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-12 d-flex justify-content-end pb-4">
                                <div class="col-md-12 d-flex justify-content-end">
                                    <button type="button" class="btn btn-primary btn-lg mr-3" id="updatedata" onclick="updateData()">Update</button>
                                    <button type="button" class="btn btn-danger btn-lg mr-3"  id="removebutton" onclick="removeData()"> Remove</button>
                                    <button type="button" class="btn btn-success btn-lg mr-3" id="post_btn">Post BTTB</button>
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
