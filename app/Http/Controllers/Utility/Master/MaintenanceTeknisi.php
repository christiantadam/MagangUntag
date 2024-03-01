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
        $teknisi = DB::connection('ConnEDP')->table('UserMaster')->get();
        $lokasi = DB::connection('ConnEDP')->table('Lokasi')->get();
        return view('Utility.Master.MaintenanceTeknisi', compact('access', 'teknisi', 'lokasi'));
    }


    public function saveTeknisi(Request $request)
    {
        try {
            $NamaUser = $request->input('NamaTeknisi');
            $Lokasi = $request->input('Lokasi');
            $Aktif = true; // Atur sesuai kebutuhan

            // Memanggil stored procedure dengan DB::connection
            DB::connection('ConnUtility')->statement('EXEC SP_INSERT_UTILITY_TEKNISI ?,?,?', [$NamaUser, $Lokasi, $Aktif]);

            return response()->json(['success' => 'Data Teknisi berhasil disimpan']);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
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

    public function searchTeknisi(Request $request)
    {
        // Mendapatkan nilai input pencarian dari request
        $nama = $request->input('searchTeknisi');

        // Melakukan query untuk mencari NamaUser yang cocok dengan input
        $listNamaUser = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->where('NamaUser', 'LIKE', "%$nama%")
            ->get();

        // Mengembalikan hasil pencarian dalam bentuk JSON
        return response()->json($listNamaUser);
    }

    public function getTeknisiById(Request $request)
    {
        $id = $request->input('id');

        $listTeknisi = DB::connection('ConnUtility')
            ->table('Utility_Teknisi')
            ->where('Id_Teknisi', $id)
            ->first();

        return response()->json($listTeknisi);
    }


    public function getTeknisi()
    {
        $listTeknisi = DB::connection('ConnUtility')->select('exec SP_LIST_UTILITY_TEKNISI');

        return datatables($listTeknisi)->make(true);
    }

    public function deleteTeknisi(Request $request)
    {
        try {
            $Id = $request->input('id');

            foreach ($Id as $id) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_UTILITY_TEKNISI @Id_Teknisi = ?', [$id]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
