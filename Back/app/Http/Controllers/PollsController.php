<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class PollsController extends Controller
{
    public function getpolls()
    {
        $polls = DB::table('polls')->get();

        return  response()->json(['polls' => $polls]);

    }


}
