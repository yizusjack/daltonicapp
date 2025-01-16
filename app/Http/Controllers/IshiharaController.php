<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Imagen;
use Illuminate\Http\Request;

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
    public function getTipoDaltonismo(Request $request)
    {
        dd($request);
    }
}
