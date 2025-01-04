<?php

namespace App\Models;

use App\Models\User;
use App\Models\Respuesta;
use App\Models\GuiaContribucion;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GuiaContribucion extends Model
{
    /** @use HasFactory<\Database\Factories\GuiaContribucionFactory> */
    use HasFactory;

    protected $table = 'guia_contribuciones';

    protected $fillable = [
        'tipo_daltonismo',
        'user_id'
    ];

    /**
     * Una GuiaContibucion tiene un usuario
     * 
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Una GuiaContribucion tiene muchas instancias de Respuesta
     * 
     * @return HasMany
     */
    public function respuestas(): HasMany
    {
        return $this->hasMany(Respuesta::class);
    }
}
