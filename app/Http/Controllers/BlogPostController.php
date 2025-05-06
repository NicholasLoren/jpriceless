<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Http\Controllers\Controller;
use App\Services\BlogCategoryService;
use App\Services\BlogPostService;
use Illuminate\Http\Request;
use Str;

class BlogPostController extends Controller
{

    public function __construct(public BlogPostService $blogPostService, public BlogCategoryService $blogCategoryService)
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia(
            'BlogPosts/Index',
            [
                'blogPosts' => $this->blogPostService->findAll(request()->perPage, request()->search)
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia(
            'BlogPosts/Form',
            [
                'blogPost' => new BlogPost,
                'blogCategories' => $this->blogCategoryService->all()
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
            'blog_category_id' => 'required|exists:blog_categories,id',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'featured_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Set user_id to the current user
        $validated['user_id'] = auth()->id();


        // Use meta title and description from title and excerpt if not provided
        $validated['meta_title'] = $validated['meta_title'] ?? $validated['title'];
        $validated['meta_description'] = $validated['meta_description'] ?? Str::limit($validated['excerpt'], 160);

        // Create the blog post
        $blogPost = $this->blogPostService->store($validated);

        // Handle featured image
        if ($request->hasFile('featured_image')) {
            $blogPost->addMedia($request->file('featured_image'))->toMediaCollection('featured_image');
        }

        return redirect()->route('blog-posts.edit', $blogPost)
            ->with('success', 'Blog post created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost)
    {
        return inertia(
            'BlogPosts/Show',
            [
                'blogPost' => $blogPost->load(['media','user','blogCategory']), 
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogPost $blogPost)
    {
        return inertia(
            'BlogPosts/Form',
            [
                'blogPost' => $blogPost->load('media'),
                'blogCategories' => $this->blogCategoryService->all()
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_title' => 'nullable|string|max:60',
            'meta_description' => 'nullable|string|max:160',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Use meta title and description from title and excerpt if not provided
        $validated['meta_title'] ??= $validated['meta_title'];
        $validated['meta_description'] ??= Str::limit($validated['excerpt'], 160);

        // Update the blog post
        $this->blogPostService->update($validated, $blogPost);

        // Handle featured image
        if ($request->hasFile('featured_image')) {
            // Remove existing image first
            $blogPost->clearMediaCollection('featured_image');
            // Add new image
            $blogPost->addMedia($request->file('featured_image'))->toMediaCollection('featured_image');
        }

        return redirect()->route('blog-posts.edit', $blogPost)
            ->with('success', 'Blog post updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost)
    {
        $this->blogPostService->destroy($blogPost);

    }
}
