@extends('layouts.appUtility')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Gambar Project</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <label class="">Filter</label>
                        <div class="row-24 d-flex mt-4">

                            <label for="">Bulan</label>
                            <input type="number" name="tanggal_dibutuhkan" pattern="[0-9]" min="0" id="bulan"
                                placeholder="contoh: 1,2,3" class="input mb-3 ml-1">
                            <label for=""class="ml-3">Tahun</label>
                            <input type="number" pattern="[0-9]" name="tanggal_dibutuhkan" min="0" id="tahun"
                                class="input mb-3 ml-1 "placeholder="contoh: 2023">

                            <button type="button" style="height: 30px" class="btn btn-primary ml-3"
                                id="refreshButton">Refresh</button>
                        </div>
                        <div id="div_tablePO" class="acs-form3">
                            <table class="table" id="tabel_gambar_project">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col" type="checkbox" id="">
                                            <input type="checkbox" name="agree" id="checkbox_project">
                                        </th>

                                        <th scope="col">Nama Project</th>
                                        <th scope="col">Nama Mesin </th>
                                        <th scope="col">Tanggal Mulai</th>
                                        <th scope="col">Tanggal Selesai</th>
                                        <th scope="col">Keterangan</th>
                                        <th scope="col">User</th>

                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>

                            </table>
                            <div class="form">
                                <div class="row-24 d-flex">
                                    <!-- Bagian formulir dan pratinjau gambar -->
                                    <div class="col-5">
                                        @for ($i = 1; $i <= 4; $i++)
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

                                    <div class="col-5">
                                        @for ($i = 5; $i <= 8; $i++)
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
                                    <div class="col-2">
                                        <button type="button" class="btn btn-primary w-100 mt-3">Input</button>
                                        <button type="button" class="btn btn-primary w-100 mt-2">Koreksi</button>
                                        <button type="button" class="btn btn-primary w-100 mt-2">Hapus</button>

                                        <button type="button" class="btn btn-primary w-100 mt-5">Proses</button>
                                        <button type="button" class="btn btn-primary w-100 mt-2">Batal</button>

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
    <script src="{{ asset('js/Utility/Project/TambahGambarProject.js') }}"></script>
@endsection
