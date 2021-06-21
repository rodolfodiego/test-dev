<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Polls extends Model
{
    use HasFactory;
    protected $table = 'polls';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'created_at',
        'updated_at'
    ];

    public function results(){
        return $this->hasMany(Results::class,'polls_id','id');
    }
    public function options(){
        return $this->hasMany(Options::class,'polls_id','id');
    }
}
