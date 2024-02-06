@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}}
        <div class="row justify-content-center">
            <div class="col-md-20 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gangguan Elektrik</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form">
                            <div class="row-24 d-flex flex-wrap">
                                <div class="col-5">
                                    <div class="col-md-8">
                                        <input type="hidden" id="id_laporan">
                                        <label class="tanggal">Tanggal</label>
                                        <input type="date" name="tanggal_dibutuhkan" id="tanggal" class="input mb-3">
                                        <div class="divisi_pelapor">Divisi Pelapor</div>
                                        <select name="divisi_pelapor" id="divisi_pelapor1" class="form-control mb-2">
                                            <option value="pilih divisi">
                                                @foreach ($divisi as $divisi_pelapor)
                                            <option value="{{ $divisi_pelapor->Id_divisi }}">
                                                {{ $divisi_pelapor->Nama_divisi }}</option>
                                            @endforeach
                                        </select>
                                        <div class="nama_pelapor">Nama Pelapor</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Penerima Laporan</div>
                                        <input type="text" name="nama_pelapor" id="penerima_laporan"
                                            class="form-control mb-2" placeholder="">
                                        <div class="jam_lapor">Jam Lapor</div>
                                        <input type="time" name="tanggal_dibutuhkan" id="jam_lapor" class="input mb-3">
                                        <div class="jam_lapor">Jam Perbaikan</div>
                                        <input type="time" name="tanggal_dibutuhkan" id="jam_perbaikan"
                                            class="input mb-3">
                                        <div class="jam_lapor">Jam Selesai</div>
                                        <input type="time" name="tanggal_dibutuhkan" id="jam_selesai" class="input mb-3">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="row-4">
                                        <div class="nama_pelapor">Type Gangguan</div>
                                        <input type="text" name="nama_pelapor" id="tipe_gangguan">
                                        <div class="nama_pelapor">Penyebab</div>
                                        <input type="text" name="nama_pelapor" id="penyebab">
                                        <div class="nama_pelapor">Penyelesaian</div>
                                        <input type="text" name="nama_pelapor" id="penyelesaian">
                                        <div class="nama_pelapor">Keterangan</div>
                                        <input type="text" name="nama_pelapor" id="keterangan">
                                        <div class="nama_pelapor">Teknisi</div>
                                        <select name="divisi_pelapor" id="teknisi"
                                            class="form-control form-control-sm mb-2" style="width: 140px;">
                                            @foreach ($teknisi as $nama_teknisi)
                                                <option value="{{ $nama_teknisi->Nama }}">{{ $nama_teknisi->Nama }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <input type="checkbox" name="agree" id="agree">
                                        <label for="agree">Lanjut</label>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <label for="gambar1" id="namagambar1" class="btn btn-link btn-1">Pilih Gambar 1</label>
                                    <input type="file" id="gambar1" name="fileInput" style="display: none;"
                                        accept="image/*">
                                    <div id="imagePreviewContainer1">
                                        <img id="hasil_gambar1" src="" alt="Preview 1"
                                            style="display: none; max-width: 100%; height: auto;">
                                    </div>
                                    <div class="ket_gambar1">Ket. Gambar 1</div>
                                    <input type="text" name="ket_gambar1" id="ket_gambar1" class="mb-1">
                                    <label for="gambar2" id="namagambar2" class="btn btn-link btn-2">Pilih Gambar 2</label>
                                    <input type="file" id="gambar2" name="fileInput" style="display: none;"
                                        accept="image/*">
                                    <div id="imagePreviewContainer2">
                                        <img id="hasil_gambar2" src="" alt="Preview 2"
                                            style="display: none; max-width: 100%; height: auto;">
                                    </div>
                                    <div class="ket_gambar2">Ket. Gambar 2</div>
                                    <input type="text" name="ket_gambar2" id="ket_gambar2" class="mb-1">
                                </div>
                                <div class="col-1 d-grid gap-4 d-md-block">
                                    <button type="button" class="btn btn-primary w-100 mt-3"
                                        id="inputButton">Input</button>
                                    <button type="button"
                                        class="btn btn-primary w-100 mt-2"id="koreksiButton">Koreksi</button>
                                    <button type="button"
                                        class="btn btn-primary w-100 mt-2"id="hapusButton">Hapus</button>
                                    <button type="button"
                                        class="btn btn-primary w-100 mt-5"id="prosesButton">Proses</button>
                                    <button type="button"
                                        class="btn btn-primary w-100 mt-2"id="batalButton">Batal</button>
                                </div>
                            </div>
                        </div>
                        <label class="mt-3">Filter</label>
                        <div class="row-24 d-flex mt-1">
                            <label for="">Bulan</label>
                            <input type="date" name="tanggal_dibutuhkan" id="bulan" class="input mb-3 ml-1">
                            <label for=""class="ml-3">S/D</label>
                            <input type="date" name="tanggal_dibutuhkan" id="sampaiDengan" class="input mb-3 ml-1 ">
                            <label for="" class="ml-3">Divisi Pelapor</label>
                            <select name="divisi_pelapor" id="divisi_pelapor2" class="form-control mb-2 ml-1"
                                style="width: 270px;">
                                <option value="pilih divisi">
                                    @foreach ($divisi as $divisi_pelapor)
                                <option value="{{ $divisi_pelapor->Id_divisi }}">
                                    {{ $divisi_pelapor->Nama_divisi }}</option>
                                @endforeach
                                </option>
                            </select>
                            <button type="button" style="height: 30px" class="btn btn-primary ml-3"
                                id="refreshButton">Refresh</button>
                        </div>
                        <div>
                            <table class="table" id="tabel_input_gangguan">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            <input type="checkbox" name="agree" id="checkbox_tabel">
                                        </th>
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
    <script src="{{ asset('js/Utility/Elektrik/InputGangguan.js') }}"></script>
@endsection
