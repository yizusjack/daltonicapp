<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuiaContribucion extends Model
{
    /** @use HasFactory<\Database\Factories\GuiaContribucionFactory> */
    use HasFactory;

    protected $table = 'guia_contribuciones';
}
