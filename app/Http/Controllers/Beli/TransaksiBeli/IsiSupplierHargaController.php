<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use GuzzleHttp\Psr7\Response;

class IsiSupplierHargaController extends Controller
{
    // Display a listing of the resource.
    public function index($id)
    {
        dd("masuk index");
    }

    //Show the form for creating a new resource.
    public function create()
    {
        dd("masuk create");
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        dd("masuk store");
    }

    //Display the specified resource.
    public function show($id)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        if ($access > 0) {
            return view('Beli.TransaksiBeli.IsiSupplierHarga', compact('id', 'access'));
        } else {
            abort(404);
        }
    }
    public function redisplay(Request $request, $id)
    {
        $noTrans = $request->input('noTrans');
        $kd = $request->input('kd');
        $requester = $request->input('requester');

        if (($noTrans != null) || ($kd != null) || ($requester != null)) {
            try {
                if ($kd == 11) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noTrans = ?, @kd = ?, @stBeli = ?', [$noTrans, $kd, $id]);
                } else if ($kd == 23) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @requester = ?, @kd = ?, @stBeli = ?', [$requester, $kd, $id]);
                } else if ($kd == 24) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @stBeli = ?', [$kd, $id]);
                }
                return datatables($redisplay)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function daftarData($id)
    {
        $kd_sup = 1;
        try {
            $supplier = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd = ?', [$kd_sup]);
            $matauang = DB::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
            $ppn = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_PPN');
            return Response()->json([
                'matauang' => $matauang,
                'supplier' => $supplier,
                'ppn' => $ppn
            ]);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function daftarSupplier(Request $request, $id)
    {
        $kd = 1;
        $idsup = $request->input('idsup');
        try {
            $supplier = DB::connection('ConnPurchase')->select('exec SP_1273_PBL_LIST_SUPPLIER @kd = ?, @idsup = ?', [$kd, $idsup]);
            return Response()->json($supplier);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function approve(Request $request, $id)
    {
        $Operator = '1001';
        $kd = 3;
        $Qty = $request->input('Qty');
        $QtyDelay = $request->input('QtyDelay');
        $idsup = $request->input('idsup');
        $kurs = $request->input('kurs');
        $pUnit = $request->input('pUnit');
        $pSub = $request->input('pSub');
        $idPPN = $request->input('idPPN');
        $pPPN = $request->input('pPPN');
        $pTOT = $request->input('pTOT');
        $pIDRUnit = $request->input('pIDRUnit');
        $pIDRSub = $request->input('pIDRSub');
        $pIDRPPN = $request->input('pIDRPPN');
        $pIDRTot = $request->input('pIDRTot');
        $jns_beli = $request->input('jns_beli');
        $mtUang = $request->input('mtUang');
        $noTrans = $request->input('noTrans');
        if (($noTrans != null) || ($kd != null) || ($Qty != null) || ($QtyDelay != null) || ($idsup != null) || ($mtUang != null) || ($kurs != null) || ($pUnit != null) || ($pSub != null) || ($idPPN != null) || ($pPPN != null) || ($pTOT != null) || ($pIDRUnit != null) || ($pIDRSub != null) || ($pIDRPPN != null) || ($pIDRTot != null) || ($jns_beli != null)) {
            try {
                $approve = DB::connection('ConnPurchase')->statement('exec SP_5409_SAVE_ORDER @Operator = ?, @kd = ?, @Qty = ?, @QtyDelay = ?, @idsup = ?, @kurs = ?, @pUnit = ?, @pSub = ?, @idPPN = ?, @pPPN = ?, @pTOT = ?, @pIDRUnit = ?, @pIDRSub = ?, @pIDRPPN = ?, @pIDRTot = ?, @jns_beli = ?, @mtUang = ?, @noTrans = ?', [$Operator, $kd, $Qty, $QtyDelay, $idsup, $kurs, $pUnit, $pSub, $idPPN, $pPPN, $pTOT, $pIDRUnit, $pIDRSub, $pIDRPPN, $pIDRTot, $jns_beli, $mtUang, $noTrans]);
                return Response()->json(['message' => 'Data Berhasil DiApprove']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }

    public function reject(Request $request, $id)
    {
        $kd = 16;
        $noTrans = $request->input('noTrans');
        $alasan = $request->input('alasan');
        $Operator = '1001';
        if (($noTrans != null) || ($alasan != null)) {
            try {
                $reject = DB::connection('ConnPurchase')->statement('exec SP_5409_SAVE_ORDER @Operator = ?, @kd = ?, @noTrans = ?, @alasan = ?', [$Operator, $kd, $noTrans, $alasan]);
                return Response()->json(['message' => 'Data Berhasil DiReject']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }

    public function edit($id)
    {
        dd("masuk edit");
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        dd("masuk update");
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        dd("masuk destroy");
    }
}
