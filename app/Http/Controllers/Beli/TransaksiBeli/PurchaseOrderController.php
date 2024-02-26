<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
        $divisi = db::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @kd = ?, @Operator = ?', [1, trim(Auth::user()->NomorUser)]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        // dd($divisi,Auth::user()->NomorUser);
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

    public function getPermohonanDivisiNyantol($stBeli, $Kd_Div)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @stBeli = ?, @Kd_Div = ?', [38, $stBeli, $Kd_Div]);
        return response()->json($data);
    }

    public function getPermohonanUserNyantol($requester)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @requester = ?', [39, $requester]);
        return response()->json($data);
    }

    public function getPermohonanOrderNyantol($noTrans)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noTrans = ?', [40, $noTrans]);
        return response()->json($data);
    }

    public function closeOrder(Request $request)
    {
        $kd = 16;
        $noTrans = $request->input('noTrans');
        $QtyCancel = $request->input('QtyCancel');
        $alasan = "Dianggap lunas di order sebelumnya";
        $Operator = trim(Auth::user()->NomorUser);
        if (($noTrans != null) || ($QtyCancel != null)) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @Operator = ?, @kd = ?, @noTrans = ?, @alasan = ?, @QtyCancel = ?', [$Operator, $kd, $noTrans, $alasan, $QtyCancel]);
                return Response()->json(['message' => 'Data Berhasil DiClose Order', "data" => $data]);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function backCreatePO(Request $request)
    {
        $kd = 15;
        $noTrans = $request->input('noTrans');
        if (($noTrans != null)) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?, @noTrans = ?', [$kd, $noTrans]);
                return Response()->json(['message' => 'Data Berhasil DiBack Create PO', "data" => $data]);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
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
                    trim(Auth::user()->NomorUser),
                ]
            );
        }

        $loadHeader = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noPO = ?', [14, $No_PO]);
        $loadPermohonan = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noPO = ?', [13, $No_PO]);
        $namaDiv = db::connection('ConnPurchase')->table("YDIVISI")->select("YDIVISI.NM_DIV")->where("YDIVISI.KD_DIV", trim($loadPermohonan[0]->Kd_div))->get();
        $supplier = db::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd = ?', [1]);
        $listPayment = db::connection('ConnPurchase')->select('exec SP_5409_LIST_PAYMENT');
        $mataUang = db::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
        $ppn = db::connection('ConnPurchase')->select('exec SP_5409_LIST_PPN');
        // dd($loadHeader, $loadPermohonan);
        return view('Beli.TransaksiBeli.PurchaseOrder.CreateSPPB', compact('access', 'supplier', 'listPayment', 'mataUang', 'ppn', 'No_PO', 'loadPermohonan', 'loadHeader', 'namaDiv'));
    }

    public function print(Request $request)
    {
        $noPO = $request->input('noPO');
        if (($noPO !== null)) {
            try {
                $print = DB::connection('ConnPurchase')->table('VW_5409_PRINT_PO')->where('VW_5409_PRINT_PO.NO_PO', $noPO)->get();
                $printHeader = DB::connection('ConnPurchase')->table('VW_5409_PRINT_HEADER_PO')->where('VW_5409_PRINT_HEADER_PO.NO_PO', $noPO)->get();

                return Response()->json(["print"=>$print,"printHeader" => $printHeader]);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
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
        $Operator = trim(Auth::user()->NomorUser);
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
                $update = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?, @Qty = ?, @QtyCancel = ?, @kurs = ?, @pUnit = ?, @pSub = ?, @idPPN = ?, @pPPN = ?, @pTot = ?, @pIDRUnit = ?, @pIDRSub = ?, @pIDRPPN = ?, @pIDRTot = ?, @Operator = ?, @persen = ?, @disc = ?, @discIDR = ?, @noTrans = ?', [$kd, $Qty, $QtyCancel, $kurs, $pUnit, $pSub, $idPPN, $pPPN, $pTot, $pIDRUnit, $pIDRSub, $pIDRPPN, $pIDRTot, $Operator, $persen, $disc, $discIDR, $noTrans]);
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
        if (($noTrans !== null)) {
            try {
                $remove = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?, @noTrans = ?', [$kd, $noTrans]);
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
        $Operator = trim(Auth::user()->NomorUser);

        if (($noTrans !== null) &&
            ($alasan !== null)
        ) {
            try {
                $remove = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?, @noTrans = ?, @alasan = ?, @Operator = ?', [$kd, $noTrans, $alasan, $Operator]);
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
        $Operator = trim(Auth::user()->NomorUser);
        $idpay = $request->input('idpay');
        $jumCetak = 1;
        $Tgl_Dibutuhkan = Carbon::parse($request->input('Tgl_Dibutuhkan'));
        $idSup = $request->input('idSup');

        if (($noTrans !== null) ||
            ($mtUang !== null) ||
            ($tglPO !== null) ||
            ($idpay !== null) ||
            ($Tgl_Dibutuhkan !== null) ||
            ($idSup !== null)
        ) {
            try {
                $post = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?, @noTrans = ?, @mtUang =?, @tglPO =? , @idpay = ? , @jumCetak =?, @Tgl_Dibutuhkan = ?, @idsup = ?, @Operator = ?', [$kd, $noTrans, $mtUang, $tglPO, $idpay, $jumCetak, $Tgl_Dibutuhkan, $idSup, $Operator]);
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
        $sup = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Close / Cancel PO');
        if ($result > 0) {
            return view('Beli.TransaksiBeli.PurchaseOrder.CancelPO', compact('sup', 'access', 'result'));
        } else {
            abort(404);
        }
    }

    public function show1(Request $request)
    {
        $idSup = $request->input('idSup');
        $kd = 15;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd =?, @idSup =?', [$kd, $idSup]);

        return response()->json($purchaseorder);
    }

    public function showtbl(Request $request)
    {
        $noPO = $request->input('noPO');
        $kd = 16;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd =?, @noPO =?', [$kd, $noPO]);

        return response()->json($purchaseorder);
    }


    public function cancel(Request $request)
    {
        $noTrans = $request->input('noTrans');
        $kd = 15;

        $purchaseorder = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd=?, @noTrans=?' , [$kd, $noTrans]);

        return response()->json($purchaseorder);
    }

    public function cancel1(Request $request)
    {
        $Operator = trim(Auth::user()->NomorUser);
        $QtyCancel = $request->input('QtyCancel');
        $alasan = $request->input('alasan');
        $noTrans = $request->input('noTrans');
        $kd = 16;

        $purchaseorder = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd=?, @Operator=?, @QtyCancel=?, @alasan=?, @noTrans=?' ,  [$kd, $Operator, $QtyCancel, $alasan, $noTrans]);

        return response()->json($purchaseorder);
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
