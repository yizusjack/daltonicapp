<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Picture;
use App\Enums\TiposDaltonismoEnum;
use Illuminate\Auth\Access\Response;

class PicturePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Picture $picture): bool
    {
        return $picture->user_id == $user->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Picture $picture): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Picture $picture): bool
    {
        return $picture->user_id == $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Picture $picture): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Picture $picture): bool
    {
        return false;
    }

    /**
     * Evalúa si el usuario puede publicar la imagen
     */
    public function publicar(User $user, Picture $picture): bool
    {
        return $picture->user_id == $user->id;
    }

    /**
     * Evalúa si el usuario puede acceder a la galería pública
     */
    public function galeria(User $user): bool
    {
        return in_array($user->tipo_daltonismo, TiposDaltonismoEnum::values());
    }
}
