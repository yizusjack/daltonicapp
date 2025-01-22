<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IshiharaController;
use App\Http\Controllers\GuiaContribucionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/prueba', function () {
    return Inertia::render('Prueba');
})->name('prueba');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //Rutas de perfiles de usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Rutas para obtener el tipo de daltonismo
    Route::get('/test', [IshiharaController::class, 'test'])->name('ishihara.create');
    Route::post('/test', [IshiharaController::class, 'getTipoDaltonismo'])->name('ishihara.store');

    //Rutas para la guia de contribucion
    Route::resource('guiaContribucion', GuiaContribucionController::class)
        ->only(['create', 'store']);
});

require __DIR__.'/auth.php';
