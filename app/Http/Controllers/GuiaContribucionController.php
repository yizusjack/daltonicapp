<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Imagen;
use App\Models\GuiaContribucion;
use App\Enums\TiposDaltonismoEnum;
use App\Http\Requests\StoreGuiaContribucionRequest;

class GuiaContribucionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('GuiaContribucion/FormGuiaContribucion', [
            'pruebas' => Imagen::get(),
            'tipos_daltonismo' => TiposDaltonismoEnum::keysValues(),
            'store_url' => route('guiaContribucion.store'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGuiaContribucionRequest $request)
    {
        dd($request->all());
    }
}
