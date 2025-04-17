<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Publicacion;
use App\Enums\TipoPublicacionEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\StorePublicacionRequest;
use App\Http\Requests\UpdatePublicacionRequest;

class PublicacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(int $tipo)
    {

        if ($tipo == 1) {
            $publicaciones = Publicacion::where('tipo', TipoPublicacionEnum::Duda->value)
            ->with(['user', 'comentarios', 'comentarios.user'])
            ->orderByDesc('id')
            ->paginate(10);
        } else if($tipo == 2) {
            $publicaciones = Publicacion::where('tipo', TipoPublicacionEnum::Foro->value)
            ->with(['user', 'comentarios', 'comentarios.user'])
            ->orderByDesc('id')
            ->paginate(10);
        } else {
            abort(404);
        }

        return Inertia::render('Publicacion/IndexPublicacion', [
            'publicaciones' => $publicaciones,
            'tipo' => $tipo,
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
    public function store(StorePublicacionRequest $request, int $tipo)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;
        $data['tipo'] = $tipo == 1 ? TipoPublicacionEnum::Duda->value : TipoPublicacionEnum::Foro->value;
        $data['tipo_daltonismo'] = $data['tipo_daltonismo'] ?? $user->tipo_daltonismo;
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
        Gate::authorize('update', $publicacion);

        $data = $request->validated();
        $publicacion->update($data);

        return redirect()->to(url()->previous())->with([
            'message' => 'Publicación editada correctamente',
            'description' => 'Los demás usuarios podrán verla e interactuar con ella',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publicacion $publicacion)
    {
        Gate::authorize('delete', $publicacion);

        $publicacion->delete();

        return redirect()->to(url()->previous())->with([
            'message' => 'Publicación eliminada',
            'description' => '',
        ]);
    }
}
