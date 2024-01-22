<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use GuzzleHttp\Psr7\Response;

class IsiSupplierHargaController extends Controller
{
    // Display a listing of the resource.
    public function index($id)
    {
        dd("masuk index");
    }

    //Show the form for creating a new resource.
    public function create()
    {
        dd("masuk create");
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        dd("masuk store");
    }

    //Display the specified resource.
    public function show($id)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        if ($access > 0) {
            return view('Beli.TransaksiBeli.IsiSupplierHarga', compact('id', 'access'));
        } else {
            abort(404);
        }
        // $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        // return view('Beli.TransaksiBeli.IsiSupplierHarga', compact('id','access'));
    }
    public function redisplay(Request $request, $id)
    {
        $noTrans = $request->input('noTrans');
        $kd = $request->input('kd');
        $requester = $request->input('requester');

        if (($noTrans != null) || ($kd != null) || ($requester != null)) {
            try {
                if ($kd == 11) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noTrans = ?, @kd = ?, @stBeli = ?', [$noTrans, $kd, $id]);
                } else if ($kd == 23) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @requester = ?, @kd = ?, @stBeli = ?', [$requester, $kd, $id]);
                } else if ($kd == 24) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @stBeli = ?', [$kd, 0]);
                }
                return datatables($redisplay)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    //Show the form for editing the specified resource.
    public function edit($id)
    {
        dd("masuk edit");
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        dd("masuk update");
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        dd("masuk destroy");
    }
}
