@extends('layouts.appUtility')
@section('title', 'Input PLN')
@section('content')
    @include('Utility.PLN.PanelSDP')
    @include('Utility.PLN.BeritaAcara')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input PLN</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-6 p-4">
                                <input type="hidden" id="hiddenNomorpln">
                                <div class="acs-div-filter pt-4">
                                    <label for="tanggal">Tanggal</label>
                                    <input type="date" class="form-control" id="tanggal"
                                        placeholder="name@example.com">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="jam">Jam</label>
                                    <input type="time" class="form-control" id="jam" name="jam"
                                        placeholder="name@example.com">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="lwbp">LWBP</label>
                                    <input type="number" class="form-control" id="lwbp" name="lwbp"
                                        placeholder="Masukkan LWBP...">
                                </div>
                            </div>
                            <div class="col-lg-6 p-4">
                                <div class="acs-div-filter pt-4">
                                    <label for="wbp">WBP</label>
                                    <input type="number" class="form-control" id="wbp" name="wbp"
                                        placeholder="Masukkan WBP...">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="kvar">KVAR</label>
                                    <input type="number" class="form-control" id="kvar" name="kvar"
                                        placeholder="Masukkan KVAR...">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="teknisi">Teknisi</label>
                                    <input type="text" class="form-control" id="teknisi" name="teknisi"
                                        placeholder="Masukkan Nama Teknisi...">
                                </div>
                            </div>
                            <div class="col-lg-12 p-4">
                                <div class="d-flex gap-2 pt-4 justify-content-end flex-wrap">
                                    <button class="btn btn-success mb-2" type="button" id="inputButton">Input</button>
                                    <button class="btn btn-outline-warning mb-2" type="button"
                                        id="updateButton">Koreksi</button>
                                    <button class="btn btn-outline-danger mb-2" type="button"
                                        id="deleteButton">Hapus</button>
                                    <button class="btn btn-primary mb-2" type="button" id="saveButton">Proses</button>
                                    <button class="btn btn-danger mb-2" type="button" id="cancelButton">Batal</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12 p-4">
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <label for="tanggal" class="fs-5">Filter</label>
                                    </div>
                                    <div class="d-flex align-items-center gap-2 mb-3">
                                        <h6 class="fs-6 mb-0">Tanggal</h6>
                                        <input type="date" class="form-control" id="tanggal-awal" name="date1">
                                        <h6 class="fs-6 mb-0">S/D</h6>
                                        <input type="date" class="form-control" id="tanggal-akhir" name="date2">
                                        <button id="refreshButton" class="btn btn-primary">Refresh</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table mt-2" id="table-pln">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Aksi</th>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Jam</th>
                                            <th scope="col">LWBP</th>
                                            <th scope="col">WBP</th>
                                            <th scope="col">KVAR</th>
                                            <th scope="col">Teknisi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-lg-12 p-0 mt-4">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <button class="btn btn-primary mb-2" data-bs-toggle="modal"
                                        data-bs-target="#modalPanel" type="button">Panel SDP</button>
                                    <button class="btn btn-primary mb-2" data-bs-toggle="modal"
                                        data-bs-target="#modalBerita" type="button">Berita Acara</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Utility/PLN/InputPLN.js') }}"></script>
@endsection
