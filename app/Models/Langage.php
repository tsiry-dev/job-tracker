<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Langage extends Model
{
    /** @use HasFactory<\Database\Factories\LangageFactory> */
    use HasFactory;


    protected $fillable = [
        'name',
        'slug',
        'description'
    ];

    const LANGAGE_LISTS = [
       [
            'name' => 'PHP',
            'slug' => 'php',
            'description' => 'PHP est un langage de programmation open source, créé en 1995 par Rasmus Lerdorf et mis à jour en 2019. PHP est un langage de scripting, développé pour la création de pages web dynamiques. PHP est utilisé pour créer des applications web, logiciels de gestion de bases de données, et pour d\'autres types de projets.'
       ],
       [
            'name' => 'Javascript',
            'slug' => 'javascript',
            'description' => 'Javascript est un langage de scripting, développé pour la création de pages web dynamiques. PHP est utilisé pour créer des applications web, logiciels de gestion de bases de données, et pour d\'autres types de projets.'
       ],
       [
            'name' => 'HTML',
            'slug' => 'html',
            'description' => ''
       ],
       [
            'name' => 'CSS',
            'slug' => 'css',
            'description' => ''
       ],
       [
            'name' => 'Vue',
            'slug' => 'vue',
            'description' => ''
       ],
       [
            'name' => 'React',
            'slug' => 'react',
            'description' => ''
       ],
    ];
}
