<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('getpolls', 'App\Http\Controllers\Api\PollsController@getpolls');
Route::post('sendvote', 'App\Http\Controllers\Api\PollsController@sendvote');
