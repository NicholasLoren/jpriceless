<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class BlogPost extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'user_id',
        'blog_category_id',
        'published_at',
        'is_featured',
        'meta_title',
        'meta_description'
    ];
 

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(400)
                    ->height(300);

                $this->addMediaConversion('large')
                    ->width(1200)
                    ->height(900);
            });

        // For additional images within the blog content
        $this->addMediaCollection('content_images')
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(400);

                $this->addMediaConversion('medium')
                    ->width(800);
            });
    }
}