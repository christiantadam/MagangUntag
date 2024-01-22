<?php

namespace App\Http\Controllers\Beli\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class MaintenanceController extends Controller

{
    // Display a listing of the resource.
    public function index()
    {

            $result = (new HakAksesController)->HakAksesFitur('Maintenance Type Barang');
            $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
            if ($result > 0) {

                return view('Beli.Master.MaintenanceTypeBarang', compact('access'));
            } else {
                abort(403);
            }


    }
}
