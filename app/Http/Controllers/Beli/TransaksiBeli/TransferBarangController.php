<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use GuzzleHttp\Psr7\Response;

class TransferBarangController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Transfer Barang');
        if ($result > 0) {
            return view('Beli.TransaksiBeli.TransferBarang.TransferBarang', compact('access'));
        } else {
            abort(404);
        }
    }

    public function redisplay(Request $request)
    {
        $Kd_Div = $request->input('Kd_Div');
        $kd = $request->input('kd');
        $noBTTB = $request->input('noBTTB');
        if (($Kd_Div != null) || ($kd != null) || ($noBTTB != null)) {
            try {
                if ($kd == 32) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @Kd_Div = ?, @kd = ?', [$Kd_Div, $kd]);
                } else if ($kd == 33) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noBTTB = ?, @kd = ?', [$noBTTB, $kd]);
                } else if ($kd == 18) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @Kd_Div = ?, @kd = ?', [$Kd_Div, $kd]);
                } else if ($kd == 27) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noBTTB = ?, @kd = ?', [$noBTTB, $kd]);
                }
                return datatables($redisplay)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function divisi()
    {
        $Operator = '1001';
        try {
            $data = DB::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @Operator = ?, @kd = ?', [$Operator, 1]);

            return Response()->json($data);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $No_PO = $request->query('No_PO');
        $No_BTTB = $request->query('No_BTTB');
        // dd($No_BTTB,$No_PO);
        return view('Beli.TransaksiBeli.TransferBarang.TransferBTTB', compact('access', 'No_PO','No_BTTB'));
        // return Response()->json('kjsks');
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
