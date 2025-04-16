<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Publicacion;
use App\Enums\TipoPublicacionEnum;
use Illuminate\Auth\Access\Response;

class PublicacionPolicy
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
    public function view(User $user, Publicacion $publicacion): bool
    {
        return false;
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
    public function update(User $user, Publicacion $publicacion): bool
    {
        return $publicacion->user_id == $user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Publicacion $publicacion): bool
    {
        return $publicacion->user_id == $user->id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Publicacion $publicacion): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Publicacion $publicacion): bool
    {
        return false;
    }

    /**
     * Determina si un usuario puede o no comentar una publicacion
     */
    public function comentar(User $user, Publicacion $publicacion): bool
    {
        $permiso = false;

        if($publicacion->tipo == TipoPublicacionEnum::Duda->value) {
            $permiso = $publicacion->user_id == $user->id || $user->hasRole('Administrador');
        } else {
            $permiso = true;
        }
        return $permiso;
    }
}
