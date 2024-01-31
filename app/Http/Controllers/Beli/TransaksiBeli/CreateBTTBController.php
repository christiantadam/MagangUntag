<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\User;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class CreateBTTBController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $nosup = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
        $po = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
        $ppn = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_PPN');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.TransaksiBeli.CreateBTTB', compact('nosup','po','ppn','access'));
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

    public function createbttb(Request $request)
    {
        $noPO = $request->input('noPO');
        $kd = 16;

        $createbttb = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd=?, @noPO=?',[$kd,$noPO]);

        return response()->json($createbttb);
    }



    //Display the specified resource.
    public function show($id)
    {
        //
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
