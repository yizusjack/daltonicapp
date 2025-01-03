<?php

namespace App\Models;

use App\Models\Respuesta;
use App\Enums\TipoArchivoEnum;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /**
     * Una Imagen tiene muchas instancias de Respuesta
     * 
     * @return HasMany
     */
    public function respuestas(): HasMany
    {
        return $this->hasMany(Respuesta::class);
    }
    
    /**
     * Atributo para obtener la URL pública de la imagen
     * 
     * @return string
     */
    public function getURLAttribute()
    {
        return $this->getMedia(TipoArchivoEnum::Ishihara->value)->first()->getUrl();
    }
}
