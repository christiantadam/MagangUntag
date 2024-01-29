<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PurchaseOrderController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.TransaksiBeli.PurchaseOrder.List', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        $divisi = db::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @kd = ?, @Operator = ?', [1, Auth::user()->kd_user]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        // dd($divisi);
        return view('Beli.TransaksiBeli.PurchaseOrder.Create', compact('divisi', 'access'));
    }

    public function getPermohonanDivisi($stBeli, $Kd_Div)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @stBeli = ?, @Kd_Div = ?', [12, $stBeli, $Kd_Div]);
        return response()->json($data);
    }

    public function getPermohonanUser($requester)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @requester = ?', [29, $requester]);
        return response()->json($data);
    }

    public function getPermohonanOrder($noTrans)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noTrans = ?', [30, $noTrans]);
        return response()->json($data);
    }

    public function openFormCreateSPPB(Request $request)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $noTrans = explode(',', $request->noTrans);
        $tahun = date('y', time());
        $mValue = DB::connection('ConnPurchase')->select('SELECT NO_SPPB FROM YCounter');
        $No_PO = '000000' . strval($mValue[0]->NO_SPPB);
        $No_PO = 'PO-' . $tahun . substr($No_PO, -6);
        DB::connection('ConnPurchase')->statement('update ycounter set NO_SPPB =' . $mValue[0]->NO_SPPB . '+ 1');
        // dd($No_PO);

        for ($i = 0; $i < count($noTrans); $i++) {
            db::connection('ConnPurchase')->statement(
                'exec SP_5409_MAINT_PO
            @kd = ?,
            @noTrans = ?,
            @noPO = ?,
            @Operator = ?',
                [
                    2,
                    $noTrans[$i],
                    $No_PO,
                    Auth::user()->kd_user,
                ]
            );
        }

        $loadHeader = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noPO = ?', [14, $No_PO]);
        $loadPermohonan = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noPO = ?', [13, $No_PO]);
        $supplier = db::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd = ?', [1]);
        $listPayment = db::connection('ConnPurchase')->select('exec SP_5409_LIST_PAYMENT');
        $mataUang = db::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
        $ppn = db::connection('ConnPurchase')->select('exec SP_5409_LIST_PPN');
        // dd($loadHeader, $loadPermohonan);
        return view('Beli.TransaksiBeli.PurchaseOrder.CreateSPPB', compact('access', 'supplier', 'listPayment', 'mataUang', 'ppn', 'No_PO', 'loadPermohonan', 'loadHeader'));
    }

    public function update(Request $request)
    {
        $kd = 3;
        $Qty = $request->input('Qty');
        $QtyCancel = $request->input('QtyCancel');
        $kurs = $request->input('kurs');
        $pUnit = $request->input('pUnit');
        $pSub = $request->input('pSub');
        $idPPN = $request->input('idPPN');
        $pPPN = $request->input('pPPN');
        $pTot = $request->input('pTot');
        $pIDRUnit = $request->input('pIDRUnit');
        $pIDRSub = $request->input('pIDRSub');
        $pIDRPPN = $request->input('pIDRPPN');
        $pIDRTot = $request->input('pIDRTot');
        $Operator = '1001';
        $persen = $request->input('persen');
        $disc = $request->input('disc');
        $discIDR = $request->input('discIDR');
        $noTrans = $request->input('noTrans');
        if (($Qty !== null) ||
            ($QtyCancel !== null) ||
            ($kurs !== null) ||
            ($pUnit !== null) ||
            ($pSub !== null) ||
            ($idPPN !== null) ||
            ($pPPN !== null) ||
            ($pTot !== null) ||
            ($pIDRUnit !== null) ||
            ($pIDRSub !== null) ||
            ($pIDRPPN !== null) ||
            ($pIDRTot !== null) ||
            ($persen !== null) ||
            ($disc !== null) ||
            ($discIDR !== null) ||
            ($noTrans !== null)
        ) {
            try {
                $update = DB::connection('ConnPurchase')->select('exec SP_5409_MAINT_PO @kd = ?, @Qty = ?, @QtyCancel = ?, @kurs = ?, @pUnit = ?, @pSub = ?, @idPPN = ?, @pPPN = ?, @pTot = ?, @pIDRUnit = ?, @pIDRSub = ?, @pIDRPPN = ?, @pIDRTot = ?, @Operator = ?, @persen = ?, @disc = ?, @discIDR = ?, @noTrans = ?', [$kd, $Qty, $QtyCancel, $kurs, $pUnit, $pSub, $idPPN, $pPPN, $pTot, $pIDRUnit, $pIDRSub, $pIDRPPN, $pIDRTot, $Operator, $persen, $disc, $discIDR, $noTrans]);
                return Response()->json(['message' => 'Data Berhasil diupdate']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function remove(Request $request)
    {
        $kd = 6;
        $noTrans = $request->input('noTrans');
        if (($noTrans !== null)
        ) {
            try {
                $remove = DB::connection('ConnPurchase')->select('exec SP_5409_MAINT_PO @kd = ?, @noTrans = ?', [$kd, $noTrans]);
                return Response()->json(['message' => 'Data Berhasil Remove']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function reject(Request $request)
    {
        $kd = 4;
        $noTrans = $request->input('noTrans');
        $alasan = $request->input('alasan');
        $Operator = '1001';

        if (($noTrans !== null) &&
            ($alasan !== null)
        ) {
            try {
                $remove = DB::connection('ConnPurchase')->select('exec SP_5409_MAINT_PO @kd = ?, @noTrans = ?, @alasan = ?, @Operator = ?', [$kd, $noTrans, $alasan, $Operator]);
                return Response()->json(['message' => 'Data Berhasil Reject']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function post(Request $request)
    {
        $kd = 5;
        $noTrans = $request->input('noTrans');
        $mtUang = $request->input('mtUang');
        $tglPO = $request->input('tglPO');
        $Operator = '1001';
        $idpay = $request->input('idpay');
        $jumCetak = 1;
        $Tgl_Dibutuhkan = $request->input('Tgl_Dibutuhkan');
        $idSup = $request->input('idSup');

        if (($noTrans !== null) ||
            ($mtUang !== null) ||
            ($tglPO !== null) ||
            ($idpay !== null) ||
            ($Tgl_Dibutuhkan !== null) ||
            ($idSup !== null)
        ) {
            try {
                $post = DB::connection('ConnPurchase')->select('exec SP_5409_MAINT_PO @kd = ?, @noTrans = ?, @mtUang =?, @tglPO =? , @idpay = ? , @jumCetak =?, @Tgl_Dibutuhkan = ?, @idsup = ?, @Operator = ?', [$kd, $noTrans, $mtUang, $tglPO, $idpay, $jumCetak, $Tgl_Dibutuhkan, $idSup, $Operator]);
                return Response()->json(['message' => 'Data Berhasil Post']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    //Store a newly created resource in storage.
    public function store(Request $request)
    {
    }
    public function show($id)
    {
    }
    //Display the specified resource.
    public function redisplay(Request $request)
    {
        $MinDate = $request->input('MinDate');
        $MaxDate = $request->input('MaxDate');
        $noPO = $request->input('noPO');
        $kd = 22;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd =?, @noPO =?, @MinDate=?, @MaxDate=?', [$kd, $noPO, $MinDate, $MaxDate]);

        return response()->json($purchaseorder);
    }

    public function display(Request $request)
    {
        $noPO = $request->input('noPO');
        $kd = 21;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd =?, @noPO =?', [$kd, $noPO]);

        return response()->json($purchaseorder);
    }


    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }



    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
