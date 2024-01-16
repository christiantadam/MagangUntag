@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Gangguan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <form class="form" method="POST" enctype="multipart/form-data" id="form_panel">
                            {{ csrf_field() }}
                            <div class="row-12 d-flex flex-wrap">
                                <div class="col-lg-6 p-4">
                                    <div class="acs-div-filter pt-4">
                                        <label for="tanggal">Tanggal</label>
                                        <input type="date" class="form-control" id="tanggal"
                                            placeholder="name@example.com">
                                    </div>
                                    <div class="acs-div-filter pt-4">
                                        <label for="Mesin">Feeder Line</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Pilih Feeder Line..</option>
                                            @foreach ($mesin as $data)
                                                <option value="{{ $data->NamaMesin }}">
                                                    {{ $data->NamaMesin }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="acs-div-filter pt-4">
                                        <label for="jam_gangguan">Jam Gangguan</label>
                                        <input type="time" class="form-control" id="jam_gangguan" name="jam_gangguan"
                                            placeholder="name@example.com">
                                    </div>
                                    <div class="acs-div-filter pt-4">
                                        <label for="jam_selesai">Jam Selesai</label>
                                        <input type="time" class="form-control" id="jam_selesai" name="jam_selesai"
                                            placeholder="name@example.com">
                                    </div>
                                </div>
                                <div class="col-lg-6 p-4">
                                    <div class="acs-div-filter pt-4">
                                        <label for="status">Ket. Gangguan</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected disabled>Pilih Keterangan Gangguan...</option>
                                            @foreach ($keterangan as $data)
                                                <option value="{{ $data->Ket_gangguan }}">
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
                                        <button class="btn btn-success mb-2" type="button">Input</button>
                                        <button class="btn btn-outline-warning mb-2" type="button">Koreksi</button>
                                        <button class="btn btn-outline-danger mb-2" type="button">Hapus</button>
                                        <button class="btn btn-primary mb-2" type="button">Proses</button>
                                        <button class="btn btn-danger mb-2" type="button">Batal</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                        <div class="col-lg-12 p-4">
                            <div class="row mb-3">
                                <div class="col-md-12 mt-2">
                                    <div class="d-flex gap-2 mb-2">
                                        <label for="tanggal">Filter</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <h6 class="mt-2">Tanggal</h6>
                                        <input type="date" class="form-control" id="tanggal-awal" name="date1"
                                            placeholder="name@example.com">
                                        <h6 class="mt-2">S/D</h6>
                                        <input type="date" class="form-control" id="tanggal-akhir" name="date2"
                                            placeholder="name@example.com">
                                        <button type="submit" class="btn btn-primary">Refresh</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Feeder Line</th>
                                            <th scope="col">Jam Gangguan</th>
                                            <th scope="col">Jam Selesai</th>
                                            <th scope="col">Ket. Gangguan</th>
                                            <th scope="col">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {{-- @foreach ($data as $row)
                                                <tr>
                                                    <td>{{ $row->Tanggal }}</td>
                                                </tr>
                                            @endforeach --}}
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
                                        <button class="btn btn-primary mb-2" type="button">Tambah Ket.Gangguan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
