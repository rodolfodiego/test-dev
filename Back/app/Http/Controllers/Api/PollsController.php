<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Polls;
use App\Models\Results;
use Illuminate\Http\Request;

class PollsController extends Controller
{
    public function getpolls()
    {
        $polls = Polls::get();

        foreach($polls as $poll){

            $poll->results = $poll->results()->get();
            $poll->options = $poll->options()->get();
        }

        return  response()->json(['response'=> 'ok','polls' => $polls]);

    }

    public function sendvote(Request $request)
    {

        $result = Results::where(['polls_id'=>$request->pollsId, 'option_id'=>$request->optionId])->first();
        $result->result = $result->result +1;
        $result->update();
        return  response()->json(['response'=> 'ok']);

    }
}
