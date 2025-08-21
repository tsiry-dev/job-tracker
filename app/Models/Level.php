<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Level extends Model
{
    /** @use HasFactory<\Database\Factories\LevelFactory> */
    use HasFactory;


    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    const LEVEL_LISTS = [
        [
            'name' => 'Niveau 1',
            'slug' => 'niveau-1',
        ],
        [
            'name' => 'Niveau 2',
            'slug' => 'niveau-2',
        ],
    ];


    public function vagues()
    {
        return $this->hasMany(Vague::class, 'level_id');
    }

    public function modules()
    {
        return $this->hasMany(Module::class, 'level_id');
    }
}
