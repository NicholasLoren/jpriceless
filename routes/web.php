<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GalleryAlbumController;
use App\Http\Controllers\GalleryImageController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\PlatformController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\TrackController;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ContactFormController;
use Illuminate\Support\Facades\Route; 

Route::get('/', [WebsiteController::class, 'home'])->name('home');
Route::get('/about', [WebsiteController::class, 'about'])->name('about');
Route::get('/contact', [WebsiteController::class, 'contact'])->name('contact');
Route::post('/contact', [WebsiteController::class, 'storeContact'])->name('contact.store');
Route::get('/all-tours', [WebsiteController::class, 'tours'])->name('tours');
Route::get('/all-tours/{tour:slug}', [WebsiteController::class, 'singleTour'])->name('tours.view-single'); 
Route::get('/blogs', [WebsiteController::class, 'blogs'])->name('blogs');
Route::get('/blogs/{blog:slug}', [WebsiteController::class, 'singleBlog'])->name('blogs.view-single');
Route::get('/discography', [WebsiteController::class, 'discography'])->name('discography');
Route::get('/discography/{album:slug}', [WebsiteController::class, 'discography'])->name('discography.album');
Route::get('/gallery', [WebsiteController::class, 'gallery'])->name('gallery'); 
Route::get('/gallery/{gallery_album:slug}', [WebsiteController::class, 'galleryAlbum'])->name('gallery.album');

Route::get('/all-tours', [WebsiteController::class, 'tours'])->name('tours');
Route::get('/all-tours/{eventSlug}', [WebsiteController::class, 'singleTour'])->name('tours.view-single');









Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('contact-forms/{contact_form}/mark-as-spam', [ContactFormController::class, 'markAsSpam'])
        ->name('contact-forms.mark-as-spam');

    Route::post('contact-forms/{contact_form}/reply', [ContactFormController::class, 'storeReply'])
        ->name('contact-forms.reply.store');

    Route::resource('blog-categories', BlogCategoryController::class);
    Route::resource('blog-posts', BlogPostController::class);
    Route::resource('contact-forms', ContactFormController::class);
    Route::resource('genres', GenreController::class);
    Route::resource('labels', LabelController::class);
    Route::resource('platforms', PlatformController::class);
    Route::resource('tags', TagController::class);
    Route::resource('tours', TourController::class);
    Route::resource('tours.events', EventController::class);
    Route::resource('artists', ArtistController::class);
    Route::resource('albums', AlbumController::class);
    Route::resource('albums.tracks', TrackController::class);
    Route::resource('gallery-albums', GalleryAlbumController::class);
    Route::resource('gallery-albums.gallery-images', GalleryImageController::class);
});


// API routes for AJAX album loading
Route::group(['prefix' => 'api'], function () {
    // Get specific page of albums
    Route::get('/albums/page/{page}', [WebsiteController::class, 'getAlbumPage'])->name('api.albums.page');
});
require __DIR__ . '/auth.php';
