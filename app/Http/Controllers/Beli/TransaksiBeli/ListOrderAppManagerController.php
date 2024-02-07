<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class ListOrderAppManagerController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('List Order Sudah App Manager');
        if ($result > 0) {
            return view('Beli.TransaksiBeli.ListOrderAppManager.List', compact('access'));
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
    public function update(Request $request)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
