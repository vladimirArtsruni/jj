<?php


namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Http\Resources\UserCollection;
use GuzzleHttp\Client;
use simple_html_dom;
use App\User;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserExport;

class IndexController extends Controller
{

    public function index()
    {


      return view('welcome');

    }



}
