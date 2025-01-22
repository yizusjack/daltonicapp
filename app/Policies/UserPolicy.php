<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * El usuario tiene su tipo de daltonismo cargado
     */
    public function useCamera(User $user): bool
    {
        return $user->tipo_daltonismo != null;
    }

    /**
     * El usuario no tiene su tipo de daltonismo cargado
     */
    public function hacerTest(User $user): bool
    {
        return $user->tipo_daltonismo == null;
    }
}
