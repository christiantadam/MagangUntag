<div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <input type="hidden" id="hiddenIdTeknisi">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Teknisi</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row-lg-12 mb-2">
                    <div class="col-lg-12 d-flex">
                        <div class="acs-div-filter mb-2">
                            <label for="teknisi">Teknisi</label>
                            <select name="teknisi" id="teknisi" class="form-select mt-3">
                                <option selected disabled>Pilih Teknisi</option>
                                @foreach ($teknisi as $data)
                                    <option value="{{ $data->IDUser }}">
                                        {{ $data->NamaUser }} - ( {{ $data->NomorUser }} )</option>
                                @endforeach
                            </select>
                            <label for="lokasi" class="mt-3">Lokasi</label>
                            <select name="lokasi" id="lokasi" class="form-select">
                                <option selected disabled>Pilih Lokasi</option>
                                @foreach ($lokasi as $lok)
                                    <option value="{{ $lok->Id_Lokasi }}">
                                        {{ $lok->Lokasi }} - ( {{ $lok->Id_Lokasi }} )</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-end">
                <button type="button" class="btn btn-primary" id="updateButtonTeknisi">Simpan</button>
                <button type="button text-end" class="btn btn-danger" data-bs-dismiss="modal">Keluar</button>
            </div>
        </div>
    </div>
</div>
