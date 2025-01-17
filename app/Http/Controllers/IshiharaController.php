<?php

namespace App\Http\Controllers;

use App\GetApiToken;
use Inertia\Inertia;
use App\Models\Imagen;
use Illuminate\Http\Request;
use App\Http\Requests\SendTipoDaltonismoRequest;

class IshiharaController extends Controller
{
    /**
     * Formulario para test de ishihara
     */
    public function test()
    {
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
        $response = $request->all();
        $tokenClass = new GetApiToken();
        $token = $tokenClass->getToken();

        dd(json_encode($response));
    }
}
