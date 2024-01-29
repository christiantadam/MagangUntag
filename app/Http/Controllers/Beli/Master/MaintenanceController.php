<?php

namespace App\Http\Controllers\Beli\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class MaintenanceController extends Controller

{
    // Display a listing of the resource.
    public function index()
    {

        $result = (new HakAksesController)->HakAksesFitur('Maintenance Kode Barang');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        if ($result > 0) {
            return view('Beli.Master.MaintenanceKodeBarang', compact('access'));
        } else {
            abort(403);
        }
    }

    public function kodeBarang(Request $request)
    {
        $kodeBarang = $request->input('kodeBarang');
        try {
            $data = DB::connection('ConnPurchase')->select('exec sp_List_Barang_new @KdBarang = ?', [$kodeBarang]);
            return Response()->json($data);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function kategoriUtama()
    {
        $MyType = 1;
        try {
            $data = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?', [$MyType]);
            return Response()->json($data);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
}
