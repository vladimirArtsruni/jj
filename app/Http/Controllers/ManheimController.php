<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use JsonMachine\JsonMachine;
use App\Helpers\Helper;

class ManheimController extends Controller
{

    public function index(Request $request)
    {


        return view('manheim');


    }

}
