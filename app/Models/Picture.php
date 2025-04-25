<?php

namespace App\Models;

use App\Models\User;
use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Picture extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\PictureFactory> */
    use HasFactory, InteractsWithMedia;

    /**
     * Los campos para asignaciones masivas
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'tipo_daltonismo'
    ];

    /**
     * Una imagen pertenece a un usuario
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
