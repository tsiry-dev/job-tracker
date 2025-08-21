<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
       'status'
    ];

    public function students(): HasMany
    {
        return $this->hasMany(Student::class, 'vague_id');
    }

    public function level(): BelongsTo
    {
        return $this->belongsTo(Level::class, 'level_id');
    }

    public function modules(): HasMany
    {
        return $this->hasMany(ModuleVague::class, 'vague_id');
    }

}
