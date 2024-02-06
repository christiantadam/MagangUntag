@extends('layouts.appUtility')
@section('content')
    <link href="{{ asset('css/printProject.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Print Project</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <label class="">Filter</label>
                        <div class="row-24 d-flex mt-4">
                            <label for="">Bulan</label>
                            <input type="number" name="tanggal_dibutuhkan" id="bulan" min="0"
                                class="input mb-3 ml-1">
                            <label for=""class="ml-3">Tahun</label>
                            <input type="number" name="tanggal_dibutuhkan" id="tahun" min="0"
                                class="input mb-3 ml-1 ">
                            <button type="button" style="height: 30px" class="btn btn-primary ml-3"
                                id="refreshButton">Refresh</button>
                        </div>
                        <div id="div_tablePO" class="acs-form3">
                            <table class="table" id="tabel_print_project">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            <input type="checkbox" name="agree" id="checkbox_project">
                                        </th>
                                        <th scope="col">Nama Project</th>
                                        <th scope="col">Nama Mesin </th>
                                        <th scope="col">Tanggal Mulai</th>
                                        <th scope="col"> Tanggal Selesai</th>
                                        <th scope="col">Keterangan Kerja </th>
                                        <th scope="col">Keterangan</th>
                                        <th scope="col">User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="previewTitle mt-2 d-flex justify-content-between align-items-center">
                            <h3 class="text-center mb-0">Main Report</h3>
                            <!-- Add a print button -->
                            <button type="button" class="btn btn-secondary mt-3" onclick="window.print()">Print
                                Preview</button>
                        </div>
                        <div id="previewSection" class="mt-4 d-flex justify-content-center">
                            <div id="previewData">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src="{{ asset('js/Utility/Project/PrintProject.js') }}"></script>
@endsection
