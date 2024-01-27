<div class="modal fade" id="modalPanel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">PANEL SPD</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row-12 d-flex flex-wrap">
                    <div class="col-lg-6 p-4">
                        <input type="hidden" id="hiddenNomorSPD">
                        <div class="acs-div-filter pt-4">
                            <label for="ket_gangguan">Produksi</label>
                            <select class="form-select" aria-label="Default select example" id="produksi-spd">
                                <option selected disabled>Pilih...</option>
                                @foreach ($spd as $data)
                                    <option value="{{ $data->NoProduksi }}">
                                        {{ $data->Produksi }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="tanggal-spd">Tanggal</label>
                            <input type="date" class="form-control" id="tanggal-spd">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="jam-spd">Jam</label>
                            <input type="time" class="form-control" id="jam-spd" name="jam-spd">
                        </div>
                    </div>
                    <div class="col-lg-6 p-4">
                        <div class="acs-div-filter pt-4">
                            <label for="kwh">KWH</label>
                            <input type="number" class="form-control" id="kwh-spd" name="kwh"
                                placeholder="Masukkan KWH...">
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="ket_gangguan">Teknisi</label>
                            <select class="form-select" aria-label="Default select example" id="teknisi-spd">
                                <option selected disabled>Pilih...</option>
                                @foreach ($teknisi as $data)
                                    <option value="{{ $data->NamaTeknisi }}">
                                        {{ $data->NamaTeknisi }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="acs-div-filter pt-4">
                            <label for="ct_faktor">CT Faktor</label>
                            <input type="number" class="form-control" id="ct_faktor-spd" name="ct_faktor"
                                placeholder="Masukkan CT Faktor...">
                        </div>
                    </div>
                    <div class="col-lg-12 p-4">
                        <div class="d-flex gap-2 pt-4 justify-content-end flex-wrap">
                            <button class="btn btn-success mb-2" type="button" id="inputButton-spd">Input</button>
                            <button class="btn btn-outline-warning mb-2" type="button"
                                id="updateButton-spd">Koreksi</button>
                            <button class="btn btn-outline-danger mb-2" type="button"
                                id="deleteButton-spd">Hapus</button>
                            <button class="btn btn-primary mb-2" type="button" id="saveButton-spd">Proses</button>
                            <button class="btn btn-danger mb-2" type="button" id="cancelButton-spd">Batal</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 p-4">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="d-flex gap-2 mb-2">
                                <label for="tanggal">Filter</label>
                            </div>
                            <div class="d-flex gap-2">
                                <h6 class="mt-2">Bulan</h6>
                                <input type="number" class="form-control" id="bulan-spd" name="bulan-spd"
                                    placeholder="name@example.com">
                                <h6 class="mt-2">Tahun</h6>
                                <input type="number" class="form-control" id="tahun-spd" name="tahun-spd"
                                    placeholder="name@example.com">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="d-flex gap-2 mb-2">
                                <label for="tanggal">Produksi</label>
                            </div>
                            <div class="d-flex gap-2">
                                <select class="form-select" aria-label="Default select example" id="produksiSearch-spd">
                                    <option selected value="0">Pilih Semua...</option>
                                    @foreach ($spd as $data)
                                        <option value="{{ $data->NoProduksi }}">
                                            {{ $data->Produksi }}</option>
                                    @endforeach
                                </select>
                                <button type="submit" id="refreshButton-spd" class="btn btn-primary">Refresh</button>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table mt-2" id="table-panelspd">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Aksi</th>
                                    <th scope="col">Produksi</th>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Jam</th>
                                    <th scope="col">KWH</th>
                                    <th scope="col">Teknisi</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" id="exitButton-spd" data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
