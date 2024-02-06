@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-20 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gambar Elektrik</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <label class="">Filter</label>
                        <div class="row-24 d-flex mt-4">

                            <label for="">Tanggal</label>
                            <input type="date" name="tanggal_dibutuhkan" id="tanggal" class="input mb-3 ml-1">
                            <label for=""class="ml-3">S/D</label>
                            <input type="date" name="tanggal_dibutuhkan" id="sampaiDengan" class="input mb-3 ml-1 ">
                            <label for="" class="ml-3">Divisi Pelapor</label>
                            <select name="divisi_pelapor" id="divisi_pelapor" class="form-control mb-2 ml-1"
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
                        <div id="div_tablePO" class="acs-form3">
                            <table class="table" id="tabel_gambar">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox"></th>
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
                            <div class="form">
                                <div class="row-24 d-flex">
                                    <!-- Bagian formulir dan pratinjau gambar -->
                                    <div class="col-4">
                                        @for ($i = 3; $i <= 6; $i++)
                                            <form id="uploadForm{{ $i }}" action="/upload" method="post"
                                                enctype="multipart/form-data" class="mb-1">
                                                @csrf
                                                <label for="fileInput{{ $i }}" class="btn btn-link mt-2">Pilih
                                                    Gambar
                                                    {{ $i }}</label>
                                                <input type="file" id="fileInput{{ $i }}"
                                                    name="fileInput{{ $i }}" style="display: none;"
                                                    accept="image/*">
                                            </form>
                                            <div id="imagePreviewContainer{{ $i }}">
                                                <img id="imagePreview{{ $i }}" src=""
                                                    alt="Preview {{ $i }}"
                                                    style="display: none; max-width: 100%; height: auto;">
                                            </div>
                                            <div class="nama_pelapor">Ket. Gambar {{ $i }}</div>
                                            <input type="text" name="nama_pelapor{{ $i }}"
                                                id="nama_pelapor{{ $i }}" class="mb-1">
                                            <script>
                                                // Event listener untuk Gambar {{ $i }}
                                                (function(i) {
                                                    document.getElementById('fileInput{{ $i }}').addEventListener('change', function() {
                                                        var fileInput = this;
                                                        var fileName = fileInput.value.split('\\').pop();

                                                        // Menampilkan nama file yang dipilih di label
                                                        document.querySelector('.btn-link').textContent = fileName;

                                                        // Membaca file gambar yang dipilih
                                                        var reader = new FileReader();
                                                        reader.onload = function(e) {
                                                            var imagePreview = document.getElementById('imagePreview{{ $i }}');
                                                            // Menetapkan sumber gambar saat file berhasil dibaca
                                                            imagePreview.src = e.target.result;
                                                            imagePreview.style.display = 'block'; // Menampilkan elemen gambar
                                                        };
                                                        reader.readAsDataURL(fileInput.files[0]); // Membaca file sebagai URL data
                                                    });
                                                })({{ $i }});
                                            </script>
                                        @endfor
                                    </div>

                                    <div class="col-4">
                                        @for ($i = 7; $i <= 10; $i++)
                                            <form id="uploadForm{{ $i }}" action="/upload" method="post"
                                                enctype="multipart/form-data" class="mb-1">
                                                @csrf
                                                <label for="fileInput{{ $i }}" class="btn btn-link mt-2">Pilih
                                                    Gambar
                                                    {{ $i }}</label>
                                                <input type="file" id="fileInput{{ $i }}"
                                                    name="fileInput{{ $i }}" style="display: none;"
                                                    accept="image/*">
                                            </form>
                                            <div class="nama_pelapor">Ket. Gambar {{ $i }}</div>
                                            <input type="text" name="nama_pelapor{{ $i }}"
                                                id="nama_pelapor{{ $i }}" class="mb-1">
                                            <div id="imagePreviewContainer{{ $i }}">
                                                <img id="imagePreview{{ $i }}" src=""
                                                    alt="Preview {{ $i }}"
                                                    style="display: none; max-width: 100%; height: auto;">
                                            </div>
                                        @endfor
                                    </div>
                                    <div class="col-2">
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

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    <script src="{{ asset('js/Utility/Elektrik/TambahGambar.js') }}"></script>
@endsection
