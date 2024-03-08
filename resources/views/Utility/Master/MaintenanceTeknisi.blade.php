@extends('layouts.appUtility')
@section('title', 'Maintenance Teknisi')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Gangguan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-10 p-2">
                                <input type="hidden" id="hiddenIdTeknisi">
                                <div class="acs-div-filter mb-2">
                                    <label for="teknisi">Teknisi</label>
                                    <input type="text" name="searchTeknisi" id="searchTeknisi" class="form-control">
                                    <select name="teknisi" id="teknisi" class="form-select mt-3" style="display: none">
                                    </select>
                                    <label for="lokasi" class="mt-3">Lokasi</label>
                                    <select name="lokasi" id="lokasi" class="form-select">
                                        <option selected disabled>Pilih Lokasi</option>
                                        @foreach ($lokasi as $lok)
                                            <option value="{{ $lok->Id_Lokasi }}">
                                                {{ $lok->Lokasi }} - ( {{ $lok->Id_Lokasi }} )</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="table-responsive mt-3">
                                    <table class="table" id="table-teknisi">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Lokasi</th>
                                                <th scope="col">Teknisi</th>
                                                <th scope="col">Aksi</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-2 p-4">
                                <div class="acs-div-filter pt-3">
                                    <button class="btn btn-primary w-100" type="button"
                                        id="saveButtonTeknisi">Proses</button>
                                </div>
                                <div class="d-flex gap-2 justify-content-end flex-wrap pt-4">
                                    <button id="refreshButton" class="btn btn-primary w-100 mb-2">Refresh</button>
                                    <button class="btn btn-primary w-100 mb-2" type="button"
                                        id="updateButtonTeknisi">Koreksi</button>
                                    <button class="btn btn-primary w-100 mb-2" type="button"
                                        id="deleteButtonTeknisi">Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Utility/Master/MaintenanceTeknisi.js') }}"></script>
@endsection
