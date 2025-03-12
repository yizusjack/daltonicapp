<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reporte extends Model
{
    /** @use HasFactory<\Database\Factories\ReporteFactory> */
    use HasFactory;

    /**
     * Nombre de la tabla
     *
     * @var string
     */
    protected $table = 'reportes';

    /**
     * Los atributos para asignaciones masivas
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'tipo',
        'explicacion',
        'reportable_type',
        'reportable_id',
    ];

    /**
     * Un reporte pertenece a un usuario
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

     /**
     * Un reporte está relacionado con varios modelos
     *
     * @return MorphTo
     */
    public function reportable() : MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'reportable_type', 'reportable_id');
    }
}
