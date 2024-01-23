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

    // Elektrik
    // Route::resource('InputGangguanElektrik', App\Http\Controllers\Utility\Elektrik\InputGangguanController::class);
    Route::resource('ListOrder', App\Http\Controllers\Beli\Transaksi\ListOrderController::class);

    // Compressor
    Route::resource('addCompressor', App\Http\Controllers\Utility\Compressor\InputPerawatanController::class);
    Route::get('/get-keterangan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getKeterangan'])->name('get-keterangan');
    Route::get('/get-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'getPerawatan'])->name('get-perawatan');
    Route::post('/save-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'savePerawatan'])->name('save-perawatan');
    Route::delete('/delete-perawatan', [App\Http\Controllers\Utility\Compressor\InputPerawatanController::class, 'hapusPerawatan'])->name('delete-perawatan');


    Route::resource('LogSheet', App\Http\Controllers\Utility\Compressor\LogSheetController::class);
    Route::get('/get-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'getDataLogSheet'])->name('get-logsheet');
    Route::post('/save-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'saveDataLogSheet'])->name('save-logsheet');
    Route::put('/update-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'updateDataLogSheet'])->name('update-logsheet');
    Route::delete('/delete-logsheet', [App\Http\Controllers\Utility\Compressor\LogSheetController::class, 'deleteDataLogSheet'])->name('delete-logsheet');

    // Genzet
    Route::resource('InputOperasional', App\Http\Controllers\Utility\Genzet\InputOperasionalController::class);
    Route::get('/get-genzet', [App\Http\Controllers\Utility\Genzet\InputOperasionalController::class, 'getGenzet'])->name('get-genzet');

    // Panel Induk
    Route::resource('InputGangguanPanel', App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class);
    Route::put('/update-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'updatePANEL'])->name('update-pdam');
    Route::post('/save-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'createPANEL'])->name('save-panel');
    Route::get('/get-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'getPANEL'])->name('get-panel');
    Route::delete('/delete-panel', [App\Http\Controllers\Utility\PanelInduk\InputGangguanPanelController::class, 'deletePANEL'])->name('delete-panel');
    //Keterangan Gangguan
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

    //PDAM
    Route::resource('InputPLN', App\Http\Controllers\Utility\PLN\InputPLNController::class);
    Route::get('/get-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'getPLN'])->name('get-pln');
    Route::put('/update-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'updatePLN'])->name('update-pln');
    Route::post('/save-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'createPLN'])->name('save-pln');
    Route::delete('/delete-pln', [App\Http\Controllers\Utility\PLN\InputPLNController::class, 'deletePLN'])->name('delete-pln');



    #endRegion

});




Route::get('/test', 'App\Http\Controllers\testController@index');
