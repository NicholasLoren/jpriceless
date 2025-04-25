<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Controllers\Controller;
use App\Services\TagService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{

    public function __construct(public TagService $tagService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Tags/Index', [
            'tags' => $this->tagService->findAll(),
            'tag' => new Tag
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Tags/Index', [
            'tags' => $this->tagService->findAll(),
            'tag' => new Tag
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
        ]);

        $tag = $this->tagService->store($validated);
        return redirect()->route('tags.edit', $tag)->with('success', 'Tag created successfully.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tag $tag)
    {
        return Inertia::render('Tags/Index', [
            'tags' => $this->tagService->findAll(),
            'tag' => $tag
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tag $tag)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|max:255',
        ]);

        $this->tagService->update($validated, $tag);
        return redirect()->route('tags.edit', $tag)->with('success', 'Tag updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tag $tag)
    {
        $this->tagService->destroy($tag);
        return redirect()->route('tags.index')->with('success', 'Tag deleted successfully.');
    }
}
