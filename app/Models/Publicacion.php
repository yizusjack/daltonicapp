<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model
{
    /** @use HasFactory<\Database\Factories\PublicacionFactory> */
    use HasFactory;

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
}
