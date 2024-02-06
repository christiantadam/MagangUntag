<?php

namespace App\Http\Controllers\Utility\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InputProjectController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Project.InputProject.InputProject', compact('access'));
    }

    public function postDataProject(Request $request)
    {
        // dd($request->all());
        //
        try {
            $Kode = '1';
            $NamaMesin = $request->input('nama_mesin');
            $NamaProject = $request->input('nama_project');;
            $TglMulai = $request->input('tanggal_mulai');
            $TglSelesai = $request->input('tanggal_selesai');
            $Keterangan = $request->input('keterangan');
            $Id = $request->input('id');
            $user_input = Auth::user()->NomorUser;
            $KeteranganKerja = $request->input('keterangan_kerusakan');
            $MerkMesin = $request->input('merk_mesin');
            $LokasiMesin = $request->input('lokasi_mesin');
            $TahunBuat = $request->input('tahun_pembuatan');
            $Perbaikan = $request->input('perbaikan');
            $ketGambar1 = $request->input('ketgambar1');
            $ketGambar2 = $request->input('ketgambar2');



            $image = $request->file('gambar1data');
            $imageBinary = null;
            if ($image) {
                $binaryReader = fopen($image, 'rb');
                $imageBinary = fread($binaryReader, $image->getSize());
                fclose($binaryReader);
            }

            // gambar 2
            $image2 = $request->file('gambar2data');
            $imageBinary2 = null;
            if ($image2) {
                $binaryReader2 = fopen($image2, 'rb');
                $imageBinary2 = fread($binaryReader2, $image2->getSize());
                fclose($binaryReader2);
            }

            DB::connection('ConnUtility')->statement('exec SP_1273_UTY_MAINT_PROJECT ?,?,?,?,?,?,?,?,?,?,?,?,?', [
                $Kode,
                $NamaMesin,
                $NamaProject,
                $TglMulai,
                $TglSelesai,
                $Keterangan,
                $user_input,
                $KeteranganKerja,
                $Id,
                $MerkMesin,
                $LokasiMesin,
                $TahunBuat,
                $Perbaikan,
            ]);


            $insertedId = DB::connection('ConnUtility')->getPdo()->lastInsertId();

            $save = DB::connection('ConnUtility')->table('GAMBAR_PROJECT')->insert([
                'Id' => $insertedId,
                'Gambar1' => $imageBinary ? DB::raw('0x' . bin2hex($imageBinary)) : null,
                'KeteranganGambar1' => $imageBinary ? $ketGambar1 : null,
                'Gambar2' => $imageBinary2 ? DB::raw('0x' . bin2hex($imageBinary2)) : null,
                'KeteranganGambar2' => $imageBinary2 ? $ketGambar2 : null,
                'UserInput' => $user_input,
                'UserKoreksi' => null,
            ]);

            return response()->json(['success' => true, 'data' => $save]);


            if ($save) {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['error' => 'Gagal menyimpan data.'], 500);
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Terjadi kesalahan internal.'], 500);
        }
        // return($request->all());
    }


    public function getDataProject(Request $request)
    {

        try {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');
            $user_input = Auth::user()->NomorUser;


            // Execute the stored procedure and fetch data
            $data = DB::connection('ConnUtility')->select('exec SP_1273_UTY_LIST_PROJECT @Kode=?, @bulan=?, @tahun=?, @Id=?', ['4', $bulan, $tahun, '4378']);

            // Jika data ditemukan, kembalikan dalam format yang sesuai

            return datatables($data)->make(true);
        } catch (\Exception $e) {
            // Tangani kesalahan jika terjadi
            return response()->json(['error' => 'Internal Server Error.'], 500);
        }
    }
    public function deleteDataProject(Request $request)
    {
        try {
            // Retrieve the ID to be deleted from the request
            $idToDelete = $request->input('id');

            // Check if the provided Kode is '3'
            $Kode = '3';
            if ($Kode == '3') {
                // Perform deletion logic for PROJECT table
                DB::connection('ConnUtility')->table('PROJECT')->where('Id', $idToDelete)->delete();

                // Return a success response
                return response()->json(['success' => true, 'message' => 'Data deleted successfully']);
            } else {
                // Return an error response if Kode is not '3'
                return response()->json(['success' => false, 'message' => 'Invalid Kode.']);
            }
        } catch (\Exception $e) {
            // Return an error response
            return response()->json(['success' => false, 'message' => 'Error deleting data: ' . $e->getMessage()]);
        }
    }



    public function getDataProjectId(Request $request)
    {
        $id = $request->input('id');
        $data = DB::connection('ConnUtility')->table('PROJECT')->where('Id', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }

    public function getDataUserId(Request $request)
    {
        try {
            $user_input = Auth::user()->NomorUser;

            return response()->json(['success' => true, 'NomorUser' => $user_input]);
        } catch (\Throwable $th) {
            report($th);
            return response()->json(['success' => false, 'message' => $th->getMessage()]);
        }
    }
    //Show the form for creating a new resource.

    public function updateDataProject(Request $request)
    {
        try {
            $Kode = '2';
            $Id = $request->input('idLaporan');
            $NamaProject = $request->input('nama_mesin');
            $NamaMesin = $request->input('nama_project');
            $TglMulai = $request->input('tanggal_mulai');
            $TglSelesai = $request->input('tanggal_selesai');
            $Keterangan = $request->input('keterangan');
            $user_input = Auth::user()->NomorUser;
            $KeteranganKerja = $request->input('keterangan_kerusakan');
            $MerkMesin = $request->input('merk_mesin');
            $LokasiMesin = $request->input('lokasi_mesin');
            $TahunBuat = $request->input('tahun_pembuatan');
            $Perbaikan = $request->input('perbaikan');






            $data = DB::connection('ConnUtility')->statement('exec SP_1273_UTY_MAINT_PROJECT ?,?,?,?,?,?,?,?,?,?,?,?,?', [
                $Kode,
                $NamaProject,
                $NamaMesin,
                $TglMulai,
                $TglSelesai,
                $Keterangan,
                $user_input,
                $KeteranganKerja,
                $Id,
                $MerkMesin,
                $LokasiMesin,
                $TahunBuat,
                $Perbaikan,
            ]);



            if ($data) {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['error' => 'Gagal menyimpan data.'], 500);
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Terjadi kesalahan internal.'], 500);
        }
    }

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
        //
    }
}
