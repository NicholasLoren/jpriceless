<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Services\BlogPostService;
use App\Services\ContactFormService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    protected ContactFormService $contactFormService;
    protected BlogPostService $blogPostService;

    public function __construct()
    {
        $this->contactFormService = new ContactFormService();
        $this->blogPostService = new BlogPostService();
    }

    public function home()
    {
        return Inertia::render('Website/Home');
    }

    public function about()
    {
        return Inertia::render('Website/About');
    }

    public function contact()
    {
        return Inertia::render('Website/Contact');
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'string|required',
            'email' => 'email|required',
            'subject' => 'string|required',
            'message' => 'string|required',
        ]);

        //store the contact form
        $this->contactFormService->store($validated);
        return redirect()->back()->with('success', 'Your feedback has been submitted successfully!');
    }

    public function blogs()
    {
        // Get initial blog posts (first page)
        $blogPosts = $this->blogPostService->findAllPaginated(6); // 6 posts per page

        return Inertia::render('Website/Blogs', [
            'initialBlogPosts' => BlogPostResource::collection($blogPosts->items()),
            'hasMorePosts' => $blogPosts->hasMorePages(),
            'currentPage' => $blogPosts->currentPage(),
            'perPage' => $blogPosts->perPage()
        ]);
    }

    // API endpoint for loading more blogs
    public function loadMoreBlogs(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 6);

        $blogPosts = $this->blogPostService->findAllPaginated($perPage, $page);

        return response()->json([
            'posts' => BlogPostResource::collection($blogPosts->items()),
            'hasMorePages' => $blogPosts->hasMorePages(),
            'currentPage' => $blogPosts->currentPage()
        ]);
    }

    public function tours()
    {
        return Inertia::render('Website/Tours');
    }

    public function singleTour()
    {
        return Inertia::render('Website/TourDetails');
    }

    public function gallery()
    {
        return Inertia::render('Website/Gallery');
    }

    public function discography()
    {
        return Inertia::render('Website/Discography');
    }

    public function singleBlog($slug)
    {
        // Find the blog post by slug with relationships
        $post = $this->blogPostService->findBySlugWithRelations($slug);

        // Get related posts (same category, excluding current post)
        $relatedPosts = $this->blogPostService->getRelatedPosts($post, 4);

        return Inertia::render('Website/BlogPostDetails', [
            'post' => new BlogPostResource($post),
            'relatedPosts' => BlogPostResource::collection($relatedPosts)
        ]);
    }
}