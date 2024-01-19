@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div id="alertContainer"></div>
                <div class="card">
                    <div class="card-header">Input Perawatan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-6 p-4">
                                <input type="hidden" id="hiddenNomorPerawatan">
                                <div class="acs-div-filter pt-4">
                                    <label for="tanggal">Tanggal</label>
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="Mesin">Mesin</label>
                                    <select class="form-select" id="select_mesin" aria-label="Default select example">
                                        <option selected disabled>Pilih Mesin..</option>
                                        @foreach ($mesin as $data)
                                            <option value="{{ $data->NoMesin }}">
                                                {{ $data->NamaMesin }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="jam_operasi">Jam Operasi</label>
                                    <input type="number" class="form-control" id="jam_operasi" name="jam_operasi"
                                        placeholder="Contoh : 8, 9, 10">
                                </div>
                            </div>
                            <div class="col-lg-6 p-4">
                                <div class="acs-div-filter pt-4">
                                    <label for="sparepart">Sparepart</label>
                                    <select class="form-select" id="select_sparepart" aria-label="Default select example">
                                        <option selected disabled>Pilih Sparepart..</option>
                                        @foreach ($part as $data)
                                            <option value="{{ $data->IdPart }}">{{ $data->NamaPart }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="keterangan">Keterangan</label>
                                    <select class="form-select" id="select_keterangan" aria-label="Default select example">
                                        <option selected disabled>Pilih keterangan...</option>
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="teknisi">Teknisi</label>
                                    <select class="form-select" id="select_teknisi" aria-label="Default select example">
                                        <option selected disabled>Pilih Teknisi...</option>
                                        @foreach ($teknisi as $data)
                                            <option value="{{ $data->NamaTeknisi }}">
                                                {{ $data->NamaTeknisi }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-12 p-4">
                                <div class="d-flex gap-2 justify-content-end flex-wrap">
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
                                <div class="col-md-6 mt-2">
                                    <div class="d-flex gap-2 mb-2">
                                        <label for="tanggal">Filter</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <h6 class="mt-2">Tanggal</h6>
                                        <input type="date" class="form-control" id="tanggal-awal" name="date1">
                                        <h6 class="mt-2">S/D</h6>
                                        <input type="date" class="form-control" id="tanggal-akhir" name="date2">
                                    </div>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <div class="d-flex gap-2 mb-2">
                                        <label for="tanggal">Mesin</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <select class="form-select" aria-label="Default select example" name="NoMesin"
                                            id="NoMesinSearch">
                                            <option selected value="0">Pilih Semua Mesin..</option>
                                            @foreach ($mesin as $data)
                                                <option value="{{ $data->NoMesin }}">
                                                    {{ $data->NamaMesin }}</option>
                                            @endforeach
                                        </select>
                                        <button id="refreshButton" class="btn btn-primary">Refresh</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped" id="table-perawatan">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Aksi</th>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Mesin</th>
                                            <th scope="col">Jam Operasi</th>
                                            <th scope="col">Sparepart</th>
                                            <th scope="col">Keterangan</th>
                                            <th scope="col">Teknisi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script> --}}
    <script src="{{ asset('js/Utility/Compressor/InputPerawatan.js') }}"></script>
@endsection
