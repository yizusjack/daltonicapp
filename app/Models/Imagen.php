<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;

class Imagen extends Model implements HasMedia
{
    use InteractsWithMedia;
    
    protected $table = 'imagenes';

    protected $fillable = [
        'Respuesta_1',
        'Respuesta_2',
        'Respuesta_3',
    ];
}
