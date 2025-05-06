<?php

namespace App\Http\Controllers;

use App\Models\GalleryAlbum;
use App\Http\Controllers\Controller;
use App\Services\GalleryAlbumService;
use Illuminate\Http\Request;

class GalleryAlbumController extends Controller
{

    public function __construct(public GalleryAlbumService $galleryAlbumService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia(
            'GalleryAlbums/Index',
            [
                'galleryAlbums' => $this->galleryAlbumService->findAll(request()->per_page, request()->search)
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia(
            'GalleryAlbums/Form',
            [
                'galleryAlbum' => new GalleryAlbum
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string', 
            'is_public' => 'boolean',
            'cover_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $galleryAlbum = $this->galleryAlbumService->store($validated);
        if ($request->hasFile('cover_image')) {
            $galleryAlbum->addMedia($request->file('cover_image'))->toMediaCollection('cover_image');
        }
        return redirect()->route('gallery-albums.edit', $galleryAlbum)->with('success', 'Gallery album created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(GalleryAlbum $galleryAlbum)
    {
        return inertia(
            'GalleryAlbums/Show',
            [
                'galleryAlbum' => $galleryAlbum->load(['media','images.media'])
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GalleryAlbum $galleryAlbum)
    {
        return inertia(
            'GalleryAlbums/Form',
            [
                'galleryAlbum' => $galleryAlbum->load('media')
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GalleryAlbum $galleryAlbum)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string', 
            'is_public' => 'boolean',
            'cover_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $this->galleryAlbumService->update($validated, $galleryAlbum);
        if ($request->hasFile('cover_image')) {
            $galleryAlbum->addMedia($request->file('cover_image'))->toMediaCollection('cover_image');
        }
        return redirect()->route('gallery-albums.edit', $galleryAlbum)->with('success', 'Gallery albums updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GalleryAlbum $galleryAlbum)
    {
        $this->galleryAlbumService->destroy($galleryAlbum);
        return redirect()->back()->with('success', 'Gallery album removed successfully');
    }
}
