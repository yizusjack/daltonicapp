<?php

namespace App\Models;

use App\Models\User;
use App\Models\Reporte;
use App\Models\Comentario;
use App\Enums\TipoArchivoEnum;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Publicacion extends Model implements HasMedia
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
        'tipo_daltonismo',
    ];

    protected $casts = [
        'created_at' => 'date:Y-m-d'
    ];

    protected $appends = [
        'fecha',
        'canEditar',
        'canEliminar',
        'canComentar',
        'canReportar',
        'imagenes'
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

    /**
     * Formato de la fecha
     */
    public function getFechaAttribute(): string
    {
        return $this->created_at->format('d-m-Y');
    }

    /**
     * El usuario puede editar la publicacion
     */
    public function getcanEditarAttribute(): bool
    {
        return Gate::allows('update', $this);
    }

    /**
     * El usuario puede eliminar la publicacion
     */
    public function getcanEliminarAttribute(): bool
    {
        return Gate::allows('delete', $this);
    }

    /**
     * El usuario puede comentae la publicacion
     */
    public function getcanComentarAttribute(): bool
    {
        return Gate::allows('comentar', $this);
    }

    /**
     * Obtiene la URL de las imágenes que están relacionadas con la publicación
     */
    public function getImagenesAttribute(): array
    {
        return $this->getMedia('*')->pluck('original_url')->toArray();
    }

    public function getCanReportarAttribute(): bool
    {
      return Gate::allows('reportar', $this);
    }

}
