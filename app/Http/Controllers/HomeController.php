<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransBL;
use App\User;
use DB;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // $AccessProgram=DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster','Id_Fitur','IdFitur')->join('ProgramMaster','Id_Program','IdProgram')->groupBy('NamaProgram')->where('Id_User',Auth::user()->IDUser)->get();
        $AccessProgram = DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster', 'Id_Fitur', 'IdFitur')->join('MenuMaster', 'Id_Menu', 'IdMenu')->join('ProgramMaster', 'Id_Program', 'IdProgram')->groupBy('NamaProgram')->where('Id_User', Auth::user()->IDUser)->get();
        //dd($AccessProgram);
        return view('home', compact('AccessProgram'));
    }
    public function Sales()
    {
        $result = (new HakAksesController)->HakAksesProgram('Sales');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        if ($result > 0) {
            // dd($access['AccessMenu']);
            // dd($access);
            return view('layouts.appSales', compact('access'));
        } else {
            abort(404);
        }
    }
    public function Beli()
    {
        $result = (new HakAksesController)->HakAksesProgram('Beli');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        if ($result > 0) {
            return view('layouts.appOrderPembelian', compact('access'));
        } else {
            abort(404);
        }
    }
    public function EDP()
    {
        $result = (new HakAksesController)->HakAksesProgram('EDP');
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        if ($result > 0) {
            return view('layouts.appEDP', compact('access'));
        } else {
            abort(404);
        }
    }
    public function Utility()
    {
        $result = (new HakAksesController)->HakAksesProgram('Utility');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        if ($result > 0) {
            return view('layouts.appUtility', compact('access'));
        } else {
            abort(404);
        }
    }
}
