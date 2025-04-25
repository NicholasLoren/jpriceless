<?php

use App\Http\Controllers\GenreController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\SettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WebsiteController::class, 'home'])->name('home');
Route::get('/about', [WebsiteController::class, 'about'])->name('about');
Route::get('/contact', [WebsiteController::class, 'contact'])->name('contact');
Route::get('/tours', [WebsiteController::class, 'tours'])->name('tours'); 
Route::get('/tours/{tour:slug}', [WebsiteController::class, 'singleTour'])->name('tours.view-single'); 
Route::get('/gallery', [WebsiteController::class, 'gallery'])->name('gallery'); 
Route::get('/blogs', [WebsiteController::class, 'blogs'])->name('blogs'); 
Route::get('/blogs/{blog:slug}', [WebsiteController::class, 'singleBlog'])->name('blogs.view-single'); 
Route::get('/discography', [WebsiteController::class, 'discography'])->name('discography'); 


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('genres',GenreController::class); 
    Route::resource('labels',LabelController::class); 
    Route::resource('platforms',PlatformController::class); 
    Route::resource('tags',TagController::class); 
});

require __DIR__ . '/auth.php';
