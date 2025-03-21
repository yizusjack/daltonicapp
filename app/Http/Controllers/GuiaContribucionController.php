<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Imagen;
use App\Models\Respuesta;
use App\Models\GuiaContribucion;
use App\Enums\TiposDaltonismoEnum;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\StoreGuiaContribucionRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class GuiaContribucionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(GuiaContribucion::class, 'guiaContribucion');
    }

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
        Gate::authorize('create', GuiaContribucion::class);

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
        Gate::authorize('create', GuiaContribucion::class);

        $response = $request->all();

        $guiaContribucion = GuiaContribucion::create([
            'tipo_daltonismo' => $response['tipo_daltonismo'],
            'user_id' => Auth::user()->id,
        ]);

        foreach($response['resultados'] as $resultado){
            Respuesta::create([
                'resultado' => $resultado['valor'],
                'imagen_id' => $resultado['id'],
                'guia_contribucion_id' => $guiaContribucion->id,
            ]);
        }

        if($response['tipo_daltonismo'] != Auth::user()->tipo_daltonismo) {
            Auth::user()->update([
                'tipo_daltonismo' => $response['tipo_daltonismo'],
            ]);

            Session::forget('resultados');

            return redirect()->route('dashboard')->with([
                'message' => 'Tipo de daltonismo modificado exitosamente',
                'description' => 'Tu corrección se usará para mejorar nuestro sistema',
            ]);
        }

        return redirect()->route('dashboard')->with([
            'message' => 'Gracias por tu contribución',
            'description' => 'Tu información se almacenó correctamente y se usará para mejorar nuestro sistema',
        ]);
    }
}
