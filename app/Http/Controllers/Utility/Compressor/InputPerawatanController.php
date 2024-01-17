<?php

namespace App\Http\Controllers\Utility\Compressor;

use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class InputPerawatanController extends Controller
{
    public function index()
    {
        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_COMPRESSOR');
        $part = DB::connection('ConnUtility')->select('exec SP_LIST_PART_COMPRESSOR');
        $teknisi = DB::connection('ConnUtility')->select('exec SP_LIST_TEKNISI_GENZET');

        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Compressor.InputPerawatan.index', compact('mesin', 'part', 'teknisi', 'access'));
    }

    public function getKeterangan(Request $request)
    {
        $idPart = $request->input('idPart');
        $keterangan = DB::connection('ConnUtility')->select('exec SP_LIST_KETERANGAN_PART_COMPRESSOR @NoPart = ?', [$idPart]);

        return response()->json($keterangan);
    }

    public function getPerawatan(Request $request)
    {
            $date1 = $request->input('date1');
            $date2 = $request->input('date2');
            $NoMesin = $request->input('NoMesin');

            $listPerawatan = DB::connection('ConnUtility')
                ->select('exec SP_DT_LIST_COMPRESSOR_BLN_TAHUN2 @date1 = ?, @date2 = ?, @NoMesin = ?', [$date1, $date2, $NoMesin]);

            return response()->json($listPerawatan);

    }

    public function savePerawatan(Request $request)
    {
        try {
            $tanggal = $request->input('Tanggal');
            $noMesin = $request->input('NoMesin');
            $jamOperasi = $request->input('JamOperasi');
            $idPart = $request->input('IdPart');
            $keterangan = $request->input('Keterangan');
            $teknisi = $request->input('Teknisi');
            $userInput = $request->input('UserInput');



            DB::connection('ConnUtility')->statement('exec SP_INSERT_PERAWATAN_COMPRESSOR ?, ?, ?, ?, ?, ?, ?', [
                $tanggal, $noMesin, $jamOperasi, $idPart, $keterangan, $teknisi, $userInput
            ]);

            return redirect()->back()->with('success', 'Data has been saved.');
        } catch (\Exception $e) {

            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
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
        // Your implementation for destroy method
    }
}
