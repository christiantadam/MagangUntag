<?php

namespace App\Http\Controllers\Utility\PLN;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class InputPLNController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $teknisi = DB::connection('ConnUtility')->select('exec SP_LIST_TEKNISI_GENZET');
        $sdp = DB::connection('ConnUtility')->select('exec SP_LIST_PRODUKSI_SPD');

        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        return view('Utility.PLN.InputPLN', compact('teknisi','sdp', 'access'));
    }

    public function createPLN(Request $request)
    {
        try {
            $tanggal = $request->input('Tanggal');
            $jam = $request->input('Jam');
            $lwbp = $request->input('LWBP');
            $wbp = $request->input('WBP');
            $kvar = $request->input('KVAR');
            $teknisi = $request->input('Teknisi');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_PLN ? , ? , ? , ? , ? , ? , ?', [$tanggal, $jam, $lwbp, $wbp, $kvar, $teknisi, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }
    public function updatePLN(Request $request)
    {
        try {
            $tanggal = $request->input('Tanggal');
            $jam = $request->input('Jam');
            $lwbp = $request->input('LWBP');
            $wbp = $request->input('WBP');
            $kvar = $request->input('KVAR');
            $teknisi = $request->input('Teknisi');
            $UserInput = Auth::user()->NomorUser;
            $id = $request->input('NomorPLN');

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_PLN ? , ? , ? , ? , ? , ? , ? , ?', [$id, $tanggal, $jam, $lwbp, $wbp, $kvar, $teknisi, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    //Display the specified resource.
    public function getPLN(Request $request)
    {
        try {
            //code...
            $date1 = $request->input('date1');
            $date2 = $request->input('date2');

            $data = DB::connection('ConnUtility')->select('exec SP_LIST_PLN_BLN_TAHUN2 @date1 = ?, @date2 = ?', [$date1, $date2]);

            return datatables($data)->make(true);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function deletePLN(Request $request)
    {
        try {
            $nomor = $request->input('Nomor');

            foreach ($nomor as $nomor) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_PLN  @nomor = ?', [$nomor]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
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
