<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Observation extends Model
{
    /** @use HasFactory<\Database\Factories\ObservationFactory> */
    use HasFactory;

    protected  $fillable = [
        'student_id',
        'module_id',
        'description',
        'status'
    ];

    const STATUS_ADMIN = 'admin';
    const STATUS_RECALE = 'recale';


}
