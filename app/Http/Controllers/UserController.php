<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Enums\TiposDaltonismoEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UserController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', User::class);
        $users = User::with('roles')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles->pluck('name')->toArray(),
            ];
        });

        $roles = User::with('roles')->get()->map(function ($user) {
            return [
                'roles' => $user->roles->pluck('name'),
            ];
        });

        return Inertia::render('Users/UserIndex', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        if (!auth()->user()->hasRole('Administrador')) {
            return;
        }

        $user->syncRoles([$request->role]);

        return redirect()->route('users.index')->with([
            'message' => 'Éxito',
            'description' => 'Rol actualizado',
        ]);
    }

    public function cambiarTipoDaltonismo(Request $request)
    {
        $request->validate([
            'tipo_daltonismo' => ['required', Rule::in(TiposDaltonismoEnum::names())],
        ]);


    }
}
