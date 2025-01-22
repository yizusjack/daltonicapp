<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Imagen;
use Illuminate\Routing\Controller;
use App\Enums\TipoArchivoEnum;

class ImagenController extends Controller
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
        return Inertia::render('ImagenesTest/ImagenCreate', [
            'store_url' => route('imagenes.store'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Imagen' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'Respuesta_1' => 'required|numeric|min:0',
            'Respuesta_2' => 'required|numeric',
            'Respuesta_3' => 'required|numeric',
        ]);

        $imagen = Imagen::create([
            'Respuesta_1' => $request['Respuesta_1'],
            'Respuesta_2' => $request['Respuesta_2'],
            'Respuesta_3' => $request['Respuesta_3'],
        ]);

        $imagen->addMediaFromRequest('Imagen')->toMediaCollection(TipoArchivoEnum::Ishihara->value);

        return redirect()->route('prueba')->with([
            'message' => 'Éxito',
            'description' => 'La imagen ha sido guardada correctamente',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
