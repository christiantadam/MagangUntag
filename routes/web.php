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
    if (Auth::guest())
        return view('auth/login');
    else
        return redirect('/home');
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
    //transaksi beli
    Route::resource('PurchaseOrder', App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class);
    Route::get('/get/dataPermohonanDivisi/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisi');
    Route::get('/get/dataPermohonanUser/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUser');
    Route::get('/get/dataPermohonanOrder/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrder');
    Route::get('/openFormCreateSPPB/create', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@openFormCreateSPPB');
    Route::resource('IsiSupplierHarga', App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController::class);
    Route::resource('ListOrderPembelian', App\Http\Controllers\Beli\TransaksiBeli\ListOrderPembelianController::class);
    Route::resource('ReturBTTB', App\Http\Controllers\Beli\TransaksiBeli\ReturBTTBController::class);
    Route::resource('CreateBTTB', App\Http\Controllers\Beli\TransaksiBeli\CreateBTTBController::class);
    Route::resource('TransferBarang', App\Http\Controllers\Beli\TransaksiBeli\TransferBarangController::class);

    //transaksi
    Route::resource('OrderPembelian', App\Http\Controllers\Beli\Transaksi\OrderPembelianController::class);
    Route::resource('ListOrder', App\Http\Controllers\Beli\Transaksi\ListOrderController::class);
    Route::get('/ListOrder/{id}/show', 'App\Http\Controllers\Transaksi\Beli\ListOrderController@show')->name('listorder.show');
    Route::get('/ListOrder/{divisi}/{tglAwal}/{tglAkhir}/{Me}/Filter', 'App\Http\Controllers\Beli\Transaksi\ListOrderController@Filter')->name('listorder.filter');
    Route::resource('Approve', App\Http\Controllers\Beli\Transaksi\ApproveController::class);
    Route::get('/Approve/{id}/show', 'App\Http\Controllers\Beli\Transaksi\ApproveController@show')->name('approve.show');
    Route::post('/Approve/{id}/up', 'App\Http\Controllers\Beli\Transaksi\ApproveController@update')->name('approve.update');
    Route::resource('FinalApprove', App\Http\Controllers\Beli\Transaksi\FinalApproveController::class);
    Route::get('/FinalApprove/{id}/show', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@show')->name('finalapprove.show');
    Route::post('/FinalApprove/{id}/up', 'App\Http\Controllers\Beli\Transaksi\FinalApproveController@update')->name('finalapprove.update');
    //informasi

    #endregion

    #Region Utility
    Route::get('Utility', 'App\Http\Controllers\HomeController@Utility');

    //elektrik
    Route::resource('InputGangguanElektrik', App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController::class);
    Route::post('/postData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@postData');
    Route::post('/postDataGambar', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@postDataGambar');
    Route::get('/selectImage/{id}/{imageName}', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@selectImage');
    Route::post('/updateDataElektrik', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@updateDataElektrik');
    Route::post('/gangguanBulanan', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController@gangguanBulanan');
    Route::post('/upload-image', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@uploadImage')->name('uploadImage');
    //Route::post('/uploadAndReadFile', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@uploadAndReadFile');
    //Route::put('/updateData/{id}', 'Utility\Elektrik\InputGangguanElektrikController@updateData');
    Route::get('/getData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getData');
    Route::delete('/deleteData', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@deleteData');
    Route::get('/getUserId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getUserId');
    Route::get('/getDataElektrikId', 'App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikController@getDataElektrikId');

    // Route::resource('InputGangguanBulanan', App\Http\Controllers\Utility\Elektrik\InputGangguanElektrikBulananController::class);
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

    // Teknisi Genzet
    Route::get('/get-teknisi', [App\Http\Controllers\Utility\Genzet\Teknisi\TeknisiController::class, 'getTeknisi'])->name('get-teknisi');
    Route::post('/save-teknisi', [App\Http\Controllers\Utility\Genzet\Teknisi\TeknisiController::class, 'saveTeknisi'])->name('save-teknisi');
    Route::put('/update-teknisi', [App\Http\Controllers\Utility\Genzet\Teknisi\TeknisiController::class, 'updateTeknisi'])->name('update-teknisi');
    Route::delete('/delete-teknisi', [App\Http\Controllers\Utility\Genzet\Teknisi\TeknisiController::class, 'deleteTeknisi'])->name('delete-teknisi');

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




    #endRegion

});




Route::get('/test', 'App\Http\Controllers\testController@index');
