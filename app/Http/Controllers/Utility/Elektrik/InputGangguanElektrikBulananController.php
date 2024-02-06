<?php

namespace App\Http\Controllers\Utility\Elektrik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InputGangguanElektrikBulananController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $divisi = DB::connection('ConnUtility')->select('exec SP_LIST_DIVISI_PELAPOR');

        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Elektrik.InputGangguanBulanan.InputGangguanBulanan', compact('divisi', 'access'));
    }


    //Show the form for creating a new resource.
    public function postDataBulanan(Request $request)
    {
        try {
            // dd($request->all());
            $bulan = $request->input('bulan');
            $nama = $request->input('nama');
            $masalah = $request->input('masalah');
            $pabrik = $request->input('pabrik');
            $status = $request->input('status');
            $solusi = $request->input('solusi');
            $kode = '1';
            $image = $request->file('gambar1');
            $binaryReader = fopen($image, 'rb');
            $imageBinary = fread($binaryReader, $image->getSize());
            fclose($binaryReader);
            //$imagefile = DB::raw('0x' . bin2hex($imageBinary));

            $data = DB::connection('ConnUtility')->table('Gangguan_Elektrik_Bulanan')->insert([
                'Bulan' => $bulan,
                'Nama' => $nama,
                'Pabrik' => $pabrik,
                'Masalah' => $masalah,
                'GambarGangguan' =>  DB::raw('0x' . bin2hex($imageBinary)),
                'Status' => $status,
                'Solusi' => $solusi,
                'GambarSelesai' => null,
            ]);
            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function getDataBulananId(Request $request)
    {
        $id = $request->input('id');
        $data = DB::connection('ConnUtility')->table('Gangguan_Elektrik_Bulanan')->where('No', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        if (!empty($data->gambar)) {
            $data->gambar = base64_encode($data->gambar);
            $dataUri = "data:image/jpeg;base64," . $data->gambar; // Corrected line
        }
        dd($data);
        // Return the modified data as a JSON response
        return response()->json($data, 200);
    }



    // public function inputfile(Request $request)
    // {
    //     // dd($request->all(), $request->file('inputpdfmodal'));
    //     $request->validate([
    //         'inputpdfmodal' => 'required|mimes:pdf|max:2048', // Adjust the max file size as needed
    //     ]);
    //     $kdBarang = $request->kode;
    //     $pdf = $request->file('inputpdfmodal');
    //     $binaryReader = fopen($pdf, 'rb');
    //     $pdfBinary = fread($binaryReader, $pdf->getSize());
    //     fclose($binaryReader);
    //     // dd($pdf, $binaryReader, $pdfBinary);
    //     DB::connection('ConnPurchase')->table('Y_FOTO')->insert([
    //         'KD_BARANG' => $kdBarang,
    //         'PDF' => DB::raw('0x' . bin2hex($pdfBinary)) // Assuming PDF column is binary data type
    //     ]);
    //     return response()->json(['success' => 'mantap']);
    // }
    public function updateDataBulanan(Request $request)
    {
        try {
            // dd($request->all());
            $bulan = $request->input('bulan');
            $nama = $request->input('nama');
            $masalah = $request->input('pabrik');
            $pabrik = $request->input('masalah');
            $status = $request->input('status');
            $solusi = $request->input('solusi');
            $id = $request->input('id');
            $kode = '2';


            $data =  DB::connection('ConnUtility')->statement('exec SP_4372_Insert_Gangguan_Electric_Bulanan ?,?,?,?,?,?,?,?,?', [
                $bulan,
                $nama,
                $pabrik,
                $masalah,
                $status,
                $solusi,
                null,
                $kode,
                $id,
            ]);
            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Throwable $th) {
            // dd($save);
            return $th;
        }
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function getDataBulanan()
    {
        // Execute the stored procedure and fetch data
        $data = DB::connection('ConnUtility')->select('exec SP_4372_Insert_Gangguan_Electric_Bulanan @kode=0');
        // Return data as a JSON response
        return datatables($data)->make(true);
    }




    public function deleteDataBulanan(Request $request)
    {

        $Id = $request->input('id');

        try {
            foreach ($Id as $id) {
                DB::connection('ConnUtility')->statement('exec SP_4372_Insert_Gangguan_Electric_Bulanan @kode=3, @no= ?', [$id]);
            }

            // Return a success response
            return response()->json(['success' => true, 'message' => 'Data deleted successfully']);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json(['success' => false, 'message' => 'Error deleting data: ' . $e->getMessage()]);
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
