<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class ReturBTTBController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $supplier = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
        $po = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.TransaksiBeli.ReturBTTB', compact('supplier','access','po'));
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
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.

    public function po(Request $request)
    {
        $noPO = $request->input('noPO');
        $kd = 37;

        $returbttb = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd=?, @noPO=?',[$kd,$noPO]);

        return response()->json($returbttb);
    }


    public function display(Request $request)
    {
        $noPO = $request->input('noPO');
        $kd = 25;

        $returbttb = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd=?, @noPO=?',[$kd,$noPO]);

        return response()->json($returbttb);
    }

    public function kdbrg(Request $request)
    {
        $kodebarang = $request->input('kodebarang');
        $kd = 11;

        $returbttb = DB::connection('ConnInventory') ->select('exec SP_1003_INV_LIST_TYPE @Kode = ?, @kodebarang = ?', [$kd, $kodebarang]);

        return response()->json($returbttb);
    }


    public function post()
    {
        $kd = 14;
        $returbttb = DB::connection('ConnPurchase')->select('exec SP_5409_MAINT_PO @kd=?',[$kd]);

        return response()->json($returbttb);
    }

    public function edit($id)
    {

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
