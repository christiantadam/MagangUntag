@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input PLN</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <form class="form" method="POST" enctype="multipart/form-data" id="form_pdam">
                            {{ csrf_field() }}
                            <div class="row-12 d-flex flex-wrap">
                                <div class="col-lg-6 p-4">
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
                                        <input type="text" class="form-control" id="lwbp" name="lwbp"
                                            placeholder="Masukkan LWBP...">
                                    </div>
                                </div>
                                <div class="col-lg-6 p-4">
                                    <div class="acs-div-filter pt-4">
                                        <label for="wbp">WBP</label>
                                        <input type="text" class="form-control" id="wbp" name="wbp"
                                            placeholder="Masukkan WBP...">
                                    </div>
                                    <div class="acs-div-filter pt-4">
                                        <label for="kvar">KVAR</label>
                                        <input type="text" class="form-control" id="kvar" name="kvar"
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
                                <div class="col-md-12">
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
                                <table class="table mt-2">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Jam</th>
                                            <th scope="col">LWBP</th>
                                            <th scope="col">WBP</th>
                                            <th scope="col">KVAR</th>
                                            <th scope="col">Teknisi</th>
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
                            <div class="col-lg-12 p-0 mt-4">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <button class="btn btn-primary mb-2" type="button">Panel SDP</button>
                                    <button class="btn btn-primary mb-2" type="button">Berita Acara</button>
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
