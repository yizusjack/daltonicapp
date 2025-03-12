<?php

namespace App\Models;

use App\Models\User;
use App\Models\Comentario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comentario extends Model
{
    /** @use HasFactory<\Database\Factories\ComentarioFactory> */
    use HasFactory;

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
}
