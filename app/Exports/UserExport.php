<?php
namespace App\Exports;

use App\Http\Resources\UserCollection;
use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UserExport implements FromCollection
{
    public function collection()
    {
        $users =  User::all();

        return   new UserCollection($users);

    }
}
