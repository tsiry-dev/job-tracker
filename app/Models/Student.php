<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    protected $fillable = [
        'vague_id',
        'name',
        'slug',
        'phone',
        'status'
    ];

    public function vague()
    {
        return $this->belongsTo(Vague::class, 'vague_id');
    }
}
