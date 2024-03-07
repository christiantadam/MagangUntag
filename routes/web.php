<?php

use function foo\func;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use function PHPUnit\Framework\assertDirectoryIsReadable;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::guest()) {
        return view('auth/login');
    } else {
        return redirect('/home');
    }

});

//Auth::routes();

Route::get('/login', 'App\Http\Controllers\LoginController@index')->name('login');
Route::post('login', 'App\Http\Controllers\LoginController@login');
Route::post('/logout', 'App\Http\Controllers\LoginController@logout')->name('logout');

Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', 'App\Http\Controllers\HomeController@index')->name('home');


    #region Beli
    //home
    Route::get('Beli', 'App\Http\Controllers\HomeController@Beli');

    //master
    Route::resource('Supplier', App\Http\Controllers\Beli\Master\SupplierController::class);
    Route::post('/Supplier/{id}', 'App\Http\Controllers\Beli\Master\SupplierController@destroy')->name('supplier.destroy');
    Route::get('/options/supplierselect/{id}', 'App\Http\Controllers\Beli\Master\SupplierController@getSupplier');
    Route::resource('HistoryPembelianMaster', App\Http\Controllers\Beli\Master\HistoryPembelianMasterController::class);
    Route::get('/HistoryPembelianMasterRedisplay', 'App\Http\Controllers\Beli\Master\HistoryPembelianMasterController@redisplay')->name('historypembelianmaster.redisplay');
    Route::resource('MaintenanceKodeBarang', App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController::class);
    Route::get('/Maintenance/KodeBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@kodeBarang')->name('maintenancekodebarang.kodebarang');
    Route::get('/Maintenance/Data', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@data')->name('maintenancekodebarang.data');
    Route::get('/Maintenance/Kategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@kategori')->name('maintenancekodebarang.kategori');
    Route::get('/Maintenance/SubKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@subKategori')->name('maintenancekodebarang.subkategori');
    Route::get('/Maintenance/NamaBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@namaBarang')->name('maintenancekodebarang.namabarang');
    Route::get('/Maintenance/CekNamaBarang', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@cekNamaBarang')->name('maintenancekodebarang.ceknamabarang');
    Route::post('/Maintenance/TambahKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@tambahKategori')->name('maintenancekodebarang.tambahkateegori');
    Route::post('/Maintenance/Isi', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@isi')->name('maintenancekodebarang.isi');
    Route::post('/Maintenance/Koreksi', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@koreksi')->name('maintenancekodebarang.koreksi');
    Route::post('/Maintenance/ProsesHapus', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@prosesHapus')->name('maintenancekodebarang.hapus');
    Route::post('/Maintenance/TambahSubKategori', 'App\Http\Controllers\Beli\Master\MaintenanceKodeBarangController@tambahSubKategori')->name('maintenancekodebarang.tambahsubkategori');
    Route::resource('BatalTransfer', App\Http\Controllers\Beli\Master\BatalTransferController::class);
    Route::post('/BatalTransfer/Proses', 'App\Http\Controllers\Beli\Master\BatalTransferController@batal')->name('bataltransfer.proses');

    //transaksi beli
    Route::resource('PurchaseOrder', App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class);
    Route::get('/GETPurchaseOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@redisplay');
    Route::get('/GETOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@display');
    Route::get('/GETPost', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@show1');
    Route::get('/GETabel', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@showtbl');
    Route::get('/OpenReviewPO', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reviewPO');
    Route::put('/OpenReviewPO/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@printReviewPO');
    Route::get('/OpenReviewBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reviewBTTB');
    Route::put('/OpenReviewBTTB/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@printReviewBTTB');
    Route::post('/PurchaseOrder/Cancel/Close', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@cancel');
    Route::post('/PurchaseOrder/Cancel/Close1', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@cancel1');
    Route::get('/get/dataPermohonanDivisi/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisi');
    Route::get('/get/dataPermohonanUser/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUser');
    Route::get('/get/dataPermohonanOrder/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrder');
    Route::get('/get/dataPermohonanDivisiNyantol/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisiNyantol');
    Route::get('/get/dataPermohonanUserNyantol/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUserNyantol');
    Route::get('/get/dataPermohonanOrderNyantol/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrderNyantol');
    Route::put('/PurchaseOrderr/create/CloseOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@closeOrder');
    Route::put('/PurchaseOrderr/create/BackCreatePO', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@backCreatePO');
    Route::get('/openFormCreateSPPB/create', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@openFormCreateSPPB');
    Route::get('/openFormCreateSPPB/create/Print', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@print');
    Route::post('/openFormCreateSPPB/create/Submit', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@submit');
    Route::put('/openFormCreateSPPB/create/Update', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@update');
    Route::put('/openFormCreateSPPB/create/Remove', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@remove');
    Route::put('/openFormCreateSPPB/create/Reject', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@reject');
    Route::put('/openFormCreateSPPB/create/Post', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@post');
    Route::resource('IsiSupplierHarga', App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController::class);
    Route::get('/IsiSupplierHarga/{id}/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@redisplay')->name('isisupplierharga.redisplay');
    Route::put('/IsiSupplierHarga/{id}/Approve', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@approve')->name('isisupplierharga.approve');
    Route::get('/IsiSupplierHarga/{id}/DaftarData', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@daftarData')->name('isisupplierharga.daftardata');
    Route::get('/IsiSupplierHarga/{id}/DaftarSupplier', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@daftarSupplier')->name('isisupplierharga.daftarsupplier');
    Route::put('/IsiSupplierHarga/{id}/Reject', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@reject')->name('isisupplierharga.reject');
    Route::resource('ReturBTTB', App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController::class);
    Route::get('/RReturBTTB/Display', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@po');
    Route::get('/RReturBTTB/GETRetur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@kdbrg');
    Route::get('/RReturBTTB/checkInvPenyesuaian', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@checkInvPenyesuaian');
    Route::post('/RReturBTTB/InvInsertTmp', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@invInsertTmp');
    Route::post('/RReturBTTB/AccHangus', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@accHangus');
    Route::put('/RReturBTTB/Batal', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@batal');
    Route::put('/RReturBTTB/Retur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@retur');
    Route::get('/Create', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@createbttb');
    Route::get('/Drop1', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@drop1');
    Route::get('/GetTabel', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@drop1');
    Route::resource('IsiBeaImpor', App\Http\Controllers\Beli\TransaksiBeli\IsiBeaController::class);
    Route::resource('CreateBTTB', App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController::class);
    Route::get('/CCreateBTTB/CreateNoBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@createNoBTTB');
    Route::get('/CCreateBTTB/SetStatusPO', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@setStatusPO');
    Route::get('/CCreateBTTB/Print', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@print');
    Route::post('/CCreateBTTB/PostData', 'App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController@post');
    Route::resource('TransferBarang', App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController::class);
    Route::get('/TransferBrg/Divisi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@divisi')->name('transferbarang.divisi');
    Route::get('/TransferBrg/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@redisplay')->name('transferbarang.redisplay');
    Route::get('/TransferBarang/TransferBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@show');
    Route::get('/TransferBarang/TransferBTTB/LoadData', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadData')->name('transferbttb.loaddata');
    Route::get('/TransferBarang/TransferBTTB/LoadSatuan', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadSatuan')->name('transferbttb.loadsatuan');
    Route::get('/TransferBarang/TransferBTTB/DataDivisi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@divisiBTTB')->name('transferbttb.datadivisi');
    Route::get('/TransferBarang/TransferBTTB/DataObjek', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@objek')->name('transferbttb.dataobjek');
    Route::get('/TransferBarang/TransferBTTB/LoadKelomDLL', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@loadKelomDLL')->name('transferbttb.loadkelomdll');
    Route::put('/TransferBarang/TransferBTTB/Koreksi', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@koreksi')->name('transferbttb.koreksi');
    Route::post('/TransferBarang/TransferBTTB/Transfer', 'App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController@transfer')->name('transferbttb.transfer');
    Route::resource('KoreksiStatusBeli', App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController::class);
    Route::get('/StatusBeli/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController@redisplay')->name('koreksistatusbeli.redisplay');
    Route::post('/StatusBeli/Update', 'App\Http\Controllers\Beli\TransaksiBeli\KoreksiStatusBeliController@update')->name('koreksistatusbeli.update');
    Route::resource('ListOrderSudahAppManager', App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController::class);
    Route::get('/ListOrderAppManager/Redisplay', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@redisplay')->name('listordersudahappmanager.redisplay');
    Route::get('/ListOrderAppManager/Divisi', 'App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController@divisi')->name('listordersudahappmanager.divisi');
    //transaksi
    Route::resource('OrderPembelian', App\Http\Controllers\Beli\Transaksi\OrderPembelianController::class);
    Route::resource('ListOrder', App\Http\Controllers\Beli\Transaksi\ListOrderController::class);
    Route::get('/ListOrder/{id}/show', 'App\Http\Controllers\Beli\Transaksi\ListOrderController@show')->name('listorder.show');
    Route::get('/ListOrder/{divisi}/{tglAwal}/{tglAkhir}/{Me}/Filter', 'App\Http\Controllers\Beli\Transaksi\ListOrderController@Filter')->name('listorder.filter');
    Route::resource('Approve', App\Http\Controllers\Beli\Transaksi\ApproveController::class);
    Route::get('/Approve/{id}/show', 'App\Http\Controllers\Beli\Transaksi\ApproveController@show')->name('approve.show');
    Route::post('/Approve/{id}/up', 'App\Http\Controllers\Beli\Transaksi\ApproveController@update')->name('approve.update');
    Route::resource('FinalApprove', App\Http\Controllers\Beli\Transaksi\FinalApproveController::class);
    Route::get('/FinalApprove/{id}/show', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@show')->name('finalapprove.show');
    Route::post('/FinalApprove/{id}/up', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@update')->name('finalapprove.update');
    Route::resource('OrderPembelian', App\Http\Controllers\Beli\Transaksi\OrderPembelianController::class);
    Route::resource('MaintenanceOrderPembelian', App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController::class);
    Route::get('/MaintenanceOrderPembeliann/CekNoTrans', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@cekNoTrans')->name('maintenanceorderpembelian.ceknotrans');
    Route::get('/MaintenanceOrderPembeliann/KodeBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kodeBarang')->name('maintenanceorderpembelian.kodebarang');
    Route::get('/MaintenanceOrderPembeliann/Data', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@data')->name('maintenanceorderpembelian.data');
    Route::get('/MaintenanceOrderPembeliann/Kategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kategori')->name('maintenanceorderpembelian.kategori');
    Route::get('/MaintenanceOrderPembeliann/SubKategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@subKategori')->name('maintenanceorderpembelian.subkategori');
    Route::get('/MaintenanceOrderPembeliann/KodeBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kodeBarang')->name('maintenanceorderpembelian.kodebarang');
    Route::get('/MaintenanceOrderPembeliann/Data', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@data')->name('maintenanceorderpembelian.data');
    Route::get('/MaintenanceOrderPembeliann/Kategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@kategori')->name('maintenanceorderpembelian.kategori');
    Route::get('/MaintenanceOrderPembeliann/SubKategori', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@subKategori')->name('maintenanceorderpembelian.subkategori');
    Route::get('/MaintenanceOrderPembeliann/NamaBarang', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@namaBarang')->name('maintenanceorderpembelian.namabarang');
    Route::get('/MaintenanceOrderPembeliann/Golongan', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@golongan')->name('maintenanceorderpembelian.golongan');
    Route::get('/MaintenanceOrderPembeliann/MesinGolongan', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@mesinGolongan')->name('maintenanceorderpembelian.mesingolongan');
    Route::get('/MaintenanceOrderPembeliann/Saldo', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@saldo')->name('maintenanceorderpembelian.saldo');
    Route::get('/MaintenanceOrderPembeliann/CekNoTrans', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@cekNotrans')->name('maintenanceorderpembelian.ceknotrans');
    Route::post('/MaintenanceOrderPembeliann/Save', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@save')->name('maintenanceorderpembelian.save');
    Route::put('/MaintenanceOrderPembeliann/Submit', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@submit')->name('maintenanceorderpembelian.submit');
    Route::delete('/MaintenanceOrderPembeliann/Delete', 'App\Http\Controllers\Beli\Transaksi\MaintenanceOrderPembelianController@delete')->name('maintenanceorderpembelian.delete');

    //informasi
    Route::resource('DaftarHarga', App\Http\Controllers\Beli\Informasi\DaftarHargaController::class);
    Route::get('/DaftarHargaRedisplay', 'App\Http\Controllers\Beli\Informasi\DaftarHargaController@redisplay')->name('daftarharga.redisplay');
    Route::resource('CariType', App\Http\Controllers\Beli\Informasi\CariTypeController::class);
    Route::get('/CariTypeSearch', 'App\Http\Controllers\Beli\Informasi\CariTypeController@searchData')->name('caritype.search');
    #endregion

    #Region Utility
    Route::get('Utility', 'App\Http\Controllers\HomeController@Utility');

    #elektrik
    Route::resource('InputGangguanElektrik', App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController::class);
    Route::post('/postData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@postData');
    Route::post('/postDataGambar', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@postDataGambar');
    Route::get('/selectImage/{id}/{imageName}', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@selectImage');
    Route::post('/updateDataElektrik', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@updateDataElektrik');
    Route::post('/gangguanBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@gangguanBulanan');
    Route::post('/upload-image', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@uploadImage')->name('uploadImage');
    Route::get('/getData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getData');
    Route::delete('/deleteData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@deleteData');
    Route::get('/getUserId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getUserId');
    Route::get('/getDataElektrikId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getDataElektrikId');
    Route::resource('InputGangguanBulananElektrik', App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController::class);
    Route::get('/getDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@getDataBulanan');
    Route::get('/getDataBulananId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@getDataBulananId');
    Route::get('/selectImageBulanan/{id}/{imageName}', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@selectImageBulanan');
    Route::post('/postDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@postDataBulanan');
    Route::post('/updateDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@updateDataBulanan');
    Route::delete('/deleteDataBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@deleteDataBulanan');

    // Tambah Gambar Elektrik
    Route::resource('TambahGambarElektrik', App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController::class);
    Route::post('/postTambahGambar', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@postDataGambar');
    Route::post('/updateTambahGambar', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@updateDataGambar');
    Route::get('/SelectImages/{id}/{imageName}', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@SelectImages');
    Route::get('checkData', 'App\Http\Controllers\Utility\Elektrik\TambahGambarElektrikController@checkData');
    Route::resource('PrintElektrik', App\Http\Controllers\Utility\Elektrik\PrintElektrikController::class);


    //project
    Route::resource('InputProject', App\Http\Controllers\Utility\Project\InputProjectController::class);
    Route::post('/postDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@postDataProject');
    Route::get('/selectImageProject/{id}/{imageName}', 'App\Http\Controllers\Utility\Project\InputProjectController@selectImage');
    Route::get('/getDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@getDataProject');
    Route::delete('/deleteDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@deleteDataProject');
    Route::get('/getDataProjectId', 'App\Http\Controllers\Utility\Project\InputProjectController@getDataProjectId');
    Route::get('/getDataUserId', 'App\Http\Controllers\Utility\Project\InputProjectController@getDataUserId');
    Route::get('/getNamaUser', 'App\Http\Controllers\Utility\Project\InputProjectController@getNamaUser');
    Route::post('/updateDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@updateDataProject');
    Route::delete('/deleteDataProject', 'App\Http\Controllers\Utility\Project\InputProjectController@deleteDataProject');

    // Tambah Gambar Project
    Route::resource('TambahGambarProject', App\Http\Controllers\Utility\Project\TambahGambarProjectController::class);
    Route::post('/postTambahGambarProject', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@postDataGambarProject');
    Route::post('/updateTambahGambarProject', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@updateDataGambarProject');
    Route::get('/SelectImagesProject/{id}/{imageName}', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@SelectImagesProject');
    Route::get('checkDataProject', 'App\Http\Controllers\Utility\Project\TambahGambarProjectController@checkDataProject');

    // Print Project
    Route::resource('PrintProject', App\Http\Controllers\Utility\Project\PrintProjectController::class);


    // Compressor
    Route::resource('addCompressor', App\Http\Controllers\Utility\Compressor\InputPerawatanController::class);
    Route::get('/get-keterangan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getKeterangan'])->name('get-keterangan');
    Route::get('/get-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getPerawatan'])->name('get-perawatan');
    Route::get('/get-perawatan-compressor', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getPerawatanById'])->name('get-perawatan');
    Route::post('/save-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'savePerawatan'])->name('save-perawatan');
    Route::put('/update-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'updatePerawatan'])->name('update-perawatan');
    Route::delete('/delete-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'hapusPerawatan'])->name('delete-perawatan');

    //LogSheet
    Route::resource('LogSheet', App\Http\Controllers\Utility\Compressor\LogSheetController::class);
    Route::get('/get-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'getDataLogSheet'])->name('get-logsheet');
    Route::get('/get-logsheet-compressor', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'getDataLogSheetById'])->name('get-logsheet');
    Route::post('/save-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'saveDataLogSheet'])->name('save-logsheet');
    Route::put('/update-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'updateDataLogSheet'])->name('update-logsheet');
    Route::delete('/delete-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'deleteDataLogSheet'])->name('delete-logsheet');

    // Genzet
    Route::resource('InputOperasional', App\Http\Controllers\Utility\Genzet\InputOperasionalController::class);
    Route::get('/get-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'getGenzet'])->name('get-genzet');
    Route::get('/get-operational-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'getById'])->name('get-operational-genzet');
    Route::post('/save-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'createGenzet'])->name('save-genzet');
    Route::put('/update-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'updateGenzet'])->name('update-genzet');
    Route::delete('/delete-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'deleteGenzet'])->name('delete-genzet');

    // Status Log Genzet
    Route::get('/get-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'getStatusLog'])->name('get-statuslog');
    Route::post('/save-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'savestatuslog'])->name('save-statuslog');
    Route::put('/update-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'updatestatuslog'])->name('update-statuslog');
    Route::delete('/delete-statuslog', [App\Http\Controllers\Utility\Genzet\StatusLog\StatusLogController::class, 'deletestatuslog'])->name('delete-statuslog');
    // Panel Induk
    Route::resource('InputGangguanPanel', App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class);
    Route::put('/update-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'updatePANEL'])->name('update-pdam');
    Route::post('/save-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'createPANEL'])->name('save-panel');
    Route::get('/get-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'getPANEL'])->name('get-panel');
    Route::get('/get-panel-id', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'getPANELById'])->name('get-panel-id');
    Route::get('/reloadKeterangan', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'reloadKeterangan'])->name('reloadKeterangan');
    Route::delete('/delete-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'deletePANEL'])->name('delete-panel');

    //Keterangan Gangguan Panel Induk
    Route::get('/get-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'getKeteranganGangguan'])->name('get-keterangangangguan');
    Route::post('/save-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'saveKeteranganGangguan'])->name('save-keterangangangguan');
    Route::put('/update-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'updateKeteranganGangguan'])->name('update-keterangangangguan');
    Route::delete('/delete-keterangangangguan', [App\Http\Controllers\Utility\PanelInduk\KetGangguan\InputKeteranganGangguanController::class, 'deleteKeteranganGangguan'])->name('delete-keterangangangguan');

    //PDAM
    Route::resource('InputPDAM', App\Http\Controllers\Utility\PDAM\InputPDAMController::class);
    Route::put('/update-pdam', [App\Http\Controllers\Utility\PDAM\InputPDAMController::class, 'updatePDAM'])->name('update-pdam');
    Route::post('/save-pdam', [App\Http\Controllers\Utility\PDAM\InputPDAMController::class, 'createPDAM'])->name('save-pdam');
    Route::get('/get-pdam', [App\Http\Controllers\Utility\PDAM\InputPDAMController::class, 'getPDAM'])->name('get-pdam');
    Route::delete('/delete-pdam', [App\Http\Controllers\Utility\PDAM\InputPDAMController::class, 'deletePDAM'])->name('delete-pdam');

    //PLN
    Route::resource('InputPLN', App\Http\Controllers\Utility\PLN\InputPLNController::class);
    Route::get('/get-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'getPLN'])->name('get-pln');
    Route::put('/update-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'updatePLN'])->name('update-pln');
    Route::post('/save-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'createPLN'])->name('save-pln');
    Route::delete('/delete-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'deletePLN'])->name('delete-pln');

    //Panel sdp
    Route::get('/get-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'getsdp'])->name('get-sdp');
    Route::get('/get-sdp-id', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'getsdpById'])->name('get-sdp-id');
    Route::put('/update-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'updatesdp'])->name('update-sdp');
    Route::post('/save-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'createsdp'])->name('save-sdp');
    Route::delete('/delete-sdp', [App\Http\Controllers\Utility\PLN\PanelSDPController::class, 'deletesdp'])->name('delete-sdp');

    //Berita Acara
    Route::get('/get-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'getBA'])->name('get-ba');
    Route::get('/get-ba-id', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'getBAById'])->name('get-ba-id');
    Route::put('/update-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'updateBA'])->name('update-ba');
    Route::post('/save-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'createBA'])->name('save-ba');
    Route::delete('/delete-ba', [App\Http\Controllers\Utility\PLN\BeritaAcaraController::class, 'deleteBA'])->name('delete-ba');

    //Master
    Route::resource('MaintenanceTeknisi', App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class);
    Route::get('/get-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'getTeknisi'])->name('get-teknisi');
    Route::get('/get-teknisi-id', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'getTeknisiById'])->name('get-teknisi');
    Route::get('/search-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'searchTeknisi'])->name('search-teknisi');
    Route::post('/save-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'saveTeknisi'])->name('save-teknisi');
    Route::put('/update-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'updateTeknisi'])->name('update-teknisi');
    Route::delete('/delete-teknisi', [App\Http\Controllers\Utility\Master\MaintenanceTeknisi::class, 'deleteTeknisi'])->name('delete-teknisi');



    #endRegion

});




Route::get('/test', 'App\Http\Controllers\testController@index');
