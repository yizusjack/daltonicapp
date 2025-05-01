<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use App\Enums\TipoArchivoEnum;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreComentarioRequest;
use App\Http\Requests\UpdateComentarioRequest;

class ComentarioController extends Controller
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComentarioRequest $request)
    {
        $data = $request->all();
        $data['comentable_type'] = 'App\Models\Publicacion';
        $data['user_id'] = Auth::user()->id;

        $comentario = Comentario::create($data);

        if ($request->hasFile('imagen')) {
            $comentario
                ->addMediaFromRequest('imagen')
                ->toMediaCollection(TipoArchivoEnum::Comentario->value);
        }


        return redirect()->to(url()->previous())->with([
            'message' => 'Comentario creado',
            'description' => 'Los demás usuarios podrán verlo e interactuar con el',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comentario $comentario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComentarioRequest $request, Comentario $comentario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        //
    }
}
