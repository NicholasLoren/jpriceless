<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Album extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'artist_id',
        'label_id',
        'genre_id',
        'description',
        'release_date',
        'is_featured'
    ];

    protected $casts = [
        'release_date' => 'date',
        'is_featured' => 'boolean',
    ];

    // Other relationships remain the same...

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('cover_art')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(300)
                    ->height(300);

                $this->addMediaConversion('large')
                    ->width(1200)
                    ->height(1200);
            });
    }
}
