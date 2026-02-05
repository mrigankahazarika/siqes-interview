<?php

namespace App\Providers;
use App\Models\User;
use App\Observers\USerObserver;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // User::observe(USerObserver::class);
        \App\Models\ServciceRequestModel::observe(\App\Observers\ServiceRequestObserver::class);
    }
}
