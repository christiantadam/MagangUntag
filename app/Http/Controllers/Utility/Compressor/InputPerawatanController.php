<?php

namespace App\Http\Controllers\Utility\Compressor;

use DB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class InputPerawatanController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_COMPRESSOR');
        $part = DB::connection('ConnUtility')->select('exec SP_LIST_PART_COMPRESSOR');
        $keterangan = DB::connection('ConnUtility')->select('exec SP_LIST_KETERANGAN_COMPRESSOR');
        $teknisi = DB::connection('ConnUtility')->select('exec SP_LIST_TEKNISI_GENZET');

        // dd($data);

        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        // dd($supplier);
        return view('Utility.Compressor.InputPerawatan.index' , compact('mesin','part','keterangan','teknisi','access'));
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
    public function show(Request $request)
{
    $date1 = $request->input('date1');
    $date2 = $request->input('date2');
    $NoMesin = $request->input('NoMesin');


    $data = DB::connection('ConnUtility')->select('exec SP_DT_LIST_COMPRESSOR_BLN_TAHUN2 @date1 = ?, @date2 = ?, @NoMesin=?', [$date1,$date2, $NoMesin]);
    dd($data);
    return response()->json($data);
    // return view('Utility.Compressor.InputPerawatan.index', compact('mesin','part','keterangan','teknisi','data','access'));
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
