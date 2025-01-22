<?php

namespace App;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

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
     * 
     * @return string
     */
    public static function getToken()
    {
        $response = Http::post(env('PYTHON_API_URL') . '/get-token', [
            'authorization' => [
                'username' => env('PYTHON_API_USERNAME'),
                'password' => env('PYTHON_API_PASSWORD'),
            ],
        ]);

        $status = $response->status();

        if ($status == 200) {
            $token = json_decode($response->body(), true)['token'];
            Session::put('api-token', $token);
            return $token;
        } else {
            return null;
        }
    }

    /**
     * Retrieves the api token
     * 
     * @return string
     */
    public function retrieveToken()
    {
        return Session::has('api-token')
            ? Session::get('api-token')
            : $this->getToken();
    }
}
