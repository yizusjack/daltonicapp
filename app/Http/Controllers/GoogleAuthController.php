<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    /**
     * Redirige a la página de Google OAuth
     */
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Maneja el callback de google
     */
    public function callback()
    {
        try {
            //Información del usuario desde google
            $user = Socialite::driver('google')->user();
        } catch(Throwable $e) {
            return redirect('/')->with('error', 'Error con la autenticación de google');
        }

        //Ve si el usuario existe en la base de datos
        $usuario = User::where('email', $user->email)->first();

        if($usuario) {
            Auth::login($usuario);

            $hacerTest = Gate::allows('hacerTest', User::class);

            return $hacerTest
                ? redirect(route('ishihara.create', absolute: false))->with([ //No se tiene tipo de daltonismo
                    'message' => 'Gracias por usar Daltonicapp',
                    'description' => 'Para poder ayudarte de la mejor manera necesitamos saber tu tipo de daltonismo',
                ])
                : redirect()->intended(route('dashboard', absolute: false)); //Se tiene tipo de daltonismo
        } else {
            $nuevoUsuario = User::updateOrCreate([
                'email' => $user->email
            ], [
                'name' => $user->name,
                'password' => bcrypt(Str::random(16)),
                'email_verified_at' => now(),
            ]);

            $nuevoUsuario->assignRole('Usuario');

            Auth::login($nuevoUsuario);

            return redirect(route('ishihara.create', absolute: false))->with([
                'message' => 'Gracias por registrarte a Daltonicapp',
                'description' => 'Para comenzar haremos una prueba para conocer tu tipo de daltonismo',
            ]);
        }
    }
}
