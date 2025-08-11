<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vague extends Model
{
    /** @use HasFactory<\Database\Factories\VagueFactory> */
    use HasFactory;

    protected $fillable = [
       'level_id',
       'name',
       'slug',
       'start_date',
       'end_date',
    ];
}
