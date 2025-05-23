<?php

use Inertia\Inertia;
use App\Enums\TiposDaltonismoEnum;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IshiharaController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\PublicacionController;
use App\Http\Controllers\GuiaContribucionController;


Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/terminos', function () {
    return Inertia::render('TerminosYCondiciones');
});

// Route to redirect to Google's OAuth page
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');

// Route to handle the callback from Google
Route::get('/api/auth/google/callback', [GoogleAuthController::class, 'callback'])->name('auth.google.callback');

Route::get('/dashboard', function () {
    $resultados = Session::get('resultados');
    return Inertia::render('Dashboard', [
        'resultados' => $resultados,
        'tipos_daltonismo' => TiposDaltonismoEnum::keysValues(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    //Rutas de perfiles de usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //Rutas para administración de usuarios
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users/{user}/role', [UserController::class, 'updateRole']);

    //Rutas para obtener el tipo de daltonismo
    Route::get('/test', [IshiharaController::class, 'test'])->name('ishihara.create');
    Route::post('/test', [IshiharaController::class, 'getTipoDaltonismo'])->name('ishihara.store');

    Route::post('/cambiar-tipo-daltonismo', [UserController::class, 'cambiarTipoDaltonismo'])->name('users.cambiarTipoDaltonismo');

    //Rutas para la guia de contribucion
    Route::resource('guiaContribucion', GuiaContribucionController::class)
        ->only(['create', 'store']);

    //Rutas para imagenes
    Route::resource('imagenes', ImagenController::class)
        ->only(['index', 'create','store']);

    //Rutas para las imagenes transformadas
    Route::resource('picture', PictureController::class);
    Route::get('mostrarNuevaImagen', [PictureController::class, 'mostrar'])->name('picture.mostrar');
    Route::get('/picture/{picture}/show-original', [PictureController::class, 'showOriginal'])->name('picture.show-original');
    Route::post('save', [PictureController::class, 'save'])->name('picture.save');
    Route::get('/picture/{picture}/download', [PictureController::class, 'download'])->name('picture.download');
    Route::post('/picture/{picture}/publicar', [PictureController::class, 'publicar'])->name('picture.publicar');
    Route::get('/imagenes-para-mi', [PictureController::class, 'galeria'])->name('picture.galeria');

    //Rutas para los foros
    Route::get('publicacion/foro/{tipo}', [PublicacionController::class, 'index'])->name('publicacion.index');
    Route::post('publicacion/foro/{tipo}', [PublicacionController::class, 'store'])->name('publicacion.store');
    Route::resource('publicacion', PublicacionController::class)->except(['index', 'store']);

    //Rutas para los fotos
    Route::resource('comentario', ComentarioController::class)->only('store', 'update', 'destroy');

    Route::resource('reporte', ReporteController::class)->only('store',  'destroy');

    Route::get('/reporte', [ReporteController::class, 'index'])->name('reportes.index');
});

require __DIR__.'/auth.php';
