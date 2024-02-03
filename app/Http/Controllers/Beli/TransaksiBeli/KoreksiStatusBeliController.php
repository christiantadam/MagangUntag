<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class KoreksiStatusBeliController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Koreksi Status Beli');
        if ($result > 0) {
            return view('Beli.TransaksiBeli.KoreksiStatusBeli', compact('access'));
        } else {
            abort(404);
        }
    }
    public function redisplay(Request $request)
    {
        $noTrans = $request->input('noTrans');
        $kd = $request->input('kd');
        $requester = $request->input('requester');

        if (($noTrans != null) || ($kd != null) || ($requester != null)) {
            try {
                if ($kd == 11) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noTrans = ?, @kd = ?', [$noTrans, $kd]);
                } else if ($kd == 23) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @requester = ?, @kd = ?', [$requester, $kd]);
                } else if ($kd == 24) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?', [$kd]);
                }
                return datatables($redisplay)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    public function searchData(Request $request)
    {
        $nm_brg = $request->input('nm_brg');
        $kd = 3;
        if ($nm_brg != null) {
            try {
                $search = DB::connection('ConnPurchase')->select('exec spSelect_CariTypeBarang_dotNet @nm_brg = ?, @kd = ?', [$nm_brg, $kd]);
                return datatables($search)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
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
