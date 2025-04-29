<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use App\Http\Controllers\Controller;
use App\Services\ArtistService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistController extends Controller
{
    public function __construct(public ArtistService $artistService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 20);
        $search = $request->input('search', '');

        return Inertia::render('Artists/Index', [
            'artists' => $this->artistService->findAllPaginated($perPage, $search),
            'artist' => new Artist
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Artists/Index', [
            'artists' => $this->artistService->findAllPaginated(),
            'artist' => new Artist
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'website' => 'required|url',
            'bio' => 'required|min:3|max:255',
            'profile_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Create the artist with the validated data
        $artist = $this->artistService->store([
            'name' => $validated['name'],
            'website' => $validated['website'],
            'bio' => $validated['bio'],
        ]);

        // Handle the profile image upload using Spatie Media Library
        if ($request->hasFile('profile_image')) {
            $artist->addMediaFromRequest('profile_image')
                ->toMediaCollection('profile_image');
        }

        // Redirect with success message
        return redirect()->route('artists.edit', $artist)
            ->with('success', 'Artist created successfully');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Artist $artist)
    {
        $perPage = $request->input('per_page', 20);
        $search = $request->input('search', '');

        return Inertia::render('Artists/Index', [
            'artists' => $this->artistService->findAllPaginated($perPage, $search),
            'artist' => $artist
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artist $artist)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
            'website' => 'required|url',
            'bio' => 'required|min:3|max:255',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Update the artist with the validated data
        $this->artistService->update([
            'name' => $validated['name'],
            'website' => $validated['website'],
            'bio' => $validated['bio'],
        ], $artist);

        // Handle the profile image upload if a new one is provided
        if ($request->hasFile('profile_image')) {
            // This will automatically replace any existing media in this collection
            // since we've configured it as singleFile in the model
            $artist->addMediaFromRequest('profile_image')
                ->toMediaCollection('profile_image');
        }

        // Redirect with success message
        return redirect()->route('artists.edit', $artist)
            ->with('success', 'Artist updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artist $artist)
    {
        $this->artistService->destroy($artist);
        return redirect()->route('artists.index')->with('success', 'Artist deleted successfully');
    }
}