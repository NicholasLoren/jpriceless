<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Services\AlbumService;
use App\Services\ArtistService;
use App\Services\GenreService;
use App\Services\LabelService;
use App\Services\PlatformService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlbumController extends Controller
{
    protected $albumService;
    protected $artistService;
    protected $genreService;
    protected $labelService;
    protected $platformService;


    public function __construct(
        AlbumService $albumService,
        ArtistService $artistService,
        GenreService $genreService,
        LabelService $labelService,
        PlatformService $platformService
    ) {
        $this->albumService = $albumService;
        $this->artistService = $artistService;
        $this->genreService = $genreService;
        $this->labelService = $labelService;
        $this->platformService = $platformService;
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
            'platforms' => $this->platformService->all(),
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
            'platforms' => 'required|array|min:1',
            'platforms.*.platform_id' => 'required|exists:platforms,id',
            'platforms.*.url' => 'required|url',
        ]);

        $album = $this->albumService->create($validatedData);

        // Handle cover art upload if provided
        if ($request->hasFile('cover_art')) {
            $album->addMediaFromRequest('cover_art')
                ->toMediaCollection('cover_art');
        }

        // Attach platforms with their URLs
        foreach ($validatedData['platforms'] as $platform) {
            $album->albumPlatforms()->attach($platform['platform_id'], [
                'url' => $platform['url']
            ]);
        }
        return redirect()->route('albums.edit', $album)
                ->with('success', 'Album created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album)
    {
        // Load the album with all necessary relationships
        $album->load([
            'artist',
            'genre',
            'label',
            'albumPlatforms.platform',
            'tracks' => function ($query) {
                $query->orderBy('track_number')
                    ->orderBy('created_at');
            },
            'tracks.artists' => function ($query) {
                $query->orderBy('artist_track.order');
            },
            'media'
        ]);

        // Add cover art URLs if available
        if ($album->hasMedia('cover_art')) {
            $album->cover_art = [
                'original_url' => $album->getFirstMediaUrl('cover_art'),
                'thumb_url' => $album->getFirstMediaUrl('cover_art', 'thumb'),
                'large_url' => $album->getFirstMediaUrl('cover_art', 'large'),
            ];
        }

        // Add cover art URLs for tracks
        $album->tracks->each(function ($track) {
            if ($track->hasMedia('cover_art')) {
                $track->cover_art_url = $track->getFirstMediaUrl('cover_art', 'thumb');
            }
        });

        return Inertia::render('Albums/Show', [
            'album' => $album,
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

        // Format platforms for the form
        $album->selected_platforms = $album->albumPlatforms->map(function ($platform) {
            return [
                'platform_id' => $platform->id,
                'url' => $platform->pivot->url
            ];
        })->toArray();

        return Inertia::render('Albums/Form', [
            'album' => $album,
            'artists' => $this->artistService->all(),
            'genres' => $this->genreService->all(),
            'labels' => $this->labelService->all(),
            'platforms' => $this->platformService->all(),
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
            'platforms' => 'required|array|min:1',
            'platforms.*.platform_id' => 'required|exists:platforms,id',
            'platforms.*.url' => 'required|url',
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

        // Sync platforms with their URLs
        $platformData = [];
        foreach ($validatedData['platforms'] as $platform) {
            $platformData[$platform['platform_id']] = ['url' => $platform['url']];
        }
        $album->albumPlatforms()->sync($platformData);
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