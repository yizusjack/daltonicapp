<?php

namespace App\Models;

use App\Models\User;
use App\Models\Comentario;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Publicacion extends Model
{
    /** @use HasFactory<\Database\Factories\PublicacionFactory> */
    use HasFactory, InteractsWithMedia;

    /**
     * La tabla de la base de datos relacionada
     *
     * @var string
     */
    protected $table = 'publicaciones';

    /**
     * Los campos para asignaciones masivas
     *
     * @var array
     */
    protected $fillable = [
        'titulo',
        'contenido',
        'user_id',
        'tipo',
    ];

    /**
     * Una publicación pertenece a un usuario
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Una publicacion puede tener muchos comentarios
     *
     * @return MorphMany
     */
    public function comentarios(): MorphMany
    {
        return $this->morphMany(Comentario::class, 'comentable', 'comentable_type', 'comentable_id');
    }

    /**
     * Una publicación puede tener muchos reportes
     *
     * @return MorphMany
     */
    public function reportes(): MorphMany
    {
        return $this->morphMany(Reporte::class, 'reportable', 'reportable_type', 'reportable_id');
    }
}
