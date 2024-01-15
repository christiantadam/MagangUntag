@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Perawatan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <form class="form" method="POST" enctype="multipart/form-data" action="{{ url('Compressor') }}"
                            id="form_Compressor">
                            {{ csrf_field() }}
                            <div class="row-12 d-flex flex-wrap">
                                <div class="col-6 p-4">
                                    <div class="acs-div-filter p-2">
                                        <label for="tanggal">Tanggal</label>
                                        <input type="date" class="form-control" id="tanggal"
                                            placeholder="name@example.com">
                                    </div>
                                    <div class="acs-div-filter p-2">
                                        <label for="Mesin">Mesin</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Pilih Mesin..</option>
                                            @foreach ($mesin as $data)
                                                <option value="{{ $data->NamaMesin }}">
                                                    {{ $data->NamaMesin }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="acs-div-filter p-2">
                                        <label for="waktu">Jam</label>
                                        <input type="time" class="form-control" name="waktu" id="waktu">
                                    </div>

                                </div>
                                <div class="col-6 p-4">
                                    <div class="acs-div-filter p-2">
                                        <label for="sparepart">Sparepart</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Pilih Sparepart..</option>
                                            @foreach ($part as $data)
                                                <option value="{{ $data->NamaPart }}">
                                                    {{ $data->NamaPart }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="acs-div-filter p-2">
                                        <label for="keterangan">Keterangan : </label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected disabled>Pilih keterangan...</option>
                                            @foreach ($keterangan as $data)
                                                <option value="{{ $data->Keterangan }}">
                                                    {{ $data->Keterangan }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="acs-div-filter p-2">
                                        <label for="teknisi">Teknisi</label>
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected disabled>Pilih Teknisi...</option>
                                            @foreach ($teknisi as $data)
                                                <option value="{{ $data->NamaTeknisi }}">
                                                    {{ $data->NamaTeknisi }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="col-8"></div>
                                <div class="col-4 p-4">
                                    <div class="d-flex gap-2 p-2">
                                        <button class="btn btn-success" type="button">Input</button>
                                        <button class="btn btn-warning" type="button">Koreksi</button>
                                        <button class="btn btn-danger" type="button">Hapus</button>
                                        <button class="btn btn-primary" type="button">Proses</button>
                                        <button class="btn btn-danger" type="button">Batal</button>
                                    </div>
                                </div>


                            </div>
                            <div class="col-12 p-4">
                                <div class="d-flex gap-2 m-3">
                                    <label for="tanggal">Filter</label>
                                </div>
                                <div class="d-flex gap-2 m-3">
                                    <h6 class="mt-2">Tanggal</h6>
                                    <input type="date" class="form-control" id="tanggal-awal"
                                        placeholder="name@example.com">
                                    <h6 class="mt-2">S/D</h6>
                                    <input type="date" class="form-control" id="tanggal-akhir"
                                        placeholder="name@example.com">
                                    <h6 class="mt-2">Mesin</h6>
                                    <select class="form-select" aria-label="Default select example">
                                        <option selected>Pilih Mesin..</option>
                                        @foreach ($mesin as $data)
                                            <option value="{{ $data->NamaMesin }}">
                                                {{ $data->NamaMesin }}</option>
                                        @endforeach
                                    </select>
                                    <button type="button" class="btn btn-primary">Refresh</button>
                                </div>

                                <table class="table ">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Mesin</th>
                                            <th scope="col">Jam Operasi</th>
                                            <th scope="col">Sparepart</th>
                                            <th scope="col">Keterangan</th>
                                            <th scope="col">Teknisi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>Otto</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Jacob</td>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry the Bird</td>
                                            <td>Larry the Bird</td>
                                            <td>Larry the Bird</td>
                                            <td>@twitter</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
@endsection
