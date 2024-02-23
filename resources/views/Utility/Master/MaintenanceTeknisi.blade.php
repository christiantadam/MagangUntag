@extends('layouts.appUtility')
@section('title', 'Maintenance Teknisi')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Gangguan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-10 p-2">
                                <input type="hidden" id="hiddenIdTeknisi">
                                <div class="acs-div-filter mb-2">
                                    <label for="teknisi">Teknisi</label>
                                    <input type="text" class="form-control" id="teknisi">
                                </div>
                                <div class="table-responsive">
                                    <table class="table" id="table-teknisi">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Aksi</th>
                                                <th scope="col">Teknisi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-lg-2 p-4">
                                <div class="acs-div-filter pt-3">
                                    <button class="btn btn-primary w-100" type="button" id="saveButton">Proses</button>
                                </div>
                                <div class="d-flex gap-2 justify-content-end flex-wrap pt-4">
                                    <button id="refreshButton" class="btn btn-primary w-100 mb-2">Refresh</button>
                                    <button class="btn btn-primary w-100 mb-2" type="button"
                                        id="updateButton">Koreksi</button>
                                    <button class="btn btn-primary w-100 mb-2" type="button"
                                        id="deleteButton">Hapus</button>
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
