<?php

namespace App\Http\Controllers;

use App\GetApiToken;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Imagen;
use Illuminate\Http\Request;
use App\Enums\TiposDaltonismoEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\SendTipoDaltonismoRequest;

class IshiharaController extends Controller
{
    /**
     * Formulario para test de ishihara
     */
    public function test()
    {
        Gate::authorize('hacerTest', User::class);

        return Inertia::render('Auth/TipoDaltonismo', [
            'pruebas' => Imagen::get(),
            'store_url' => route('ishihara.store'),
            'tipos_daltonismo' => TiposDaltonismoEnum::keysValues(),
        ]);
    }

    /**
     * Obtiene el tipo de daltonismo y lo guarda en el usuario
     */
    public function getTipoDaltonismo(SendTipoDaltonismoRequest $request)
    {
        Gate::authorize('hacerTest', User::class);

        //Obtiene la informacion validada
        $data = $request->all();

        //Genera la clase de obtencion de tokens
        $tokenClass = new GetApiToken();
        $token = $tokenClass->retrieveToken();

        if ($token == null) {
            return redirect()->back()->with([
                'message' => 'Ocurrió un error',
                'description' => 'Estamos presentando fallas en nuestro sistema. Favor de contactar con un administrador',
            ]);
        }

        $response = Http::withToken($token)
        ->post(env('PYTHON_API_URL') . '/receive-test', [
            'respuestas' => json_encode($data['resultados']),
        ]);

        $status = $response->status();
        $body = json_decode($response->body(), true);

        if ($status == 200) {
            Auth::user()->update([
                'tipo_daltonismo' => $body['tipo_daltonismo']
            ]);

            Session::put('resultados', $data['resultados']);

            return redirect()->route('dashboard')->with([
                'message' => 'Éxito',
                'description' => 'Ya puedes consultar tu tipo de daltonismo o cambiarlo si consideras que el resultado es incorrecto',
            ]);
        } else if ($status == 401) {
            $tokenClass->getToken();
            $this->getTipoDaltonismo($request);
        } else {
            return redirect()->back()->with([
                'message' => 'Ocurrió un error',
                'description' => 'Estamos presentando fallas en nuestro sistema. Favor de contactar con un administrador',
            ]);
        }
    }
}
