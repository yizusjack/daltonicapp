<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IshiharaController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\GuiaContribucionController;
use App\Http\Controllers\PictureController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route to redirect to Google's OAuth page
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');

// Route to handle the callback from Google
Route::get('/api/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

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

    //Rutas para imagenes
    Route::resource('imagenes', ImagenController::class)
        ->only(['index', 'create','store']);
        
    Route::resource('picture', PictureController::class);
    Route::get('mostrarNuevaImagen', [PictureController::class, 'mostrar'])->name('picture.mostrar');
    Route::post('save', [PictureController::class, 'save'])->name('picture.save');
});

require __DIR__.'/auth.php';
