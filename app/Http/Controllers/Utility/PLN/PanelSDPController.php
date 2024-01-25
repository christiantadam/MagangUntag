<?php

namespace App\Http\Controllers\Utility\PLN;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class PanelSDPController extends Controller
{
    public function createSDP(Request $request)
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
    public function updateSDP(Request $request)
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
    public function getSDP(Request $request)
    {
        try {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');
            $produksi = $request->input('produksi');

            $data = ($produksi == 0 || $produksi == null)
            ? DB::connection('ConnUtility')->select('exec SP_LIST_SPD_BLN_TAHUN @bulan = ?, @tahun = ?, @NoProduksi = 0', [$bulan, $tahun])
            : DB::connection('ConnUtility')->select('exec SP_LIST_SPD_BLN_TAHUN @bulan = ?, @tahun = ?, @NoProduksi = ?', [$bulan, $tahun, $produksi]);

            return datatables($data)->make(true);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function deleteSDP(Request $request)
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
