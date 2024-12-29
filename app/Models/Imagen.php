<?php

namespace App\Models;

use App\Enums\TipoArchivoEnum;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;

class Imagen extends Model implements HasMedia
{
    use InteractsWithMedia;
    
    protected $table = 'imagenes';

    protected $appends = ['URL'];

    protected $fillable = [
        'Respuesta_1',
        'Respuesta_2',
        'Respuesta_3',
    ];

    public function getURLAttribute()
    {
        return $this->getMedia(TipoArchivoEnum::Ishihara->value)->first()->getUrl();
    }
}
