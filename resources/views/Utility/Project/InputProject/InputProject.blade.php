@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Project</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form">
                            <div class="row-24 d-flex">
                                <div class="col-5">
                                    <div class="col-8">
                                        <input type="hidden" id="id">
                                        <div class="nama_pelapor">Nama Project</div>
                                        <input type="text" name="nama_pelapor" id="nama_project"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Nama Mesin</div>
                                        <input type="text" name="nama_pelapor" id="nama_mesin" class="form-control mb-2"
                                            placeholder="">
                                        <div class="nama_pelapor">Merk Mesin</div>
                                        <input type="text" name="nama_pelapor" id="merk_mesin" class="form-control mb-2"
                                            placeholder="">
                                        <div class="nama_pelapor">Lokasi Mesin</div>
                                        <input type="text" name="nama_pelapor" id="lokasi_mesin"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Tahun Pembuatan</div>
                                        <input type="text" name="nama_pelapor" id="tahun_pembuatan"
                                            class="form-control mb-2" placeholder="">
                                        <div class="jam_lapor">Tanggal Mulai</div>
                                        <input type="date" name="tanggal_dibutuhkan" id="tanggal_mulai"
                                            class="input mb-3">
                                        <div class="jam_lapor">Tanggal Selesai</div>
                                        <input type="date" name="tanggal_dibutuhkan" id="tanggal_selesai"
                                            class="input mb-3">
                                        <div class="nama_pelapor">Keterangan Kerusakan</div>
                                        <input type="text" name="nama_pelapor" id="keterangan_kerusakan"
                                            class="form-control mb-2" placeholder="">
                                        <div class="nama_pelapor">Perbaikan</div>
                                        <input type="text" name="nama_pelapor" id="perbaikan" class="form-control mb-2"
                                            placeholder="">






                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="row-4">
                                        <div class="div">
                                            <label>Keterangan</label>
                                            <label>
                                                <input type="radio" name="keterangan" value="Progress" id="keterangan1">
                                                Progress
                                            </label>
                                            <label>
                                                <input type="radio" name="keterangan" value="Selesai" id="keterangan2">
                                                Selesai
                                            </label>
                                        </div>


                                        <form id="uploadForm1" action="/upload" method="post" enctype="multipart/form-data"
                                            class=" ">
                                            <label for="gambar1" class="btn btn-link ">Pilih Gambar 1</label>
                                            <input type="file" id="gambar1" name="fileInput1" style="display: none;"
                                                accept="image/*">
                                        </form>

                                        <div id="imagePreviewContainer1">
                                            <img id="hasil_gambar1" src="" alt="Preview 1"
                                                style="display: none; max-width: 100%; height: auto;">
                                        </div>
                                        <div class="nama_pelapor">Ket. Gambar 1</div>
                                        <input type="text" name="ket_gambar1" id="ket_gambar1" class="form-control mb-2"
                                            placeholder="">

                                        <form id="uploadForm2" action="/upload" method="post"
                                            enctype="multipart/form-data" class="mt-3">
                                            <label for="gambar2" class="btn btn-link">Pilih Gambar 2</label>
                                            <input type="file" id="gambar2" name="fileInput2"
                                                style="display: none;" accept="image/*">
                                        </form>

                                        <div id="imagePreviewContainer2">
                                            <img id="hasil_gambar2" src="" alt="Preview 2"
                                                style="display: none; max-width: 100%; height: auto;">
                                        </div>
                                        <div class="nama_pelapor">Ket. Gambar 2</div>
                                        <input type="text" name="nama_pelapor" id="ket_gambar2"
                                            class="form-control mb-2" placeholder="">


                                    </div>

                                </div>


                                <div class="col-3 d-grid gap-2 d-md-block d-flex mt-5">
                                    <button type="button" class="btn btn-primary w-50 mt-3"
                                        id="inputButton">Input</button>
                                    <button type="button"
                                        class="btn btn-primary w-50 mt-2"id="koreksiButton">Koreksi</button>
                                    <button type="button"
                                        class="btn btn-primary w-50 mt-2"id="hapusButton">Hapus</button>

                                    <button type="button"
                                        class="btn btn-primary w-50 mt-5"id="prosesButton">Proses</button>
                                    <button type="button"
                                        class="btn btn-primary w-50 mt-2"id="batalButton">Batal</button>
                                </div>
                            </div>


                        </div>
                        <label class="mt-3">Filter</label>
                        <div class="row-24 d-flex mt-1">

                            <label for="">Bulan</label>
                            <input type="number" name="tanggal_dibutuhkan" pattern="[0-9]" min="0"
                                id="bulan" placeholder="contoh: 1,2,3" class="input mb-3 ml-1">
                            <label for=""class="ml-3">Tahun</label>
                            <input type="number" pattern="[0-9]" name="tanggal_dibutuhkan" min="0"
                                id="tahun" class="input mb-3 ml-1 "placeholder="contoh: 2023">

                            <button type="button" style="height: 30px" class="btn btn-primary ml-3"
                                id="refreshButton">Refresh</button>
                        </div>
                        <div id="div_tablePO" class="acs-form3">
                            <table class="table" id="tabel_input_project">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            <input type="checkbox" name="agree" id="checkbox_project">
                                        </th>
                                        <th scope="col">Nama Project</th>
                                        <th scope="col">Nama Mesin </th>
                                        <th scope="col">Tanggal Mulai</th>
                                        <th scope="col">Tanggal Selesai</th>
                                        <th scope="col">Keterangan Kerusakan</th>
                                        <th scope="col">Keterangan</th>
                                        <th scope="col">User</th>

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
    <script src="{{ asset('js/Utility/Project/InputProject.js') }}"></script>
@endsection
