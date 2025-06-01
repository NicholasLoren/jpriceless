<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'published_at' => $this->published_at,
            'is_featured' => $this->is_featured,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relationships
            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email, 
                ];
            }),

            'blog_category' => $this->whenLoaded('blogCategory', function () {
                return [
                    'id' => $this->blogCategory->id,
                    'name' => $this->blogCategory->name,
                    'slug' => $this->blogCategory->slug,
                ];
            }),

            // Media
            'media' => $this->whenLoaded('media', function () {
                return $this->media->map(function ($media) {
                    return [
                        'id' => $media->id,
                        'collection_name' => $media->collection_name,
                        'name' => $media->name,
                        'file_name' => $media->file_name,
                        'mime_type' => $media->mime_type,
                        'size' => $media->size,
                        'original_url' => $media->getUrl(),
                        'thumb_url' => $media->hasGeneratedConversion('thumb') ? $media->getUrl('thumb') : null,
                        'large_url' => $media->hasGeneratedConversion('large') ? $media->getUrl('large') : null,
                    ];
                });
            }),

            // Featured image URL accessor
            'featured_image_url' => $this->featured_image_url,
        ];
    }
}