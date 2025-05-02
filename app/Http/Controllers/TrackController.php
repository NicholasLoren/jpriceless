<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrackResource;
use App\Models\Album;
use App\Models\Track;
use App\Http\Controllers\Controller;
use App\Services\ArtistService;
use App\Services\TrackService;
use Illuminate\Http\Request;

class TrackController extends Controller
{
    protected ArtistService $artistService;
    public function __construct(public TrackService $trackService)
    {
        $this->artistService = new ArtistService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Album $album)
    {
        $perPage = $request->input('per_page', 20);
        $search = $request->input('search', '');
        return inertia('Tracks/Index', [
            'album' => $album,
            'tracks' => $this->trackService->findAll($album, $perPage, $search),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Album $album)
    {
        return inertia('Tracks/Form', [
            'track' => new Track,
            'album' => $album,
            'artists' => $this->artistService->all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Album $album)
    {
        // Validate request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'track_number' => 'required|integer|min:1',
            'duration' => 'required|string|regex:/^([0-9]{1,2}):([0-5][0-9])$/',
            'purchasable' => 'boolean',
            'price' => 'required_if:purchasable,1|nullable|numeric|min:0',
            'downloadable' => 'boolean',
            'audio' => 'required|file|mimes:mp3,wav,ogg',
            'cover_art' => 'nullable|file|mimes:jpeg,png,gif,webp',
            'artists' => 'required|json',
        ]);

        // Create track
        $track = Track::create([
            'album_id' => $album->id,
            'title' => $validated['title'],
            'track_number' => $validated['track_number'],
            'duration' => $validated['duration'],
            'purchasable' => $validated['purchasable'] ?? false,
            'price' => $validated['purchasable'] ? $validated['price'] : null,
            'downloadable' => $validated['downloadable'] ?? false,
        ]);

        // Add media files
        if ($request->hasFile('audio')) {
            $track->addMediaFromRequest('audio')->toMediaCollection('audio');
        }

        if ($request->hasFile('cover_art')) {
            $track->addMediaFromRequest('cover_art')->toMediaCollection('cover_art');
        }

        // Attach artists
        $artists = json_decode($validated['artists'], true);
        foreach ($artists as $artistData) {
            $track->artists()->attach($artistData['artist_id'], [
                'role' => $artistData['role'],
                'order' => $artistData['order'],
            ]);
        }

        return redirect()->route('albums.tracks.edit', ['album' => $album, 'track' => $track])->with('success', 'Track created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Album $album, Track $track)
    {
        $track->load('artists', 'album', 'media');
        return inertia('Tracks/Show', [
            'track' => new TrackResource($track),
            'album' => $album,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Album $album, Track $track)
    {
        $track->load('artists');
        return inertia('Tracks/Form', [
            'track' => $track,
            'album' => $album,
            'artists' => $this->artistService->all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Album $album, Track $track)
    {
        // Validate request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'track_number' => 'required|integer|min:1',
            'duration' => 'required|string|regex:/^([0-9]{1,2}):([0-5][0-9])$/',
            'purchasable' => 'boolean',
            'price' => 'required_if:purchasable,1|nullable|numeric|min:0',
            'downloadable' => 'boolean',
            'audio' => 'nullable|file|mimes:mp3,wav,ogg',
            'cover_art' => 'nullable|file|mimes:jpeg,png,gif,webp',
            'artists' => 'required|json',
        ]);

        // Update track basic information
        $track->update([
            'title' => $validated['title'],
            'track_number' => $validated['track_number'],
            'duration' => $validated['duration'],
            'purchasable' => $validated['purchasable'] ?? false,
            'price' => $validated['purchasable'] ? $validated['price'] : null,
            'downloadable' => $validated['downloadable'] ?? false,
        ]);

        // Update audio file if provided
        if ($request->hasFile('audio')) {
            // Remove existing audio file
            $track->clearMediaCollection('audio');
            // Add new audio file
            $track->addMediaFromRequest('audio')->toMediaCollection('audio');
        }

        // Update cover art if provided
        if ($request->hasFile('cover_art')) {
            // Remove existing cover art
            $track->clearMediaCollection('cover_art');
            // Add new cover art
            $track->addMediaFromRequest('cover_art')->toMediaCollection('cover_art');
        }

        // Update artist relationships
        $artists = json_decode($validated['artists'], true);

        // Detach all existing artist relationships
        $track->artists()->detach();

        // Attach updated artist relationships
        foreach ($artists as $artistData) {
            $track->artists()->attach($artistData['artist_id'], [
                'role' => $artistData['role'],
                'order' => $artistData['order'],
            ]);
        }

        return redirect()->route('albums.tracks.edit', ['album' => $album, 'track' => $track])
            ->with('success', 'Track updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Album $album, Track $track)
    {
        $this->trackService->destroy($track);
        return redirect()->back()->with('success','Track removed successfully');
    }
}
