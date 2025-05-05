<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Enums\TipoReporteEnum;
use App\Http\Requests\StoreReporteRequest;
use App\Http\Requests\UpdateReporteRequest;
use App\Models\Reporte;
use App\Models\User;
use App\Models\Publicacion;
use App\Models\Comentario;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ReporteController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', User::class);

        $reportables = collect();

        $publicaciones = Publicacion::withCount('reportes')
            ->with('reportes')
            ->get()
            ->filter(fn($p) => $p->reportes_count >= 3)
            ->map(function ($pub) {
                return [
                    'id' => $pub->id,
                    'contenido' => $pub->contenido,
                    'reportes' => $pub->reportes,
                    'reportable_type' => 'Publicacion',
                ];
            });

        $comentarios = Comentario::withCount('reportes')
            ->with('reportes')
            ->get()
            ->filter(fn($c) => $c->reportes_count >= 3)
            ->map(function ($com) {
                return [
                    'id' => $com->id,
                    'contenido' => $com->comentario,
                    'reportes' => $com->reportes,
                    'reportable_type' => 'Comentario',
                ];
            });

        return Inertia::render('Reporte/indexReporte', [
            'publicaciones' => $publicaciones,
            'comentarios' => $comentarios,
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
    public function store(StoreReporteRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;
        $data['reportable_type'] = $request->reportable_type == 'Comentario' ? 'App\Models\Comentario' : 'App\Models\Publicacion';
        $data['reportable_id'] = $request->reportable_id;
        $data['explicacion'] = $request->explicacion;
        $data['type'] = $request->type;

        $reporte = Reporte::create($data);

        return redirect()->to(url()->previous())->with([
            'message' => 'Reporte registrado',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reporte $reporte)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reporte $reporte)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReporteRequest $request, Reporte $reporte)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reporte $reporte)
    {
        //
    }
}
