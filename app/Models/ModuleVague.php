<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModuleVague extends Model
{
    /** @use HasFactory<\Database\Factories\ModuleVagueFactory> */
    use HasFactory;

    protected $fillable = [
        'vague_id',
        'name',
        'description',
        'status'
    ];

    const PENDING = 0;
    const PROGRESS = 1;
    CONST FINISHED = 2;
}
