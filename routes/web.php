<?php

use function foo\func;
use Illuminate\Support\Facades\Route;

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
    Route::get('HistoryPembelianMasterRedisplay', 'APP\Http\Controllers\Beli\Master\HistoryPembelianMasterController@redisplay')->name('historypembelianmaster.redisplay');
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
    Route::get('/GETReturBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@po');
    Route::get('/GETBTTB', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@display');
    Route::get('/GETRetur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@kdbrg');
    Route::get('/PostRetur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@post');
    Route::get('/Retur', 'App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController@kode');
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
    Route::resource('FinalApproveOrderPembelian', App\Http\Controllers\Beli\TransaksiBeli\FinalApproverOrderController::class);
    Route::get('/FinalApproveOrderPembelian/{id}/show', 'App\Http\Controllers\Beli\TransaksiBeli\FinalApproverOrderController@show')->name('finalapproveorderpembelian.show');
    Route::post('/FinalApproveOrderPembelian/{id}/up', 'App\Http\Controllers\Beli\TransaksiBeli\FinalApproverOrderController@update')->name('finalapproveorderpembelian.update');
    Route::resource('ListOrderSudahAppManager', App\Http\Controllers\Beli\TransaksiBeli\ListOrderAppManagerController::class);

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
});

Route::get('/test', 'App\Http\Controllers\testController@index');
