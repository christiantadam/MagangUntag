<?php

namespace App\Http\Controllers\Utility\Master;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Response;


class MaintenanceTeknisi extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        return view('Utility.Master.MaintenanceTeknisi', compact('access'));
    }


    public function saveTeknisi(Request $request)
    {
        try {
            $Teknisi = $request->input('Teknisi');

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_TEKNISI_GENZET ? ', [$Teknisi]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function updateTeknisi(Request $request)
    {
        try {
            $id = $request->input('NomorId');
            $Teknisi = $request->input('Teknisi');

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_TEKNISI_GENZET ? , ? ', [$id, $Teknisi]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function getTeknisi()
    {
        $listTeknisi =DB::connection('ConnUtility')->select('exec SP_Utility_Teknisi');

        return datatables($listTeknisi)->make(true);
    }

    public function deleteTeknisi(Request $request)
    {
        try {
            $Id = $request->input('id');

            foreach ($Id as $id) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_TEKNISI_GENZET @NoTeknisi = ?', [$id]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
