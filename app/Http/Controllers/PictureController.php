<?php

namespace App\Http\Controllers;

use App\GetApiToken;
use Inertia\Inertia;
use App\Models\Picture;
use App\Models\Publicacion;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Enums\TipoArchivoEnum;
use App\Enums\TipoPublicacionEnum;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StorePictureRequest;
use App\Http\Requests\UpdatePictureRequest;
use App\Http\Requests\PublicarImagenRequest;

class PictureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $imagenes = Auth::user()->pictures()->paginate(6);

        return Inertia::render('Pictures/IndexPicture', [
            'imagenes' => $imagenes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pictures/CreatePicture', [
            'store_url' => route('picture.store'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //Policy

        $imageData = $request->input('Imagen');

        if ($imageData) {
            //Genera la clase de obtencion de tokens
            $tokenClass = new GetApiToken();
            $token = $tokenClass->retrieveToken();

            if ($token == null) {
                return redirect()->back()->with([
                    'message' => 'Ocurrió un error',
                    'description' => 'Estamos presentando fallas en nuestro sistema. Favor de contactar con un administrador',
                ]);
            }

            $response = Http::withToken($token)
            ->timeout(120)
            ->post(env('PYTHON_API_URL') . '/transform-image', [
                'tipo_daltonismo' => Auth::user()->tipo_daltonismo,
                'imagen' => $imageData,
            ]);

            $status = $response->status();
            $body = json_decode($response->body(), true);

            if ($status == 200) {
                return redirect()->route('picture.mostrar')->with([
                    'base64Image' => $body['imagenTransformada'],
                    'base64OldImage' => $body['imagenOriginal'],
                    'message' => 'Imagen transformada correctamente',
                    'description' => 'Ahora puedes guardarla y publicarla',
                ]);
            } else if ($status == 401) {
                $tokenClass->getToken();
                $this->store($request);
            } else {
                return redirect()->back()->with([
                    'message' => 'Ocurrió un error',
                    'description' => 'Estamos presentando fallas en nuestro sistema. Favor de contactar con un administrador',
                ]);
            }

        }
    }

    /**
     * Muestra la imagen antes de ser guardada
     */
    public function mostrar()
    {
        if(session('base64Image')) {
            return Inertia::render('Pictures/ShowTransformedPicture', [
                'base64Image' => session('base64Image'),
                'base64OldImage' => session('base64OldImage'),
            ]);
        } else {
            return redirect()->route('dashboard')->with([
                'message' => 'Error',
                'description' => 'No se ha transformado ninguna imagen',
            ]);
        }
    }

    /**
     * Guarda la imagen
     */
    public function save(Request $request)
    {
        $request->validate([
            'base64' => 'required',
            'originalBase64' => 'required',
        ]);

        $picture = Picture::create([
            'user_id' => Auth::user()->id,
        ]);

        $nombreArchivo = Str::uuid();

        $picture->addMediaFromBase64($request['base64'])
            ->usingFileName($nombreArchivo . '.jpeg')
            ->toMediaCollection(TipoArchivoEnum::ImagenPrivada->value, 'private');

        $picture->addMediaFromBase64($request['originalBase64'])
            ->usingFileName($nombreArchivo . '_original.jpeg')
            ->toMediaCollection(TipoArchivoEnum::ImagenOriginal->value, 'private');

        return redirect()->route('picture.index')->with([
            'message' => 'Imagen guardada correctamente',
            'description' => 'Ahora la podrá ver en su galería',
        ]);
    }

    /**
     * Recupera la imagen para su visualización
     */
    public function show(Picture $picture)
    {
        Gate::authorize('view', $picture);

        $archivo = $picture->getMedia(TipoArchivoEnum::ImagenPrivada->value)->first();

        return Storage::response($archivo->getPathRelativeToRoot());
    }

    /**
     * Recupera la imagen original para su visualización
     */
    public function showOriginal(Picture $picture)
    {
        Gate::authorize('view', $picture);

        $archivo = $picture->getMedia(TipoArchivoEnum::ImagenOriginal->value)->first();

        return Storage::response($archivo->getPathRelativeToRoot());
    }

    /**
     * Descarga la imagen
     */
    public function download(Picture $picture)
    {
        Gate::authorize('view', $picture);
        $archivo = $picture->getMedia(TipoArchivoEnum::ImagenPrivada->value)->first();

        return response()->download($archivo->getPath(), $archivo->file_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Picture $picture)
    {
        //
    }

    /**
     * Permite publicar la imagen
     */
    public function publicar(PublicarImagenRequest $request, Picture $picture)
    {
        //Policy
        $user = Auth::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;
        $data['tipo'] = TipoPublicacionEnum::Imagen->value;
        $data['tipo_daltonismo'] = $data['tipo_daltonismo'] ?? $user->tipo_daltonismo;

        $publicacion = Publicacion::create($data);
    }
}
