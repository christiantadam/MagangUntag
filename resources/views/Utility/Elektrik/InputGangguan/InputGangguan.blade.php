@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gangguan Elektrik</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form">
                            <div class="row-24 d-flex">
                                <div class="col-5">
                                    <div class="col-8">
                                        <label class="tanggal">Tanggal</label>
                                        <input type="date" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan"
                                            class="input mb-3">
                                        <div class="divisi_pelapor">Divisi Pelapor</div>
                                        <select name="divisi_pelapor" id="divisi_pelapor" class="form-control mb-2">
                                            <option value="divisi1">Divisi 1</option>
                                            <option value="divisi2">Divisi 2</option>
                                            <option value="divisi3">Divisi 3</option>
                                        </select>
                                        <div class="nama_pelapor">Nama Pelapor</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Penerima Laporan</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor"
                                            class="form-control mb-2" placeholder="">
                                        <div class="jam_lapor">Jam Lapor</div>
                                        <input type="time" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan"
                                            class="input mb-3">
                                        <div class="jam_lapor">Jam Perbaikan</div>
                                        <input type="time" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan"
                                            class="input mb-3">
                                        <div class="jam_lapor">Jam Selesai</div>
                                        <input type="time" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan"
                                            class="input mb-3">



                                    </div>
                                </div>
                                <div class="col-5">
                                    <div class="row-4">

                                        <div class="nama_pelapor">Type Gangguan</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor">
                                        <div class="nama_pelapor">Penyebab</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor">
                                        <div class="nama_pelapor">Penyelesaian</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor">
                                        <div class="nama_pelapor">Keterangan</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor">
                                        <div class="nama_pelapor">Teknisi</div>
                                        <select name="divisi_pelapor" id="divisi_pelapor"
                                            class="form-control form-control-sm mb-2" style="width: 140px;"></select>
                                        <input type="checkbox" name="agree" id="agree">
                                        <label for="agree">Lanjut</label>

                                        <div class="nama_pelapor">Gambar 1</div>
                                        <select name="divisi_pelapor" id="divisi_pelapor"
                                            class="form-control form-control-sm mb-2" style="width: 140px;"></select>
                                        <div class="nama_pelapor">Ket. Gambar 1</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor">
                                        <div class="nama_pelapor">Gambar 2</div>
                                        <select name="divisi_pelapor" id="divisi_pelapor"
                                            class="form-control form-control-sm mb-2" style="width: 140px;"></select>
                                        <div class="nama_pelapor">Ket. Gambar 2</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor">

                                    </div>
                                    <div class="row-2">
                                    </div>
                                    <div class="row-2">

                                    </div>
                                </div>
                                <div class="col-2 d-grid gap-4 d-md-block">
                                    <button type="button" class="btn btn-primary w-100 mt-3">Input</button>
                                    <button type="button" class="btn btn-primary w-100 mt-2">Koreksi</button>
                                    <button type="button" class="btn btn-primary w-100 mt-2">Hapus</button>

                                    <button type="button" class="btn btn-primary w-100 mt-5">Proses</button>
                                    <button type="button" class="btn btn-primary w-100 mt-2">Batal</button>
                                    <button type="button" class="btn btn-primary w-100 mt-2">Keluar</button>

                                </div>
                            </div>


                        </div>
                        <label class="">Filter</label>
                        <div class="row-24 d-flex mt-4">

                            <label for="">Bulan</label>
                            <input type="date" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan"
                                class="input mb-3 ml-1">
                            <label for=""class="ml-3">S/D</label>
                            <input type="date" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan"
                                class="input mb-3 ml-1 ">
                            <label for="" class="ml-3">Divisi Pelapor</label>
                            <select name="divisi_pelapor" id="divisi_pelapor" class="form-control mb-2 ml-1"
                                style="width: 120px;"></select>
                            <button type="button" style="height: 30px" class="btn btn-primary ml-3">Refresh</button>
                        </div>
                        <div id="div_tablePO" class="acs-form3">
                            <table class="table">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Tanggal</th>
                                        <th scope="col">Div. Pelapor </th>
                                        <th scope="col">Pelapor</th>
                                        <th scope="col">Penerima Laporan</th>
                                        <th scope="col">Jam Lapor</th>
                                        <th scope="col">Jam Perbaikan</th>
                                        <th scope="col">Jam Selesai</th>
                                        <th scope="col">Type Gangguan</th>
                                        <th scope="col">Penyebab</th>
                                        <th scope="col">Penyelesaian</th>
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
@endsection
