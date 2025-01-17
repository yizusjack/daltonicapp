<?php

namespace App;

use Illuminate\Support\Facades\Http;

class GetApiToken
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Gets the token for the API
     */
    public static function getToken()
    {
        $response = Http::post(env('PYTHON_API_URL') . '/get-token', [
            'authorization' => [
                'username' => env('PYTHON_API_USERNAME'),
                'password' => env('PYTHON_API_PASSWORD'),
            ],
        ]);

        dd(json_decode($response->body(), true));
    }
}
