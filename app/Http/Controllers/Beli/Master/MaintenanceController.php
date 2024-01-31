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
    public function data()
    {
        $MyType = 1;
        try {
            $kategoriUtama = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?', [$MyType]);
            $jenisPembelian = DB::connection('ConnPurchase')->select('exec spSelect_Jenis_Pembelian');
            $satuanList = DB::connection('ConnPurchase')->select('exec sp_list_stri');
            return Response()->json(["kategoriUtama" => $kategoriUtama, "jenisPembelian" => $jenisPembelian , "satuanList" => $satuanList]);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function kategori(Request $request)
    {
        $MyType = 2;
        $MyValue = $request->input('MyValue');
        if ($MyValue != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function subKategori(Request $request)
    {
        $MyType = 3;
        $MyValue = $request->input('MyValue');
        if ($MyValue != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function namaBarang(Request $request)
    {
        $MyType = 5;
        $MyValue = $request->input('MyValue');
        if ($MyValue != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SP_MOHON_BELI @MyType = ?, @MyValue = ?', [$MyType, $MyValue]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
}
