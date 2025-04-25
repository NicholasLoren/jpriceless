<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Http\Controllers\Controller;
use App\Services\GenreService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GenreController extends Controller
{

    public function __construct(public GenreService $genreService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Genres/Index', [
            'genres' => $this->genreService->findAll(),
            'genre' => new Genre
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Genres/Index', ['genres' => $this->genreService->findAll(), 'genre' => new Genre]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|string|max:255'
        ]);

        $genre = $this->genreService->store($validated);
        return redirect()->route('genres.edit',$genre)->with('success', 'Genre created successfully.');
    }
 

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Genre $genre)
    {
        return Inertia::render('Genres/Index', ['genres' => $this->genreService->findAll(), 'genre' => $genre]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|string|max:255'
        ]);

        $this->genreService->update($validated, $genre);
        return redirect()->back()->with('success', 'Genre updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        $this->genreService->destroy($genre);
        return redirect()->route('genres.index')->with('success', 'Genre deleted successfully.');
    }
}
