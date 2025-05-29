<?php

namespace App\Services;

use App\Models\BlogPost;

class BlogPostService
{
    public function store(array $data)
    {
        return BlogPost::create($data);
    }

    public function update(array $data, BlogPost $blogPost)
    {
        return $blogPost->update($data);
    }

    public function destroy(BlogPost $blogPost)
    {
        return $blogPost->delete();
    }

    public function findAll($perPage = 20, $search = '')
    {
        return BlogPost::with(['blogCategory','user'])
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('meta_title', 'like', "%{$search}%")
                    ->orWhere('meta_description', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString()
            ->through(function ($album) {
                // Add media URLs to the album
                if ($album->hasMedia('featured_image')) {
                    $album->cover_thumbnail = $album->getFirstMediaUrl('featured_image', 'thumb');
                    $album->cover_url = $album->getFirstMediaUrl('featured_image');
                }
                return $album;
            });
    }
    public function all()
    {
        return BlogPost::orderBy('title')->get();
    }

}