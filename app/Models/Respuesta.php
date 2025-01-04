<?php

namespace App\Models;

use App\Models\Imagen;
use App\Models\GuiaContribucion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Respuesta extends Model
{
    protected $fillable = [
        'resultado',
        'imagen_id',
        'guia_contribucion_id',
    ];

    /**
     * Una Respuesta pertenece a una Imagen
     * 
     * @return BelongsTo
     */
    public function imagen(): BelongsTo
    {
        return $this->belongsTo(Imagen::class);
    }

    /**
     * Una Respuesta pertenece a una GuiaContribucion
     * 
     * @return BelongsTo
     */
    public function guiaContribucion(): BelongsTo
    {
        return $this->belongsTo(GuiaContribucion::class);
    }
}
