<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    /** @use HasFactory<\Database\Factories\ModuleFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    const PENDING = 'en attente';
    const PROGRESS = 'en cours';
    CONST FINISHED = 'terminé';

    const MODULE_LISTS = [
        [
            'name' => 'HTML & CSS',
            'slug' => 'html-css',
            'description' => '',
            'status' => self::FINISHED,
        ],
        [
            'name' => 'Javascript & algorithme',
            'slug' => 'javascript-algorithme',
            'description' => '',
            'status' => self::PENDING
        ],
    ];


}
