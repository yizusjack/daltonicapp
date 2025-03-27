<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Publicacion;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePublicacionRequest;
use App\Http\Requests\UpdatePublicacionRequest;

class PublicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Publicacion/IndexPublicacion', [
            'publicaciones' => Publicacion::with('user')->paginate(3),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePublicacionRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        Publicacion::create($data);

        return redirect()->to(url()->previous())->with([
            'message' => 'Publicación creada correctamente',
            'description' => 'Los demás usuarios podrán verla e interactuar con ella',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Publicacion $publicacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publicacion $publicacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePublicacionRequest $request, Publicacion $publicacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publicacion $publicacion)
    {
        //
    }
}
