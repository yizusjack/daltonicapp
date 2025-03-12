<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
