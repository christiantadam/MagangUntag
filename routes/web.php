<?php
use function foo\func;

use App\Http\Controllers\Beli\Master\MaintenanceController;
use Illuminate\Support\Facades\Route;
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
    Route::get('/options/supplierselect/{id}','App\Http\Controllers\Beli\Master\SupplierController@getSupplier');
    Route::resource('HistoryPembelianMaster', App\Http\Controllers\Beli\Master\HistoryPembelianMasterController::class);
    Route::get('HistoryPembelianMasterRedisplay', 'APP\Http\Controllers\Beli\Master\HistoryPembelianMasterController@redisplay')->name('historypembelianmaster.redisplay');
    Route::resource('MaintenanceController', App\Http\Controllers\Beli\Master\MaintenanceController::class);
    Route::get('/MaintenanceTypeBarang', 'App\Http\Controllers\Beli\Master\MaintenanceController@index')->name('MaintenanceTypeBarang');


    //transaksi beli
    Route::resource('PurchaseOrder', App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController::class);
    Route::get('/GETPurchaseOrder', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@redisplay');
    Route::get('/get/dataPermohonanDivisi/{stBeli}/{Kd_Div}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanDivisi');
    Route::get('/get/dataPermohonanUser/{requester}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanUser');
    Route::get('/get/dataPermohonanOrder/{noTrans}', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@getPermohonanOrder');
    Route::get('/openFormCreateSPPB/create', 'App\Http\Controllers\Beli\TransaksiBeli\PurchaseOrderController@openFormCreateSPPB');
    Route::resource('IsiSupplierHarga', App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController::class);
    Route::get('/IsiSupplierHargaRedisplay/{id}', 'App\Http\Controllers\Beli\TransaksiBeli\IsiSupplierHargaController@redisplay')->name('isisupplierharga.redisplay');
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
    Route::resource('OrderPembelian', App\Http\Controllers\Beli\Transaksi\OrderPembelianController::class);
    Route::resource('ListOrder', App\Http\Controllers\Beli\Transaksi\ListOrderController::class);
    //informasi
    Route::resource('DaftarHarga', App\Http\Controllers\Beli\Informasi\DaftarHargaController::class);
    Route::get('/DaftarHargaRedisplay', 'App\Http\Controllers\Beli\Informasi\DaftarHargaController@redisplay')->name('daftarharga.redisplay');
    Route::resource('CariType', App\Http\Controllers\Beli\Informasi\CariTypeController::class);
    Route::get('/CariTypeSearch', 'App\Http\Controllers\Beli\Informasi\CariTypeController@searchData')->name('caritype.search');
    #endregion
});

Route::get('/test', 'App\Http\Controllers\testController@index');
