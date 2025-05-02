<?php

namespace App\Models;

use App\Models\User;
use App\Models\Reporte;
use App\Models\Comentario;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comentario extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\ComentarioFactory> */
    use HasFactory, InteractsWithMedia;

    /**
     * El nombre de la tabla
     *
     * @var string
     */
    protected $table = 'comentarios';

    /**
     * Los atributos para asignaciones masivas
     *
     * @var array
     */
    protected $fillable = [
        'comentario',
        'comentable_type',
        'comentable_id',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'date:Y-m-d'
    ];

    protected $appends = [
        'fecha',
        'canEliminar'
    ];

    /**
     * Un comentario pertenece a un usuario
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Un comentario está relacionado con varios modelos
     *
     * @return MorphTo
     */
    public function comentable() : MorphTo
    {
        return $this->morphTo(__FUNCTION__, 'comentable_type', 'comentable_id');
    }

    /**
     * Un comentario puede tener muchos comentarios
     *
     * @return MorphMany
     */
    public function comentarios(): MorphMany
    {
        return $this->morphMany(Comentario::class, 'comentable', 'comentable_type', 'comentable_id');
    }

    /**
     * Un comentario puede tener muchos reportes
     *
     * @return MorphMany
     */
    public function reportes(): MorphMany
    {
        return $this->morphMany(Reporte::class, 'reportable', 'reportable_type', 'reportable_id');
    }

    /**
     * Obtiene la fecha del comentario formateada
     *
     * @return string
     */
    public function getFechaAttribute(): string
    {
        return $this->created_at->format('d-m-Y');
    }

    public function getImagenesAttribute(): array
    {
        return $this->getMedia('*')->pluck('original_url')->toArray();
    }

    public function getCanEliminarAttribute(): bool
    {
        return Gate::allows('delete', $this);
    }
}
