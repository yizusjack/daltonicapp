<?php

namespace App\Http\Controllers;

use App\GetApiToken;
use Inertia\Inertia;
use App\Models\Picture;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use App\Http\Requests\StorePictureRequest;
use App\Http\Requests\UpdatePictureRequest;

class PictureController extends Controller
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
            ->post(env('PYTHON_API_URL') . '/transform-image', [
                'tipo_daltonismo' => Auth::user()->tipo_daltonismo,
                'imagen' => $imageData,
            ]);

            $status = $response->status();
            $body = json_decode($response->body(), true);

            if ($status == 200) {
                dd($body['imagenTransformada']);
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
     * Display the specified resource.
     */
    public function show(Picture $picture)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Picture $picture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePictureRequest $request, Picture $picture)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Picture $picture)
    {
        //
    }
}
