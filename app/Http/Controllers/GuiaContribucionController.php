<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Imagen;
use App\Models\Respuesta;
use App\Models\GuiaContribucion;
use App\Enums\TiposDaltonismoEnum;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
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

        return redirect()->route('dashboard');
    }
}
