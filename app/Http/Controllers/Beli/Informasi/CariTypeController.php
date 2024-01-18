<?php

namespace App\Http\Controllers\Beli\Informasi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class CariTypeController extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesProgram('Beli');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        if ($result > 0) {
            return view('Beli.Informasi.CariType', compact('access'));
        } else {
            abort(404);
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
        $search = DB::connection('ConnPurchase')->select('exec spSelect_CariTypeBarang_dotNet @nm_brg = ?, @kd = ?',[$nm_brg,$kd]);
        return response()->json($search);
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
