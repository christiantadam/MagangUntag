<?php

namespace App\Http\Controllers\Utility\Elektrik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TambahGambarElektrikController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $divisi = DB::connection('ConnUtility')->select('exec SP_LIST_DIVISI_PELAPOR');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Elektrik.TambahGambar.TambahGambar', compact('divisi', 'access'));
    }


    public function getData(Request $request)
    {


        $tanggal1 = $request->input('tanggal1');
        $tanggal2 = $request->input('tanggal2');
        $l_div_pelapor = $request->input('divisi');

        // Execute the stored procedure and fetch data
        $data = DB::connection('ConnUtility')->select('exec SP_DT_LIST_GANGGUAN_ELEKTRIK_BLN_THN2 @date1 = ?, @date2 = ?,  @divisi = ?', [$tanggal1, $tanggal2, $l_div_pelapor]);
        // Return data as a JSON response
        return datatables($data)->make(true);
    }

    public function postData(Request $request)
    {
        try {


            // dd($request->all());
            $user_input = Auth::user()->NomorUser;
            $idToCheck = $request->input('id');
            $Keterangan1 = $request->input('ket1');
            $Keterangan2 = $request->input('ket2');
            $Keterangan3 = $request->input('ket3');
            $Keterangan4 = $request->input('ket4');
            $Keterangan5 = $request->input('ket5');
            $Keterangan6 = $request->input('ket6');
            $Keterangan7 = $request->input('ket7');
            $Keterangan8 = $request->input('ket8');
            $Keterangan9 = $request->input('ket9');
            $Keterangan10 = $request->input('ket10');

            // gambar 3
            $image3 = $request->file('gambar3data');
            $binaryReader3 = fopen($image3, 'rb');
            $imageBinary3 = fread($binaryReader3, $image3->getSize());
            fclose($binaryReader3);

            // gambar 4
            $image4 = $request->file('gambar4data');
            $binaryReader4 = fopen($image4, 'rb');
            $imageBinary4 = fread($binaryReader4, $image4->getSize());
            fclose($binaryReader4);
            // gambar 5
            $image5 = $request->file('gambar5data');
            $binaryReader5 = fopen($image5, 'rb');
            $imageBinary5 = fread($binaryReader5, $image5->getSize());
            fclose($binaryReader5);
            // gambar 6
            $image6 = $request->file('gambar6data');
            $binaryReader6 = fopen($image6, 'rb');
            $imageBinary6 = fread($binaryReader6, $image6->getSize());
            fclose($binaryReader6);
            // gambar 7
            $image7 = $request->file('gambar7data');
            $binaryReader7 = fopen($image7, 'rb');
            $imageBinary7 = fread($binaryReader7, $image7->getSize());
            fclose($binaryReader7);
            // gambar 8
            $image8 = $request->file('gambar8data');
            $binaryReader8 = fopen($image8, 'rb');
            $imageBinary8 = fread($binaryReader8, $image8->getSize());
            fclose($binaryReader8);
            // gambar 9
            $image9 = $request->file('gambar9data');
            $binaryReader9 = fopen($image9, 'rb');
            $imageBinary9 = fread($binaryReader4, $image9->getSize());
            fclose($binaryReader9);
            // gambar 10
            $image10 = $request->file('gambar10data');
            $binaryReader10 = fopen($image10, 'rb');
            $imageBinary10 = fread($binaryReader10, $image10->getSize());
            fclose($binaryReader10);

            $existingData =
                DB::connection('ConnUtility')->table('GAMBAR_ELEKTRIK')->where('IdLaporan', $idToCheck)->whereNotNull('Gambar1')
                ->whereNotNull('Gambar2')->first();

            if ($existingData) {
                $save = DB::table('GAMBAR_ELEKTRIK')
                    ->where('id', $idToCheck)
                    ->update([
                        'Gambar3 ' => DB::raw('0x' . bin2hex($imageBinary3)),
                        'KeteranganGambar3' => 'Keterangan Gambar',
                        'Gambar4 ' => DB::raw('0x' . bin2hex($imageBinary4)),
                        'KeteranganGambar4' => 'Keterangan Gambar',
                        'Gambar5 ' => DB::raw('0x' . bin2hex($imageBinary5)),
                        'KeteranganGambar5' => 'Keterangan Gambar',
                        'Gambar6 ' => DB::raw('0x' . bin2hex($imageBinary6)),
                        'KeteranganGambar6' => 'Keterangan Gambar',
                        'Gambar7 ' => DB::raw('0x' . bin2hex($imageBinary7)),
                        'KeteranganGambar7' => 'Keterangan Gambar',
                        'Gambar8 ' => DB::raw('0x' . bin2hex($imageBinary8)),
                        'KeteranganGambar8' => 'Keterangan Gambar',
                        'Gambar9 ' => DB::raw('0x' . bin2hex($imageBinary9)),
                        'KeteranganGambar9' => 'Keterangan Gambar',
                        'Gambar10 ' => DB::raw('0x' . bin2hex($imageBinary10)),
                        'KeteranganGambar10' => 'Keterangan Gambar',
                        'UserKoreksi' => $user_input,
                    ]);
            } else {
                return response()->json(['message' => 'Data tidak bisa ditambahkan. Gambar1 dan Gambar2 harus terisi.']);
            }
            return response()->json(['success' => true, 'data' => $save]);
        } catch (\Throwable $th) {
            report($th);
            return $th;
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
        //
    }
}
