@extends('layouts.appUtility')
@section('title', 'Gangguan Elektrik')
@section('content')
    <div class="container-fluid">
        {{-- <meta name="csrf-token" content="{{ csrf_token() }}"> --}}
        <div class="row justify-content-center">
            <div class="col-md-15 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gangguan Elektrik</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form">
                            <div class="row-12 d-flex flex-wrap">
                                <div class="col-3 pt-4">
                                    <div class="">
                                        <input type="hidden" id="id_laporan">
                                        <label class="tanggal">Tanggal</label>
                                        <input type="date" name="tanggal_dibutuhkan" id="tanggal"
                                            class="form-control mb-2">
                                        <label class="divisi_pelapor mb-2">Divisi Pelapor</label>
                                        <select name="divisi_pelapor" id="divisi_pelapor1" class="form-select mb-2">
                                            <option selected disabled>Pilih Divisi Pelapor</option>..</option>
                                            @foreach ($divisi as $divisi_pelapor)
                                                <option value="{{ $divisi_pelapor->Id_divisi }}">
                                                    {{ $divisi_pelapor->Nama_divisi }}</option>
                                            @endforeach
                                        </select>
                                        <div class="nama_pelapor mb-2">Nama Pelapor</div>
                                        <input type="text" name="nama_pelapor" id="nama_pelapor"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor mb-2">Penerima Laporan</div>
                                        <input type="text" name="nama_pelapor" id="penerima_laporan"
                                            class="form-control mb-2" placeholder="">
                                        <div class="jam_lapor mb-2">Jam Lapor</div>
                                        <input type="time" name="jam_lapor" id="jam_lapor" class="input mb-3">
                                        <div class="jam_lapor mb-2">Jam Perbaikan</div>
                                        <input type="time" name="jam_perbaikan" id="jam_perbaikan" class="input mb-3">
                                        <div class="jam_lapor mb-2">Jam Selesai</div>
                                        <input type="time" name="jam_selesai" id="jam_selesai" class="input mb-3">
                                    </div>
                                </div>
                                <div class="col-4 p-4">
                                    <div class="">
                                        <div class="nama_pelapor mb-2 ">Type Gangguan</div>
                                        <input type="text" name="nama_pelapor" id="tipe_gangguan" class="form-control">
                                        <div class="nama_pelapor mb-2 mt-2">Penyebab</div>
                                        <input type="text" name="nama_pelapor" id="penyebab" class="form-control">
                                        <div class="nama_pelapor mb-2 mt-2">Penyelesaian</div>
                                        <input type="text" name="nama_pelapor" id="penyelesaian" class="form-control">
                                        <div class="nama_pelapor mb-2 mt-2">Keterangan</div>
                                        <input type="text" name="nama_pelapor" id="keterangan" class="form-control">
                                        <div class="nama_pelapor mb-2 mt-2">Teknisi</div>
                                        <select name="divisi_pelapor" id="teknisi" class="form-select mb-2"
                                            style="width: 140px;">
                                            @foreach ($teknisi as $nama_teknisi)
                                                <option value="{{ $nama_teknisi->Nama }}">{{ $nama_teknisi->Nama }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <input type="checkbox" name="agree" id="agree">
                                        <label for="agree">Lanjut</label>
                                    </div>
                                </div>
                                <div class="col-3 pt-3 ">
                                    <label for="gambar1" id="namagambar1" class="btn btn-link btn-1">Pilih Gambar 1</label>
                                    <input type="file" id="gambar1" name="fileInput" style="display: none;"
                                        accept="image/*">
                                    <div id="imagePreviwContainer1">
                                        <img id="hasil_gambar1" src="" alt="Preview 1"
                                            style="display: none; max-width: 100%; height: auto;">
                                    </div>
                                    <div class="ket_gambar1 mb-2">Ket. Gambar 1</div>
                                    <input type="text" name="ket_gambar1" id="ket_gambar1" class="mb-1">
                                    <label for="gambar2" id="namagambar2" class="btn btn-link btn-2">Pilih Gambar
                                        2</label>
                                    <input type="file" id="gambar2" name="fileInput" style="display: none;"
                                        accept="image/*">
                                    <div id="imagePreviewContainer2">
                                        <img id="hasil_gambar2" src="" alt="Preview 2"
                                            style="display: none; max-width: 100%; height: auto;">
                                    </div>
                                    <div class="ket_gambar2  mb-2">Ket. Gambar 2</div>
                                    <input type="text" name="ket_gambar2" id="ket_gambar2" class="mb-1">
                                </div>
                                <div class="col-2">
                                    <div class="d-flex gap-2 justify-content-end flex-wrap pt-3">
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
                        </div>
                        <div class="col-lg-12 p-4">
                            <div class="row-12 mt-2">
                                <div class=" d-flex gap-2 mb-2">
                                    <label for="tanggal">Filter</label>
                                </div>
                                <div class=" d-flex gap-2 align-items-center">
                                    <h6 class="mt-2">Tanggal</h6>
                                    <input type="date" class="form-control" id="bulan" name="date1"
                                        style="width:150px">
                                    <h6 class="mt-2">S/D</h6>
                                    <input type="date" class="form-control" id="sampaiDengan" name="date2"
                                        style="width:150px">
                                    <h6 class="mt-2" style="white-space: nowrap;">Divisi Pelapor </h6>
                                    <select class="form-select" aria-label="Default select example" name="divisi_pelapor"
                                        id="divisi_pelapor2">
                                        <option selected value="0">Pilih Divisi Pelapor</option>
                                        @foreach ($divisi as $divisi_pelapor)
                                            <option value="{{ $divisi_pelapor->Id_divisi }}">
                                                {{ $divisi_pelapor->Nama_divisi }}</option>
                                        @endforeach
                                    </select>
                                    <button id="refreshButton" class="btn btn-primary">Refresh</button>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
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
