<?php

namespace App\Http\Controllers;

use App\GetApiToken;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Imagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
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
            dump("Aqui se debe de guardar la parte del usuario");
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
