<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    protected $fillable = [
        'URL',
        'Respuesta_1',
        'Respuesta_2',
        'Respuesta_3',
    ];
}
