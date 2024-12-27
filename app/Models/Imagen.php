<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    protected $table = 'imagenes';

    protected $fillable = [
        'Respuesta_1',
        'Respuesta_2',
        'Respuesta_3',
    ];
}
