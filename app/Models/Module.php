<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    /** @use HasFactory<\Database\Factories\ModuleFactory> */
    use HasFactory;

    protected $fillable = [
        'level_id',
        'name',
        'slug',
        'description'
    ];

    const MODULE_LISTS = [
        [
            'level_id' => 1,
            'name' => 'HTML & CSS',
            'slug' => 'html-css',
            'description' => '',
        ],
        [
            'level_id' => 1,
            'name' => 'Javascript & algorithme',
            'slug' => 'javascript-algorithme',
            'description' => '',
        ],
    ];


}
