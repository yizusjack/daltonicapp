<?php

namespace App\Providers;

use App\Models\GuiaContribucion;
use App\Models\User;
use App\Policies\GuiaContribucionPolicy;
use App\Policies\UserRolePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;


class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        GuiaContribucion::class => GuiaContribucionPolicy::class,
        // User::class => UserRolePolicy::class,
    ];

    
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->registerPolicies();
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
