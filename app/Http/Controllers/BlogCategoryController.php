<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Http\Controllers\Controller;
use App\Services\BlogCategoryService;
use Illuminate\Http\Request;

class BlogCategoryController extends Controller
{

    public function __construct(public BlogCategoryService $blogCategoryService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('BlogCategories/Index', [
            'blogCategories' => $this->blogCategoryService->findAll(request()->per_page, request()->search),
            'blogCategory' => new BlogCategory
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('BlogCategories/Index', [
            'blogCategories' => $this->blogCategoryService->findAll(request()->per_page, request()->search),
            'blogCategory' => new BlogCategory
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|string|max:255'
        ]);

        $blogCategory = $this->blogCategoryService->store($validated);
        return redirect()->route('blog-categories.edit', $blogCategory)->with('success', 'Blog category created successfully.');
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogCategory $blogCategory)
    {
        return inertia('BlogCategories/Index', [
            'blogCategories' => $this->blogCategoryService->findAll(request()->per_page, request()->search),
            'blogCategory' => $blogCategory
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogCategory $blogCategory)
    {
        $validated = $request->validate([
            'name' => 'required|min:3|string|max:255'
        ]);

        $this->blogCategoryService->update($validated, $blogCategory);
        return redirect()->back()->with('success', 'Blog category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogCategory $blogCategory)
    {
        $this->blogCategoryService->destroy($blogCategory);
        return redirect()->redirect('blog-categories.index')->with('success', 'Blog categories removed successfully');
    }
}
