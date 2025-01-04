<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use App\Models\GuiaContribucion;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'permissions' => [
                    'guiaContribucion' => [
                        'create' => $request->user()?->can('create', GuiaContribucion::class),
                    ],
                ],
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'description' => fn () => $request->session()->get('description'),
            ],
        ];
    }
}
