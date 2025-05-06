<?php

namespace App\Http\Controllers;

use App\Models\GalleryAlbum;
use App\Models\GalleryImage;
use App\Http\Controllers\Controller;
use App\Services\GalleryImageService;
use Illuminate\Http\Request;

class GalleryImageController extends Controller
{

    public function __construct(public GalleryImageService $galleryImageService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(GalleryAlbum $galleryAlbum)
    {
        return inertia(
            'GalleryImages/Index',
            [
                'galleryAlbum' => $galleryAlbum,
                'galleryImages' => $this->galleryImageService->findAll($galleryAlbum, request()->perPage, request()->search )
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(GalleryAlbum $galleryAlbum)
    {
        return inertia(
            'GalleryImages/Form',
            [
                'galleryImage' => new GalleryImage(),
                'galleryAlbum' => $galleryAlbum
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, GalleryAlbum $galleryAlbum)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $validated['gallery_album_id'] = $galleryAlbum->id; // Set the gallery_album_id from the route parameter

        $galleryImage = $this->galleryImageService->store($validated);
        if ($request->hasFile('image')) {
            $galleryImage->addMedia($request->file('image'))->toMediaCollection('image');
        }
        return redirect()->route('gallery-albums.gallery-images.edit', ['gallery_album' => $galleryAlbum, 'gallery_image' => $galleryImage])->with('success', 'Gallery image created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(GalleryAlbum $galleryAlbum, GalleryImage $galleryImage)
    {
        return inertia(
            'GalleryImages/Show',
            [
                'galleryImage' => $galleryImage->load('media'),
                'galleryAlbum' => $galleryAlbum
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GalleryAlbum $galleryAlbum, GalleryImage $galleryImage)
    {
        return inertia(
            'GalleryImages/Form',
            [
                'galleryImage' => $galleryImage->load('media'),
                'galleryAlbum' => $galleryAlbum
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GalleryAlbum $galleryAlbum, GalleryImage $galleryImage)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $this->galleryImageService->update($validated, $galleryImage);
        if ($request->hasFile('image')) {
            $galleryImage->addMedia($request->file('image'))->toMediaCollection('image');
        }
        return redirect()->route('gallery-albums.gallery-images.edit', ['gallery_album' => $galleryAlbum, 'gallery_image' => $galleryImage])->with('success', 'Gallery image updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GalleryAlbum $galleryAlbum, GalleryImage $galleryImage)
    {
        $this->galleryImageService->destroy($galleryImage);
        return redirect()->route('gallery-albums.gallery-images.index', $galleryAlbum)->with('success', 'Gallery image deleted successfully!');
    }
}
