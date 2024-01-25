@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/CreateSPPB.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <script>
        let loadPermohonanData = {!! json_encode($loadPermohonan) !!};
        let loadHeaderData = {!! json_encode($loadHeader) !!};
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
                    <div class="card-header">Create Purchase Order</div>
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="nomor_purchaseOrder">No. PO</label>
                                    </div>
                                    <div class="col-10">
                                        <input type="text" name="nomor_purchaseOrder" id="nomor_purchaseOrder"
                                            class="input w-100" value="{{ $No_PO }}">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="supplier">Supplier</label>
                                    </div>
                                    <div class="col-10">
                                        <select class="input w-100" name="supplier_select" id="supplier_select">
                                            <option selected disabled>-- Pilih Supplier --</option>
                                            @foreach ($supplier as $data)
                                                <option value="{{ $data->NO_SUP }}">{{ $data->NM_SUP }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="payment_term">Payment Term</label>

                                    </div>
                                    <div class="col-10">
                                        <select class="input w-100" name="payment_termSelect" id="payment_termSelect">
                                            <option selected disabled>-- Choose Payment Term --</option>
                                            @foreach ($listPayment as $data)
                                                <option value="{{ $data->Kode }}">{{ $data->Pembayaran }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="tanggal_mohonKirim">Tanggal Mohon Kirim</label>
                                    </div>
                                    <div class="col-10">
                                        <input type="date" name="tanggal_mohonKirim" id="tanggal_mohonKirim"
                                            class="input w-100">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="tanggal_purchaseOrder">Tanggal PO</label>
                                    </div>
                                    <div class="col-10">
                                        <input type="date" name="tanggal_purchaseOrder" id="tanggal_purchaseOrder"
                                            class="input w-100">
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 col-xl-4">
                                <div class="row align-items-center">
                                    <div class="col-2">
                                        <label for="mata_uang">Mata Uang</label>

                                    </div>
                                    <div class="col-10">
                                        <select class="input w-100" name="mata_uangSelect" id="mata_uangSelect">
                                            <option selected disabled>-- Pilih Mata Uang --</option>
                                            @foreach ($mataUang as $data)
                                                <option value="{{ $data->Id_MataUang }}">{{ $data->Nama_MataUang }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="div_tablePO" class="acs-form-table">
                            <table id="table_CreatePurchaseOrder" class="table table-bordered table-striped"
                                style="width:100%">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>No Order</th>
                                        <th>Kd. Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Sub Kategori</th>
                                        <th>Ket. Order</th>
                                        <th>Ket. Internal</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>Qty Delay</th>
                                        <th>Harga Unit</th>
                                        <th>Sub Total</th>
                                        <th>PPN</th>
                                        <th>Harga Total</th>
                                        <th>Kurs</th>
                                        <th>IDR Unit</th>
                                        <th>IDR Subtotal</th>
                                        <th>IDRPPN</th>
                                        <th>IDRTotal</th>
                                        <th>Disc (%)</th>
                                        <th>Discount</th>
                                        <th>Disc. IDR</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="no_po">Nomor Order</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="no_po" id="no_po" class="input w-100"
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
                                            <input type="text" name="kode_barang" id="kode_barang" class="input w-100"
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
                                            <input type="text" name="nama_barang" id="nama_barang" class="input w-100"
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
                                                class="input w-100" readonly>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="keterangan_order">Keterangan Order</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="keterangan_order" id="keterangan_order"
                                                class="input w-100" value="-" readonly>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="keterangan_internal">Keterangan Internal</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="keterangan_internal" id="keterangan_internal"
                                                class="input w-100" value="-" readonly>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mb-2">
                                    <div class="row align-items-center">
                                        <div class="col-4">
                                            <label for="alasan_reject">Alasan Reject</label>
                                        </div>
                                        <div class="col-8 col-md-6">
                                            <input type="text" name="alasan_reject" id="alasan_reject"
                                                class="input w-100">

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
                                                    <label for="qty_order">Qty Order</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="qty_order" id="qty_order"
                                                        class="input w-100" value="0">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="qty_delay">Qty Delay</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="qty_delay" id="qty_delay"
                                                        class="input w-100" value="0">
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
                                                    <label for="kurs">Kurs</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="kurs" id="kurs"
                                                        class="input w-100" value="1">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-4">
                                                    <label for="disc">Disc %</label>
                                                </div>
                                                <div class="col-8">
                                                    <input type="text" name="disc" id="disc"
                                                        class="input w-100" value="0">
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
                                                        class="input w-100" value="0">
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
                                                        class="input w-100" value="0" readonly>
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
                                                        class="input w-100" value="0" readonly>
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
                                                        class="input w-100" value="0" readonly>
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
                                                        class="input w-100" value="0" readonly>
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
                                                        class="input w-100" value="0" readonly>
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
                                                        class="input w-100" readonly>
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
                                                        class="input w-100" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col-12">
                                <button class="btn btn-success" id="btn_update">Update</button>
                                <button class="btn btn-info" id="btn_remove">Remove</button>
                                <button class="btn btn-danger" id="btn_reject">Reject</button>
                                <button class="btn btn-success" id="btn_reject">Post PO</button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <script src="{{ asset('js/OrderPembelian/CreateSPPB.js') }}"></script>
        @endsection
