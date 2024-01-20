<?php

namespace App\Http\Controllers\Utility\PanelInduk;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class InputGangguanPanelController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_GENZET');
        $keterangan = DB::connection('ConnUtility')->select('exec SP_LIST_KET_GANGGUANG_PANEL_INDUK');
        $teknisi = DB::connection('ConnUtility')->select('exec SP_LIST_TEKNISI_GENZET');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        return view('Utility.PanelInduk.InputGangguanPanel', compact('mesin', 'keterangan', 'teknisi', 'access'));
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
