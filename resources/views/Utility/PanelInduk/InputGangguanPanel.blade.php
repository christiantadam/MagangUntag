@extends('layouts.appUtility')
@section('title', 'Input Gangguan Panel')
@section('content')
    @include('Utility.PanelInduk.InputKetGangguan')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Gangguan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-6 p-4">
                                <input type="hidden" id="hiddenNomorpanel">
                                <div class="acs-div-filter pt-4">
                                    <label for="tanggal">Tanggal</label>
                                    <input type="date" class="form-control" id="tanggal"
                                        placeholder="name@example.com">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="feeder">Feeder Line</label>
                                    <select class="form-select" aria-label="Default select example" id="feeder">
                                        <option selected disabled>Pilih Feeder Line..</option>
                                        <option value="KK">KK</option>
                                        <option value="PC">PC</option>
                                        <option value="TR">TR</option>
                                        <option value="Mlr Gi-Nganjuk">Mlr Gi-Nganjuk</option>
                                        <option value="Mlr Gi-Ngluyu">Mlr Gi-Ngluyu</option>
                                        <option value="MJS Gi-Tarik">MJS Gi-Tarik</option>
                                        <option value="MJS Gi-Tarik">MJS Gi-Tarik</option>
                                        <option value="MJS Gi-Ngoro">MJS Gi-Ngoro</option>
                                        <option value="Njekek Gi-Kertosono">Njekek Gi-Kertosono</option>
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="jam_gangguan">Jam Gangguan</label>
                                    <input type="time" class="form-control" id="jam_gangguan" name="jam_gangguan"
                                        placeholder="name@example.com">
                                </div>
                            </div>
                            <div class="col-lg-6 p-4">
                                <div class="acs-div-filter pt-4">
                                    <label for="jam_selesai">Jam Selesai</label>
                                    <input type="time" class="form-control" id="jam_selesai" name="jam_selesai"
                                        placeholder="name@example.com">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="ket_gangguan">Ket. Gangguan</label>
                                    <select class="form-select" aria-label="Default select example" id="ket_gangguan">
                                        <option selected disabled>Pilih Keterangan Gangguan...</option>
                                        @foreach ($keterangan as $data)
                                            <option value="{{ $data->Id_gangguan }}">
                                                {{ $data->Ket_gangguan }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="keterangan">Keterangan</label>
                                    <input type="text" class="form-control" id="keterangan" name="keterangan"
                                        placeholder="...">
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
                                <table class="table" id="table-panelinduk">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Aksi</th>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Feeder Line</th>
                                            <th scope="col">Jam Gangguan</th>
                                            <th scope="col">Jam Selesai</th>
                                            <th scope="col">Ket. Gangguan</th>
                                            <th scope="col">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row-12 d-flex flex-wrap">
                                <div class="col-lg-6 p-0">
                                    <div class="acs-div-filter">
                                        <h6 class="mt-3"><strong>Feeder Note : </strong></h6>
                                        <h6 class="mt-3">KK = Kepuh Kiriman</h6>
                                        <h6 class="mt-3">PC = Pondok Candra</h6>
                                        <h6 class="mt-3">TR = Tropodo</h6>
                                    </div>
                                </div>
                                <div class="col-lg-6 p-0">
                                    <div class="d-flex gap-2 pt-4 justify-content-end flex-wrap">
                                        <button class="btn btn-primary mb-2" data-bs-toggle="modal"
                                            data-bs-target="#KetGangguanModal" id="openmodal" type="button">Tambah Ket.Gangguan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Utility/PanelInduk/InputGangguanPanel.js') }}"></script>
@endsection
