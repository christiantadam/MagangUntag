<?php

namespace App\Http\Controllers\Utility\Elektrik;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Response;

$fileContent = Storage::get('webdictionary.txt');
echo $fileContent;

class InputGangguanElektrikController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $divisi = DB::connection('ConnUtility')->select('exec SP_LIST_DIVISI_PELAPOR');
        $teknisi = DB::connection('ConnUtility')->select('exec SP_LIST_TEKNISI_ELEKTRIK');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        return view('Utility.Elektrik.InputGangguan.InputGangguan', compact('teknisi', 'divisi', 'access'));
    }

    public function postData(Request $request)
    {
        try {
            // dd($request->all());
            $tanggal = $request->input('tanggal');
            $l_div_pelapor = $request->input('divisi_pelapor1');
            $nama_pelapor = $request->input('nama_pelapor');
            $penerima_laporan = $request->input('penerima_laporan');
            $jamlapor = $request->input('jam_lapor');
            $jampelaksanaan = $request->input('jam_perbaikan');
            $jamselesai = $request->input('jam_selesai');
            $Type_gangguan = $request->input('tipe_gangguan');
            $penyebab = $request->input('penyebab');
            $penyelesaian = $request->input('penyelesaian');
            $keterangan = $request->input('keterangan');
            $teknisi = $request->input('teknisi');
            $user_input = Auth::user()->NomorUser;
            $lanjut = $request->input('agree');
            $ketGambar1 = $request->input('ketgambar1');
            $ketGambar2 = $request->input('ketgambar2');

            $datetimeNow = now();
            $datetimeWithTime1 = $datetimeNow->toDateString() . ' ' . $jamlapor;
            $datetimeWithTime2 = $datetimeNow->toDateString() . ' ' . $jampelaksanaan;
            $datetimeWithTime3 = $datetimeNow->toDateString() . ' ' . $jamselesai;

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

            DB::connection('ConnUtility')->statement('exec SP_INSERT_GANGGUAN_ELEKTRIK ?,?,?,?,?,?,?,?,?,?,?,?,?,?', [
                $tanggal,
                $l_div_pelapor,
                $nama_pelapor,
                $penerima_laporan,
                $datetimeWithTime1,
                $datetimeWithTime2,
                $datetimeWithTime3,
                $Type_gangguan,
                $penyebab,
                $penyelesaian,
                $keterangan,
                $teknisi,
                $user_input,
                $lanjut
            ]);

            $insertedId = DB::connection('ConnUtility')->getPdo()->lastInsertId();

            $save = DB::connection('ConnUtility')->table('GAMBAR_ELEKTRIK')->insert([
                'IdLaporan' => $insertedId,
                'Gambar1' => $imageBinary ? DB::raw('0x' . bin2hex($imageBinary)) : null,
                'KeteranganGambar1' => $imageBinary ? $ketGambar1 : null,
                'Gambar2' => $imageBinary2 ? DB::raw('0x' . bin2hex($imageBinary2)) : null,
                'KeteranganGambar2' => $imageBinary2 ? $ketGambar2 : null,
                'UserInput' => $user_input,
                'UserKoreksi' => null,
            ]);

            return response()->json(['success' => true, 'data' => $user_input]);
        } catch (\Throwable $th) {
            report($th);
            return $th;
        }
    }

    public function getData(Request $request)
    {

        $tanggal1 = $request->input('tanggal1');
        $tanggal2 = $request->input('tanggal2');
        $l_div_pelapor = $request->input('divisi');
        $data = DB::connection('ConnUtility')->select('exec SP_DT_LIST_GANGGUAN_ELEKTRIK_BLN_THN2 @date1 = ?, @date2 = ?,  @divisi = ?', [$tanggal1, $tanggal2, $l_div_pelapor]);
        return datatables($data)->make(true);
    }

    public function getDataElektrikId(Request $request)
    {
        $id = $request->input('UP');
        $data = DB::connection('ConnUtility')->table('E_Gangguan_elektrik')->select('User_pelapor')->where('Id_Laporan', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }


    public function getUserId(Request $request)
    {
        try {
            $user_input = Auth::user()->NomorUser;

            return response()->json(['success' => true, 'NomorUser' => $user_input]);
        } catch (\Throwable $th) {
            report($th);
            return response()->json(['success' => false, 'message' => $th->getMessage()]);
        }
    }


    public function deleteData(Request $request)
    {

        $Id_Laporan = $request->input('id');

        try {
            foreach ($Id_Laporan as $id) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_GANGGUAN_ELEKTRIK @id_laporan = ?', [$id]);
                DB::connection('ConnUtility')->table('GAMBAR_ELEKTRIK')->where('IdLaporan', $id)->delete();
            }

            return response()->json(['success' => true, 'message' => 'Data deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting data: ' . $e->getMessage()]);
        }
    }
    public function selectImage($id, $imageName)
    {
        // Validate $imageName to make sure it's one of the allowed image names (e.g., 'Gambar1', 'Gambar2')

        $imageData = DB::connection('ConnUtility')
            ->table('GAMBAR_ELEKTRIK')
            ->select($imageName, 'Keterangan' . $imageName)
            ->where('IdLaporan', $id)
            ->first();

        if ($imageData) {
            $imageContent = $imageData->$imageName;
            $keterangan = $imageData->{'Keterangan' . $imageName};

            return Response::make($imageContent, 200, [
                'Content-Type' => 'image/*', // Adjust the content type based on your image format
                'Content-Disposition' => 'inline; filename="' . $imageName . '.jpg"',
            ])->header('Image-Description', $keterangan);
        }

        return response()->json(['message' => 'Image not found']);
    }




    public function updateDataElektrik(Request $request)
    {
        $id = $request->input('ID');
        $jampelaksanaan = $request->input('jam_perbaikan');
        $jamselesai = $request->input('jam_selesai');
        $Type_gangguan = $request->input('tipe_gangguan');
        $penyebab = $request->input('penyebab');
        $penyelesaian = $request->input('penyelesaian');
        $keterangan = $request->input('keterangan');
        $teknisi = $request->input('teknisi');
        $lanjut = $request->input('agree');
        $ketGambar1 = $request->input('ketgambar1');
        $ketGambar2 = $request->input('ketgambar2');
        $user_input = Auth::user()->NomorUser;

        // gambar 1
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


        // Update data E_Gangguan_elektrik
        $data = DB::connection('ConnUtility')->table('E_Gangguan_elektrik')
            ->where('Id_Laporan', $id)
            ->update([
                'jam_pelaksanan' => $jampelaksanaan,
                'Jam_selesai' => $jamselesai,
                'Type_gangguan' => $Type_gangguan,
                'Penyebab' => $penyebab,
                'Penyelesaian' => $penyelesaian,
                'Keterangan' => $keterangan,
                'Teknisi' => $teknisi,
                'user_input' => $user_input,
                'Lanjut' => $lanjut,
            ]);

        $save = DB::connection('ConnUtility')->table('GAMBAR_ELEKTRIK')->where('IdLaporan', $id);

        $updateData = [
            'KeteranganGambar1' => $ketGambar1,
            'KeteranganGambar2' => $ketGambar2,
            'UserInput' => $user_input,
            'UserKoreksi' => null,
        ];
        // Jika ada gambar1 yang diunggah
        if ($imageBinary) {
            $updateData['Gambar1'] = DB::raw('0x' . bin2hex($imageBinary));
        }
        // Jika ada gambar2 yang diunggah
        if ($imageBinary2) {
            $updateData['Gambar2'] = DB::raw('0x' . bin2hex($imageBinary2));
        }
        $save->update($updateData);



        return response()->json(['success' => true, 'data' => $save]);
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
        //
    }
}
