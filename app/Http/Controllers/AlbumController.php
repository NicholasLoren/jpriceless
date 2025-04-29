<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Services\AlbumService;
use App\Services\ArtistService;
use App\Services\GenreService;
use App\Services\LabelService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumController extends Controller
{
    protected $albumService;
    protected $artistService;
    protected $genreService;
    protected $labelService;

    public function __construct(
        AlbumService $albumService,
        ArtistService $artistService,
        GenreService $genreService,
        LabelService $labelService
    ) {
        $this->albumService = $albumService;
        $this->artistService = $artistService;
        $this->genreService = $genreService;
        $this->labelService = $labelService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $search = $request->input('search', '');
        return Inertia::render('Albums/Index', [
            'albums' => $this->albumService->findAll($perPage, $search),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Albums/Form', [
            'album' => new Album,
            'artists' => $this->artistService->all(),
            'genres' => $this->genreService->all(),
            'labels' => $this->labelService->all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { 
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'artist_id' => 'required|exists:artists,id',
            'genre_id' => 'required|exists:genres,id',
            'label_id' => 'required|exists:labels,id',
            'release_date' => 'required|date',
            'description' => 'required|string',  
            'is_featured' => 'required|boolean',
            'cover_art' => 'required|image|max:2048', // 2MB max
        ]);

        $album = $this->albumService->create($validatedData);

        // Handle cover art upload if provided
        if ($request->hasFile('cover_art')) {
            $album->addMediaFromRequest('cover_art')
                ->toMediaCollection('cover_art');
        }

        return redirect()->route('albums.edit', $album)
                ->with('success', 'Album created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album)
    {
        return Inertia::render('Albums/Show', [
            'album' => $album->load(['artist', 'genre', 'label']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Album $album)
    {
        // Load the album with its media
        $album->load('media');

        // Add the cover art URLs if available
        if ($album->hasMedia('cover_art')) {
            $album->cover_art = [
                'original_url' => $album->getFirstMediaUrl('cover_art'),
                'thumb_url' => $album->getFirstMediaUrl('cover_art', 'thumb'),
                'large_url' => $album->getFirstMediaUrl('cover_art', 'large'),
            ];
        }

        return Inertia::render('Albums/Form', [
            'album' => $album,
            'artists' => $this->artistService->all(),
            'genres' => $this->genreService->all(),
            'labels' => $this->labelService->all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Album $album)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'artist_id' => 'required|exists:artists,id',
            'genre_id' => 'required|exists:genres,id',
            'label_id' => 'required|exists:labels,id',
            'release_date' => 'required|date',
            'description' => 'nullable|string', 
            'is_featured' => 'boolean',
            'cover_art' => 'nullable|image|max:2048', // 2MB max
        ]);

        $this->albumService->update($album, $validatedData);

        // Handle cover art upload if provided
        if ($request->hasFile('cover_art')) {
            // Clear existing media first
            $album->clearMediaCollection('cover_art');
            // Add new media
            $album->addMediaFromRequest('cover_art')
                ->toMediaCollection('cover_art');
        }

        return redirect()->route('albums.edit', $album)
                ->with('success', 'Album updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Album $album)
    {
        // Clear media before deleting
        $album->clearMediaCollection('cover_art');
        
        // Delete the album
        $this->albumService->delete($album);

        return redirect()->route('albums.index')
                ->with('success', 'Album deleted successfully!');
    }
}